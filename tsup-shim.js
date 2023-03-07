export const useRuntimeConfig = () => ({
  region: process.env.NUXT_REGION ?? "ap-northeast-1",
  bucketName: process.env.NUXT_BUCKET_NAME ?? "",
});
