import logo from '@/assets/logotipo-kplan.svg';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { navItems, photoCredits } from '@/content/landing-content';
import { homeAnchor, footerPageGroups } from '@/content/site-pages';

export function Footer() {
  return <footer id="footer" className="site-footer"><div className="container">
    <div className="footer-top footer-top--pages">
      <div className="footer-brand"><a href={homeAnchor('#inicio')}><img src={logo} width={108} height={48} alt="K’plan, volver al inicio" /></a><p>La cultura se descubre.<br />Los mejores planes se viven.</p>
        <div className="footer-origin"><MapPin size={18} aria-hidden="true" /><p>Desde Nicaragua,<br /><strong>para descubrirla de cerca.</strong></p></div>
      </div>
      {footerPageGroups.map(group => <section key={group.title} className="footer-page-group" aria-labelledby={`footer-${group.title.toLowerCase()}`}>
        <h2 id={`footer-${group.title.toLowerCase()}`}>{group.title}</h2>
        <ul>{group.pages.map(page => <li key={page.path}>{page.status === 'published'
          ? <a href={page.path}>{page.title}</a>
          : <span className="footer-planned-page" aria-describedby="footer-pages-note">{page.title}</span>}
        </li>)}</ul>
      </section>)}
    </div>
    <p id="footer-pages-note" className="footer-pages-note">Las páginas de Empresa, Legal y Soporte estarán disponibles próximamente.</p>
    <nav className="footer-explore" aria-label="Explorar K’plan">{navItems.map(item => <a key={item.href} href={homeAnchor(item.href)}>{item.label}<ArrowUpRight size={14} aria-hidden="true" /></a>)}<a href={homeAnchor('#territorio')}>Ciudades creativas<ArrowUpRight size={14} aria-hidden="true" /></a><a href={homeAnchor('#preguntas')}>Preguntas del piloto<ArrowUpRight size={14} aria-hidden="true" /></a></nav>
    <div className="footer-bottom"><p>© {new Date().getFullYear()} K’plan · Piloto en preparación</p><div className="footer-disclosures">
      <details><summary>Privacidad de esta vista previa</summary><p>Los formularios no transmiten datos ni los guardan en almacenamiento persistente. Al cerrar o recargar la página se descartan. No se utilizan cookies de seguimiento ni analítica de terceros. Las solicitudes de archivos al servidor pueden generar registros técnicos del alojamiento.</p></details>
      <details><summary>Créditos fotográficos</summary><div className="credits-list">{photoCredits.map(c => <p key={c.place}><a href={c.source} target="_blank" rel="noreferrer">{c.place}: {c.author}</a> · <a href={c.licenseUrl} target="_blank" rel="noreferrer">{c.license}</a>. Recorte, redimensionado y conversión a WebP. Las adaptaciones conservan la licencia indicada.</p>)}<p>Interfaz e ilustración cultural: recursos del proyecto K’plan.</p></div></details>
    </div></div>
  </div></footer>;
}
