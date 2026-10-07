# Páginas futuras y footer

## Lo preparado

`src/content/site-pages.ts` es el inventario tipado de las once páginas. Las tres agrupaciones Empresa, Legal y Soporte son visibles desde ahora. Todas comienzan en `planned`: sus nombres se muestran como texto sin interacción, acompañados de una nota de disponibilidad futura. No se registran rutas ni se muestran enlaces a contenido inexistente. Footer conserva su navegación útil actual en una fila secundaria, privacidad de la vista previa y créditos.

`SiteLayout` reúne cabecera, contenido principal, enlace de salto y footer. La landing ya usa este marco. `ContentPage` prepara la presentación de una página independiente: volver al inicio, título, introducción, fecha opcional y cuerpo legible. No se monta una página vacía. Los enlaces de la cabecera y del footer vuelven a `/#ancla` desde cualquier ruta.

El footer dispone de layout para marca + tres columnas, tres columnas bajo 960 px y dos bajo 700 px. Todos los grupos y títulos son visibles; al publicar una página, su texto se convierte en enlace. Los créditos y el aviso vigente se mantienen durante la transición.

## Arquitectura editorial

| Grupo | Página y ruta | Contenido al construirla |
| --- | --- | --- |
| Empresa | Sobre nosotros · `/empresa/sobre-nosotros` | Origen, propuesta, destinatarios y estado real del proyecto. Equipo solo con datos confirmados. |
| Empresa | Misión · `/empresa/mision` | Propósito cultural y compromisos concretos con comunidades y talento local. |
| Empresa | Blog · `/blog` | Índice y plantilla de artículo `/blog/:slug`; autor, fecha, imagen acreditada y texto real. |
| Empresa | Contacto · `/contacto` | Canales verificados y orientación por consulta. Formulario únicamente con recepción real. |
| Legal | Términos · `/legal/terminos` | Condiciones correspondientes al servicio disponible, responsable y fecha de vigencia. |
| Legal | Privacidad · `/legal/privacidad` | Tratamientos reales, finalidades, conservación y canal de derechos. |
| Legal | Cookies · `/legal/cookies` | Inventario real de tecnologías y preferencias, si aplican. |
| Legal | Legal · `/legal/aviso-legal` | Responsable del sitio, propiedad intelectual, atribuciones y contacto. |
| Soporte | Centro de ayuda · `/ayuda` | Entrada por viajeros, negocios y talento local, con guías publicadas. |
| Soporte | FAQ · `/ayuda/faq` | Reutilizar las respuestas del contenido de la landing; ampliar sin duplicarlas. |
| Soporte | Reportar · `/ayuda/reportar` | Categoría, descripción y medio de seguimiento; recepción real y errores recuperables. |

## Activar una página

1. Crear su contenido con la plantilla y revisión editorial apropiadas; completar datos del responsable antes de publicar textos legales. Contacto y Reportar esperan un destino real; no usar correos provisionales ni confirmaciones simuladas.
2. Incorporar React Router en modo declarativo al construir la primera página. La ruta `/` conserva la landing. Registrar únicamente páginas terminadas y una página 404. Evitar duplicar `SiteLayout` al montar las páginas.
3. Añadir título y descripción propios, mover el foco al contenido en navegación y restaurar scroll con historial. Conservar los hashes de la landing. El alojamiento Vercel ya tiene fallback hacia `index.html`; comprobar URL directa y recarga en la vista previa del despliegue.
4. Cambiar `status` a `published` en el mismo cambio que registra la ruta y su contenido. Un indicador por sí solo no construye la página.
5. Verificar footer, teclado, navegación atrás/adelante, URL directa, recarga y 404. Reemplazar los enlaces de navegación por `Link` cuando se integre el router. Publicar con el flujo normal del sitio.

No se añade una dependencia de routing para rutas que todavía no existen. No hay endpoints, formularios de contacto/reporte ni CMS nuevos en esta entrega.
