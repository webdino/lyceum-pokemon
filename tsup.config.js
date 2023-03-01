import { defineConfig } from "tsup";

export default defineConfig({
  define: {
    env: JSON.stringify({
      REGION: process.env.REGION ?? "ap-northeast-1",
      BUCKET_NAME: process.env.BUCKET_NAME ?? "",
      FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN ?? "http://localhost:3000",
      BACKEND_PORT: process.env.BACKEND_PORT ?? "4000",
    }),
  },
});
