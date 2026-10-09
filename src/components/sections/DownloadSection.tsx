import { useEffect, useState } from 'react';
import { Download, Laptop, Monitor, Smartphone, ArrowUpRight } from 'lucide-react';
import { downloadUrl, latestReleases, type LatestRelease, type Platform } from '@/lib/api';

const platforms: Record<Platform, { label: string; format: string; icon: typeof Smartphone; hint: string }> = {
  android: { label: 'Android', format: 'APK', icon: Smartphone, hint: 'Al abrir el archivo, Android te pide permitir la instalación desde tu navegador.' },
  windows: { label: 'Windows', format: 'EXE', icon: Monitor, hint: 'Abrí el instalador y seguí los pasos. Windows puede pedirte que confirmes la instalación.' },
  macos: { label: 'macOS', format: 'DMG', icon: Laptop, hint: 'Abrí el archivo y arrastrá K’plan a la carpeta Aplicaciones.' },
};
const order: Platform[] = ['android', 'windows', 'macos'];

const size = (bytes: number) => `${(bytes / 1048576).toLocaleString('es-NI', { maximumFractionDigits: 1 })} MB`;
const date = (iso: string) => new Date(iso).toLocaleDateString('es-NI', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Managua' });

export function DownloadSection() {
  const [releases, setReleases] = useState<LatestRelease[] | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    latestReleases(controller.signal).then(setReleases, () => { if (!controller.signal.aborted) setFailed(true); });
    return () => controller.abort();
  }, []);
  const shown = (releases ?? []).filter(r => r.platform in platforms).sort((a, b) => order.indexOf(a.platform) - order.indexOf(b.platform));
  const loading = releases === null && !failed;

  return <section id="descargar" className="section download-section" aria-labelledby="download-title" aria-busy={loading}><div className="container">
    <div className="section-heading"><div><p className="section-label"><Download size={18} aria-hidden="true" />Descargá la app</p><h2 id="download-title">Llevá K’plan en tu bolsillo.</h2></div>
      <p>La versión del piloto, lista para instalar. Siempre bajás la más reciente que publicó el equipo.</p></div>
    {loading ? <p className="download-status" role="status">Buscando la versión más reciente…</p>
      : shown.length === 0 ? <div className="download-empty"><p><strong>La descarga todavía no está disponible.</strong> Mientras tanto, explorá cómo funciona la app en esta página.</p><a href="#producto" className="text-link">Ver la demostración<ArrowUpRight size={18} aria-hidden="true" /></a></div>
      : <ul className="download-grid">{shown.map(r => { const p = platforms[r.platform]; return <li key={r.platform} className="download-card">
        <p.icon className="download-icon" aria-hidden="true" />
        <div className="download-body"><h3>{p.label}</h3>
          <p className="download-meta">Versión {r.version} · {p.format} · {size(r.size)}<br />Publicada el {date(r.published_at)}</p>
          {r.notes && <p className="download-notes">{r.notes}</p>}</div>
        <a className="button button--primary" href={downloadUrl(r.platform)} rel="nofollow">Descargar para {p.label}<Download size={18} aria-hidden="true" /></a>
        <p className="download-hint">{p.hint}</p>
      </li>; })}</ul>}
    <p className="download-footnote">¿Usás iPhone? La versión para iOS todavía no está disponible.</p>
  </div></section>;
}
