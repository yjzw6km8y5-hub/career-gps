/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// viteSingleFile puts the whole app (code, styles, fonts) into one dist/index.html,
// so it opens with a double-click and never fetches anything from the internet.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  base: "./",
  build: { assetsInlineLimit: 100_000_000 },
  test: {
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    environment: "node"
  }
});
