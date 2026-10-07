import { useState } from 'react';
import { ArrowUpRight, Check, Compass, MapPin } from 'lucide-react';
import { creativeCities, territoryRegions, regionForCity, regionLabel } from '@/content/creative-territory';
import type { CreativeCity } from '@/content/creative-territory';

export function CreativeTerritory() {
  const [selectedId, setSelectedId] = useState('granada');
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState('');
  const selected = creativeCities.find(city => city.id === selectedId)!;
  const displayed = creativeCities.find(city => city.id === (previewId ?? selectedId))!;
  const activeRegion = regionForCity(displayed);
  const choose = (city: CreativeCity) => {
    setSelectedId(city.id);
    setPreviewId(null);
    setAnnouncement(`${city.name}. ${regionLabel(city)}. ${city.description}`);
  };
  const firstInRegion = (cities: CreativeCity[]) => cities.find(city => city.id === selectedId) ?? cities[0];

  return <section id="territorio" className="section territory-section" aria-labelledby="territory-title">
    <div className="container">
      <div className="section-heading territory-heading">
        <div><p className="section-label"><Compass size={18} aria-hidden="true" />La Nicaragua creativa</p><h2 id="territory-title">Diez ciudades.<br />Un país por descubrir.</h2></div>
        <p>Del Pacífico al Caribe, cada lugar tiene algo propio que compartir. Elegí una ciudad y acercate a su historia.</p>
      </div>
      <div className="territory-layout" onPointerLeave={() => setPreviewId(null)}>
        <div className="territory-map-column">
          <div className="territory-map-frame">
            <svg className="territory-map" viewBox="-22 -22 1027 918" role="group" aria-labelledby="map-title map-description">
              <title id="map-title">Ciudades creativas de Nicaragua por departamento y región</title>
              <desc id="map-description">Las ocho divisiones resaltadas contienen las diez ciudades. También podés elegirlas en el índice junto al mapa.</desc>
              <g aria-hidden="true" className="map-base">
                {territoryRegions.map(region => <path key={region.id} d={region.d} className={region.cities.length ? 'map-land map-land--creative' : 'map-land'} />)}
              </g>
              {/* Static hit areas stay above these visual layers: lifting never changes the hover target. */}
              <g aria-hidden="true" className="map-depth-layers">
                {territoryRegions.filter(region => region.cities.length).map(region => <g key={region.id} data-region={region.id} data-active={activeRegion.id === region.id}>
                  <path d={region.d} className="map-region-depth" />
                  <path d={region.d} className="map-region-face" />
                </g>)}
              </g>
              <g className="map-controls">
                {territoryRegions.filter(region => region.cities.length).map(region => <path key={region.id} d={region.d}
                  data-region-control={region.id} className="map-region-control" role="button" tabIndex={0}
                  aria-label={`${region.name}: ${region.cities.map(city => city.name).join(' y ')}`}
                  aria-pressed={selected.regionId === region.id} aria-controls="territory-details"
                  onPointerEnter={event => {
                    if (event.pointerType !== 'touch' && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
                      document.documentElement.dataset.input = 'pointer';
                      setPreviewId(firstInRegion(region.cities).id);
                    }
                  }}
                  onFocus={() => setPreviewId(firstInRegion(region.cities).id)} onBlur={() => setPreviewId(null)}
                  onClick={() => choose(firstInRegion(region.cities))}
                  onKeyDown={event => {
                    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); choose(firstInRegion(region.cities)); }
                    if (event.key === 'Escape') setPreviewId(null);
                  }} />)}
              </g>
            </svg>
            <span className="map-ocean map-ocean--pacific" aria-hidden="true">Océano<br />Pacífico</span>
            <span className="map-ocean map-ocean--caribbean" aria-hidden="true">Mar<br />Caribe</span>
          </div>
          <div className="map-caption"><MapPin size={18} aria-hidden="true" /><p>{regionLabel(displayed)}<span>{activeRegion.cities.map(city => city.name).join(' · ')}</span></p></div>
          <p className="map-legend"><span aria-hidden="true" />Departamentos y regiones con ciudades de la red</p>
        </div>
        <div className="territory-explorer">
          <p className="city-index-label" id="city-index-label">Elegí tu punto de partida <span>01 — 10</span></p>
          <div className="city-index" role="group" aria-labelledby="city-index-label">
            {creativeCities.map((city, index) => <button type="button" key={city.id} data-city={city.id}
              data-preview={displayed.id === city.id} data-related={activeRegion.id === city.regionId}
              aria-pressed={selectedId === city.id} aria-controls="territory-details"
              onClick={() => choose(city)} onFocus={() => setPreviewId(city.id)} onBlur={() => setPreviewId(null)}>
              <span className="city-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><span>{city.name}</span>
              {selectedId === city.id && <Check size={15} aria-hidden="true" />}
            </button>)}
          </div>
          <div id="territory-details" className="city-detail-stack">
            {creativeCities.map(city => <article key={city.id} className="city-detail" data-visible={city.id === displayed.id}
              aria-hidden={city.id !== displayed.id} inert={city.id !== displayed.id} aria-labelledby={`city-title-${city.id}`}>
              <p className="city-theme">{city.theme}</p><h3 id={`city-title-${city.id}`}>{city.name}</h3>
              <p className="city-location"><MapPin size={15} aria-hidden="true" />{regionLabel(city)}</p>
              <p className="city-description">{city.description}</p>
              <a href={city.source} target="_blank" rel="noreferrer" className="text-link">Conocé su cultura<span className="sr-only"> (abre una fuente externa en otra pestaña)</span><ArrowUpRight size={16} aria-hidden="true" /></a>
            </article>)}
          </div>
          <p className="territory-status" role="status">{announcement}</p>
        </div>
      </div>
      <p className="territory-note">Estas ciudades inspiran K’plan. Los circuitos y la disponibilidad del piloto se confirmarán antes del lanzamiento.</p>
    </div>
  </section>;
}
