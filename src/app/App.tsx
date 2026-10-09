import { useState } from 'react';
import { createBrowserRouter, Outlet, ScrollRestoration } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { PageMetadata } from '@/components/layout/PageMetadata';
import { RouteFocus } from './RouteFocus';
import { AboutPage } from './pages/AboutPage';
import { MissionPage } from './pages/MissionPage';
import { ContactPage } from './pages/ContactPage';
import { ErrorPage } from './pages/ErrorPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CreativeCities } from '@/components/sections/CreativeCities';
import { EcosystemSection } from '@/components/sections/EcosystemSection';
import { FinalCta } from '@/components/sections/FinalCta';
import { CreativeTerritory } from '@/components/sections/CreativeTerritory';
import { DemoRequestSection } from '@/components/sections/DemoRequestSection';
import { DownloadSection } from '@/components/sections/DownloadSection';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { ToastProvider } from '@/components/ui/Toaster';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProductDemo } from '@/components/sections/ProductDemo';
import { PilotFaq } from '@/components/sections/PilotFaq';
import type { ParticipantProfile } from '@/types/landing';

function LandingPage() {
  const [profile, setProfile] = useState<ParticipantProfile>('negocio');
  return <>
      <PageMetadata title="K’plan · La Nicaragua creativa, en tu próximo plan" description="Descubrí la propuesta de K’plan: circuitos, lugares, eventos y talento local para explorar Nicaragua. Conocé la app y el piloto en preparación." />
      <HeroSection />
      <ProductDemo />
      <DownloadSection />
      <CreativeCities />
      <CreativeTerritory />
      <EcosystemSection onChoose={setProfile} />
      <DemoRequestSection />
      <PilotFaq />
      <FinalCta profile={profile} onChoose={setProfile} />
  </>;
}

const router = createBrowserRouter([{
  element: <ToastProvider><SiteLayout><Outlet /></SiteLayout><RouteFocus /><ScrollRestoration /></ToastProvider>,
  errorElement: <ErrorPage />,
  children: [
    { path: '/', element: <LandingPage /> },
    { path: '/empresa/sobre-nosotros', element: <AboutPage /> },
    { path: '/empresa/mision', element: <MissionPage /> },
    { path: '/contacto', element: <ContactPage /> },
    { path: '*', element: <NotFoundPage /> },
  ],
}]);

export function App() {
  return <RouterProvider router={router} />;
}
