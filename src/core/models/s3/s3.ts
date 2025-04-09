import { IFileResponse } from "../../interfaces/index";

export class S3Response implements IFileResponse {
    success: boolean;
    message: string;
    file: File | string | null;

    constructor(success: boolean, message: string, file: File | string | null = null) {
        this.success = success;
        this.message = message;
        this.file = file;
    }
}