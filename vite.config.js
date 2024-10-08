import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  /* server: {
    https: {
      key: fs.readFileSync("certificate.key"),
      cert: fs.readFileSync("certificate.crt"),
    },
  }, */
});
