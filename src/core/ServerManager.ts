import { WebSocketServer } from "./WebSocketServer";
import { HttpServer } from "./HttpServer";

export class ServerManager {
  private static instance: ServerManager;
  private wsServer: WebSocketServer;
  private httpServer: HttpServer;

  private constructor() {
    this.wsServer = WebSocketServer.getInstance();
    this.httpServer = HttpServer.getInstance();
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
    } catch (error) {
      console.error("Error stopping servers:", error);
    }
  }
} 