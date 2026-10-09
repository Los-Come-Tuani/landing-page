import { useState } from 'react';
import { ArrowUpRight, MapPin, ArrowRight } from 'lucide-react';
import { experiences } from '@/content/landing-content';
import { Photo } from '@/components/ui/Photo';
import { SectionShell } from '@/components/ui/SectionShell';
import { Dialog } from '@/components/ui/Dialog';
import type { Experience } from '@/types/landing';

export function CreativeCities() {
  const [selected, setSelected] = useState<Experience | null>(null);
  return <SectionShell id="ciudades" title="Elegí qué querés vivir." intro="Una ciudad que te sorprende. Un oficio que cuenta una historia. Un lugar al que querés volver." className="experiences-section">
    <div className="experience-layout">{experiences.map((experience, index) => <article className={'experience' + (index === 0 ? ' experience--featured' : '')} key={experience.id}>
      <button type="button" className="experience-image" aria-label={'Conocer la experiencia de ' + experience.city} onClick={() => setSelected(experience)}>
        <Photo name={experience.image} alt={experience.alt} sizes={index === 0 ? '(max-width: 700px) 100vw, 55vw' : '(max-width: 700px) 100vw, 24vw'} />
        <span className="experience-city"><MapPin size={15} aria-hidden="true" />{experience.city}</span>
        <span className="experience-image-action"><ArrowUpRight size={20} aria-hidden="true" /></span>
      </button>
      <div className="experience-copy"><p className="experience-category">{experience.category}</p><h3>{experience.title}</h3><p>{experience.description}</p>
        <button type="button" className="text-link" onClick={() => setSelected(experience)}>Conocé {experience.city}<ArrowRight size={17} aria-hidden="true" /></button>
      </div>
    </article>)}</div>
    <p className="experience-note">Inspiración para tu próximo recorrido. Las ciudades del piloto se confirmarán antes del lanzamiento.</p>
    <Dialog title={selected ? selected.city + ' · ' + selected.category : 'Conocé la experiencia'} open={!!selected} onClose={() => setSelected(null)} closeLabel="Cerrar detalle">
      {selected && <><Photo name={selected.image} alt={selected.alt} className="dialog-photo" sizes="(max-width: 700px) 90vw, 600px" /><h3>{selected.title}</h3><ul className="experience-details">{selected.details.map(detail => <li key={detail}>{detail}</li>)}</ul>
        <a className="button button--primary" href="#piloto" onClick={() => setSelected(null)}>Conocer el piloto<ArrowUpRight size={18} aria-hidden="true" /></a></>}
    </Dialog>
  </SectionShell>;
}
