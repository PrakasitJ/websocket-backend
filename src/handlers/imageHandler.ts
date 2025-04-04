import { Server, Socket } from "socket.io";
import { getUsername } from "../utils/params";
import { state } from "../socket/state";
import { Message } from "../types";

export const imageHandler = (io: Server, socket: Socket) => {
    const username = getUsername(socket);

    socket.on("get_image_request", async ({image_url}: {image_url: string}) => {
        socket.emit("get_image_request", {
            content: image_url,
            sender: username,
            timestamp: new Date().toISOString()
        } as Message);
    });

    socket.on("upload_image", async ({file}: {file: Uint8Array}) => {
        console.log(file);
        try {
            const image_base64 = Buffer.from(file).toString("base64");
            const image_url = `data:image/jpeg;base64,${image_base64}`;
            io.emit("image_uploaded", {
                content: image_url,
                sender: username,
                timestamp: new Date().toISOString()
            } as Message);

            // io.to(state.users.get(username)!.socket.id).emit("image_uploaded", {
            //     content: image_url,
            //     sender: username,
            //     timestamp: new Date().toISOString()
            // } as Message);
        } catch (error) {
            io.to(state.users.get(username)!.socket.id).emit("image_uploaded", {
                content: "Image not found",
                sender: username,
                timestamp: new Date().toISOString()
            } as Message);
        }
    });
};
