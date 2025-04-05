import { Elysia, t } from "elysia";
import { S3Service } from "../services/s3service";
import { FileResponse } from "../types";

const s3 = new Elysia({
    prefix: "/s3"
});

function createFileResponse(success: boolean, message: string, file: File | string | null): FileResponse {
    return {
        success,
        message,
        file
    };
}

s3.get("/*", async ({ params, set }) => {
    const s3 = S3Service.getInstance();
    try {
        const file = await s3.getFile(params["*"]);
        return file;
    } catch (error) {
        set.status = 404;
        return createFileResponse(false, "File not found", null);
    }
}, {
    params: t.Object({
        "*": t.String()
    })
})

s3.post("/", async ({ body, set }) => {
    const s3 = S3Service.getInstance();
    try {
        const file = await s3.uploadFile(body.name, body.file);
        return createFileResponse(true, "File uploaded successfully", body.file.name);
    } catch (error) {
        set.status = 404;
        return createFileResponse(false, "File uploaded failed", null);
    }
}, {
    body: t.Object({
        name: t.String(),
        file: t.File()
    })
})

s3.put("/change-name", async ({ body, set }) => {
    const s3 = S3Service.getInstance();
    try {
        await s3.changeFileName(body.oldName, body.newName);
        return createFileResponse(true, "File uploaded successfully", null);
    } catch (error) {
        set.status = 404;
        return createFileResponse(false, "File uploaded failed", null);
    }
}, {
    body: t.Object({
        oldName: t.String(),
        newName: t.String()
    })
})

s3.delete("/", async ({ body, set }) => {
    const s3 = S3Service.getInstance();
    try {
        await s3.deleteFile(body.name);
        return createFileResponse(true, "File deleted successfully", null);
    } catch (error) {
        set.status = 404;
        return createFileResponse(false, "File deleted failed", null);
    }
}, {
    body: t.Object({
        name: t.String()
    })
})

export { s3 };  