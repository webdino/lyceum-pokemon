import { defineNuxtConfig } from "nuxt/config";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  css: ["animate.css"],
  runtimeConfig: {
    region: "ap-northeast-3",
    bucketName: "km-sd05-pokemon",
    public: {
      backendOrigin: "http://localhost:3000",
    },
  },
});
