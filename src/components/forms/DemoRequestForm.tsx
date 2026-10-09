import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowRight, Check, CircleAlert } from 'lucide-react';
import { ApiError, requestDemo, type DemoKind } from '@/lib/api';

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

export function DemoRequestForm() {
  // El borrador vive en memoria: si el envío falla, se conserva para reintentar.
  const [draft, setDraft] = useState<Draft>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Draft, string>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [failure, setFailure] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const update = (name: keyof Draft, value: string) => { setDraft(d => ({ ...d, [name]: value })); if (errors[name]) setErrors(e => ({ ...e, [name]: '' })); };
  const focusFirst = (next: Partial<Record<keyof Draft, string>>) => {
    const first = fields.find(f => next[f.name]);
    if (first) requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[name="' + first.name + '"]')?.focus());
  };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'sending') return;
    const next = Object.fromEntries(fields.map(f => [f.name, validate(f, draft[f.name])]));
    setErrors(next); setFailure('');
    if (Object.values(next).some(Boolean)) return focusFirst(next);
    setStatus('sending');
    try {
      const clean = Object.fromEntries(Object.entries(draft).map(([key, value]) => [key, value.trim()])) as Draft;
      await requestDemo({ ...clean, kind: clean.kind as DemoKind });
      setStatus('sent');
      requestAnimationFrame(() => doneRef.current?.focus());
    } catch (error) {
      setStatus('idle');
      const fromApi = error instanceof ApiError ? error.fields : {};
      const known = Object.fromEntries(Object.entries(fromApi).filter(([key]) => fields.some(f => f.name === key)));
      setErrors(known); focusFirst(known);
      setFailure(error instanceof ApiError ? error.message : 'Algo salió mal. Intentá de nuevo.');
    }
  };
  const again = () => { setDraft(empty); setErrors({}); setStatus('idle'); requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[name="name"]')?.focus()); };

  if (status === 'sent') return <div className="form-review demo-sent" ref={doneRef} tabIndex={-1}>
    <div className="review-label"><Check size={20} aria-hidden="true" /> Solicitud enviada</div>
    <h3>¡Gracias! Ya recibimos tu solicitud.</h3>
    <p>El equipo de K’plan te va a escribir a <strong>{draft.email.trim()}</strong> para coordinar la demostración.</p>
    <button className="button button--secondary" type="button" onClick={again}>Enviar otra solicitud</button>
  </div>;

  return <form ref={formRef} noValidate onSubmit={submit} className="participation-form" aria-label="Solicitar una demo" aria-busy={status === 'sending'}>
    <div className="form-heading"><h3>Pedí una demostración.</h3><p>Contanos quién sos y qué te interesa; te escribimos para coordinar.</p></div>
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
    {failure && <p className="form-notice form-notice--error" role="alert"><CircleAlert size={18} aria-hidden="true" /><span>{failure}</span></p>}
    <button className="button button--primary" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Enviando…' : 'Solicitar demo'}<ArrowRight size={18} aria-hidden="true" /></button>
    <p className="form-privacy">Usamos estos datos solo para contactarte sobre la demostración.</p>
  </form>;
}
