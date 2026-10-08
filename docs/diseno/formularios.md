---
icon: lucide/clipboard-list
---

# Formularios: contrato actual y conexión futura

El usuario pidió implementar ambos y dejar el envío para más adelante. Los
CTA aterrizan en `#piloto`; los enlaces de negocio y talento preseleccionan
su perfil. El perfil viajero ofrece la demo y explica el estado del piloto.

Negocios: nombre, correo, negocio, ciudad/municipio, categoría; mensaje
opcional. Traductores y guías: nombre, correo, zona de trabajo, servicio e
idiomas; experiencia opcional. Etiquetas persistentes, errores asociados
con `aria-describedby`, foco en el primer error y revisión con valores
escapados por React. Se puede volver a editar. Cambiar de perfil conserva
el borrador de cada formulario mientras la página esté abierta.

La acción se llama **Revisar mis datos**. No hay POST, correo inventado,
guardado en localStorage ni confirmación de inscripción. La revisión dice
que los datos no se han enviado ni registrado. Recargar los descarta.

Al conectar un backend: definir destino y política de datos; validar
también en servidor; habilitar envío pendiente, prevención de duplicados,
éxito solo tras respuesta confirmada y error recuperable que conserve el
borrador. El aviso de privacidad debe corresponder entonces al servicio
real. Es trabajo futuro autorizado a posponer, no un defecto pendiente de
esta versión.
