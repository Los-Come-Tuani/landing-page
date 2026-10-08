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

`dist/` es la salida de producción. No requiere claves, correo ni servicios
externos para la vista previa actual.
