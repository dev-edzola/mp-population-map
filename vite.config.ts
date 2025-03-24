import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { writeFileSync, copyFileSync } from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  base: mode === 'production' ? '/mp-population-map/' : '/',
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    {
      name: "copy-404",
      closeBundle() {
        const distDir = path.resolve(__dirname, "dist");
        copyFileSync(`${distDir}/index.html`, `${distDir}/404.html`);
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist", // Ensure the output directory is correctly named
    assetsDir: "assets", // Place assets in a subdirectory
    rollupOptions: {
      output: {
        manualChunks: undefined, // Ensure single chunk for SPAs
      },
    },
  },
}));
