import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
import { ContentPage } from '@/components/layout/ContentPage';

export function AboutPage() {
  return <ContentPage title="Sobre nosotros" intro="Estamos creando K’plan para acercarte a la cultura de Nicaragua y a las personas que le dan vida a cada recorrido.">
    <section aria-labelledby="about-origin">
      <h2 id="about-origin">Un punto de partida para descubrir</h2>
      <p>Las Ciudades Creativas de Nicaragua reúnen patrimonio, gastronomía, artesanía y saberes que merecen conocerse de cerca. Sin embargo, la información para recorrerlas suele estar dispersa entre mapas impresos, publicaciones en redes y agendas locales.</p>
      <p>K’plan nace de esa necesidad: reunir la oferta cultural en una experiencia que te ayude a descubrir, organizar y vivir tu próximo plan desde el celular.</p>
    </section>
    <section aria-labelledby="about-connections">
      <h2 id="about-connections">Los lugares y quienes los hacen posibles</h2>
      <p>Nuestra propuesta conecta los circuitos de las ciudades con los negocios locales, la agenda cultural y el talento de guías, traductores e intérpretes. Queremos que encontrar un recorrido también sea una oportunidad para conocer un oficio, probar un sabor y escuchar una historia del lugar.</p>
      <p>La experiencia se está construyendo alrededor de una app para viajeros y herramientas web para quienes comparten y mantienen la oferta local.</p>
    </section>
    <section aria-labelledby="about-people">
      <h2 id="about-people">Una propuesta que se construye con gente local</h2>
      <ul className="content-audiences">
        <li><strong>Viajeros nacionales y extranjeros.</strong> Personas que buscan conocer Nicaragua y organizar sus recorridos desde el celular.</li>
        <li><strong>Negocios y emprendimientos.</strong> Con prioridad inicial en la gastronomía, para dar visibilidad a quienes forman parte de la vida de cada ciudad.</li>
        <li><strong>Guías, traductores e intérpretes.</strong> Talento local que ayuda a comprender el territorio y a conectar con su cultura.</li>
        <li><strong>Alcaldías e instituciones culturales.</strong> Actores que pueden aportar circuitos y programación a esta experiencia compartida.</li>
      </ul>
    </section>
    <section className="content-closing" aria-labelledby="about-pilot">
      <p className="content-eyebrow">Piloto en preparación</p>
      <h2 id="about-pilot">Estamos dando los primeros pasos</h2>
      <p>Hoy podés explorar una demostración de la app. La descarga pública y las reservas todavía no están disponibles; las ciudades, los circuitos y las colaboraciones del piloto se confirmarán antes del lanzamiento.</p>
      <Link className="button button--primary" to="/#producto">Explorar la demo<ArrowUpRight size={18} aria-hidden="true" /></Link>
      <Link className="text-link" to="/empresa/mision">Conocé nuestra misión<ArrowUpRight size={18} aria-hidden="true" /></Link>
    </section>
  </ContentPage>;
}
