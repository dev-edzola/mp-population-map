import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig({
  base: '/mp-population-map/', // 👈 Set your GitHub repo name here
  plugins: [react(),componentTagger()],
})

    
 