---
icon: lucide/clipboard-list
---

# Formularios y participación

## Solicitud de demo (`#demo`)

El único formulario de la landing. Lo manda a `POST /demo-request/` del API
(docs/landing.md del repo del API); el equipo lo atiende en el portal, en
"Sitio web → Solicitudes de demo", y recibe un aviso en la campana.

Campos: nombre, correo, organización y qué representa (comercio, alcaldía,
institución cultural, operador turístico u otro); ciudad, teléfono y qué le
gustaría ver son opcionales. Etiquetas persistentes, errores asociados con
`aria-describedby` y foco en el primer error, igual que antes.

- **Validación** en el navegador y en el API. Un `400` del API marca los campos
  que trae en `field_errors` (sin el prefijo `body.`).
- **Envío**: el botón se desactiva mientras viaja (evita duplicados). El éxito
  solo se muestra con la respuesta `204`; si falla, el borrador se conserva y
  el mensaje dice qué hacer (sin conexión, límite de peticiones `429`, error
  del servidor).
- **Campo trampa** `website`: fuera de la pantalla, sin foco y sin
  autocompletar. Una persona lo deja vacío; si llega lleno, el API responde
  igual y no guarda nada.
- **Sin cookies** (`credentials: 'omit'`) ni datos en `localStorage`.

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
plataforma con versión publicada (Android, Windows, macOS). Cada botón es un
enlace a `/app-release/latest/{plataforma}/download/`, que redirige a una URL
firmada recién hecha: el enlace no vence. Sin versiones (o si el API no
responde) la sección dice que la descarga todavía no está disponible.
