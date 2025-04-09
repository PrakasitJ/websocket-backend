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

export const streamVideo = async ({ videoPath, headers, set }: {
    videoPath: string, headers: Headers, set: Set
}) => {
    try {
        const video = Bun.file(videoPath);
        const fileSize = video.size;
        const range = headers["range"];

        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunksize = end - start + 1;
            const file = createReadStream(videoPath, { start, end });

            set.headers["content-range"] = `bytes ${start}-${end}/${fileSize}`;
            set.headers["accept-ranges"] = "bytes";
            set.headers["content-length"] = chunksize.toString();
            set.headers["content-type"] = "video/mp4";
            set.status = 206;

            return file;
        } else {
            set.headers["content-length"] = fileSize.toString();
            set.headers["content-type"] = "video/mp4";

            const file = createReadStream(videoPath);
            return file;
        }
    } catch (error) {
        console.log(error);
        set.status = 500;
        return "Internal Server Error";
    }
};
