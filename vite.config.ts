import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// En `npm run dev` la landing le habla al API por este prefijo (el `API_URL` por defecto de
// `src/lib/api.ts`) y Vite reenvía a `API_PROXY_TARGET`: el navegador solo ve `localhost`, así
// que el API no tiene que aceptar ese origen en CORS.
const DEV_API_PREFIX = "/_api";

export default defineConfig(({ command, mode }) => {
  const target = (loadEnv(mode, process.cwd(), "").API_PROXY_TARGET || "https://develop-api.kplan.dev").trim();

  return {
    plugins: [react()],
    server:
      command === "serve"
        ? {
            proxy: {
              [`${DEV_API_PREFIX}/`]: {
                target,
                changeOrigin: true,
                rewrite: (path) => path.slice(DEV_API_PREFIX.length),
                configure: (proxy) => {
                  proxy.on("proxyReq", (proxyReq) => {
                    proxyReq.removeHeader("origin");
                  });
                },
              },
            },
          }
        : undefined,
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
