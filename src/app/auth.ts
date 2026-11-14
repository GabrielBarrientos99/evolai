import {useEffect, useState} from 'react';
import {createClient, type Session} from '@supabase/supabase-js';

// Valores PÚBLICOS (publishable key): pueden ir en la web. La seguridad la dan las políticas RLS
// de supabase/schema.sql. Se leen de .env.local en tu PC y de las variables del repo en GitHub Actions.
const URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

export const supabase = URL && KEY ? createClient(URL, KEY) : null;

export type Perfil = {id: string; email: string | null; nombre: string | null; avatar_url: string | null; rol: 'usuario' | 'admin'};

export async function entrar() {
  if (!supabase) return;
  // Volver a la misma página (sin el #hash, que Supabase usa para devolver la sesión)
  // y pedir siempre elegir cuenta: así se puede entrar con el Gmail del canal aunque haya otra sesión abierta.
  const {origin, pathname, search} = window.location;
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {redirectTo: origin + pathname + search, queryParams: {prompt: 'select_account'}},
  });
}

export async function salir() {
  await supabase?.auth.signOut();
}

export function useSesion() {
  const [sesion, setSesion] = useState<Session | null>(null);
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [cargando, setCargando] = useState(Boolean(supabase));

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({data}) => {
      setSesion(data.session);
      if (!data.session) setCargando(false);
    });
    const {data} = supabase.auth.onAuthStateChange((_evento, s) => setSesion(s));
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!supabase || !sesion) {
      setPerfil(null);
      return;
    }
    setCargando(true);
    supabase
      .from('perfiles')
      .select('id, email, nombre, avatar_url, rol')
      .eq('id', sesion.user.id)
      .maybeSingle()
      .then(({data}) => {
        setPerfil((data as Perfil | null) ?? null);
        setCargando(false);
      });
  }, [sesion]);

  return {sesion, perfil, cargando, esAdmin: perfil?.rol === 'admin', disponible: Boolean(supabase)};
}
