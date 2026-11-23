import type {ComponentType, SVGProps} from 'react';
import {CommandLineIcon, CpuChipIcon, MicrophoneIcon, FilmIcon, MegaphoneIcon, GlobeAltIcon} from '@heroicons/react/24/outline';

// Catálogo de cursos. `lecciones` son slugs de src/data/lecciones/*.md (los genera exportar_web.py),
// salvo 'pruebas', que es la tabla de resultados reales de los bake-offs.
export type Curso = {
  id: string;
  titulo: string;
  resumen: string;
  tipo: 'gratis' | 'pago';
  precio?: string;
  portada?: string; // ruta dentro de public/
  icono: ComponentType<SVGProps<SVGSVGElement>>;
  nivel: string;
  lecciones: {slug: string; titulo: string}[];
};

export const CURSOS: Curso[] = [
  {
    id: 'marketing-meta',
    titulo: 'Anuncios en Meta para tu negocio',
    resumen:
      'Cómo funciona hoy el algoritmo de Meta, cómo configurar Business Manager y WhatsApp, el plan por fases y los 4 tipos de campaña que usamos (WhatsApp, video, formulario y ventas con píxel), paso a paso.',
    tipo: 'gratis',
    portada: 'curso/img/meta/portada.jpg',
    icono: MegaphoneIcon,
    nivel: 'Principiante',
    lecciones: [
      {slug: 'meta-01-algoritmo', titulo: 'Lección 1 · Cómo funciona hoy el algoritmo de Meta'},
      {slug: 'meta-02-business-manager', titulo: 'Lección 2 · Configura Business Manager, página y WhatsApp'},
      {slug: 'meta-03-competencia', titulo: 'Lección 3 · Investiga a tu competencia y tu mercado'},
      {slug: 'meta-04-plan-fases', titulo: 'Lección 4 · El plan por fases para lanzar campañas'},
      {slug: 'meta-05-creativos-ia', titulo: 'Lección 5 · Creativos: capturas reales y fondos con IA'},
      {slug: 'meta-06-crear-campana', titulo: 'Lección 6 · Crea tu campaña a WhatsApp y entiende cómo aprende Meta'},
      {slug: 'meta-07-tipos-campana', titulo: 'Lección 7 · Qué tipo de campaña usar y cuándo'},
      {slug: 'meta-08-campana-video', titulo: 'Lección 8 · Campaña de video para que te conozcan (ThruPlay)'},
      {slug: 'meta-09-formulario-whatsapp', titulo: 'Lección 9 · Anuncio con formulario que termina en WhatsApp'},
      {slug: 'meta-10-ventas-pixel', titulo: 'Lección 10 · Campaña de Ventas con el píxel'},
      {slug: 'meta-11-ver-clientes-formulario', titulo: 'Lección 11 · Dónde ver a quien llenó tu formulario'},
      {slug: 'meta-12-pruebas-zoom-video-precios', titulo: 'Lección 12 · Tres pruebas para vender sin conversar: Zoom, video y precios'},
      {slug: 'meta-13-escalar-anuncio-ganador', titulo: 'Lección 13 · Escalar un anuncio ganador con el ID de su publicación'},
      {slug: 'meta-14-tech-provider-whatsapp', titulo: 'Lección 14 · Hazte Tech Provider de WhatsApp: la revisión de Meta paso a paso'},
    ],
  },
  {
    id: 'api-youtube',
    titulo: 'Automatiza tu canal con la API de YouTube',
    resumen:
      'Crea tu proyecto en Google Cloud, publica tu app con GitHub Pages y sube o programa videos sin abrir YouTube Studio.',
    tipo: 'gratis',
    portada: 'tutorial/img/02-api-habilitada.jpg',
    icono: CommandLineIcon,
    nivel: 'Principiante',
    lecciones: [
      {slug: 'tutorial-gratis', titulo: 'Paso a paso: API de YouTube y publicar tu app'},
      {slug: 'conexion-youtube', titulo: 'Estructura del proyecto y credenciales'},
    ],
  },
  {
    id: 'dominio-propio',
    titulo: 'Tu web con dominio propio en GitHub Pages',
    resumen:
      'Qué aguanta GitHub Pages, dónde comprar tu dominio y cuánto cuesta, cómo conectarlo con candado (HTTPS), qué cambiar después en Google, Supabase y Meta, y cómo guardar reservas y pagos gratis con Cloudflare D1.',
    tipo: 'gratis',
    icono: GlobeAltIcon,
    nivel: 'Principiante',
    lecciones: [
      {slug: 'dominio-01-github-pages', titulo: 'Lección 1 · Qué aguanta GitHub Pages (y qué no)'},
      {slug: 'dominio-02-comprar', titulo: 'Lección 2 · Dónde comprar tu dominio y cuánto cuesta'},
      {slug: 'dominio-03-conectar', titulo: 'Lección 3 · Conecta tu dominio a GitHub Pages'},
      {slug: 'dominio-04-despues', titulo: 'Lección 4 · Qué cambiar después: Google, Supabase y Meta'},
      {slug: 'dominio-05-base-de-datos-d1', titulo: 'Lección 5 · Guarda reservas y pagos gratis con Cloudflare D1'},
    ],
  },
  {
    id: 'replicate',
    titulo: 'Conecta Replicate y genera video con IA barato',
    resumen: 'Tu token de Replicate, cómo correr modelos de video e imagen y cuánto cuesta realmente cada clip.',
    tipo: 'gratis',
    portada: 'portadas/2026-11-14_6ias-mismo-dinosaurio_parte1.jpg',
    icono: CpuChipIcon,
    nivel: 'Principiante',
    lecciones: [
      {slug: 'conexion-replicate', titulo: 'Conectar tu cuenta y comandos'},
      {slug: 'costos-replicate', titulo: 'Costos: Replicate frente a otras plataformas'},
    ],
  },
  {
    id: 'voces',
    titulo: 'Voces con IA gratis y de pago',
    resumen: 'Voz en off para tus Shorts: opciones gratis locales y servicios de pago, con muestras y comparativa.',
    tipo: 'gratis',
    icono: MicrophoneIcon,
    nivel: 'Principiante',
    lecciones: [{slug: 'voces', titulo: 'Elegir y generar voces'}],
  },
  {
    id: 'shorts-ia',
    titulo: 'Shorts con IA de punta a punta',
    resumen:
      'Compara modelos con un bake-off, voz expresiva, edición profesional en Remotion y publicación programada. Con pruebas y costos reales.',
    tipo: 'pago',
    precio: 'Próximamente',
    portada: 'portadas/2026-11-14_6ias-mismo-dinosaurio_parte2.jpg',
    icono: FilmIcon,
    nivel: 'Intermedio',
    lecciones: [
      {slug: 'estrategia', titulo: 'Lección 0 · Estrategia para monetizar tu canal de Shorts'},
      {slug: 'leccion-01', titulo: 'Lección 1 · Compara 6 IAs de video y conviértelo en un Short'},
      {slug: 'leccion-02', titulo: 'Lección 2 · Personajes consistentes para una serie'},
      {slug: 'leccion-03', titulo: 'Lección 3 · Del guion a las escenas: episodio piloto'},
      {slug: 'leccion-04', titulo: 'Lección 4 · Montaje en Remotion: textos, música y loop'},
      {slug: 'leccion-05', titulo: 'Lección 5 · Subir y programar con la API de YouTube'},
      {slug: 'pruebas', titulo: 'Pruebas y costos reales'},
    ],
  },
];

export const cursoPorId = (id: string) => CURSOS.find(c => c.id === id);
