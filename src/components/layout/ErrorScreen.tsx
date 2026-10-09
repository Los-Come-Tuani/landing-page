import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { House, RotateCw } from 'lucide-react';
import logo from '@/assets/logotipo-kplan.svg';
import { PageMetadata } from './PageMetadata';

// Cuando un deploy borra los chunks que una pestaña vieja todavía pide, el navegador falla al importarlos.
const staleBuild = (error: unknown) => {
  const text = error instanceof Error ? error.name + ' ' + error.message : String(error ?? '');
  return /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module|ChunkLoadError/i.test(text);
};

/** Marco mínimo con la marca, sin `SiteLayout` ni router: sirve aunque lo demás haya fallado. */
export function ErrorShell({ children }: { children: ReactNode }) {
  const main = useRef<HTMLElement>(null);
  useEffect(() => main.current?.focus({ preventScroll: true }), []);
  return <>
    <header className="site-header"><div className="container nav"><a href="/" className="brand" aria-label="K’plan, inicio"><img src={logo} width={100} height={46} alt="K’plan" /></a></div></header>
    <main id="contenido" ref={main} tabIndex={-1}>{children}</main>
  </>;
}

export function ErrorScreen({ error }: { error: unknown }) {
  const stale = staleBuild(error);
  return <ErrorShell><section className="section error-screen" aria-labelledby="error-title"><div className="container"><div className="error-screen-copy">
    <PageMetadata title={(stale ? 'Hay una versión nueva' : 'Algo salió mal') + ' · K’plan'} description="No pudimos mostrar esta página de K’plan. Recargala o volvé al inicio." />
    <p className="error-screen-label">{stale ? 'Hay una versión nueva' : 'Algo salió mal'}</p>
    <h1 id="error-title">{stale ? 'Actualizamos K’plan.' : 'Tuvimos un tropiezo en el camino.'}</h1>
    <p>{stale ? 'Publicamos una versión nueva del sitio mientras lo tenías abierto. Recargá la página para seguir con la más reciente.'
      : 'No pudimos mostrar esta página. Recargala para intentarlo de nuevo o volvé al inicio para seguir descubriendo K’plan.'}</p>
    <div className="error-screen-actions">
      <button type="button" className="button button--primary" onClick={() => window.location.reload()}><RotateCw size={18} aria-hidden="true" />Recargar la página</button>
      <a className="button button--secondary" href="/"><House size={18} aria-hidden="true" />Ir al inicio</a>
    </div>
    <p className="error-screen-help">¿Sigue pasando? Escribinos a <a href="mailto:kplan.nic@gmail.com">kplan.nic@gmail.com</a>.</p>
  </div></div></section></ErrorShell>;
}
