export const serverConfig = {
  PORT: process.env.PORT || 3000,
  HTTP_PORT: process.env.HTTP_PORT || 3001,
  CORS: {
    origin: process.env.CORS_ORIGIN || "*",
    methods: process.env.CORS_METHODS || "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    credentials: process.env.CORS_CREDENTIALS === "true" || true,
    allowedHeaders: process.env.CORS_ALLOWED_HEADERS || "Cookie,Content-Type,Accept,Authorization",
    exposedHeaders: process.env.CORS_EXPOSED_HEADERS || "Content-Type, Authorization, Set-Cookie"
  },
  SOCKET: {
    pingTimeout: 30000,
    pingInterval: 25000,
    transports: ["websocket", "polling"]
  }
}; 