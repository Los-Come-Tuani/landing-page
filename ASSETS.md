# Inventario de recursos publicados

Los SVG originales de `../wireframesApp/` se conservan. Las fotografías externas se verificaron en sus páginas originales de Wikimedia Commons. El footer muestra autor, fuente, licencia y transformaciones. Las adaptaciones fotográficas se distribuyen bajo la misma licencia indicada; esto no cambia la licencia del código de la web.

| Archivo en public/media | Origen / permiso | Dimensiones | Peso |
| --- | --- | --- | --- |
| app-home-375/750.webp | HomeScreen1.svg, material aportado del proyecto | 375×812 / 750×1624 | 47 / 128 KiB |
| app-circuit-375/750.webp | AgendyRoute.svg, material aportado del proyecto | 375×812 / 750×1624 | 39 / 99 KiB |
| app-planning-375/750.webp | AgendyRouteCampsTime.svg, material aportado del proyecto | 375×812 / 750×1624 | 18 / 42 KiB |
| cultural-art.webp | Recorte de ilustración de LoginResized.svg, material del proyecto | 900×576 | 52 KiB |
| granada-640/1280/1920.webp | JacobKlinger, CC BY-SA 3.0 | 640×427 / 1280×853 / 1920×1280 | 14 / 37 / 60 KiB |
| masaya-480/960.webp | Chicho96, CC BY-SA 4.0 | 480×360 / 960×720 | 33 / 132 KiB |
| ceramica-480/960.webp | Martin Kulldorff, CC BY-SA 4.0 | 480×320 / 960×640 | 41 / 163 KiB |
| leon-480/960.webp | Martin Kulldorff, CC BY-SA 4.0 | 480×321 / 960×641 | 11 / 29 KiB |

Fotografía de Granada: [Catedral de Granada from Bell Tower](https://commons.wikimedia.org/wiki/File:Catedral_de_Granada_from_Bell_Tower.JPG), [licencia](https://creativecommons.org/licenses/by-sa/3.0/). Original 3306×2204. Hero y experiencia principal; alt describe cúpula y lago. El encuadre desktop conserva el remate de la cúpula con posición vertical 0%; móvil se centra en el edificio. Capa oscura solo bajo el pie de foto.

Fotografía de Masaya: [Cráter Santiago del Volcán Masaya](https://commons.wikimedia.org/wiki/File:Cr%C3%A1ter_Santiago_del_Volc%C3%A1n_Masaya.jpg), Chicho96, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Original 4608×3456, tomado el 23 de enero de 2021, verificado el 5 de octubre de 2026. Muestra el cráter desde la Plaza de Oviedo y la Cruz de Bobadilla al fondo. Se usa en la experiencia de Masaya y su diálogo; encuadre central con object-fit: cover. El texto se refiere al departamento, no confunde el volcán con el centro de la ciudad. Las URLs llevan `?v=santiago-2026` para renovar el asset antes almacenado con caché inmutable.

Fotografía de cerámica: [Taller de Ceramica](https://commons.wikimedia.org/wiki/File:Taller_de_Ceramica.jpg), [licencia](https://creativecommons.org/licenses/by-sa/4.0/). Original 3484×2323, copia de entrada de 1280×853. Ubicación: San Juan de Oriente, departamento de Masaya. Conservada como `ceramica` para aliados; el alt describe el taller y las piezas, sin inventar personas trabajando.

Fotografía de León: [Leon Catedral Techo 4](https://commons.wikimedia.org/wiki/File:Leon_Catedral_Techo_4.jpg), [licencia](https://creativecommons.org/licenses/by-sa/4.0/). Original 1024×684. Alt: cúpulas y balaustrada blanca del techo de la catedral. El recorte se adapta al contenedor.

Todas las fotos se redimensionaron y convirtieron a WebP. El recorte de presentación es CSS. No son imágenes generadas ni prueba de disponibilidad comercial. Los detalles de experiencias se presentan como inspiración editorial.

Logotipo e isotipo: archivos originales del proyecto en `src/assets`, conservados. Iconos: Lucide React. Tipografías: paquetes locales Fontsource Poppins e Inknut Antiqua; sus archivos de licencia se incluyen en las dependencias. Ninguna foto de inspiración de hero se publica como asset de K’plan.

Los textos de capturas están convertidos a trazados en los SVG originales. Las capturas se ofrecen como imágenes con alt y explicación HTML equivalente alrededor. Precios, fechas y valoraciones son datos ilustrativos; las pantallas no son controles de reserva.

## Reproducir exportaciones

`node scripts/prepare-media.cjs "DIRECTORIO_QUE_CONTIENE_SHARP"`

El script usa las pantallas originales y `output/sources/granada.jpg`, `leon.jpg`, `volcan-masaya.jpg`, `ceramica.jpg`. La carpeta de fuentes también conserva candidatos descartados (`masaya.jpg` de hamacas y `granada-city.jpg`); estos no se distribuyen en `public/media` ni en `dist`. No reemplazar assets publicados sin revisar alt, fuente y licencia.

Mapa: `src/assets/mapa-nicaragua.svg`, recurso aportado por el usuario. Se conservan los 17 trazos visibles en `src/content/nicaragua-regions.json`, generados por `scripts/prepare-map.mjs`. Identificación y fuentes editoriales en `TERRITORY.md`. La versión interactiva cambia colores y añade capas de profundidad; conserva los límites originales.
