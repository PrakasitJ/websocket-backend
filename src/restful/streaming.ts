import { WebSocketServer } from "../core/WebSocketServer";
import { streamVideo } from "../services/streamingService";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { FilePayload } from "../types";
import Elysia, { t } from "elysia";

const streaming = new Elysia();

streaming.get("/stream/*", async ({ set, headers, params }) => {
    const videoPath = `public/videos/${params["*"]}`;
    return streamVideo({ videoPath, headers, set });
}, {
    headers: t.Object({
        range: t.Optional(t.String())
    }),
    params: t.Object({
        "*": t.String()
    })
})
    .get("/file/:name", async ({ params: { name } }) => {
        const file = Bun.file(`public/files/${name}`);
        return file;
    }, {
        params: t.Object({
            name: t.String()
        })
    })
    .post("/upload_file", async ({ body: { file, username } }) => {
        const file_buffer = await file.arrayBuffer();
        try {
            if (!existsSync("public/files")) {
                await mkdir("public/files", { recursive: true });
            }
            await writeFile("public/files/" + file.name, Buffer.from(file_buffer));
        } catch (error) {
            console.error("Error saving file:", error);
            throw error;
        }

        try {
            const wsServer = WebSocketServer.getInstance();
            wsServer.getIO().emit("finish", {
                message: "Finish uploading file",
                file_name: file.name,
                original_file_name: file.name,
                file_type: file.type,
                file_path: streaming.server?.url + "file/" + file.name
            } as FilePayload);
        } catch (error) {
            console.error("Error emitting WebSocket event:", error);
        }

        return {
            message: "Finish uploading file",
            file_name: file.name,
            original_file_name: file.name,
            file_type: file.type,
            file_path: streaming.server?.url + "file/" + file.name
        } as FilePayload;
    }, {
        body: t.Object({
            file: t.File(),
            username: t.String()
        })
    })

export { streaming };
