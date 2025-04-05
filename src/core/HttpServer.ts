import { Elysia } from "elysia";
import { serverConfig } from "../config/server.config";
import { main } from "../restful/main";
import { payment } from "../restful/payment";
import { streaming } from "../restful/streaming";

export class HttpServer {
  private static instance: HttpServer;
  private app: Elysia;

  private constructor() {
    this.app = new Elysia()
      .use(main)
      .use(payment)
      .use(streaming)
  }

  public static getInstance(): HttpServer {
    if (!HttpServer.instance) {
      HttpServer.instance = new HttpServer();
    }
    return HttpServer.instance;
  }

  public start(): void {
    try {
      this.app.listen(serverConfig.HTTP_PORT, () => {
        console.log(`HTTP server running on port ${serverConfig.HTTP_PORT}`);
      });
    } catch (error) {
      console.error("Failed to start HTTP server:", error);
      throw error;
    }
  }

  public stop(): void {
    try {
      this.app.stop();
      console.log("HTTP server stopped");
    } catch (error) {
      console.error("Error stopping HTTP server:", error);
    }
  }
} 