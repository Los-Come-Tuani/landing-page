import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowRight, ArrowUpRight, Check, CircleAlert } from 'lucide-react';
import { Dialog } from '@/components/ui/Dialog';
import { useToast } from '@/components/ui/toast';
import { byPlatform, platforms } from '@/content/platforms';
import { ApiError, requestDemo, type DeliveredLink, type DemoKind, type DemoRequestResult } from '@/lib/api';

type Field = { name: Exclude<keyof Draft, 'website'>; label: string; placeholder?: string; type?: string; optional?: boolean; full?: boolean; autoComplete?: string; max: number };
type Draft = { name: string; email: string; organization: string; kind: string; city: string; phone: string; message: string; website: string };

const kinds: { value: DemoKind; label: string }[] = [
  { value: 'business', label: 'Comercio o emprendimiento' },
  { value: 'municipality', label: 'Alcaldía' },
  { value: 'institution', label: 'Institución cultural' },
  { value: 'tour_operator', label: 'Operador turístico' },
  { value: 'other', label: 'Otro' },
];
const fields: Field[] = [
  { name: 'name', label: 'Tu nombre', placeholder: 'Nombre y apellido', autoComplete: 'name', max: 120 },
  { name: 'email', label: 'Correo electrónico', placeholder: 'nombre@ejemplo.com', type: 'email', autoComplete: 'email', max: 254 },
  { name: 'organization', label: 'Organización', placeholder: 'Negocio, alcaldía o institución', autoComplete: 'organization', max: 160 },
  { name: 'kind', label: '¿Qué representás?', max: 20 },
  { name: 'city', label: 'Ciudad o municipio', placeholder: 'Ej. León', optional: true, autoComplete: 'address-level2', max: 120 },
  { name: 'phone', label: 'Teléfono o WhatsApp', placeholder: '+505 8888 0000', type: 'tel', optional: true, autoComplete: 'tel', max: 30 },
  { name: 'message', label: '¿Qué te gustaría ver en la demo?', optional: true, full: true, max: 2000 },
];
const empty: Draft = { name: '', email: '', organization: '', kind: '', city: '', phone: '', message: '', website: '' };

const validate = (field: Field, value: string) => {
  const text = value.trim();
  if (!field.optional && !text) return field.name === 'kind' ? 'Elegí una opción.' : 'Completá este campo.';
  if (field.type === 'email' && text && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) return 'Ingresá un correo válido.';
  if (['name', 'organization'].includes(field.name) && text.length === 1) return 'Escribí al menos 2 caracteres.';
  return '';
};

function DemoLinks({ links }: { links: DeliveredLink[] }) {
  return <ul className="demo-links">{links.map(l => { const p = platforms[l.platform]; return <li key={l.platform}>
    <a className="button button--primary" href={l.link} target="_blank" rel="noopener noreferrer"><p.icon size={18} aria-hidden="true" />Descargar para {p.label}<ArrowUpRight size={18} aria-hidden="true" /></a>
    <p className="download-hint">Versión {l.version} · {p.format}. {p.hint}</p>
  </li>; })}</ul>;
}

function Pending({ email, phone, className }: { email: string; phone: string; className?: string }) {
  return <p className={className}>Todavía no hay una versión de la app lista para descargar. Te vamos a avisar a <strong>{email}</strong>{phone && <> o al <strong>{phone}</strong></>} cuando esté disponible.</p>;
}

