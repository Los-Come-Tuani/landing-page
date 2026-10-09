import { CalendarCheck, Landmark, Store, Route } from 'lucide-react';
import { DemoRequestForm } from '@/components/forms/DemoRequestForm';

const audiences = [
  { icon: Store, text: 'Comercios y emprendimientos que quieren aparecer en los recorridos.' },
  { icon: Landmark, text: 'Alcaldías e instituciones culturales con circuitos y agenda que compartir.' },
  { icon: Route, text: 'Operadores turísticos que buscan circuitos y guías locales.' },
];

export function DemoRequestSection() {
  return <section id="demo" className="section demo-request-section" aria-labelledby="demo-request-title"><div className="container demo-request-layout">
    <div className="demo-request-copy">
      <p className="section-label"><CalendarCheck size={18} aria-hidden="true" />Solicitá una demo</p>
      <h2 id="demo-request-title">Te mostramos K’plan por dentro.</h2>
      <p className="section-intro">Una demostración guiada de la app y del portal: cómo se publican lugares, circuitos, eventos y cupones, y cómo llegan los visitantes.</p>
      <ul className="demo-request-audiences">{audiences.map(a => <li key={a.text}><a.icon size={20} aria-hidden="true" /><span>{a.text}</span></li>)}</ul>
    </div>
    <div className="pilot-form-surface"><DemoRequestForm /></div>
  </div></section>;
}
