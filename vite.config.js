// vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      // This tells svgr to treat all imported SVGs as React components
      // This is often the default behavior, but it's good to be explicit
      svgr_sync: true,
    }),
  ],
});
