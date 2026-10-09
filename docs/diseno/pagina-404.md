---
icon: lucide/gamepad-2
---

# Página 404: Snake de recorridos

La ruta comodín muestra «Página no encontrada», el mensaje y sus acciones
antes del juego en el orden de lectura. Ningún texto visible lleva el código
de estado: la página habla del camino, no del error (ver
[Estados de error y avisos](estados.md)). «Volver al inicio» es la acción
principal; «Volver atrás» aparece solo si hay a dónde volver (la entrada del
router no es la inicial o el historial de la pestaña tiene más de una
entrada), así que una pestaña abierta directo en esa dirección no la muestra.
Si el router entrega un 404 a la pantalla de error de la ruta raíz, se ve
este mismo contenido dentro del marco mínimo de esa pantalla.

En escritorio se presentan en dos columnas; bajo
700 px se apilan. El tablero SVG de 18 × 18 usa superficie crema, ruta
terracota de segmentos redondeados y marcadores verdes/amarillos del mismo
valor. El isotipo original acompaña el título sin modificaciones.

La partida comienza con «Jugar» y avanza una casilla cada 160 ms. Flechas y
W/A/S/D actúan solo con el tablero enfocado; un deslizamiento táctil
intencional produce un giro y no hay controles de dirección visibles. Se
ignoran giros inversos y cambios adicionales antes del siguiente avance.
Cada marcador suma una parada y un segmento; bordes o cuerpo terminan la
partida. Si se llena el tablero, se muestra «Ruta completa».

Salir del tablero, pulsar Esc, cambiar de ventana o esconder la pestaña
pausa la partida. Reanudar es manual. Se bloquea el desplazamiento táctil
únicamente sobre el tablero durante el juego. Inicio, pausa, puntuación y
final se anuncian sin leer cada avance. El movimiento es parte de la
mecánica; no hay transiciones de posición ni efectos decorativos, y las
transiciones de los botones se eliminan con movimiento reducido. No hay
sonido, almacenamiento de partidas ni solicitudes de red del juego.

Lógica pura en `src/components/snake/snake-engine.ts`, presentación SVG y
controles en componentes vecinos; estilos acotados en
`src/styles/not-found.css`. Los comandos para probar las reglas y el
comportamiento en navegador están en
[Verificación reproducible](../guia/verificacion.md#pagina-404-snake).
