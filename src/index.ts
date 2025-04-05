import { ServerManager } from "./core/ServerManager";

/**
 * Main application entry point
 * Initializes and manages the WebSocket and HTTP servers
 */
async function main() {
  try {
    // Initialize server manager
    const serverManager = ServerManager.getInstance();
    
    // Start servers
    serverManager.start();
    
    // Handle graceful shutdown
    setupShutdownHandlers(serverManager);
    
    console.log('Application started successfully');
  } catch (error) {
    console.error('Failed to start application:', error);
    process.exit(1);
  }
}

/**
 * Sets up handlers for graceful shutdown
 * @param serverManager - The server manager instance
 */
function setupShutdownHandlers(serverManager: ServerManager) {
  const shutdownSignals = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
  
  shutdownSignals.forEach(signal => {
    process.on(signal, () => {
      console.log(`Received ${signal}. Shutting down gracefully...`);
      serverManager.stop();
      process.exit(0);
    });
  });

  // Handle uncaught exceptions
  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    serverManager.stop();
    process.exit(1);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    serverManager.stop();
    process.exit(1);
  });
}

// Start the application
main();