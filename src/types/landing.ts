import type { PhotoName } from '@/content/photos';
export type ParticipantProfile = 'viajero' | 'negocio' | 'traductor';
export type ScreenName = 'home' | 'circuit' | 'planning';
export type DemoStep = { title: string; description: string; screen: ScreenName; label: string; detail: string };
export type Experience = { id: string; city: string; category: string; title: string; description: string; image: PhotoName; alt: string; details: string[] };
