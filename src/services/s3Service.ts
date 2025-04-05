import { S3Client } from "bun";
import { s3ClientConfig } from "../config/s3client.config";

class S3Service {
  private static instance: S3Service;
  private s3: S3Client;

  private constructor() {
    this.s3 = new S3Client(s3ClientConfig);
  }

  public static getInstance() {
    if (!S3Service.instance) {
      S3Service.instance = new S3Service();
    }
    return S3Service.instance;
  }

  public getS3() {
    return this.s3;
  } 

  async exists(fileName: string) {
    const result = await this.s3.file(fileName).exists();
    return result;
  }

  async uploadFile(fileName: string, file: File) {
    const result = await this.s3.file(fileName).write(file);
    return result;
  }

  async downloadFile(fileName: string) {
    const result = await this.s3.file(fileName).arrayBuffer();
    return result;
  }

  async deleteFile(fileName: string) {
    const result = await this.s3.file(fileName).delete();
    return result;
  }

  async stat(fileName: string) {
    const result = await this.s3.file(fileName).stat();
    return result;
  }
}

export { S3Service };
