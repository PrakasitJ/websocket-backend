import { WebSocketServer } from "../../../core/services/WebSocketServer";
import { StreamingService } from "../middleware/streamingService";
import { FileService } from "../middleware/fileService";
import Elysia, { t } from "elysia";

const streaming = new Elysia();
const streamingService = StreamingService.getInstance();
const fileService = FileService.getInstance();

streaming.get("/stream/*", async ({ set, headers, params }) => {
    const videoPath = `public/videos/${params["*"]}`;
    return streamingService.streamVideo({ videoPath, headers, set });
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
        const serverUrl = streaming.server?.url?.toString() || "";
        return fileService.handleFileUpload(file, username, serverUrl);
    }, {
        body: t.Object({
            file: t.File(),
            username: t.String()
        })
    })

export { streaming };
