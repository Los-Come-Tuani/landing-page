import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import { PageMetadata } from '@/components/layout/PageMetadata';
import { SnakeGame } from '@/components/snake/SnakeGame';
import '@/styles/not-found.css';

export function NotFoundPage() {
  return <section className="section not-found" aria-labelledby="not-found-title">
    <PageMetadata title="Página no encontrada · K’plan" description="Esta dirección no está disponible. Volvé al inicio de K’plan o jugá una partida de Snake y trazá tu propia ruta." />
    <div className="container not-found-layout">
      <div className="not-found-copy">
        <p className="not-found-label">404 · Página no encontrada</p>
        <h1 id="not-found-title">Este camino<br />tomó otro rumbo.</h1>
        <p>La dirección que buscaste no está disponible. Volvé al inicio para seguir descubriendo K’plan.</p>
        <Link className="button button--primary" to="/"><ArrowLeft size={18} aria-hidden="true" />Volver al inicio</Link>
        <p className="not-found-aside">O quedate un momento y trazá tu propia ruta.</p>
      </div>
      <SnakeGame />
    </div>
  </section>;
}
