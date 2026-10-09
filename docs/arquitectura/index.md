---
icon: lucide/folder-tree
---

# Estructura y contratos

- `src/app/App.tsx`: composición, perfil de participación y router. La ruta
  raíz tiene `errorElement` (`src/app/pages/ErrorPage.tsx`) y su layout monta
  `ToastProvider`.
- `src/app/ErrorBoundary.tsx`: último recurso, por fuera del router, en
  `src/main.tsx`. Junto con `ErrorPage` usa `src/components/layout/ErrorScreen.tsx`.
- `src/content/landing-content.ts`: navegación, demo, experiencias, FAQ y
  créditos.
- `src/components/sections/`: secciones de la landing, incluidas las versiones
  disponibles (`DownloadSection`) y la solicitud de demo
  (`DemoRequestSection`).
- `src/components/forms/DemoRequestForm.tsx`: el formulario de demo, que al
  enviarse muestra los links de descarga en un diálogo y en el panel de éxito.
- `src/content/platforms.ts`: nombre, formato e instrucciones de instalación de
  cada plataforma.
- `src/lib/api.ts`: lo que la landing le pide al API, las direcciones del API
  y del portal (`VITE_API_URL`, `VITE_PORTAL_URL`) y la traducción de las
  fallas a textos de la landing, con un tiempo máximo de 20 s.
- `src/components/ui/`: enlaces, pantallas, imágenes con respaldo (`Img`,
  `Photo`), el diálogo nativo (`Dialog`) y los snackbars (`Toaster.tsx` y
  `toast.ts`, con `useToast`).
- `src/styles/landing.css`: tokens y diseño adaptable; Tailwind usa las
  mismas variables. `src/styles/feedback.css`: snackbars, pantalla de error y
  respaldo de imágenes.
- `public/media/`: exportaciones WebP optimizadas.

## Formularios y API

La solicitud de demo se envía al API de K'plan, que responde con los links de
descarga de las versiones publicadas. Los perfiles de negocio y de guía ya no son
formularios: llevan al registro del portal y a la app. El contrato completo
está en [Formularios](../diseno/formularios.md); los errores y avisos, en
[Estados de error y avisos](../diseno/estados.md).
