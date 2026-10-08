import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
import { ContentPage } from '@/components/layout/ContentPage';

export function MissionPage() {
  return <ContentPage title="Nuestra misión" intro="Hacer más fácil descubrir y vivir la cultura de las Ciudades Creativas de Nicaragua, dando visibilidad a las personas y negocios locales que la hacen posible.">
    <p>Queremos que cada recorrido acerque a quienes visitan una ciudad con quienes la habitan. Que conocer un lugar también abra oportunidades para su gastronomía, sus oficios y su talento.</p>
    <section aria-labelledby="mission-discovery">
      <h2 id="mission-discovery">Facilitar el descubrimiento</h2>
      <p>Trabajamos para reunir circuitos, lugares y actividades culturales en una experiencia clara. Buscamos que podás encontrar información útil, elegir lo que te interesa y organizar un recorrido a tu ritmo.</p>
    </section>
    <section aria-labelledby="mission-local">
      <h2 id="mission-local">Mostrar el talento local</h2>
      <p>Queremos acercar a los viajeros a los negocios, guías, traductores e intérpretes de cada ciudad. Nuestra propuesta empieza por dar visibilidad a las MiPymes gastronómicas y al talento local, con la intención de ampliar las oportunidades que el turismo puede generar en las comunidades.</p>
    </section>
    <section aria-labelledby="mission-clarity">
      <h2 id="mission-clarity">Comunicar con claridad</h2>
      <p>Nos comprometemos a distinguir lo que ya se puede usar de lo que sigue en preparación. Los recorridos, las credenciales y las colaboraciones deben comunicarse de acuerdo con su estado real, para que tengás información clara al decidir.</p>
      <p>Actualmente estamos preparando el piloto. Las pantallas de la app son una vista previa: sus fechas, precios y valoraciones son ejemplos, y no permiten realizar reservas.</p>
    </section>
    <section className="content-closing" aria-labelledby="mission-conversation">
      <h2 id="mission-conversation">Conversemos sobre lo que viene</h2>
      <p>Si esta propuesta conecta con tu ciudad, tu negocio o tu trabajo, podés escribirnos para conversar sobre K’plan.</p>
      <Link className="button button--primary" to="/contacto">Contactanos<ArrowUpRight size={18} aria-hidden="true" /></Link>
    </section>
  </ContentPage>;
}
