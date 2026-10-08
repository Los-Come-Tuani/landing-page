import type { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import { PageMetadata } from './PageMetadata';

/** Editorial page content inside the shared route layout. */
export function ContentPage({ title, intro, children, updatedAt }: {
  title: string; intro: string; children: ReactNode; updatedAt?: string;
}) {
  return <article className="section content-page"><PageMetadata title={`${title} · K’plan`} description={intro} /><div className="container">
    <Link className="text-link content-back" to="/"><ArrowLeft size={18} aria-hidden="true" />Volver al inicio</Link>
    <header className="content-page-heading"><h1>{title}</h1><p>{intro}</p>
      {updatedAt && <p className="content-updated">Última actualización: {updatedAt}</p>}
    </header>
    <div className="content-page-body">{children}</div>
  </div></article>;
}
