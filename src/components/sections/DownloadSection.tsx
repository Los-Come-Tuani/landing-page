import { useEffect, useState } from 'react';
import { ArrowRight, Download, RotateCw } from 'lucide-react';
import { useToast } from '@/components/ui/toast';
import { byPlatform, platforms } from '@/content/platforms';
import { ApiError, latestReleases, type LatestRelease } from '@/lib/api';

const date = (iso: string) => new Date(iso).toLocaleDateString('es-NI', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Managua' });

// Muestra qué versiones hay, sin links: el link se da al enviar el formulario de demo.
export function DownloadSection() {
  const { show } = useToast();
  const [releases, setReleases] = useState<LatestRelease[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [retrying, setRetrying] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    latestReleases(controller.signal).then(found => { setReleases(found); setFailed(false); }, (error: unknown) => {
      if (controller.signal.aborted) return;
      setFailed(true);
      // La primera carga falla en silencio (el panel ya lo dice); un reintento pedido merece respuesta.
      if (attempt > 0) show({ tone: 'error', message: error instanceof ApiError ? error.message : 'No pudimos ver qué versiones hay. Intentá de nuevo en unos minutos.' });
    }).finally(() => setRetrying(false));
    return () => controller.abort();
  }, [attempt, show]);
  const retry = () => { if (retrying) return; setRetrying(true); setAttempt(a => a + 1); };
  const shown = byPlatform(releases ?? []);
  const loading = releases === null && !failed;

  return <section id="descargar" className="section download-section" aria-labelledby="download-title" aria-busy={loading || retrying}><div className="container">
    <div className="section-heading"><div><p className="section-label"><Download size={18} aria-hidden="true" />Descargá la app</p><h2 id="download-title">Llevá K’plan en tu bolsillo.</h2></div>
      <p>La versión del piloto, lista para instalar. Completá el formulario de demo y al enviarlo te damos el link de descarga.</p></div>
    {loading ? <p className="download-status" role="status">Buscando las versiones disponibles…</p>
      : shown.length === 0 ? <div className="download-empty">
        <p>{failed ? <><strong>No pudimos ver qué versiones hay.</strong> Intentá de nuevo, o dejanos tus datos en el formulario de demo: al enviarlo te damos el link si ya hay una versión lista.</>
          : <><strong>Todavía no hay una versión publicada.</strong> Dejanos tus datos en el formulario de demo y te avisamos cuando esté lista.</>}</p>
        <div className="download-empty-actions">
          {failed && <button type="button" className="button button--secondary" aria-disabled={retrying} onClick={retry}><RotateCw size={18} aria-hidden="true" />{retrying ? 'Buscando…' : 'Reintentar'}</button>}
          <a href="#demo" className="text-link">Pedir la app<ArrowRight size={18} aria-hidden="true" /></a>
        </div>
      </div>
      : <>
        <ul className="download-grid">{shown.map(r => { const p = platforms[r.platform]; return <li key={r.platform} className="download-card">
          <p.icon className="download-icon" aria-hidden="true" />
          <div className="download-body"><h3>{p.label}</h3>
            <p className="download-meta">Versión {r.version} · {p.format}<br />Publicada el {date(r.published_at)}</p>
            {r.notes && <p className="download-notes">{r.notes}</p>}</div>
        </li>; })}</ul>
        <a href="#demo" className="button button--primary download-cta">Pedir el link de descarga<ArrowRight size={18} aria-hidden="true" /></a>
      </>}
    <p className="download-footnote">¿Usás iPhone? La versión para iOS todavía no está disponible. Mientras tanto, <a href="#producto" className="download-footnote-link">conocé la app en la vista previa</a>.</p>
  </div></section>;
}
