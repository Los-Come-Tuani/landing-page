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

// `message` siempre es texto para la persona: nunca un código de estado ni el texto técnico del API.
export class ApiError extends Error {
  constructor(message: string, readonly status: number, readonly fields: Record<string, string> = {}) { super(message); }
}

const TIMEOUT_MS = 20_000;
const NETWORK = 'No pudimos conectarnos. Revisá tu conexión e intentá de nuevo.';
const TIMEOUT = 'La conexión está tardando demasiado. Intentá de nuevo.';
const SERVER = 'Algo salió mal de nuestro lado. Intentá de nuevo en unos minutos.';
const FAILED = 'No pudimos completar tu solicitud. Intentá de nuevo en unos minutos.';
const INVALID = 'Revisá los datos marcados e intentá de nuevo.';
const TOO_LARGE = 'Tu mensaje es demasiado largo. Acortalo e intentá de nuevo.';
const BUSY = 'Recibimos muchas solicitudes desde tu conexión. Esperá un minuto e intentá de nuevo.';

// Los `default_detail` de api_exceptions (repo del API) hablan de recursos y headers: se cambian por los de la landing.
const generic: Record<string, string> = {
  'La solicitud contiene datos inválidos.': INVALID,
  'No se pudo interpretar la solicitud.': FAILED,
  'La solicitud excede los límites permitidos.': TOO_LARGE,
  'Ha superado el límite de uso establecido para este recurso.': BUSY,
  'Ha ocurrido un error inesperado.': SERVER,
  'El servicio no está disponible por ahora.': SERVER,
  'Hay un conflicto con el estado actual del recurso.': FAILED,
  'El recurso solicitado no se encontró.': FAILED,
  'No tiene permiso para realizar esta acción.': FAILED,
  'Ha enviado un `Accept` header inválido.': FAILED,
  'No se proporcionaron credenciales de autenticación válidas.': FAILED,
};

const messageFor = (status: number, detail: unknown) => {
  if (status === 429) return BUSY;
  if (status >= 500) return SERVER;
  const text = typeof detail === 'string' ? detail.trim() : '';
  if (text) return generic[text] ?? text;
  return status === 400 ? INVALID : status === 413 ? TOO_LARGE : FAILED;
};

// El API dice `body.email`; el formulario, `email`.
const fieldsOf = (raw: unknown): Record<string, string> => Object.fromEntries(
  Object.entries(raw && typeof raw === 'object' ? raw : {}).map(([key, value]) => [key.replace(/^body\./, ''), String(value)]),
);

// Devuelve el cuerpo ya leído (o null si no es JSON). Si quien llama aborta (p. ej. al desmontar), se
// propaga como AbortError, igual que con `fetch`; el tiempo máximo, en cambio, es un ApiError más.
async function call(path: string, init: RequestInit = {}): Promise<unknown> {
  const caller = init.signal;
  const controller = new AbortController();
  const stop = () => controller.abort();
  const timer = window.setTimeout(stop, TIMEOUT_MS);
  if (caller?.aborted) stop(); else caller?.addEventListener('abort', stop);
  try {
    const response = await fetch(API_URL + path, { ...init, signal: controller.signal, credentials: 'omit', headers: { Accept: 'application/json', ...init.headers } });
    const body = await response.json().catch(() => null) as { detail?: unknown; field_errors?: unknown } | null;
    if (response.ok) return body;
    throw new ApiError(messageFor(response.status, body?.detail), response.status, response.status < 500 ? fieldsOf(body?.field_errors) : {});
  } catch (error) {
    if (error instanceof ApiError || caller?.aborted) throw error;
    throw new ApiError(controller.signal.aborted ? TIMEOUT : NETWORK, 0);
  } finally {
    window.clearTimeout(timer);
    caller?.removeEventListener('abort', stop);
  }
}

export async function requestDemo(data: DemoRequest): Promise<DemoRequestResult> {
  const result = await call('/demo-request/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }) as Partial<DemoRequestResult> | null;
  // Solo se muestran links https: lo demás no se pone en un `href`.
  const links = (result?.links ?? []).filter(item => typeof item?.link === 'string' && item.link.startsWith('https://'));
  return { delivered: links.length > 0, links };
}

export async function latestReleases(signal?: AbortSignal): Promise<LatestRelease[]> {
  const result = await call('/app-release/latest/', { signal });
  if (signal?.aborted) throw new DOMException('La consulta se canceló.', 'AbortError');
  if (!Array.isArray(result)) throw new ApiError(FAILED, 0);
  return result as LatestRelease[];
}
