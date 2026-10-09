import { createContext, useContext } from 'react';

export type ToastTone = 'success' | 'error' | 'info';
export type ToastOptions = { tone?: ToastTone; message: string; action?: { label: string; onClick: () => void } };
export type ToastApi = { show: (toast: ToastOptions) => number; dismiss: (id: number) => void };

export const ToastContext = createContext<ToastApi | null>(null);

export function useToast() {
  const api = useContext(ToastContext);
  if (!api) throw new Error('useToast necesita un ToastProvider más arriba.');
  return api;
}
