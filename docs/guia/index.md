---
icon: lucide/play
---

# Instalación y desarrollo

## Requisitos

[`node`][node] compatible con Vite y pnpm 11.

## Clonar e instalar

```bash
git clone https://github.com/Los-Come-Tuani/landing-page kplan-landing
cd kplan-landing
pnpm install
```

En este equipo, si pnpm detecta un store distinto del existente, usar
`--store-dir C:/Users/USUARIO/AppData/Local/pnpm/store` al instalar.

## Scripts

```bash
pnpm dev
pnpm typecheck
pnpm build
pnpm preview
```

`dist/` es la salida de producción. No requiere claves. El formulario de demo
y la sección de descarga hablan con el API de K'plan: sin variables usan
`https://azure-api.kplan.dev`. En `npm run dev` pasan por el proxy de Vite
(`/_api`, ver `vite.config.ts`): el navegador solo ve `localhost` y el API no
tiene que aceptar ese origen. Para otro API en local, copiá `.env.example` a
`.env.local` y cambiá `API_PROXY_TARGET` (por ejemplo `http://localhost:8080`).
La landing publicada sí necesita su dominio en el `CORS_ALLOWED_ORIGINS` del
API; ver [Deploy](despliegue.md).
