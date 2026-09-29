/* vite.config.ts */

/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), checker({ typescript: true })], // Faz o Vite falhar em erros de TypeScript
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  /* Using vitest */
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setup.ts",
  },
});
