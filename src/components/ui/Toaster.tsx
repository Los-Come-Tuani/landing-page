import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { CircleAlert, CircleCheck, Info, X } from 'lucide-react';
import { ToastContext, type ToastOptions, type ToastTone } from './toast';

type Toast = ToastOptions & { id: number; tone: ToastTone; leaving: boolean };

const LIMIT = 3;
const DURATION: Record<ToastTone, number> = { success: 5000, info: 5000, error: 8000 };
const LEAVE_MS = 150;
const icons = { success: CircleCheck, error: CircleAlert, info: Info };

function ToastItem({ toast, hidden, onDismiss }: { toast: Toast; hidden: boolean; onDismiss: (id: number) => void }) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const left = useRef(DURATION[toast.tone]);
  const paused = hidden || hovered || focused || toast.leaving;
  useEffect(() => {
    if (paused) return;
    const started = Date.now();
    const timer = window.setTimeout(() => onDismiss(toast.id), left.current);
    return () => { window.clearTimeout(timer); left.current -= Date.now() - started; };
  }, [paused, toast.id, onDismiss]);
  const Icon = icons[toast.tone];
  return <li className="toast" data-tone={toast.tone} data-leaving={toast.leaving}
    onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}
    onFocus={() => setFocused(true)} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false); }}
    onKeyDown={e => { if (e.key === 'Escape') onDismiss(toast.id); }}>
    <Icon className="toast-icon" size={20} aria-hidden="true" />
    <p className="toast-message">{toast.message}</p>
    {toast.action && <button type="button" className="toast-action" onClick={() => { toast.action?.onClick(); onDismiss(toast.id); }}>{toast.action.label}</button>}
    <button type="button" className="toast-close" aria-label="Cerrar aviso" onClick={() => onDismiss(toast.id)}><X size={18} aria-hidden="true" /></button>
  </li>;
}

/** Snackbars de la landing: abajo, hasta tres a la vez, y anunciados a los lectores de pantalla. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [said, setSaid] = useState({ polite: '', assertive: '' });
  const [hidden, setHidden] = useState(() => document.hidden);
  const next = useRef(0);
  useEffect(() => {
    const visibility = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', visibility);
    return () => document.removeEventListener('visibilitychange', visibility);
  }, []);
  const dismiss = useCallback((id: number) => {
    setToasts(list => list.map(t => t.id === id ? { ...t, leaving: true } : t));
    window.setTimeout(() => setToasts(list => list.filter(t => t.id !== id)), LEAVE_MS);
  }, []);
  const show = useCallback((options: ToastOptions) => {
    const id = ++next.current;
    const tone = options.tone ?? 'info';
    setToasts(list => [...list.filter(t => t.message !== options.message), { ...options, tone, id, leaving: false }].slice(-LIMIT));
    // Las regiones vivas solo anuncian cambios: se vacían antes para que un mismo mensaje se repita.
    setSaid({ polite: '', assertive: '' });
    window.setTimeout(() => setSaid(tone === 'error' ? { polite: '', assertive: options.message } : { polite: options.message, assertive: '' }), 100);
    return id;
  }, []);
  const api = useMemo(() => ({ show, dismiss }), [show, dismiss]);
  return <ToastContext.Provider value={api}>
    {children}
    {toasts.length > 0 && <section className="toaster" aria-label="Notificaciones">
      <ol>{toasts.map(t => <ToastItem key={t.id} toast={t} hidden={hidden} onDismiss={dismiss} />)}</ol>
    </section>}
    <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{said.polite}</div>
    <div className="sr-only" role="alert" aria-live="assertive" aria-atomic="true">{said.assertive}</div>
  </ToastContext.Provider>;
}
