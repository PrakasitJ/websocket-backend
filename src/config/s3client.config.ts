export const s3ClientConfig = {
  accessKeyId: process.env.MINIO_ACCESS_KEY,
  secretAccessKey: process.env.MINIO_SECRET_KEY,
  region: process.env.MINIO_REGION,
  endpoint: process.env.MINIO_ENDPOINT,
  bucket: process.env.MINIO_BUCKET,
};
