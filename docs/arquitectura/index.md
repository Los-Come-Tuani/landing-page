---
icon: lucide/folder-tree
---

# Estructura y contratos

- `src/app/App.tsx`: composición y perfil de participación.
- `src/content/landing-content.ts`: navegación, demo, experiencias, FAQ y
  créditos.
- `src/components/sections/`: secciones de la landing, incluidas la descarga
  (`DownloadSection`) y la solicitud de demo (`DemoRequestSection`).
- `src/components/forms/DemoRequestForm.tsx`: el formulario de demo.
- `src/lib/api.ts`: lo que la landing le pide al API y las direcciones del API
  y del portal (`VITE_API_URL`, `VITE_PORTAL_URL`).
- `src/components/ui/`: enlaces, pantallas, imágenes y diálogo nativo.
- `src/styles/landing.css`: tokens y diseño adaptable; Tailwind usa las
  mismas variables.
- `public/media/`: exportaciones WebP optimizadas.

## Formularios y API

La solicitud de demo se envía al API de K'plan, que también dice qué versión
de la app se descarga. Los perfiles de negocio y de guía ya no son
formularios: llevan al registro del portal y a la app. El contrato completo
está en [Formularios](../diseno/formularios.md).
