export interface IFileResponse {
    success: boolean;
    message: string;
    file: File | string | null;
}

export interface IFilePayload {
    message: string;
    file_name: string;
    original_file_name: string;
    file_type: string;
    file_path: string;
} 