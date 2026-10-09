// Lo único que la landing le pide al API (docs/landing.md del repo del API): pedir una demo y saber
// qué versión de la app se descarga. Rutas públicas: sin cookies ni token.
const trim = (value: string | undefined, fallback: string) => (value?.trim() || fallback).replace(/\/+$/, '');

export const API_URL = trim(import.meta.env.VITE_API_URL, 'https://develop-api.kplan.dev');
export const PORTAL_URL = trim(import.meta.env.VITE_PORTAL_URL, 'https://portal.kplan.dev');

export type Platform = 'android' | 'macos' | 'windows';
export type DemoKind = 'business' | 'municipality' | 'institution' | 'tour_operator' | 'other';
export type LatestRelease = { platform: Platform; version: string; notes: string; file_name: string; size: number; published_at: string };
export type DemoRequest = { name: string; email: string; organization: string; kind: DemoKind; city: string; phone: string; message: string; website: string };

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

export async function requestDemo(data: DemoRequest): Promise<void> {
  await call('/demo-request/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
}

export async function latestReleases(signal?: AbortSignal): Promise<LatestRelease[]> {
  return (await call('/app-release/latest/', { signal })).json() as Promise<LatestRelease[]>;
}

// Un enlace normal: el API redirige a una URL firmada recién hecha, así el enlace no vence.
export const downloadUrl = (platform: Platform) => `${API_URL}/app-release/latest/${platform}/download/`;
