# K’plan — sistema de la landing v2

Dirección aprobada: descubrimiento cultural claro, fotográfico y conectado a la app. La composición parte de las cinco referencias de hero y de las pantallas SVG del proyecto. El hero toma la jerarquía centrada y el aire de Winzy; la relación entre escena y producto toma como referencia Veluno. Colores, botones y proporciones se adaptan de la app.

## Composición adoptada

1. Header de 72 px, 68 px en móvil; tres enlaces, acceso al piloto y menú bajo 960 px.
2. Hero centrado con Inknut Antiqua, la tipografía de títulos de la marca solicitada por el usuario, dos acciones, fotografía de Granada y Home real de K’plan. En escritorio, la pantalla se superpone por la derecha. En móvil queda debajo de la foto, con 20 px de separación para conservar destino y pie legibles.
3. Demo manual: descubrir → elegir circuito → organizar. El mismo estado selecciona botón, descripción y pantalla. No hace reservas.
4. Granada como experiencia principal; paisaje del Volcán Masaya y patrimonio de León como historias complementarias. Detalle mediante `dialog` nativo. La cerámica de San Juan de Oriente permanece en aliados con su propio recurso.
5. Aliados: negocio, talento local, organizaciones. Beneficios siempre visibles, sin revelar información con hover.
6. FAQ con `details` nativo y respuesta visible al abrir.
7. Cierre crema, ilustración del material de marca y participación por perfil. Footer con privacidad y créditos fotográficos.

Actualización de octubre de 2026: entre descubrimientos y aliados se incorpora el mapa de diez ciudades (`#territorio`). Conserva las 17 divisiones del SVG; ocho son interactivas. Mapa en verde #55765F, regiones neutras #DCCCAF y región activa terracota. El verde contrasta 3,21:1 con las regiones neutras y 4,60:1 con el fondo. Índice de ciudades siempre visible, ficha editorial estable y selección inicial Granada. Geografía, fuentes y comportamiento en `TERRITORY.md`.

El marco de cabecera/contenido/footer se comparte mediante `SiteLayout`. `ContentPage` prepara la presentación de futuras páginas. El registro de once páginas permanece en `planned`, sin enlaces publicados; la arquitectura y los criterios de activación están en `FUTURE-PAGES.md`.

Se retiraron los marquees y los componentes obsoletos de proceso, bento e impacto. No se publican métricas inventadas ni instituciones como alianzas confirmadas.

## Tokens

La fuente única está en `src/styles/landing.css`; Tailwind referencia esas variables. `src/styles/index.css` contiene las directivas Tailwind, sin una paleta anterior paralela.

| Token | Valor | Uso |
| --- | --- | --- |
| surface-page | #F9FBFC | Fondo principal |
| surface-card | #FFFFFF | Demo y formularios |
| surface-cultural | #F8F4E6 | Cierre |
| surface-soft | #EDF2EF | Soporte de demo y aliados |
| text-primary | #1A1A1A | Lectura y títulos |
| text-secondary | #666666 | Apoyo |
| brand-terracotta | #D95D39 | Identidad móvil |
| action-primary | #B74728 | Acciones web con blanco |
| action-hover | #983A20 | Hover de acción |
| route-green | #2D6A4F | Territorio y referencias locales |
| info-blue | #0077B6 | Disponible para información pertinente |
| reward-yellow | #E9B824 | Disponible para recompensas previstas |
| border-default | #D9DEDF | Separadores no funcionales |

No se fuerza el uso de todos los colores. Los campos tienen borde #858E8B; el foco usa una línea de 2 px y separación de 5 px. Los controles principales miden al menos 44 px y los campos, 48 px.

Poppins local: 400, 500, 600, 700 para interfaz, cuerpo y encabezados informativos. Inknut Antiqua local: 600 en el H1 del hero y el cierre cultural. No hay peticiones a Google Fonts. H1 de 32–60 px en escritorio/tablet y 28–34 px en móvil; interlineado 1,4/1,45 y tracking −0,02 em, ajustados a la serif. H2 de 30–44 px; lectura principal de 16 px; metadatos de 12–14 px. Botones de 14 px, radio 8 px, altura 52 px; fotos de radio 12–16 px. El marco de dispositivo conserva su propia curvatura.

Contenedor máximo de 1248 px. Márgenes de 48 px en escritorio, 32 px bajo 960, 24 px bajo 700 y 20 px bajo 360. Separación de sección de 64–104 px en escritorio y 56 px en móvil. No se impone 100vh ni se oculta el desbordamiento horizontal. `scrollbar-gutter: stable` mantiene el ancho al abrir detalles; anclas con compensación de 100 px para el header.

## Formularios: contrato actual y conexión futura

El usuario pidió implementar ambos y dejar el envío para más adelante. Los CTA aterrizan en `#piloto`; los enlaces de negocio y talento preseleccionan su perfil. El perfil viajero ofrece la demo y explica el estado del piloto.

Negocios: nombre, correo, negocio, ciudad/municipio, categoría; mensaje opcional. Traductores y guías: nombre, correo, zona de trabajo, servicio e idiomas; experiencia opcional. Etiquetas persistentes, errores asociados con `aria-describedby`, foco en el primer error y revisión con valores escapados por React. Se puede volver a editar. Cambiar de perfil conserva el borrador de cada formulario mientras la página esté abierta.

La acción se llama **Revisar mis datos**. No hay POST, correo inventado, guardado en localStorage ni confirmación de inscripción. La revisión dice que los datos no se han enviado ni registrado. Recargar los descarta.

Al conectar un backend: definir destino y política de datos; validar también en servidor; habilitar envío pendiente, prevención de duplicados, éxito solo tras respuesta confirmada y error recuperable que conserve el borrador. El aviso de privacidad debe corresponder entonces al servicio real. Es trabajo futuro autorizado a posponer, no un defecto pendiente de esta versión.

## Movimiento

Se aplicaron `emil-design-eng`, `find-animation-opportunities`, `improve-animations`, `animate` y `review-animations` de `emilkowalski/skill`, según el archivo de bloqueo del proyecto. Auditoría y revisión en `../plans/001-movimiento-landing-v2.md`.

| Acción | Implementación |
| --- | --- |
| Demo | Opacidad + desplazamiento vertical de 8 px; entrada 200 ms, salida 150 ms |
| Pulsación | Escala 0,97 durante 120 ms; retorno 100 ms |
| Menú móvil | Opacidad + escala 0,97→1, origen arriba/derecha; apertura 200 ms, cierre 150 ms |
| Pantalla del hero | Una entrada de 300 ms, 8 px y opacidad; texto y CTA nunca esperan |
| FAQ | Giro del chevron 180° en 160 ms; contenido inmediato |

Curva `cubic-bezier(.23, 1, .32, 1)`. Hover solo con puntero fino. Las interacciones por teclado anulan duraciones y demoras; las pantallas inactivas no son enfocables. Reduced motion elimina transformaciones y la entrada del hero; conserva un fundido de 150 ms para demo/menú. El diálogo y los formularios permanecen sin animación. CSS basta: no se añadió Motion, Sonner ni una dependencia de gestos.

## Recursos y mantenimiento

`public/media/` contiene WebP responsive, dimensiones reservadas y capturas a 375/750 px. La foto principal carga inmediatamente con prioridad alta; destinos inferiores usan lazy loading y las pantallas posteriores de demo se montan bajo demanda. Los SVG originales permanecen intactos.

El inventario completo está en `ASSETS.md`; la validación y sus límites en `output/verification/VERIFICACION.md`. Los scripts de auditoría son herramientas locales y no se incluyen en `dist`.
