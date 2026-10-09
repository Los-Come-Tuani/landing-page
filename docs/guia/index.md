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
`https://develop-api.kplan.dev`. Para otro API, copiá `.env.example` a
`.env.local` y cambiá `VITE_API_URL` (el API tiene que tener el origen de la
landing en `CORS_ALLOWED_ORIGINS`; ver [Deploy](despliegue.md)).
