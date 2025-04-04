# WebRTC Video Streaming Application

## Overview

This project is a WebRTC-based video streaming application built using Node.js, Elysia, and Socket.IO. It allows users to stream video content over the web with real-time communication capabilities.

## Features

- **Video Streaming**: Stream video files stored in the `public/videos` directory.
- **Real-time Communication**: Utilize WebRTC for real-time data exchange.
- **RESTful API**: Provides endpoints for file upload and video streaming.
- **WebSocket Support**: Real-time updates and notifications using Socket.IO.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- Bun (Bun runtime)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/PrakasitJ/websocket-backend.git
   cd websocket-backend
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Create necessary directories:
   Ensure the `public/videos` and `public/files` directories exist for storing video and file uploads.

### Running the Application

1. Start the server:
   ```bash
   bun run dev
   ```

2. Access the application:
   Open your browser and navigate to `http://localhost:3001` for the HTTP server or `http://localhost:3000` for the WebSocket server.

## API Endpoints

- `GET /`: Returns a welcome message.
- `GET /stream/*`: Streams video files from the `public/videos` directory.
- `POST /upload_file`: Uploads a file to the server.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.

## Contact

For any questions or feedback, please contact [big0231@gmail.com].