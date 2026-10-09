import { useEffect, useState } from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { byPlatform, platforms } from '@/content/platforms';
import { latestReleases, type LatestRelease } from '@/lib/api';

const date = (iso: string) => new Date(iso).toLocaleDateString('es-NI', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Managua' });

// Muestra qué versiones hay, sin links: el link se da al enviar el formulario de demo.
export function DownloadSection() {
  const [releases, setReleases] = useState<LatestRelease[] | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    latestReleases(controller.signal).then(setReleases, () => { if (!controller.signal.aborted) setFailed(true); });
    return () => controller.abort();
  }, []);
  const shown = byPlatform(releases ?? []);
  const loading = releases === null && !failed;

  return <section id="descargar" className="section download-section" aria-labelledby="download-title" aria-busy={loading}><div className="container">
    <div className="section-heading"><div><p className="section-label"><Download size={18} aria-hidden="true" />Descargá la app</p><h2 id="download-title">Llevá K’plan en tu bolsillo.</h2></div>
      <p>La versión del piloto, lista para instalar. Completá el formulario de demo y al enviarlo te damos el link de descarga.</p></div>
    {loading ? <p className="download-status" role="status">Buscando las versiones disponibles…</p>
      : shown.length === 0 ? <div className="download-empty"><p><strong>{failed ? 'No pudimos ver qué versiones hay.' : 'Todavía no hay una versión publicada.'}</strong> Dejanos tus datos en el formulario de demo y te avisamos cuando esté lista.</p><a href="#demo" className="text-link">Pedir la app<ArrowRight size={18} aria-hidden="true" /></a></div>
      : <>
        <ul className="download-grid">{shown.map(r => { const p = platforms[r.platform]; return <li key={r.platform} className="download-card">
          <p.icon className="download-icon" aria-hidden="true" />
          <div className="download-body"><h3>{p.label}</h3>
            <p className="download-meta">Versión {r.version} · {p.format}<br />Publicada el {date(r.published_at)}</p>
            {r.notes && <p className="download-notes">{r.notes}</p>}</div>
        </li>; })}</ul>
        <a href="#demo" className="button button--primary download-cta">Pedir el link de descarga<ArrowRight size={18} aria-hidden="true" /></a>
      </>}
    <p className="download-footnote">¿Usás iPhone? La versión para iOS todavía no está disponible.</p>
  </div></section>;
}
