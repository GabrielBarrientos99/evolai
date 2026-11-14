// Cliente de la API local (00_general_youtube/panel/servidor.py), que corre en la PC del admin.
// Más adelante, para otros usuarios, estas mismas llamadas pueden apuntar a funciones de Supabase.
export const API_LOCAL = 'http://127.0.0.1:8770/api';

export async function llamar<T = any>(ruta: string, cuerpo?: object): Promise<T> {
  const r = await fetch(`${API_LOCAL}/${ruta}`, {
    method: cuerpo ? 'POST' : 'GET',
    headers: cuerpo ? {'Content-Type': 'application/json'} : undefined,
    body: cuerpo ? JSON.stringify(cuerpo) : undefined,
  });
  const datos = await r.json();
  if (!r.ok) throw new Error(datos.salida ?? datos.error ?? `HTTP ${r.status}`);
  return datos;
}

export const urlArchivo = (proyecto: string, archivo: string, version = '') =>
  `${API_LOCAL}/archivo?p=${encodeURIComponent(proyecto)}&f=${encodeURIComponent(archivo)}&v=${encodeURIComponent(version)}`;
