import { defineConfig } from "vite";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";

export default defineConfig({
  plugins: [crx({ manifest })],
  server: {
    port: 5173,
    hmr: {
      overlay: false, // Désactive l'overlay de Vite pour éviter les conflits avec les erreurs de la console du navigateur
    },
  },
});
