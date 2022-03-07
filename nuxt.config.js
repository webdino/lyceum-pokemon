import { defineNuxtConfig } from "nuxt3";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  /**
   * NOTE: Express を Nuxt のサーバミドルウェアとして導入
   * https://v3.nuxtjs.org/docs/directory-structure/nuxt.config#servermiddleware
   */
  serverMiddleware: [{ path: "/api", handler: "~/express/index.js" }],
  css: ["animate.css"],
});
