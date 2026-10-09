import { useEffect } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router';
import { ErrorScreen, ErrorShell } from '@/components/layout/ErrorScreen';
import { NotFoundPage } from './NotFoundPage';

/** `errorElement` de la ruta raíz: reemplaza también a `SiteLayout`, que puede ser lo que falló. */
export function ErrorPage() {
  const error = useRouteError();
  useEffect(() => { if (import.meta.env.DEV) console.error(error); }, [error]);
  if (isRouteErrorResponse(error) && error.status === 404) return <ErrorShell><NotFoundPage /></ErrorShell>;
  return <ErrorScreen error={error} />;
}
