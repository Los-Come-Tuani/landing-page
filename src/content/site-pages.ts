export type FooterGroup = 'Empresa' | 'Legal' | 'Soporte';
export type PageTemplate = 'editorial' | 'blog' | 'contact' | 'legal' | 'help' | 'faq' | 'report';
export type SitePage = {
  title: string;
  path: string;
  group: FooterGroup;
  template: PageTemplate;
  purpose: string;
  status: 'planned' | 'published';
};

// Roadmap only. Publish together with the real page, its route and reviewed content.
// Never point a published entry to an empty page or an anchor on the landing.
export const sitePages: SitePage[] = [
  { title: 'Sobre nosotros', path: '/empresa/sobre-nosotros', group: 'Empresa', template: 'editorial', purpose: 'Qué es K’plan, a quién conecta y en qué etapa se encuentra.', status: 'planned' },
  { title: 'Misión', path: '/empresa/mision', group: 'Empresa', template: 'editorial', purpose: 'Descubrimiento cultural, talento local y valor para las comunidades.', status: 'planned' },
  { title: 'Blog', path: '/blog', group: 'Empresa', template: 'blog', purpose: 'Índice de historias y novedades, con artículos en /blog/:slug.', status: 'planned' },
  { title: 'Contacto', path: '/contacto', group: 'Empresa', template: 'contact', purpose: 'Canales reales de contacto y orientación por tipo de consulta.', status: 'planned' },
  { title: 'Términos', path: '/legal/terminos', group: 'Legal', template: 'legal', purpose: 'Condiciones del servicio que esté efectivamente disponible.', status: 'planned' },
  { title: 'Privacidad', path: '/legal/privacidad', group: 'Legal', template: 'legal', purpose: 'Datos tratados, finalidad, conservación y canales para ejercer derechos.', status: 'planned' },
  { title: 'Cookies', path: '/legal/cookies', group: 'Legal', template: 'legal', purpose: 'Tecnologías utilizadas y controles que realmente existan.', status: 'planned' },
  { title: 'Legal', path: '/legal/aviso-legal', group: 'Legal', template: 'legal', purpose: 'Identidad del responsable, propiedad intelectual y créditos.', status: 'planned' },
  { title: 'Centro de ayuda', path: '/ayuda', group: 'Soporte', template: 'help', purpose: 'Guías agrupadas por viajeros, negocios y talento local.', status: 'planned' },
  { title: 'FAQ', path: '/ayuda/faq', group: 'Soporte', template: 'faq', purpose: 'Preguntas y respuestas compartidas con la landing, sin duplicar contenido.', status: 'planned' },
  { title: 'Reportar', path: '/ayuda/reportar', group: 'Soporte', template: 'report', purpose: 'Reporte de errores o contenido con un canal de recepción real.', status: 'planned' },
];
export const footerGroups: FooterGroup[] = ['Empresa', 'Legal', 'Soporte'];
export const footerPageGroups = footerGroups.map(title => ({
  title, pages: sitePages.filter(page => page.group === title),
}));

// Valid on the landing and on future independent pages.
export const homeAnchor = (hash: string) => `/${hash}`;
