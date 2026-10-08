# Páginas del footer

## Lo preparado

`src/content/site-pages.ts` es el inventario tipado de las once páginas. Sobre nosotros, Misión y Contacto están en `published` y tienen contenido y rutas. Blog, Legal y Soporte permanecen en `planned`, como texto sin interacción y con la etiqueta «Próximamente». El footer conserva la navegación de la landing, la privacidad de la vista previa y los créditos.

`SiteLayout` reúne cabecera, contenido principal, enlace de salto y footer una sola vez, alrededor de las rutas. `ContentPage` presenta volver al inicio, título, introducción, fecha opcional y cuerpo legible. `PageMetadata` actualiza título y descripción. React Router usa `createBrowserRouter` para disponer de `ScrollRestoration`: recupera posiciones del historial y resuelve los hashes de la landing. Solo guarda posiciones de desplazamiento en sessionStorage; los borradores de formularios siguen en memoria. `RouteFocus` mueve el foco al destino sin cambiar esa posición.

El contenido se basa en `../DocumentacionMarca/Documentacion-general.md`, `../DocumentacionMarca/Business-model-canva.md`, `../PRODUCT.md` y `../DESIGN_SYSTEM.md`. Sobre nosotros explica origen, propuesta, públicos y piloto. Misión desarrolla descubrimiento, talento local y claridad. Contacto muestra `kplan.nic@gmail.com` mediante `mailto:`, sin formulario ni redirección automática; la referencia editorial es https://www.toogoodtogo.com/es/legal/contact-us. Las funciones previstas, ciudades y colaboraciones se describen según el estado de preparación del piloto.

El footer dispone de layout para marca + tres columnas, tres columnas bajo 960 px y dos bajo 700 px. Todos los grupos y títulos son visibles; al publicar una página, su texto se convierte en enlace. Los créditos y el aviso vigente se mantienen durante la transición.

## Arquitectura editorial

| Grupo | Página y ruta | Contenido al construirla |
| --- | --- | --- |
| Empresa | Sobre nosotros · `/empresa/sobre-nosotros` | Origen, propuesta, destinatarios y estado real del proyecto. Equipo solo con datos confirmados. |
| Empresa | Misión · `/empresa/mision` | Propósito cultural y compromisos concretos con comunidades y talento local. |
| Empresa | Blog · `/blog` | Índice y plantilla de artículo `/blog/:slug`; autor, fecha, imagen acreditada y texto real. |
| Empresa | Contacto · `/contacto` | Publicada: título «Contáctanos», orientación breve y correo visible enlazado. |
| Legal | Términos · `/legal/terminos` | Condiciones correspondientes al servicio disponible, responsable y fecha de vigencia. |
| Legal | Privacidad · `/legal/privacidad` | Tratamientos reales, finalidades, conservación y canal de derechos. |
| Legal | Cookies · `/legal/cookies` | Inventario real de tecnologías y preferencias, si aplican. |
| Legal | Legal · `/legal/aviso-legal` | Responsable del sitio, propiedad intelectual, atribuciones y contacto. |
| Soporte | Centro de ayuda · `/ayuda` | Entrada por viajeros, negocios y talento local, con guías publicadas. |
| Soporte | FAQ · `/ayuda/faq` | Reutilizar las respuestas del contenido de la landing; ampliar sin duplicarlas. |
| Soporte | Reportar · `/ayuda/reportar` | Categoría, descripción y medio de seguimiento; recepción real y errores recuperables. |

## Activar una página

1. Crear su contenido con la plantilla y revisión editorial apropiadas; completar datos del responsable antes de publicar textos legales. Reportar espera un canal de recepción definido; no usar correos provisionales ni confirmaciones simuladas.
2. Añadir la ruta terminada al router de `src/app/App.tsx`. La ruta `/` conserva la landing y `*` muestra la página no encontrada. Evitar duplicar `SiteLayout` al montar las páginas.
3. Añadir título y descripción propios, mover el foco al contenido en navegación y restaurar scroll con historial. Conservar los hashes de la landing. El alojamiento Vercel ya tiene fallback hacia `index.html`; comprobar URL directa y recarga en la vista previa del despliegue.
4. Cambiar `status` a `published` en el mismo cambio que registra la ruta y su contenido. Un indicador por sí solo no construye la página.
5. Verificar footer, teclado, navegación atrás/adelante, URL directa, recarga y 404. Usar `Link` para navegación interna y un enlace nativo para correo y destinos externos. Publicar con el flujo normal del sitio.

No hay endpoints, formularios de contacto/reporte ni CMS nuevos en esta entrega. El fallback de Vercel sirve la SPA en rutas directas; la página no encontrada es una vista del cliente, no una respuesta HTTP 404 del alojamiento.

## Verificación local

`pnpm build` comprueba TypeScript y genera la producción. Con `pnpm preview --host 127.0.0.1`, ejecutar `node scripts/verify-footer-pages.cjs <directorio-node_modules-con-playwright> [origen]`. El script usa Edge en modo headless y revisa enlaces desde el footer, navegación entre páginas, teclado y foco, historial y scroll, regreso a la demo, URL directa y recarga, metadatos, correo sin enviarlo, páginas pendientes y 404. Comprueba anchos de 320, 768, 1024 y 1440 px y guarda capturas/resultados en `output/playwright/` (ignorado por Git). No comprueba entrega de correo ni un despliegue remoto.
