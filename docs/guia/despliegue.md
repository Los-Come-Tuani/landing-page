---
icon: lucide/rocket
---

# Deploy en Vercel

La configuración está lista para dos formas de importación:

- Si conectás la carpeta raíz del proyecto, [Vercel][vercel-docs] usará
  `../vercel.json`, instalará y compilará dentro de `LandingPage`, y publicará
  `LandingPage/dist`.
- Si conectás directamente `LandingPage` como root directory, Vercel usará
  `vercel.json` local y publicará `dist`.

Valores esperados en Vercel:

```txt
Framework Preset: Vite
Install Command: pnpm install --frozen-lockfile
Build Command: pnpm build
Output Directory: dist
Node.js: 22.x
```

La landing es una SPA, por eso las rutas se reescriben a `/index.html`. Los
assets compilados en `/assets` y las imágenes de `/media` quedan con cache
largo e inmutable.

## Variables de entorno

Se definen en Vercel (Settings → Environment Variables). Son públicas: quedan
dentro del bundle. Sin ellas se usan los valores de producción de
`src/lib/api.ts`.

| Variable          | Para qué                                                    | Sin definir                     |
| ----------------- | ----------------------------------------------------------- | ------------------------------- |
| `VITE_API_URL`    | API que recibe las solicitudes de demo y devuelve los links | `https://azure-api.kplan.dev`   |
| `VITE_PORTAL_URL` | Portal donde los negocios se registran (`/postular`)        | `https://portal.kplan.dev`      |

## Lo que hay que configurar en el API

- El dominio de la landing (y el de las vistas previas de Vercel que se quieran
  probar) tiene que estar en `CORS_ALLOWED_ORIGINS` del API (el App Service de
  Azure). Sin eso el navegador bloquea el envío del formulario de demo ("No
  pudimos conectarnos") y la lista de versiones sale como "no disponible". Si
  el servicio define `CSRF_TRUSTED_ORIGINS`, agregarlo también ahí. Si no
  define esas variables, los valores por defecto del API ya traen
  `https://kplan.dev` y `https://www.kplan.dev`.
- Las versiones se registran con el link de Drive de su instalador y se
  publican desde el portal, en "Sitio web → Versiones de la app"
  (docs/landing.md del repo del API). El archivo en Drive tiene que estar
  compartido con "Cualquier persona con el enlace".
