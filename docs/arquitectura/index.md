---
icon: lucide/folder-tree
---

# Estructura y contratos

- `src/app/App.tsx`: composición y perfil de participación.
- `src/content/landing-content.ts`: navegación, demo, experiencias, FAQ y
  créditos.
- `src/components/sections/`: secciones de la landing.
- `src/components/forms/ParticipationForm.tsx`: validación y revisión local.
- `src/components/ui/`: enlaces, pantallas, imágenes y diálogo nativo.
- `src/styles/landing.css`: tokens y diseño adaptable; Tailwind usa las
  mismas variables.
- `public/media/`: exportaciones WebP optimizadas.

## Formularios: sin envío

Los formularios **no envían ni guardan datos**. La acción permite revisar y
volver a editar; cambiar de perfil conserva cada borrador en memoria.
Recargar los descarta. Esto responde a la decisión del usuario de posponer
el destino del correo y el backend. No confundir esta revisión con una
inscripción al piloto. El contrato completo de campos y validación está en
[Formularios](../diseno/formularios.md).
