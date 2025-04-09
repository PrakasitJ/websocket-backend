import { StatusMap } from "elysia";
import { ElysiaCookie } from "elysia/dist/cookies";
import { HTTPHeaders } from "elysia/dist/types";
import { createReadStream } from "fs";

type Set = {
    headers: HTTPHeaders;
    status?: number | keyof StatusMap;
    redirect?: string;
    cookie?: Record<string, ElysiaCookie>;
}

type Headers = Record<string, string | undefined>;

export class StreamingService {
    private static instance: StreamingService;

    private constructor() {}

    public static getInstance(): StreamingService {
        if (!StreamingService.instance) {
            StreamingService.instance = new StreamingService();
        }
        return StreamingService.instance;
    }

    private setStreamHeaders(set: Set, contentLength: number, start?: number, end?: number, fileSize?: number) {
        if (start !== undefined && end !== undefined && fileSize !== undefined) {
            set.headers["content-range"] = `bytes ${start}-${end}/${fileSize}`;
            set.headers["accept-ranges"] = "bytes";
            set.headers["content-length"] = (end - start + 1).toString();
            set.status = 206;
        } else {
            set.headers["content-length"] = contentLength.toString();
        }
        set.headers["content-type"] = "video/mp4";
    }

    public async streamVideo({ videoPath, headers, set }: {
        videoPath: string, headers: Headers, set: Set
    }) {
        try {
            const video = Bun.file(videoPath);
            const fileSize = video.size;
            const range = headers["range"];

            if (range) {
                const parts = range.replace(/bytes=/, "").split("-");
                const start = parseInt(parts[0], 10);
                const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
                const file = createReadStream(videoPath, { start, end });

                this.setStreamHeaders(set, end - start + 1, start, end, fileSize);
                return file;
            } else {
                const file = createReadStream(videoPath);
                this.setStreamHeaders(set, fileSize);
                return file;
            }
        } catch (error) {
            console.error("Error streaming video:", error);
            set.status = 500;
            return "Internal Server Error";
        }
    }
}
