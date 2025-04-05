import { Elysia } from "elysia";
import { S3Service } from "../services/s3service";

const s3 = new Elysia({
    prefix: "/s3"
});

s3.get("/*", async ({ params }) => {
    const s3 = S3Service.getInstance();
    try {
        const exists = await s3.exists(params["*"]);
        if (exists) {
            const stat = await s3.stat(params["*"]);
            const file = await s3.downloadFile(params["*"]);
            const newFile = new File([file], params["*"], { type: stat.type });
            return newFile;
        }
        return "File not found";
    } catch (error) {
        return error;
    }
})

export { s3 };  