export function DemoRequestForm() {
  const { show, dismiss } = useToast();
  // El borrador vive en memoria: si el envío falla, se conserva para reintentar.
  const [draft, setDraft] = useState<Draft>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Draft, string>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [result, setResult] = useState<DemoRequestResult | null>(null);
  const [dialog, setDialog] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  // El aviso de este formulario: se retira al reintentar y al salir de la página.
  const notice = useRef(0);
  useEffect(() => () => dismiss(notice.current), [dismiss]);
  const update = (name: keyof Draft, value: string) => { setDraft(d => ({ ...d, [name]: value })); if (errors[name]) setErrors(e => ({ ...e, [name]: '' })); };
  const focusFirst = (next: Partial<Record<keyof Draft, string>>) => {
    const first = fields.find(f => next[f.name]);
    if (first) requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[name="' + first.name + '"]')?.focus());
  };
  const warn = (message: string, retry: boolean) => {
    notice.current = show({ tone: 'error', message, action: retry ? { label: 'Reintentar', onClick: () => submitRef.current?.click() } : undefined });
  };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'sending') return;
    dismiss(notice.current);
    const next = Object.fromEntries(fields.map(f => [f.name, validate(f, draft[f.name])]));
    setErrors(next);
    if (Object.values(next).some(Boolean)) { warn('Revisá los campos marcados.', false); return focusFirst(next); }
    setStatus('sending');
    try {
      const clean = Object.fromEntries(Object.entries(draft).map(([key, value]) => [key, value.trim()])) as Draft;
      setResult(await requestDemo({ ...clean, kind: clean.kind as DemoKind }));
      setStatus('sent');
      setDialog(true);
    } catch (error) {
      setStatus('idle');
      const fromApi = error instanceof ApiError ? error.fields : {};
      const known = Object.fromEntries(Object.entries(fromApi).filter(([key]) => fields.some(f => f.name === key)));
      setErrors(known);
      if (Object.keys(known).length) { warn('Revisá los campos marcados.', false); return focusFirst(known); }
      // Esperar un minuto es la salida de un 429: reintentar enseguida volvería a fallar.
      warn(error instanceof ApiError ? error.message : 'Algo salió mal. Intentá de nuevo.', !(error instanceof ApiError && error.status === 429));
      requestAnimationFrame(() => submitRef.current?.focus());
    }
  };
  const again = () => { setDraft(empty); setErrors({}); setResult(null); setStatus('idle'); setDialog(false); requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[name="name"]')?.focus()); };
  const closeDialog = () => { setDialog(false); requestAnimationFrame(() => doneRef.current?.focus()); };

  if (status === 'sent') {
    const links = byPlatform(result?.links ?? []);
    const email = draft.email.trim();
    const phone = draft.phone.trim();
    return <>
      <div className="form-review demo-sent" ref={doneRef} tabIndex={-1}>
        <div className="review-label"><Check size={20} aria-hidden="true" /> Solicitud enviada</div>
        {links.length > 0 ? <>
          <h3>¡Gracias! Ya podés descargar K’plan.</h3>
          <p>Estos son los links de la versión más reciente del piloto. Se abren en Google Drive.</p>
          <DemoLinks links={links} />
        </> : <>
          <h3>¡Gracias! Ya recibimos tu solicitud.</h3>
          <Pending email={email} phone={phone} />
        </>}
        <button className="button button--secondary" type="button" onClick={again}>Enviar otra solicitud</button>
      </div>
      <Dialog title="¡Solicitud enviada!" open={dialog} onClose={closeDialog}>
        {links.length > 0 ? <>
          <p className="dialog-lead">Ya podés descargar K’plan. Estos links abren la versión más reciente del piloto en Google Drive.</p>
          <DemoLinks links={links} />
        </> : <Pending className="dialog-lead" email={email} phone={phone} />}
        {/* Con links, la descarga es la acción principal; sin ellos, lo es cerrar. */}
        <div className="dialog-actions"><button type="button" className={'button ' + (links.length > 0 ? 'button--secondary' : 'button--primary')} onClick={closeDialog}>Listo</button></div>
      </Dialog>
    </>;
  }

  return <form ref={formRef} noValidate onSubmit={submit} className="participation-form" aria-label="Solicitar una demo" aria-busy={status === 'sending'}>
    <div className="form-heading"><h3>Pedí una demostración.</h3><p>Contanos quién sos y qué te interesa. Al enviarlo te damos el link para descargar la app; si todavía no está lista, te avisamos.</p></div>
    <div className="form-fields">{fields.map(f => {
      const id = 'demo-' + f.name;
      const props = { id, name: f.name, value: draft[f.name], required: !f.optional, 'aria-invalid': !!errors[f.name], 'aria-describedby': errors[f.name] ? id + '-error' : undefined, disabled: status === 'sending', onBlur: () => setErrors(e => ({ ...e, [f.name]: validate(f, draft[f.name]) })) };
      return <div className={'form-field' + (f.full ? ' form-field--full' : '')} key={f.name}>
        <label htmlFor={id}>{f.label}{f.optional && <span> (opcional)</span>}</label>
        {f.name === 'kind' ? <select {...props} onChange={e => update(f.name, e.target.value)}><option value="">Seleccioná una opción</option>{kinds.map(k => <option key={k.value} value={k.value}>{k.label}</option>)}</select>
          : f.name === 'message' ? <textarea {...props} rows={3} maxLength={f.max} onChange={e => update(f.name, e.target.value)} />
          : <input {...props} type={f.type || 'text'} autoComplete={f.autoComplete} placeholder={f.placeholder} maxLength={f.max} onChange={e => update(f.name, e.target.value)} />}
        {errors[f.name] && <p className="field-error" id={id + '-error'}><CircleAlert size={14} aria-hidden="true" />{errors[f.name]}</p>}
      </div>;
    })}</div>
    {/* Campo trampa: una persona no lo ve ni lo llena; un bot sí. */}
    <div className="form-trap" aria-hidden="true"><label htmlFor="demo-website">Sitio web</label><input id="demo-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={draft.website} onChange={e => update('website', e.target.value)} /></div>
    <button ref={submitRef} className="button button--primary" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Enviando…' : 'Solicitar demo'}<ArrowRight size={18} aria-hidden="true" /></button>
    <p className="form-privacy">Usamos estos datos solo para contactarte sobre la app y la demostración.</p>
  </form>;
}
