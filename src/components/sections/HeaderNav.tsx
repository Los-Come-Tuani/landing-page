import { useEffect, useRef, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import logo from '@/assets/logotipo-kplan.svg';
import { navItems } from '@/content/landing-content';
import { homeAnchor } from '@/content/site-pages';
import { ButtonLink } from '@/components/ui/ButtonLink';
export function HeaderNav() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const close = (restoreFocus = false) => { setOpen(false); if (restoreFocus) trigger.current?.focus(); };
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(true); };
    const outside = (e: PointerEvent) => { if (!panel.current?.contains(e.target as Node) && !trigger.current?.contains(e.target as Node)) close(); };
    const breakpoint = window.matchMedia('(min-width: 960px)');
    const onResize = () => { if (breakpoint.matches) close(); };
    document.addEventListener('keydown', onKey); document.addEventListener('pointerdown', outside); breakpoint.addEventListener('change', onResize);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', outside); breakpoint.removeEventListener('change', onResize); };
  }, [open]);
  return <header className="site-header">
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <nav className="container nav" aria-label="Principal">
      <a href={homeAnchor('#inicio')} className="brand" aria-label="K’plan, inicio"><img src={logo} width={100} height={46} alt="K’plan" /></a>
      <div className="nav-links">{navItems.map(item => <a href={homeAnchor(item.href)} key={item.href}>{item.label}</a>)}</div>
      <div className="nav-actions"><ButtonLink href={homeAnchor('#piloto')} className="nav-cta">Unirme al piloto</ButtonLink>
        <button ref={trigger} type="button" className="icon-button menu-trigger" aria-expanded={open} aria-controls="mobile-navigation"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setOpen(v => !v)}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
      </div>
      <div ref={panel} className="mobile-navigation" id="mobile-navigation" data-open={open} inert={!open}
        onBlur={e => { if (open && e.relatedTarget && !e.currentTarget.contains(e.relatedTarget as Node) && e.relatedTarget !== trigger.current) close(); }}>
        {navItems.map(item => <a href={homeAnchor(item.href)} key={item.href} onClick={() => close()}>{item.label}<ArrowUpRight size={18} aria-hidden="true" /></a>)}
        <a href={homeAnchor('#piloto')} onClick={() => close()}>Unirme al piloto<ArrowUpRight size={18} aria-hidden="true" /></a>
      </div>
    </nav>
  </header>;
}
