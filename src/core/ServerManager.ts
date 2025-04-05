import { WebSocketServer } from "./WebSocketServer";
import { HttpServer } from "./HttpServer";
import { FileWatcher } from "../services/FileWatcher";
import { S3Service } from "../services/s3service";

export class ServerManager {
  private static instance: ServerManager;
  private wsServer: WebSocketServer;
  private httpServer: HttpServer;
  private fileWatcher: FileWatcher;
  private s3Service: S3Service;

  private constructor() {
    this.wsServer = WebSocketServer.getInstance();
    this.httpServer = HttpServer.getInstance();
    this.fileWatcher = FileWatcher.getInstance();
    this.s3Service = S3Service.getInstance();
  }

  public static getInstance(): ServerManager {
    if (!ServerManager.instance) {
      ServerManager.instance = new ServerManager();
    }
    return ServerManager.instance;
  }

  public start(): void {
    try {
      this.wsServer.start();
      this.httpServer.start();
      this.fileWatcher.start();
    } catch (error) {
      console.error("Failed to start servers:", error);
      this.stop();
      throw error;
    }
  }

  public stop(): void {
    try {
      this.wsServer.stop();
      this.httpServer.stop();
      this.fileWatcher.stop();
    } catch (error) {
      console.error("Error stopping servers:", error);
    }
  }

  public async restart(): Promise<void> {
    this.stop();
    this.start();
  }
} 