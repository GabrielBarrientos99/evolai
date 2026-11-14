-- Esquema de Evolai en Supabase. Ejecutar en: Dashboard → SQL Editor → New query → Run.
-- Seguro de volver a ejecutar (idempotente).

-- 1. Perfiles: uno por usuario que inicia sesión. El rol decide quién ve el panel.
create table if not exists public.perfiles (
  id uuid primary key references auth.users on delete cascade,
  email text,
  nombre text,
  avatar_url text,
  rol text not null default 'usuario' check (rol in ('usuario', 'admin')),
  creado timestamptz not null default now()
);
alter table public.perfiles enable row level security;

drop policy if exists "cada uno ve su perfil" on public.perfiles;
create policy "cada uno ve su perfil" on public.perfiles
  for select using ((select auth.uid()) = id);
-- Sin políticas de insert/update: nadie puede cambiarse el rol desde la web.

-- 2. Correos administradores. Sin políticas: la web no puede leerla ni escribirla.
--    Agregar el tuyo a mano (no se guarda en el repositorio público):
--    insert into public.admins (email) values ('tu-correo@gmail.com');
create table if not exists public.admins (email text primary key);
alter table public.admins enable row level security;

-- 3. Al registrarse un usuario se crea su perfil; si su correo está en admins, entra como admin.
create or replace function public.nuevo_usuario()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.perfiles (id, email, nombre, avatar_url, rol)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.raw_user_meta_data ->> 'avatar_url',
    case when exists (select 1 from public.admins a where lower(a.email) = lower(new.email))
         then 'admin' else 'usuario' end
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists al_crear_usuario on auth.users;
create trigger al_crear_usuario
  after insert on auth.users
  for each row execute function public.nuevo_usuario();

-- 4. Si agregas un admin después de que ya inició sesión, actualiza su rol:
--    update public.perfiles set rol = 'admin' where lower(email) in (select lower(email) from public.admins);
