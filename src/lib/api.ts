// Lo único que la landing le pide al API (docs/landing.md del repo del API): pedir una demo, que de
// paso entrega los links de la app, y saber qué versiones hay. Rutas públicas: sin cookies ni token.
const trim = (value: string | undefined, fallback: string) => (value?.trim() || fallback).replace(/\/+$/, '');

// En `npm run dev`, `/_api` es el proxy de Vite (vite.config.ts) hacia el API.
export const API_URL = trim(import.meta.env.VITE_API_URL, import.meta.env.DEV ? '/_api' : 'https://develop-api.kplan.dev');
export const PORTAL_URL = trim(import.meta.env.VITE_PORTAL_URL, 'https://portal.kplan.dev');

export type Platform = 'android' | 'macos' | 'windows';
export type DemoKind = 'business' | 'municipality' | 'institution' | 'tour_operator' | 'other';
export type LatestRelease = { platform: Platform; version: string; notes: string; published_at: string };
export type DemoRequest = { name: string; email: string; organization: string; kind: DemoKind; city: string; phone: string; message: string; website: string };
export type DeliveredLink = { platform: Platform; version: string; link: string };
// `delivered` es falso si no había ninguna versión publicada: el equipo le hace llegar el link después.
export type DemoRequestResult = { delivered: boolean; links: DeliveredLink[] };

export class ApiError extends Error {
  constructor(message: string, readonly status: number, readonly fields: Record<string, string> = {}) { super(message); }
}

const NETWORK = 'No pudimos conectarnos. Revisá tu conexión e intentá de nuevo.';

// El API dice `body.email`; el formulario, `email`.
const fieldsOf = (raw: unknown): Record<string, string> => Object.fromEntries(
  Object.entries(raw && typeof raw === 'object' ? raw : {}).map(([key, value]) => [key.replace(/^body\./, ''), String(value)]),
);

async function call(path: string, init: RequestInit = {}): Promise<Response> {
  let response: Response;
  try {
    response = await fetch(API_URL + path, { ...init, credentials: 'omit', headers: { Accept: 'application/json', ...init.headers } });
  } catch {
    throw new ApiError(NETWORK, 0);
  }
  if (response.ok) return response;
  if (response.status === 429) throw new ApiError('Recibimos muchas solicitudes desde tu conexión. Esperá un minuto e intentá de nuevo.', 429);
  const body = await response.json().catch(() => null) as { detail?: string; field_errors?: unknown } | null;
  throw new ApiError(body?.detail || 'Algo salió mal de nuestro lado. Intentá de nuevo en unos minutos.', response.status, fieldsOf(body?.field_errors));
}

export async function requestDemo(data: DemoRequest): Promise<DemoRequestResult> {
  const response = await call('/demo-request/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
  const result = await response.json().catch(() => null) as Partial<DemoRequestResult> | null;
  // Solo se muestran links https: lo demás no se pone en un `href`.
  const links = (result?.links ?? []).filter(item => typeof item?.link === 'string' && item.link.startsWith('https://'));
  return { delivered: links.length > 0, links };
}

export async function latestReleases(signal?: AbortSignal): Promise<LatestRelease[]> {
  return (await call('/app-release/latest/', { signal })).json() as Promise<LatestRelease[]>;
}
