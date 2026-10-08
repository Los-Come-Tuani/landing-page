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
