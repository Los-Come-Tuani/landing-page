---
icon: lucide/clipboard-list
---

# Formularios y participación

## Solicitud de demo (`#demo`)

El único formulario de la landing, y la única forma de recibir el link de la
app. Lo manda a `POST /demo-request/` del API (docs/landing.md del repo del
API), que responde `200` con `{delivered, links}`: un link (de Drive) por cada
plataforma con versión publicada. El equipo ve cada solicitud en el portal, en
"Sitio web → Solicitudes de demo", y recibe un aviso en la campana.

- **Con versión publicada**: el éxito muestra un botón por plataforma
  ("Descargar para Android") que abre el link en una pestaña nueva, con la
  versión y cómo instalarla. La solicitud queda "Entregada".
- **Sin versión publicada**: dice que le vamos a avisar al correo (y al
  teléfono, si lo dejó) cuando esté lista. No se manda ningún correo
  automático: la solicitud queda "Pendiente" y el equipo le hace llegar el
  link y la marca como entregada en el portal.
- Solo se ponen en un `href` los links que empiezan con `https://`, con
  `target="_blank"` y `rel="noopener noreferrer"`.

Campos: nombre, correo, organización y qué representa (comercio, alcaldía,
institución cultural, operador turístico u otro); ciudad, teléfono y qué le
gustaría ver son opcionales. Etiquetas persistentes, errores asociados con
`aria-describedby` y foco en el primer error.

- **Validación** en el navegador y en el API. Un `400` del API marca los campos
  que trae en `field_errors` (sin el prefijo `body.`).
- **Envío**: el botón se desactiva mientras viaja (evita duplicados) y dice
  «Enviando…». La espera máxima es de 20 s. El borrador se conserva en memoria
  si algo falla.
- **Errores de campo** (del navegador o del API): quedan debajo de cada campo,
  el foco va al primero y un snackbar breve dice «Revisá los campos marcados.».
- **Errores generales** (sin conexión, tiempo agotado, límite de peticiones,
  error del servidor o un `detail` que no es de un campo): snackbar de error
  con «Reintentar», que vuelve a enviar el borrador tal como esté. El `429` no
  lleva «Reintentar»: el mensaje pide esperar un minuto. El foco vuelve al
  botón de envío, que es el mismo camino para quien no llega al snackbar con
  el teclado; el mensaje se anuncia en la región viva `assertive`. Ya no hay
  aviso fijo dentro del formulario.
- **Éxito**: solo con la respuesta `200`. Se abre un diálogo «¡Solicitud
  enviada!» con los botones de descarga, o con el aviso de que le vamos a
  avisar, y «Listo». Con links, «Listo» es secundario porque la descarga es la
  acción principal; sin links, es el botón principal. Detrás queda el panel
  `.demo-sent` como estado persistente, con los mismos links o el aviso y
  «Enviar otra solicitud»; al cerrar el diálogo el foco pasa a ese panel.
- **Campo trampa** `website`: fuera de la pantalla, sin foco y sin
  autocompletar. Una persona lo deja vacío; si llega lleno, el API responde
  igual y no guarda nada.
- **Sin cookies** (`credentials: 'omit'`) ni datos en `localStorage`.

### Mensajes

`src/lib/api.ts` traduce cada falla a un texto de la landing. Ningún mensaje
lleva un código de estado ni el texto técnico del API.

| Situación | Mensaje |
| --- | --- |
| Sin conexión | No pudimos conectarnos. Revisá tu conexión e intentá de nuevo. |
| 20 s sin respuesta | La conexión está tardando demasiado. Intentá de nuevo. |
| `429` | Recibimos muchas solicitudes desde tu conexión. Esperá un minuto e intentá de nuevo. |
| `5xx` (se ignora el `detail`) | Algo salió mal de nuestro lado. Intentá de nuevo en unos minutos. |
| `400` sin `detail`, o «La solicitud contiene datos inválidos.» | Revisá los datos marcados e intentá de nuevo. |
| `413`, o «La solicitud excede los límites permitidos.» | Tu mensaje es demasiado largo. Acortalo e intentá de nuevo. |
| Los demás `default_detail` genéricos del API (no encontrado, permisos, conflicto, credenciales, `Accept`, solicitud que no se pudo interpretar) u otro estado sin `detail` | No pudimos completar tu solicitud. Intentá de nuevo en unos minutos. |
| Cualquier otro `detail` de un `4xx` | Se muestra tal cual. |

Los `default_detail` se comparan exactos (sin espacios al borde) con los de
`api_exceptions` del repo del API; si el API cambia uno, hay que actualizar la
tabla de `api.ts`. El tiempo máximo se combina con la señal de quien llama: si
la sección de descarga se desmonta, su consulta se cancela como siempre, sin
mensaje.

## Negocios, guías y viajeros (`#piloto`)

Ya no son formularios: cada perfil lleva al flujo real que existe.

- **Negocio**: "Registrar mi negocio" abre `/postular` del portal
  (`VITE_PORTAL_URL`), donde se crea la cuenta y se manda la solicitud con sus
  documentos. Ofrece también pedir una demo.
- **Guía o traductor**: se postula desde la app ("Postularme"); el panel lleva
  a la sección de descarga y dice qué documentos tener a mano.
- **Viajero**: lleva a la descarga.

## Descarga (`#descargar`)

Lee `GET /app-release/latest/` al cargar la página y muestra una tarjeta por
plataforma con versión publicada (Android, Windows, macOS): versión, fecha y
novedades, sin link. Un solo botón, "Pedir el link de descarga", lleva al
formulario de demo. Sin versiones, la sección invita a dejar los datos en el
formulario para avisarle cuando esté lista. Si el API no responde, lo dice y
ofrece «Reintentar» junto a «Pedir la app»: la primera falla no interrumpe con
un snackbar, pero si el reintento también falla, un snackbar de error lo
avisa. La nota de iOS lleva a la vista previa de la app.
