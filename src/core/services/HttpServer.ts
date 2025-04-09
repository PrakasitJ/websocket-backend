import { Elysia } from "elysia";
import { serverConfig } from "../../config/server.config";
import { main } from "../../protocols/rest/routes/main";
import { payment } from "../../protocols/rest/routes/payment";
import { streaming } from "../../protocols/rest/routes/streaming";
import { s3 } from "../../protocols/rest/routes/s3";
import { redis } from "../../protocols/rest/routes/redis";

export class HttpServer {
  private static instance: HttpServer;
  private app: Elysia;

  private constructor() {
    this.app = new Elysia()
      .use(main)
      .use(payment)
      .use(streaming)
      .use(s3)
      .use(redis);
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