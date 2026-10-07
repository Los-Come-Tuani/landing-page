import geometry from './nicaragua-regions.json';

export type CreativeRegionId = 'esteli' | 'leon' | 'managua' | 'masaya' | 'granada' | 'matagalpa' | 'chontales' | 'costa-caribe-sur';
export type CreativeCity = {
  id: string;
  name: string;
  regionId: CreativeRegionId;
  theme: string;
  description: string;
  source: string;
};

// Editorial summaries, not availability or partnerships. Sources checked 2026-10-05.
export const creativeCities: CreativeCity[] = [
  { id: 'bluefields', name: 'Bluefields', regionId: 'costa-caribe-sur', theme: 'Memoria del Caribe', description: 'El Paseo de la Autonomía, sus espacios comunitarios y el arte local cuentan la historia multicultural de la Costa Caribe.', source: 'https://www.nicaraguacreativa.com/2021/05/14/ciudad-creativa-bluefields/' },
  { id: 'esteli', name: 'Estelí', regionId: 'esteli', theme: 'Música y muralismo', description: 'Murales, música segoviana y espacios de creación dan forma a una ciudad donde el arte también se encuentra en la calle.', source: 'https://www.nicaraguacreativa.com/2021/05/27/ciudad-creativa-esteli/' },
  { id: 'granada', name: 'Granada', regionId: 'granada', theme: 'Historia a cada paso', description: 'Plazas, fachadas y espacios culturales reúnen la memoria de Granada con el trabajo de sus artistas y artesanos.', source: 'https://www.nicaraguacreativa.com/2021/05/27/ciudad-creativa-granada/' },
  { id: 'juigalpa', name: 'Juigalpa', regionId: 'chontales', theme: 'Herencia y aprendizaje', description: 'Museos, arqueología y expresiones artísticas acercan a la historia de Chontales y a los saberes de su comunidad.', source: 'https://www.nicaraguacreativa.com/2026/06/01/ciudad-creativa-de-juigalpa/' },
  { id: 'leon', name: 'León', regionId: 'leon', theme: 'Una ciudad que cuenta', description: 'La memoria de Rubén Darío, sus museos y escenarios culturales conectan la literatura con la vida de la ciudad.', source: 'https://www.nicaraguacreativa.com/2021/05/27/ciudad-creativa-leon/' },
  { id: 'managua', name: 'Managua', regionId: 'managua', theme: 'Cultura que se encuentra', description: 'Teatros, casas de cultura y espacios de encuentro reúnen música, danza, literatura y nuevas expresiones artísticas en la capital.', source: 'https://www.nicaraguacreativa.com/2026/05/28/ciudad-creativa-de-managua/' },
  { id: 'masaya', name: 'Masaya', regionId: 'masaya', theme: 'Tradición en movimiento', description: 'Artesanía, gastronomía y arte popular mantienen viva una herencia que se comparte entre talleres y espacios culturales.', source: 'https://www.nicaraguacreativa.com/2021/05/26/ciudad-creativa-masaya/' },
  { id: 'matagalpa', name: 'Matagalpa', regionId: 'matagalpa', theme: 'Raíces y café', description: 'La tradición cafetalera, el tejido y la cerámica se encuentran con la historia indígena y la creatividad de su gente.', source: 'https://www.nicaraguacreativa.com/2026/05/28/ciudad-creativa-de-matagalpa/' },
  { id: 'nagarote', name: 'Nagarote', regionId: 'leon', theme: 'Sabores con historia', description: 'El quesillo y la antigua estación del ferrocarril forman parte de la memoria gastronómica y cotidiana de Nagarote.', source: 'https://www.mapanicaragua.com/municipio-de-nagarote/' },
  { id: 'san-juan-de-oriente', name: 'San Juan de Oriente', regionId: 'masaya', theme: 'La tierra hecha arte', description: 'Generaciones de alfareros transforman la arcilla en cerámica. Sus talleres conservan un oficio que sigue creando nuevas formas.', source: 'https://www.nicaraguacreativa.com/2021/05/27/ciudad-creativa-san-juan-de-oriente/' },
];

export const territoryRegions = geometry.map(region => ({
  ...region,
  cities: creativeCities.filter(city => city.regionId === region.id),
}));
export function regionForCity(city: CreativeCity) {
  return territoryRegions.find(region => region.id === city.regionId)!;
}
export function regionLabel(city: CreativeCity) {
  const region = regionForCity(city);
  return region.id.startsWith('costa-caribe') ? region.name : `Departamento de ${region.name}`;
}
