# Mapa de ciudades creativas

El original `src/assets/mapa-nicaragua.svg` permanece intacto. Contiene 17 paths visibles y 13 duplicados usados como máscaras. `node scripts/prepare-map.mjs` extrae únicamente los visibles a `src/content/nicaragua-regions.json`, sin redibujar ni simplificar los límites.

## Identificación geográfica

Se cotejaron posiciones, límites, lagos y vecindades con el [atlas departamental de INIDE](https://www.inide.gob.ni/docu/censos2005/AtlasCPV05/Cap3RelMas.pdf). Las denominaciones antiguas RAAN/RAAS de ese atlas se presentan como Costa Caribe Norte/Sur. Es un mapa ilustrativo del SVG aportado, no un servicio cartográfico ni una delimitación legal.

| Trazo visible original | División | Ciudades de la sección |
| --- | --- | --- |
| 1 | Costa Caribe Norte | — |
| 2 | Costa Caribe Sur | Bluefields |
| 3 | Boaco | — |
| 4 | Carazo | — |
| 5 | Chinandega | — |
| 6 | Chontales | Juigalpa |
| 7 | Estelí | Estelí |
| 8 | Granada | Granada |
| 9 | Jinotega | — |
| 10 | León | León, Nagarote |
| 11 | Madriz | — |
| 12 | Managua | Managua |
| 13 | Masaya | Masaya, San Juan de Oriente |
| 14 | Matagalpa | Matagalpa |
| 15 | Nueva Segovia | — |
| 16 | Rivas | — |
| 17 | Río San Juan | — |

La numeración corresponde al orden de paths visibles, no a códigos oficiales. `scripts/inspect-map.cjs` genera una vista numerada de diagnóstico en `output/playwright`. No reutilizar el orden sin cotejarlo si el SVG cambia.

## Contenido e interacción

`creative-territory.ts` relaciona las diez ciudades con sus ocho regiones y contiene el origen de cada resumen editorial. La lista se cotejó con [Nicaragua Creativa](https://www.nicaraguacreativa.com/ciudades-creativas/) el 5 de octubre de 2026. Las fichas se basan en sus páginas por ciudad; Nagarote usa el Mapa Nacional de Turismo. No se trasladan horarios, precios, reservas ni alianzas a la propuesta de K’plan.

Granada es la selección inicial. Hover o foco previsualizan una ciudad; clic, Enter o Espacio fijan la selección. Un departamento con dos ciudades conserva la elegida si pertenece a él; en otro caso muestra la primera del índice. Ambas siempre pueden elegirse en el índice. Salir de la zona de exploración o quitar el foco devuelve la vista a la última selección. Solo las selecciones se anuncian por `role=status` para no saturar al lector de pantalla durante hover.

El SVG tiene superficies de interacción inmóviles y capas visuales separadas. El relieve no modifica el área que recibe el puntero. Las fichas comparten una celda de grid; la más alta reserva el espacio y evita saltos entre ciudades. El índice y todos sus controles son visibles en móvil; su objetivo táctil mínimo es 48 px.

## Movimiento

Propósito: indicar una región activa y confirmar la exploración. CSS transitions sobre transform y opacity, 200 ms, token `--ease-out` existente. Relieve de −4 px, escala 1.025 y base desplazada +3 px. Sin keyframes, parallax ni autoavance. Hover/relieve solo con puntero fino; teclado instantáneo y sin elevación. Reduced motion mantiene únicamente la opacidad a 150 ms. No se añadió Motion.
