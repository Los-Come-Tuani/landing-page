import { ContentPage } from '@/components/layout/ContentPage';

export function NotFoundPage() {
  return <ContentPage title="Página no encontrada" intro="No encontramos esta dirección. Podés volver al inicio para seguir descubriendo K’plan.">
    <p>Si llegaste desde un enlace guardado, es posible que la página todavía no esté disponible.</p>
  </ContentPage>;
}
