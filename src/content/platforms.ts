import { Laptop, Monitor, Smartphone } from 'lucide-react';
import type { Platform } from '@/lib/api';

export const platforms: Record<Platform, { label: string; format: string; icon: typeof Smartphone; hint: string }> = {
  android: { label: 'Android', format: 'APK', icon: Smartphone, hint: 'Bajá el APK desde Drive y abrilo. Android te pide permitir la instalación desde tu navegador.' },
  windows: { label: 'Windows', format: 'EXE', icon: Monitor, hint: 'Bajá el instalador desde Drive, abrilo y seguí los pasos. Windows puede pedirte que confirmes la instalación.' },
  macos: { label: 'macOS', format: 'DMG', icon: Laptop, hint: 'Bajá el DMG desde Drive, abrilo y arrastrá K’plan a la carpeta Aplicaciones.' },
};

export const byPlatform = <T extends { platform: Platform }>(items: T[]) => {
  const order: Platform[] = ['android', 'windows', 'macos'];
  return items.filter(item => item.platform in platforms).sort((a, b) => order.indexOf(a.platform) - order.indexOf(b.platform));
};
