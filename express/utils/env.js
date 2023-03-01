export const REGION = process.env.REGION ?? "ap-northeast-1";
export const BUCKET_NAME = process.env.BUCKET_NAME ?? "";
export const FRONTEND_ORIGIN =
  process.env.FRONTEND_ORIGIN ?? "http://localhost:3000";
export const BACKEND_PORT = Number(process.env.BACKEND_PORT ?? 4000);
