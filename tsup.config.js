import { defineConfig } from "tsup";

export default defineConfig({
  inject: ["tsup-shim.js"],
  outDir: ".tsup-output",
});
