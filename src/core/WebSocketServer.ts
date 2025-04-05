import { Server, ServerOptions } from "socket.io";
import { createServer } from "http";
import { serverConfig } from "../config/server.config";
import { chatHandler } from '../handlers/chatHandler';
import { userHandler } from '../handlers/userHandler';
import { imageHandler } from '../handlers/imageHandler';
import { paymentHandler } from "../handlers/paymentHandler";

export class WebSocketServer {
  private static instance: WebSocketServer;
  private io: Server;
  private httpServer: ReturnType<typeof createServer>;

  private constructor() {
    this.httpServer = createServer();
    this.io = new Server(this.httpServer, {
      cors: serverConfig.CORS,
      ...serverConfig.SOCKET,
      transports: ["websocket", "polling"]
    });

    this.initializeHandlers();
  }

  public static getInstance(): WebSocketServer {
    if (!WebSocketServer.instance) {
      WebSocketServer.instance = new WebSocketServer();
    }
    return WebSocketServer.instance;
  }

  private initializeHandlers(): void {
    this.io.on("connection", (socket) => {
      console.log(`New client connected: ${socket.id}`);
      
      userHandler(this.io, socket);
      chatHandler(this.io, socket);
      imageHandler(this.io, socket);
      paymentHandler(this.io, socket);

      socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
      });

      socket.on("error", (error) => {
        console.error(`Socket error for client ${socket.id}:`, error);
      });
    });

    this.io.on("error", (error) => {
      console.error("WebSocket server error:", error);
    });
  }

  public start(): void {
    try {
      this.httpServer.listen(serverConfig.PORT, () => {
        console.log(`WebSocket server running on port ${serverConfig.PORT}`);
        console.log("CORS enabled for:", serverConfig.CORS.origin);
      });
    } catch (error) {
      console.error("Failed to start WebSocket server:", error);
      throw error;
    }
  }

  public stop(): void {
    try {
      this.io.close();
      this.httpServer.close();
      console.log("WebSocket server stopped");
    } catch (error) {
      console.error("Error stopping WebSocket server:", error);
    }
  }

  public getIO(): Server {
    return this.io;
  }
} 