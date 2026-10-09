---
icon: lucide/palette
---

# Sistema de la landing v2

Dirección aprobada: descubrimiento cultural claro, fotográfico y conectado a
la app. La composición parte de las cinco referencias de hero y de las
pantallas SVG del proyecto. El hero toma la jerarquía centrada y el aire de
Winzy; la relación entre escena y producto toma como referencia Veluno.
Colores, botones y proporciones se adaptan de la app.

## Composición adoptada

1. Header de 72 px, 68 px en móvil; tres enlaces, acceso al piloto y menú
   bajo 960 px.
2. Hero centrado con Inknut Antiqua, la tipografía de títulos de la marca
   solicitada por el usuario, dos acciones, fotografía de Granada y Home
   real de K'plan. En escritorio, la pantalla se superpone por la derecha.
   En móvil queda debajo de la foto, con 20 px de separación para conservar
   destino y pie legibles.
3. Demo manual: descubrir → elegir circuito → organizar. El mismo estado
   selecciona botón, descripción y pantalla. No hace reservas.
4. Granada como experiencia principal; paisaje del Volcán Masaya y
   patrimonio de León como historias complementarias. Detalle mediante
   `dialog` nativo. La cerámica de San Juan de Oriente permanece en aliados
   con su propio recurso.
5. Aliados: negocio, talento local, organizaciones. Beneficios siempre
   visibles, sin revelar información con hover.
6. FAQ con `details` nativo y respuesta visible al abrir.
7. Cierre crema, ilustración del material de marca y participación por
   perfil. Footer con privacidad y créditos fotográficos.

Actualización de octubre de 2026: entre descubrimientos y aliados se
incorpora el [mapa de diez ciudades](../activos/mapa.md) (`#territorio`).
Conserva las 17 divisiones del SVG; ocho son interactivas. Mapa en verde
#55765F, regiones neutras #DCCCAF y región activa terracota. El verde
contrasta 3,21:1 con las regiones neutras y 4,60:1 con el fondo. Índice de
ciudades siempre visible, ficha editorial estable y selección inicial
Granada.

El marco de cabecera/contenido/footer se comparte mediante `SiteLayout`.
`ContentPage` prepara la presentación de futuras páginas. El registro de
once páginas permanece en `planned`, sin enlaces publicados; la
arquitectura y los criterios de activación están en
[Páginas del footer](../arquitectura/paginas.md).

Errores, avisos y estados vacíos siguen una regla: nada de códigos de estado
ni textos técnicos, y siempre una acción para seguir. Pantalla de error,
snackbars, diálogos, aviso sin JavaScript y respaldo de imágenes en
[Estados de error y avisos](estados.md).

Se retiraron los marquees y los componentes obsoletos de proceso, bento e
impacto. No se publican métricas inventadas ni instituciones como alianzas
confirmadas.
