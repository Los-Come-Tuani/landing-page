import type { ScreenName } from '@/types/landing';
import { cn } from '@/lib/cn';
import { Img } from './Img';
export function AppPreview({ screen, eager = false, className }: { screen: ScreenName; eager?: boolean; className?: string }) {
  return <div className={cn('app-preview', className)}>
    <Img src={'/media/app-' + screen + '-375.webp'} srcSet={'/media/app-' + screen + '-375.webp 375w, /media/app-' + screen + '-750.webp 750w'}
      sizes="(max-width: 600px) 250px, 280px" width={375} height={812} loading={eager ? 'eager' : 'lazy'} decoding="async"
      alt={screen === 'home' ? 'Pantalla de inicio de K’plan con un mapa y circuitos.' : screen === 'circuit' ? 'Vista previa del circuito de Granada en K’plan.' : 'Vista previa de la selección de horario para organizar una visita.'} />
  </div>;
}
