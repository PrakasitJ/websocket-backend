import { Elysia, t } from "elysia";
import { Server, ServerOptions } from "socket.io";
import { createServer } from "http";
import { main } from "./restful/main";

import { chatHandler } from './handlers/chatHandler';
import { userHandler } from './handlers/userHandler';
import { imageHandler } from './handlers/imageHandler';

import { writeFile,mkdir } from "fs/promises";
import { existsSync } from "fs";
import { FilePayload } from "./types";

const cors_origin = process.env.CORS_ORIGIN || "*";
const cors_methods = process.env.CORS_METHODS || "GET,POST,PUT,PATCH,DELETE,OPTIONS";
const cors_credentials = process.env.CORS_CREDENTIALS === "true" || true;
const cors_allowed_headers = process.env.CORS_ALLOWED_HEADERS || "Cookie,Content-Type,Accept,Authorization";
const cors_exposed_headers = process.env.CORS_EXPOSED_HEADERS || "Content-Type, Authorization, Set-Cookie";

const PORT = process.env.PORT || 3000;
const HTTP_PORT = process.env.HTTP_PORT || 3001;

const io_options: Partial<ServerOptions> = {
  cors: {
    origin: cors_origin,
    methods: cors_methods,
    credentials: cors_credentials,
    allowedHeaders: cors_allowed_headers,
    exposedHeaders: cors_exposed_headers
  },
  pingTimeout: 30000,
  pingInterval: 25000,
  transports: ["websocket", "polling"]
};

const ws_server = createServer();
const io = new Server(ws_server, io_options);

io.on("connection", (socket) => {
  userHandler(io, socket);
  chatHandler(io, socket);
  imageHandler(io, socket);
});

const app = new Elysia()
  .use(main)
  .get("/", () => "WebSocket Chat Server")
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
      console.log(error);
    }

    try {
      io.emit("finish", {
        message: "Finish uploading file",
        file_name: file.name,
        original_file_name: file.name,
        file_type: file.type,
        file_path: app.server?.url + "file/" + file.name
      } as FilePayload);
    } catch (error) {
      console.log(error);
    }

    return {
      message: "Finish uploading file",
      file_name: file.name,
      original_file_name: file.name,
      file_type: file.type,
      file_path: app.server?.url + "file/" + file.name
    } as FilePayload;
  }, {
    body: t.Object({
      file: t.File(),
      username: t.String()
    })
  })
  .listen(HTTP_PORT);

ws_server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
  console.log(`HTTP server running on port ${HTTP_PORT}`);
  console.log("CORS enabled for:", cors_origin);
});

export { io, app };