import { useState } from 'react';
import { CreativeCities } from '@/components/sections/CreativeCities';
import { EcosystemSection } from '@/components/sections/EcosystemSection';
import { FinalCta } from '@/components/sections/FinalCta';
import { CreativeTerritory } from '@/components/sections/CreativeTerritory';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProductDemo } from '@/components/sections/ProductDemo';
import { PilotFaq } from '@/components/sections/PilotFaq';
import type { ParticipantProfile } from '@/types/landing';

export function App() {
  const [profile, setProfile] = useState<ParticipantProfile>('negocio');
  return <SiteLayout>
      <HeroSection />
      <ProductDemo />
      <CreativeCities />
      <CreativeTerritory />
      <EcosystemSection onChoose={setProfile} />
      <PilotFaq />
      <FinalCta profile={profile} onChoose={setProfile} />
  </SiteLayout>;
}
