import { Store, Languages, Landmark, ArrowUpRight, Route, Bookmark, BadgeCheck } from 'lucide-react';
import type { ParticipantProfile } from '@/types/landing';
import { Photo } from '@/components/ui/Photo';

export function EcosystemSection({ onChoose }: { onChoose: (profile: ParticipantProfile) => void }) {
  return <section id="aliados" className="section audience-section" aria-labelledby="audience-title"><div className="container">
    <div className="audience-intro"><div className="audience-image"><Photo name="masaya" alt="Taller de cerámica en San Juan de Oriente, departamento de Masaya." sizes="(max-width: 700px) 100vw, 35vw" /><span>El saber local hace el recorrido.</span></div>
      <div className="audience-heading"><p className="section-label">El corazón de K’plan</p><h2 id="audience-title">Los mejores planes empiezan con la gente del lugar.</h2>
        <p>Queremos que descubrir Nicaragua también abra oportunidades para quienes la hacen única.</p>
        <div className="local-values"><span><Route size={18} aria-hidden="true" />Más conexiones locales</span><span><Bookmark size={18} aria-hidden="true" />Lugares que querés guardar</span><span><BadgeCheck size={18} aria-hidden="true" />Talento con identidad propia</span></div>
      </div>
    </div>
    <div className="audience-paths">
      <article><Store className="audience-icon" aria-hidden="true" /><h3>Tu negocio, en el recorrido.</h3><p>Gastronomía, artesanía y experiencias que merecen ser descubiertas. Registrá tu emprendimiento en el portal.</p><a href="#piloto" className="text-link" onClick={() => onChoose('negocio')}>Sumar mi negocio<ArrowUpRight size={18} aria-hidden="true" /></a></article>
      <article><Languages className="audience-icon" aria-hidden="true" /><h3>Tu talento, más cerca.</h3><p>Guías, traductores e intérpretes: ayudá a otras personas a conocer el territorio y conectar con su cultura.</p><a href="#piloto" className="text-link" onClick={() => onChoose('traductor')}>Participar como talento local<ArrowUpRight size={18} aria-hidden="true" /></a></article>
      <article><Landmark className="audience-icon" aria-hidden="true" /><h3>Una ciudad que se conecta.</h3><p>La propuesta integra circuitos y agenda cultural con la oferta local. Pedí una demostración para conocer cómo publicar los de tu ciudad.</p><a href="#demo" className="text-link">Solicitar una demo<ArrowUpRight size={18} aria-hidden="true" /></a></article>
    </div>
    <p className="audience-footnote">La propuesta también contempla insignias y beneficios locales para acompañar nuevos descubrimientos.</p>
  </div></section>;
}
