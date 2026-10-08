import { ContentPage } from '@/components/layout/ContentPage';

export function ContactPage() {
  return <ContentPage title="Contáctanos" intro="¿Tenés una pregunta sobre K’plan o querés conversar sobre el piloto? Escribinos.">
    <address className="content-contact">
      <span>Correo de contacto</span>
      <a href="mailto:kplan.nic@gmail.com">kplan.nic@gmail.com</a>
    </address>
  </ContentPage>;
}
