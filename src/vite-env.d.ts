/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Públicos: quedan dentro del bundle. Sin ellos se usan los de producción (`src/lib/api.ts`).
  readonly VITE_API_URL?: string;
  readonly VITE_PORTAL_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
