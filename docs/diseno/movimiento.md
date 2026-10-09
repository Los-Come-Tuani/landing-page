---
icon: lucide/sparkles
---

# Movimiento

Se aplicaron `emil-design-eng`, `find-animation-opportunities`,
`improve-animations`, `animate` y `review-animations` de
`emilkowalski/skill`, según el archivo de bloqueo del proyecto. Auditoría y
revisión en `../plans/001-movimiento-landing-v2.md`.

| Acción | Implementación |
| --- | --- |
| Demo | Opacidad + desplazamiento vertical de 8 px; entrada 200 ms, salida 150 ms |
| Pulsación | Escala 0,97 durante 120 ms; retorno 100 ms |
| Menú móvil | Opacidad + escala 0,97→1, origen arriba/derecha; apertura 200 ms, cierre 150 ms |
| Pantalla del hero | Una entrada de 300 ms, 8 px y opacidad; texto y CTA nunca esperan |
| FAQ | Giro del chevron 180° en 160 ms; contenido inmediato |
| Snackbar | Opacidad + desplazamiento vertical de 8 px; entrada 200 ms, salida 150 ms |

Curva `cubic-bezier(.23, 1, .32, 1)`. Hover solo con puntero fino. Las
interacciones por teclado anulan duraciones y demoras; las pantallas
inactivas no son enfocables. Reduced motion elimina transformaciones y la
entrada del hero; conserva un fundido de 150 ms para demo/menú y un fundido
para los snackbars. El diálogo y los formularios permanecen sin animación.
CSS basta: no se añadió Motion, Sonner ni una dependencia de gestos; los
[snackbars](estados.md#snackbars) son propios.

El movimiento del [mapa de ciudades creativas](../activos/mapa.md) y el de
la [página 404](pagina-404.md) se documentan por separado, junto al resto
de su comportamiento.
