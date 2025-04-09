import { IFilePayload } from "../../interfaces/index";

export class File implements IFilePayload {
    message: string;
    file_name: string;
    original_file_name: string;
    file_type: string;
    file_path: string;

    constructor(data: IFilePayload) {
        this.message = data.message;
        this.file_name = data.file_name;
        this.original_file_name = data.original_file_name;
        this.file_type = data.file_type;
        this.file_path = data.file_path;
    }
}
