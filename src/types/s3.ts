export interface FileResponse {
    success: boolean;
    message: string;
    file: File | string | null;
}