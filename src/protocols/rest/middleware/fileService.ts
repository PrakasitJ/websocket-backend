import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { IFilePayload } from "../../../core/interfaces/index";
import { WebSocketServer } from "../../../core/services/WebSocketServer";

export class FileService {
    private static instance: FileService;
    private wsServer: WebSocketServer;

    private constructor() {
        this.wsServer = WebSocketServer.getInstance();
    }

    public static getInstance(): FileService {
        if (!FileService.instance) {
            FileService.instance = new FileService();
        }
        return FileService.instance;
    }

    private async ensureDirectoryExists(directory: string): Promise<void> {
        if (!existsSync(directory)) {
            await mkdir(directory, { recursive: true });
        }
    }

    private createFilePayload(file: File, serverUrl: string): IFilePayload {
        return {
            message: "Finish uploading file",
            file_name: file.name,
            original_file_name: file.name,
            file_type: file.type,
            file_path: serverUrl + "file/" + file.name
        };
    }

    private async emitWebSocketEvent(payload: IFilePayload): Promise<void> {
        try {
            this.wsServer.getIO().emit("finish", payload);
        } catch (error) {
            console.error("Error emitting WebSocket event:", error);
        }
    }

    public async handleFileUpload(file: File, username: string, serverUrl: string): Promise<IFilePayload> {
        const file_buffer = await file.arrayBuffer();
        
        try {
            await this.ensureDirectoryExists("public/files");
            await writeFile("public/files/" + file.name, Buffer.from(file_buffer));
        } catch (error) {
            console.error("Error saving file:", error);
            throw error;
        }

        const filePayload = this.createFilePayload(file, serverUrl);
        await this.emitWebSocketEvent(filePayload);

        return filePayload;
    }
} 