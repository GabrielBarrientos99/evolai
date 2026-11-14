// Datos generados por `python 00_general_youtube/herramientas/exportar_web.py` (no editar a mano).
import publicacionesJson from '../data/publicaciones.json';
import bakeoffsJson from '../data/bakeoffs.json';
import conexionesJson from '../data/conexiones.json';
import leccionesJson from '../data/lecciones.json';

export type Publicacion = {
  id: string;
  cuenta: string;
  canal: string | null;
  handle: string | null;
  titulo: string;
  serie: string;
  estado: 'publicado' | 'programado' | 'sin_publicar';
  estado_texto: string;
  hora_sugerida: string;
  video_id: string | null;
  url: string | null;
  programado_utc: string | null;
  publicado_utc: string | null;
  portada: string | null;
  videos: string[];
};

export type Bakeoff = {
  id: string;
  pruebas: {prueba: string; costo_usd: number; segundos_generacion: number}[];
  errores: {modelo: string; detalle: string}[];
};

export type Conexion = {servicio: string; cuenta: string | null; handle?: string | null; estado: string};
export type Leccion = {slug: string; titulo: string; origen: string};

export const publicaciones = publicacionesJson as Publicacion[];
export const bakeoffs = bakeoffsJson as Bakeoff[];
export const conexiones = conexionesJson as Conexion[];
export const lecciones = leccionesJson as Leccion[];

const textos = import.meta.glob('../data/lecciones/*.md', {query: '?raw', import: 'default', eager: true}) as Record<
  string,
  string
>;
export const textoLeccion = (slug: string) => textos[`../data/lecciones/${slug}.md`] ?? '';

export const ESTADO = {
  publicado: {label: 'Publicado', variant: 'success'},
  programado: {label: 'Programado', variant: 'info'},
  sin_publicar: {label: 'Sin publicar', variant: 'warning'},
} as const;

export const fechaPeru = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleString('es-PE', {
        timeZone: 'America/Lima',
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : '';

export const urlPublica = (ruta: string) => `${import.meta.env.BASE_URL}${ruta}`;
