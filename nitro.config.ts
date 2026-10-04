import { defineConfig } from "nitro/config";

// Vercel Nitro preset. `nitro build` emits `.vercel/output`.
// serverDir must stay set or the install-page middleware never registers.
export default defineConfig({
  preset: "vercel",
  serverDir: "./server",
});
