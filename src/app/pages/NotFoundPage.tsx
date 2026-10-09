import { ArrowLeft, House } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router';
import { PageMetadata } from '@/components/layout/PageMetadata';
import { SnakeGame } from '@/components/snake/SnakeGame';
import '@/styles/not-found.css';

export function NotFoundPage() {
  const navigate = useNavigate();
  // Una pestaña abierta directo en esta dirección no tiene a dónde volver.
  const canGoBack = useLocation().key !== 'default' || window.history.length > 1;
  return <section className="section not-found" aria-labelledby="not-found-title">
    <PageMetadata title="Página no encontrada · K’plan" description="Esta dirección no está disponible. Volvé al inicio de K’plan o jugá una partida de Snake y trazá tu propia ruta." />
    <div className="container not-found-layout">
      <div className="not-found-copy">
        <p className="not-found-label">Página no encontrada</p>
        <h1 id="not-found-title">Este camino<br />tomó otro rumbo.</h1>
        <p>La dirección que buscaste no está disponible. Volvé al inicio para seguir descubriendo K’plan.</p>
        <div className="not-found-actions">
          <Link className="button button--primary" to="/"><House size={18} aria-hidden="true" />Volver al inicio</Link>
          {canGoBack && <button type="button" className="button button--secondary" onClick={() => navigate(-1)}><ArrowLeft size={18} aria-hidden="true" />Volver atrás</button>}
        </div>
        <p className="not-found-aside">O quedate un momento y trazá tu propia ruta.</p>
      </div>
      <SnakeGame />
    </div>
  </section>;
}
