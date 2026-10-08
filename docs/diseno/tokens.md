---
icon: lucide/swatch-book
---

# Tokens

La fuente única está en `src/styles/landing.css`; Tailwind referencia esas
variables. `src/styles/index.css` contiene las directivas Tailwind, sin una
paleta anterior paralela.

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

No se fuerza el uso de todos los colores. Los campos tienen borde #858E8B;
el foco usa una línea de 2 px y separación de 5 px. Los controles
principales miden al menos 44 px y los campos, 48 px.

Poppins local: 400, 500, 600, 700 para interfaz, cuerpo y encabezados
informativos. Inknut Antiqua local: 600 en el H1 del hero y el cierre
cultural. No hay peticiones a Google Fonts. H1 de 32–60 px en
escritorio/tablet y 28–34 px en móvil; interlineado 1,4/1,45 y tracking
−0,02 em, ajustados a la serif. H2 de 30–44 px; lectura principal de 16 px;
metadatos de 12–14 px. Botones de 14 px, radio 8 px, altura 52 px; fotos de
radio 12–16 px. El marco de dispositivo conserva su propia curvatura.

Contenedor máximo de 1248 px. Márgenes de 48 px en escritorio, 32 px bajo
960, 24 px bajo 700 y 20 px bajo 360. Separación de sección de 64–104 px en
escritorio y 56 px en móvil. No se impone 100vh ni se oculta el
desbordamiento horizontal. `scrollbar-gutter: stable` mantiene el ancho al
abrir detalles; anclas con compensación de 100 px para el header.
