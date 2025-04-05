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

  async exists(fileName: string): Promise<boolean> {
    const result = await this.s3.file(fileName).exists();
    return result;
  }

  async getArrayBuffer(fileName: string) {
    if (await this.exists(fileName)) {
      const result = await this.s3.file(fileName).arrayBuffer();
      return result;
    }
    throw new Error("File not found");
  }

  async getFile(fileName: string) {
    if (await this.exists(fileName)) {
      const stat = await this.stat(fileName);
      const arrayBuffer = await this.getArrayBuffer(fileName);
      const file = new File([arrayBuffer], fileName, { type: stat.type });
      return file;
    }
    throw new Error("File not found");
  }

  async uploadFile(fileName: string, file: File) {
    const result = await this.s3.file(fileName).write(file);
    return result;
  }

  async changeFileName(oldFileName: string, newFileName: string) {
    if (await this.exists(oldFileName)) {
      const arrayBuffer = await this.getArrayBuffer(oldFileName);
      const result = await this.s3.file(newFileName).write(arrayBuffer);
      await this.deleteFile(oldFileName);
      return result;
    }
    throw new Error("File not found");
  }


  async deleteFile(fileName: string) {
    if (await this.exists(fileName)) {
      const result = await this.s3.file(fileName).delete();
      return result;
    }
    throw new Error("File not found");
  }

  async stat(fileName: string) {
    if (await this.exists(fileName)) {
      const result = await this.s3.file(fileName).stat();
      return result;
    }
    throw new Error("File not found");
  }
}

export { S3Service };
