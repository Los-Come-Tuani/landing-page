import type { DemoStep, Experience } from '@/types/landing';

export const navItems = [
  { label: 'Cómo funciona', href: '#producto' },
  { label: 'Qué descubrir', href: '#ciudades' },
  { label: 'Para aliados', href: '#aliados' },
  { label: 'Descargar', href: '#descargar' },
];
export const demoSteps: DemoStep[] = [
  { title: 'Descubrí lo que te rodea', description: 'Circuitos, lugares y eventos. Un punto de partida para encontrar tu próximo plan.', screen: 'home', label: 'Explorá el mapa', detail: 'El mapa y los circuitos se encuentran en la misma pantalla. Así empieza un recorrido por Granada.' },
  { title: 'Elegí tu circuito', description: 'Conocé las paradas, el tiempo del recorrido y esos detalles que hacen la diferencia.', screen: 'circuit', label: 'Conocé el recorrido', detail: 'Una vista del circuito reúne su descripción y los detalles que te ayudan a elegir antes de salir.' },
  { title: 'Organizá la visita', description: 'Elegí la fecha, quiénes te acompañan y el horario que va con vos.', screen: 'planning', label: 'Dale espacio en tu agenda', detail: 'La selección de horario es parte de la planificación. Esta vista previa no realiza una reserva.' },
];
export const experiences: Experience[] = [
  { id: 'granada', city: 'Granada', category: 'Historia y ciudad', title: 'Historias que se recorren a pie.', description: 'Calles de colores, arquitectura y una pausa para conocer el sabor local.', image: 'granada', alt: 'Cúpula de la catedral de Granada al final de la tarde, con el lago al fondo.', details: ['Empezá por el centro histórico y sus espacios públicos.', 'Dejá tiempo para descubrir la gastronomía y conversar con la gente del lugar.', 'La demo de K’plan muestra cómo organizar un circuito de ejemplo en Granada.'] },
  { id: 'masaya', city: 'Masaya', category: 'Paisaje y territorio', title: 'La fuerza de un paisaje vivo.', description: 'El cráter Santiago del Volcán Masaya muestra otra cara del territorio nicaragüense.', image: 'masaya', alt: 'Cráter Santiago del Volcán Masaya, con la Cruz de Bobadilla al fondo y gases sobre sus paredes rocosas.', details: ['El Volcán Masaya forma parte del paisaje del departamento de Masaya.', 'La fotografía muestra el cráter Santiago desde la Plaza de Oviedo, con la Cruz de Bobadilla al fondo.', 'Esta imagen inspira el recorrido. El acceso, las condiciones de visita y los circuitos deben consultarse con las autoridades del parque.'] },
  { id: 'leon', city: 'León', category: 'Cultura y patrimonio', title: 'Otra forma de mirar la ciudad.', description: 'Arquitectura, memoria y perspectivas que invitan a detenerse.', image: 'leon', alt: 'Cúpulas y balaustrada blanca del techo de la catedral de León bajo un cielo azul.', details: ['Descubrí los detalles de la arquitectura de la ciudad.', 'Conectá lugares, historias y talento local en tu próximo recorrido.', 'Las visitas, horarios y circuitos del piloto se anunciarán cuando estén confirmados.'] },
];
export const faqItems = [
  { question: '¿Ya puedo descargar K’plan?', answer: 'Cuando el equipo publica una versión del piloto, la encontrás en la sección Descargar de esta página, con el instalador para tu sistema. La versión para iPhone todavía no está disponible.' },
  { question: '¿La demostración permite reservar?', answer: 'No. Es una vista previa del diseño de la aplicación. Las fechas, precios, reseñas y cantidades que aparecen en las pantallas son ejemplos; no representan disponibilidad ni reservas reales.' },
  { question: '¿Cómo puede participar mi negocio?', answer: 'Registrá tu negocio en el portal de K’plan: completás los datos de tu emprendimiento, subís sus documentos y el equipo revisa la solicitud. Si querés conocer la plataforma antes, pedí una demostración desde esta página.' },
  { question: '¿Hay espacio para traductores y guías?', answer: 'Sí. Guías, traductores e intérpretes se postulan desde la app, con su cédula, su récord de policía y su licencia del INTUR o su certificado de idiomas. El equipo revisa los documentos antes de habilitar el acceso.' },
  { question: '¿Cómo pido una demostración?', answer: 'Completá el formulario de la sección Solicitá una demo con tus datos y los de tu organización. El equipo te escribe para coordinar una demostración guiada de la app y del portal.' },
  { question: '¿En qué ciudades estará disponible?', answer: 'K’plan se inspira en diez ciudades de la Red Nacional de Ciudades Creativas: Bluefields, Estelí, Granada, Juigalpa, León, Managua, Masaya, Matagalpa, Nagarote y San Juan de Oriente. Las ciudades y los circuitos disponibles durante el piloto se confirmarán antes del lanzamiento.' },
];
export const photoCredits = [
  { place: 'Volcán Masaya, cráter Santiago', author: 'Chicho96', source: 'https://commons.wikimedia.org/wiki/File:Cr%C3%A1ter_Santiago_del_Volc%C3%A1n_Masaya.jpg', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/' },
  { place: 'Granada', author: 'JacobKlinger', source: 'https://commons.wikimedia.org/wiki/File:Catedral_de_Granada_from_Bell_Tower.JPG', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/' },
  { place: 'León', author: 'Martin Kulldorff', source: 'https://commons.wikimedia.org/wiki/File:Leon_Catedral_Techo_4.jpg', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/' },
];
