<div align="center">
  <img
    src="docs/banner.svg"
    width="300"
    height="125"
    style="padding: 10px;"
  />
</div>

<h1 align="center">
  <code>kplan-landing</code>
</h1>

<h3 align="center">
  Landing page de la aplicación móvil <code>k'plan</code>
</h3>

<div align="center">

[![React.][react-badge]][react-docs]
[![TypeScript.][typescript-badge]][typescript-docs]
[![Vite.][vite-badge]][vite-docs]
<br/>
[![Tailwind CSS.][tailwind-badge]][tailwind-docs]
[![pnpm.][pnpm-badge]][pnpm-docs]
[![Vercel.][vercel-badge]][vercel-docs]

</div>

Landing implementada con React 19, TypeScript, Vite y Tailwind. Presenta el
producto mediante fotografía de Nicaragua, pantallas reales de la app y una
demostración manual. Incluye menú móvil, detalles de experiencias, preguntas
frecuentes y formularios diferenciados para negocios y traductores/guías.

## Desarrollo

Con [`node`][node] compatible con Vite y pnpm 11:

```sh
pnpm install
pnpm dev
pnpm typecheck
pnpm build
pnpm preview
```

`dist/` es la salida de producción. No requiere claves, correo ni servicios
externos para la vista previa actual. En este equipo, si pnpm detecta un
store distinto del existente, usar
`--store-dir C:/Users/USUARIO/AppData/Local/pnpm/store` al instalar.

## Deploy en Vercel

La configuración está lista para dos formas de importación:

- Si conectás la carpeta raíz del proyecto, Vercel usará `../vercel.json`,
  instalará y compilará dentro de `LandingPage`, y publicará
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

## Documentación

Este README cubre lo esencial para desarrollar y desplegar. La
documentación expandida vive en [`docs/`](docs/index.md) y se genera con
[Zensical][zensical-docs]:

```sh
uvx zensical serve
```

- [Guía de desarrollo](docs/guia/index.md): instalación, scripts, despliegue
  y verificación reproducible (auditoría de rendimiento, pruebas del juego
  de la página 404, verificación de las páginas del footer).
- [Arquitectura](docs/arquitectura/index.md): estructura del código,
  contrato de los formularios y sistema de páginas del footer.
- [Sistema de diseño](docs/diseno/index.md): composición, tokens,
  formularios, movimiento y la página 404.
- [Activos](docs/activos/index.md): inventario de recursos, licencias y el
  mapa interactivo de ciudades creativas.

[node]: https://nodejs.org/
[pnpm-badge]: https://img.shields.io/badge/pnpm-white?style=for-the-badge&color=gray&logoColor=white&logo=pnpm
[pnpm-docs]: https://pnpm.io/
[react-badge]: https://img.shields.io/badge/react-white?style=for-the-badge&color=gray&logoColor=white&logo=react
[react-docs]: https://react.dev/
[tailwind-badge]: https://img.shields.io/badge/tailwindcss-white?style=for-the-badge&color=gray&logoColor=white&logo=tailwindcss
[tailwind-docs]: https://tailwindcss.com/
[typescript-badge]: https://img.shields.io/badge/typescript-white?style=for-the-badge&color=gray&logoColor=white&logo=typescript
[typescript-docs]: https://www.typescriptlang.org/
[vercel-badge]: https://img.shields.io/badge/vercel-white?style=for-the-badge&color=gray&logoColor=white&logo=vercel
[vercel-docs]: https://vercel.com/docs
[vite-badge]: https://img.shields.io/badge/vite-white?style=for-the-badge&color=gray&logoColor=white&logo=vite
[vite-docs]: https://vite.dev/
[zensical-docs]: https://zensical.org/
