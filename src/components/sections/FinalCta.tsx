import { MapPin, Store, Languages, ArrowUpRight, CalendarCheck, Download } from 'lucide-react';
import { PORTAL_URL } from '@/lib/api';
import type { ParticipantProfile } from '@/types/landing';

const profiles: { id: ParticipantProfile; label: string; icon: typeof Store }[] = [
  { id: 'viajero', label: 'Quiero explorar', icon: MapPin },
  { id: 'negocio', label: 'Tengo un negocio', icon: Store },
  { id: 'traductor', label: 'Soy traductor o guía', icon: Languages },
];
export function FinalCta({ profile, onChoose }: { profile: ParticipantProfile; onChoose: (profile: ParticipantProfile) => void }) {
  return <section id="piloto" className="section pilot-section" aria-labelledby="pilot-title"><div className="container">
    <div className="pilot-heading"><div><p className="section-label">Se viene un nuevo recorrido</p><h2 id="pilot-title">El próximo plan<br />lo construimos juntos.</h2></div>
      <p>Estamos preparando el piloto de K’plan. Descubrí cómo podrías ser parte, desde tu curiosidad, tu negocio o tu talento.</p></div>
    <div className="pilot-layout"><aside className="pilot-aside">
      <p className="pilot-prompt">¿Cómo querés participar?</p><div className="profile-selector" role="group" aria-label="Forma de participación">{profiles.map(p => <button key={p.id} type="button" aria-pressed={profile === p.id} aria-controls={'profile-' + p.id} onClick={() => onChoose(p.id)}><p.icon size={21} aria-hidden="true" /><span>{p.label}</span><ArrowUpRight size={18} aria-hidden="true" /></button>)}</div>
      <img className="cultural-art" src="/media/cultural-art.webp" width={900} height={576} loading="lazy" alt="Ilustración de K’plan que conecta cerámica, arquitectura y territorio." />
      <p className="cultural-line">Hay mucho por descubrir.<br />Y mucho por compartir.</p>
    </aside><div className="pilot-form-surface">
      <div id="profile-viajero" hidden={profile !== 'viajero'}><div className="traveler-panel"><MapPin size={32} aria-hidden="true" /><h3>Tu curiosidad ya tiene un punto de partida.</h3><p>Descargá la app para armar tu recorrido con circuitos, lugares y eventos de las ciudades creativas.</p><p>Si todavía no hay una versión para tu teléfono, explorá la vista previa de la app en esta página.</p><a href="#descargar" className="button button--primary">Descargar la app<Download size={18} aria-hidden="true" /></a></div></div>
      <div id="profile-negocio" hidden={profile !== 'negocio'}><div className="traveler-panel"><Store size={32} aria-hidden="true" /><h3>Tu negocio puede ser parte del plan.</h3><p>Registrá tu negocio en el portal de K’plan: completás los datos de tu emprendimiento, subís sus documentos y el equipo revisa la solicitud. Desde el portal administrás tu lugar, tus cupones y tu insignia.</p><p>¿Preferís conocerlo antes? Pedí una demostración y te lo mostramos.</p>
        <div className="panel-actions"><a href={PORTAL_URL + '/postular'} className="button button--primary">Registrar mi negocio<ArrowUpRight size={18} aria-hidden="true" /></a><a href="#demo" className="text-link">Solicitar una demo<CalendarCheck size={18} aria-hidden="true" /></a></div></div></div>
      <div id="profile-traductor" hidden={profile !== 'traductor'}><div className="traveler-panel"><Languages size={32} aria-hidden="true" /><h3>Tu talento conecta a las personas.</h3><p>Guías, traductores e intérpretes se postulan desde la app: descargala, elegí <strong>Postularme</strong> y seguí los pasos. Tené a mano tu cédula, tu récord de policía y tu licencia del INTUR o tu certificado de idiomas.</p><p>El equipo de K’plan revisa tus documentos antes de habilitar tu acceso.</p><a href="#descargar" className="button button--primary">Descargar la app<Download size={18} aria-hidden="true" /></a></div></div>
    </div></div>
  </div></section>;
}
