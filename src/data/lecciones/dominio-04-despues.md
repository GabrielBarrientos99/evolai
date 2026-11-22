---
formato: afiche
eyebrow: Curso Dominio propio · Lección 4 · después del cambio
titular: Qué cambiar después: *Google, Supabase y Meta*
bajada: Tu web ya abre con el dominio nuevo. Ahora hay que avisarles a los servicios que tenían guardada la dirección vieja, para que el inicio de sesión, la app de Google y el píxel de Meta sigan funcionando.
estado: Lista de revisión · 6 pasos
pie: Rutas de los menús revisadas el 20 nov 2026; los nombres pueden cambiar un poco según el idioma de cada servicio.
ficha:
  Google Cloud: página de inicio, privacidad y dominio autorizado
  Supabase: Site URL y Redirect URLs
  Meta: verificar el dominio en tu porfolio
  Anuncios: URL de destino con el dominio nuevo
---

# Lección 4 · Qué cambiar después del dominio nuevo

## ¿Por qué hay que avisar?

### Qué pasa si no

- **Google** puede marcar tu app (la de la API de YouTube) si la página de inicio y la de privacidad registradas ya no coinciden con tu web.
- **Supabase** devuelve a la gente a la dirección vieja después de iniciar sesión, o directamente no la deja entrar.
- **Meta** no deja verificar un dominio de `github.io` (no es tuyo). Con tu dominio, sí.

### Por qué así

- La dirección vieja **redirige** a la nueva, pero estos servicios comparan la dirección **exacta**.
- Se hace una sola vez, en unos 30 minutos.
- Hazlo apenas tengas el candado (HTTPS) de la Lección 3.

## Los 6 pasos

### 01 · Google Cloud: datos de la marca

**Qué haces:** En Google Cloud → **Google Auth Platform** → **Información de la marca**: cambia la **página principal**, la **política de privacidad** y agrega tu dominio en **Dominios autorizados**.

**Por qué:** Google revisa que esas direcciones sean tuyas y que expliquen para qué usas la API.

> **Ojo:** Google puede pedir que vuelvas a enviar la app a revisión. Mientras tanto, la app sigue funcionando para ti.

### 02 · Google Search Console: verifica el dominio

**Qué haces:** En **search.google.com/search-console** → agrega tu dominio → verifica con el registro **TXT** que te da Google (en el DNS del registrador).

**Por qué:** Es la forma en que Google comprueba que el dominio es tuyo, y lo pide para el paso 01.

### 03 · Supabase: direcciones de inicio de sesión

**Qué haces:** En Supabase → **Authentication** → **URL Configuration**: pon tu dominio en **Site URL** y agrégalo en **Redirect URLs** (por ejemplo `https://tunegocio.pe/**`).

**Por qué:** Después de iniciar sesión con Google, Supabase solo devuelve a la gente a direcciones de esa lista.

> **Ojo:** deja también la dirección vieja unos días, por si alguien tenía la página abierta.

### 04 · Meta: verifica el dominio

**Qué haces:** En tu porfolio de Meta → **Configuración** → **Seguridad de la marca** → **Dominios** → **Añadir** → verifica con el registro **TXT** que te da Meta.

**Por qué:** Con el dominio verificado, Meta confía en los eventos del píxel de tu web y puedes configurarlos sin trabas.

### 05 · Anuncios: cambia la URL de destino

**Qué haces:** En cada anuncio que lleva a tu web, cambia la URL por la del dominio nuevo.

**Por qué:** La vieja redirige, pero cada salto hace más lenta la carga. Directo es mejor.

> **Ojo:** editar el anuncio lo manda a revisión otra vez. Hazlo en un momento tranquilo.

### 06 · Tus redes y tu firma

**Qué haces:** Actualiza el enlace en Instagram, Facebook, WhatsApp Business, tu firma de correo y tus PDF.

**Por qué:** Es lo que más ven tus clientes. Un dominio propio da más confianza que `github.io`.

## Lo que sigue

### Tu tarea

- Marca cada paso cuando lo termines.
- A la semana, abre tu web desde el anuncio y desde Google para confirmar que todo llega al dominio nuevo.

### Dónde queda guardado

- **Google:** Google Auth Platform → Información de la marca.
- **Supabase:** Authentication → URL Configuration.
- **Meta:** Configuración del porfolio → Seguridad de la marca → Dominios.
- **Volver al inicio del curso:** [Lección 1](#dominio-propio/dominio-01-github-pages).
