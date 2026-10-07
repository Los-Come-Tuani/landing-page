import type { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { SiteLayout } from './SiteLayout';

/** Shared presentation for future routes; it does not create or publish a route. */
export function ContentPage({ title, intro, children, updatedAt }: {
  title: string; intro: string; children: ReactNode; updatedAt?: string;
}) {
  return <SiteLayout><article className="section content-page"><div className="container">
    <a className="text-link content-back" href="/"><ArrowLeft size={18} aria-hidden="true" />Volver al inicio</a>
    <header className="content-page-heading"><h1>{title}</h1><p>{intro}</p>
      {updatedAt && <p className="content-updated">Última actualización: {updatedAt}</p>}
    </header>
    <div className="content-page-body">{children}</div>
  </div></article></SiteLayout>;
}
