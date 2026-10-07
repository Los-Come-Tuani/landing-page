import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { HeaderNav } from '@/components/sections/HeaderNav';
import { Footer } from '@/components/sections/Footer';

export function SiteLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    const keyboard = (event: KeyboardEvent) => {
      if (!event.metaKey && !event.ctrlKey && !event.altKey) document.documentElement.dataset.input = 'keyboard';
    };
    const pointer = () => { document.documentElement.dataset.input = 'pointer'; };
    document.addEventListener('keydown', keyboard, true);
    document.addEventListener('pointerdown', pointer, true);
    return () => {
      document.removeEventListener('keydown', keyboard, true);
      document.removeEventListener('pointerdown', pointer, true);
    };
  }, []);
  return <><HeaderNav /><main id="contenido" tabIndex={-1}>{children}</main><Footer /></>;
}
