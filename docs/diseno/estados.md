---
icon: lucide/life-buoy
---

# Estados de error y avisos

El sitio se usa de punta a punta sin ayuda técnica. Si algo falla, se ve una
pantalla o un aviso amable, sin códigos de estado ni textos técnicos, y
siempre con una acción para seguir.

## Qué usar en cada caso

- **Snackbar**: el resultado de algo que hizo la persona y que no necesita
  quedarse en pantalla (un envío que falló, campos por revisar, un reintento
  sin éxito).
- **Error de campo**: debajo del campo; dura hasta que se corrige.
- **Diálogo**: un resultado importante que trae sus propias acciones (el
  éxito del formulario de demo con los links).
- **Estado en la sección**: lo que falla al cargar sin que la persona hiciera
  nada (la descarga). No se interrumpe con un snackbar.
- **Pantalla de error**: cuando la página no se puede mostrar.

## Pantalla de error

- `errorElement` de la ruta raíz (`src/app/pages/ErrorPage.tsx`). Reemplaza
  también a `SiteLayout`, que puede ser lo que falló, así que usa un marco
  mínimo propio (`ErrorShell`: cabecera con el logo y el contenido, sin router
  ni footer). Dice «Algo salió mal» y «Tuvimos un tropiezo en el camino.», con
  «Recargar la página» como acción principal, «Ir al inicio» (enlace normal,
  que recarga todo) y el correo de contacto.
- Si el router entrega un 404 ahí (por ejemplo, desde un loader futuro),
  muestra la [página no encontrada](pagina-404.md) dentro del mismo marco.
- `ErrorBoundary` envuelve la app en `src/main.tsx`, por fuera del router,
  como último recurso: misma pantalla y mismos textos.
- El error solo se escribe en la consola en desarrollo.

### Versión nueva del sitio

Si una pestaña abierta pide un archivo que el último deploy ya borró
(`Failed to fetch dynamically imported module`, `Importing a module script
failed`, `error loading dynamically imported module` o `ChunkLoadError`), la
pantalla dice «Hay una versión nueva» y «Actualizamos K’plan.», y ofrece
recargar. Hoy el build es un solo archivo de JavaScript; la detección queda
lista para cuando haya rutas que se carguen aparte.

## Antes de que cargue la app

`index.html` trae sus propios estilos, porque estos avisos aparecen justo
cuando el CSS del sitio puede no haber cargado:

- `<noscript>`: «Para ver K’plan, activá JavaScript.», con el correo de
  contacto.
- Si a los 10 s `#root` sigue vacío (el JavaScript principal no cargó por la
  red, un bloqueo o un `index.html` viejo que pide archivos que ya no
  existen), aparece «K’plan está tardando en cargar.» con «Recargar la página»
  y el correo. Es solo CSS (`#root:empty ~ .boot-fallback`, con `visibility`
  animada): cuando React monta, deja de aplicarse. Sin JavaScript se oculta y
  queda solo el `<noscript>`.

## Snackbars

`ToastProvider` (`src/components/ui/Toaster.tsx`) está dentro del layout del
router; las páginas usan `useToast()` (`src/components/ui/toast.ts`), con
`show({ tone, message, action })`, que devuelve un id, y `dismiss(id)`.

- Abajo: centrado en móvil y a la izquierda desde 700 px, lejos del formulario
  de demo, que está a la derecha. Hasta tres; si llega un cuarto sale el más
  viejo, y un mensaje repetido reemplaza al anterior.
- Tonos `success`, `error` e `info`, cada uno con su ícono y su token
  `feedback-*` ([Tokens](tokens.md)). Acción opcional debajo del mensaje (por
  ejemplo «Reintentar») y botón de cierre de 44 px. Esc cierra el que tiene el
  foco.
- Se van solos a los 5 s; los errores, a los 8 s. Se pausan con el puntero
  encima, con el foco adentro o con la pestaña oculta.
- Lectores de pantalla: dos regiones vivas siempre montadas, `polite` para
  éxito e info y `assertive` para errores. Se vacían antes de cada aviso para
  que un mensaje repetido se vuelva a anunciar.
- La acción es un atajo: el mismo camino existe en la página. En el
  formulario, el botón de envío recibe el foco después de un error.
- Superficie blanca con borde y sombra, como las tarjetas de la landing.
  Entrada y salida en [Movimiento](movimiento.md).

## Diálogos

`Dialog` (`src/components/ui/Dialog.tsx`, antes `DetailDialog`) es el
`<dialog>` nativo con `showModal`: foco atrapado, Esc y clic afuera para
cerrar, etiqueta del botón de cierre configurable y título con id único
(`useId`), porque en la landing conviven el detalle de experiencias y el éxito
del formulario de demo.

## Imágenes

`Img` (`src/components/ui/Img.tsx`), que usan `Photo`, `AppPreview` y la
ilustración del cierre: si la imagen no carga, cambia la fuente por un SVG
vacío de la misma proporción y queda el fondo `surface-placeholder`, sin el
ícono de imagen rota. El `alt` se conserva.

## Estados vacíos

Cada lugar que puede quedar vacío o sin datos ofrece una acción:

| Lugar | Estado | Acción |
| --- | --- | --- |
| Descarga | Buscando, sin versiones o sin respuesta | «Pedir la app» (al formulario); sin respuesta, también «Reintentar» |
| Descarga | iOS todavía no disponible | «conocé la app en la vista previa» |
| Formulario enviado | Sin versión publicada | «Listo» y «Enviar otra solicitud» |
| Página no encontrada | — | «Volver al inicio», «Volver atrás» si hay historial, el juego |
| Pantalla de error | — | «Recargar la página», «Ir al inicio» y el correo |

Las páginas «Próximamente» del footer son texto sin enlace por diseño (ver
[Páginas del footer](../arquitectura/paginas.md)).

## Cómo probarlo

Con `pnpm build` y `pnpm preview`, en las DevTools del navegador:

- **Formulario sin conexión**: Network → Offline y enviar. Con *Block request
  URL* sobre `demo-request` pasa lo mismo.
- **`5xx`, `400` o `429`**: *Override content* sobre la respuesta de
  `demo-request`, o un API local con `API_PROXY_TARGET` en `pnpm dev`.
- **Tiempo agotado**: un perfil de red con más de 20 s de latencia.
- **Descarga sin respuesta**: bloquear `app-release`; «Reintentar» con el
  bloqueo puesto muestra el snackbar, y sin él, las versiones.
- **JavaScript principal que no carga**: bloquear `assets/index-*.js` y
  esperar 10 s.
- **Sin JavaScript**: desactivarlo en la configuración de las DevTools.
- **Imagen rota**: bloquear `/media/*`.
- **Página no encontrada**: abrir una dirección inexistente en una pestaña
  nueva (sin «Volver atrás») y desde la landing (con «Volver atrás»).
