import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    tailwindcss(),

    // Only use this when actually building the site.
    // Running it during dev can interfere with Vite's HTML handling.
    ...(command === "build" ? [viteSingleFile()] : []),
  ],

  server: {
    host: "0.0.0.0",
    allowedHosts: true,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
}));