# Tutorial gratis · Automatiza tu canal de YouTube con su API

> **Resultado:** tu propio proyecto en Google Cloud con la **YouTube Data API v3**, una app OAuth **publicada** con su página web y su política de privacidad en **GitHub Pages**, y tus credenciales listas para subir y programar videos sin abrir YouTube Studio.
> **Costo:** US$ 0. **Tiempo:** 1–2 horas (más la espera de la revisión de Google, si la pide).

## Lo que necesitas
- Una cuenta de Google que sea **propietaria** del canal de YouTube.
- Una cuenta de GitHub (gratis): <https://github.com/signup>.
- Un logo cuadrado de tu canal (120×120 px, PNG o JPG).

## Cómo funciona (en 30 segundos)
1. **Google Cloud** es donde vive tu "app": allí activas la API de YouTube y creas tus credenciales.
2. Google exige que la app tenga una **página principal** y una **política de privacidad** públicas. Las publicas gratis con **GitHub Pages**.
3. Al autorizar la app con tu cuenta, Google te entrega un **token**. Con ese token tus scripts (o la web) suben y programan videos en tu canal.

Tus credenciales son **tuyas**: viven en tu PC o en tu navegador. Nadie más (ni este curso) las necesita.

---

## Paso 1 · Crea el proyecto en Google Cloud
1. Entra a <https://console.cloud.google.com/projectcreate>.
2. **Nombre del proyecto:** el de tu app, por ejemplo `Automatizacion Videos`. **Organización:** "Sin organización".
3. Pulsa **Crear** y, arriba a la izquierda, comprueba que ese proyecto quedó seleccionado.

## Paso 2 · Activa la YouTube Data API v3
1. Ve a **APIs y servicios → Biblioteca**: <https://console.cloud.google.com/apis/library/youtube.googleapis.com>.
2. Pulsa **Habilitar**.

## Paso 3 · Configura la pantalla de permisos (Google Auth Platform)
1. Ve a <https://console.cloud.google.com/auth/overview> y pulsa **Comenzar**.
2. **Información de la app:** nombre de la app y tu correo de asistencia.
3. **Público:** elige **Externo** (es lo que corresponde a una cuenta de Gmail).
4. **Información de contacto:** tu correo.
5. **Finalizar:** acepta la política de datos de usuario de las APIs de Google y pulsa **Crear**.

## Paso 4 · Publica tu web con GitHub Pages
Google revisará estas dos URLs, así que deben existir y ser públicas.

1. En GitHub pulsa **New repository**. Nombre: `mi-app` (o el que quieras). Visibilidad: **Public**. Marca **Add a README**. Pulsa **Create repository**.
2. **Add file → Create new file** → nombre `index.html`. Pega una página simple que diga **qué es tu app y qué hace con YouTube**. Ejemplo mínimo:
   ```html
   <!doctype html><html lang="es"><meta charset="utf-8"><title>Mi App</title>
   <h1>Mi App</h1>
   <p>Herramienta de uso personal para subir, programar y organizar videos en mi propio canal de YouTube
   usando la YouTube Data API v3.</p>
   <p><a href="privacidad.html">Política de privacidad</a></p>
   ```
3. Crea `privacidad.html` con tu política. Debe decir **qué datos usa** (canal, videos, listas, estadísticas), **para qué**, **dónde se guardan** (solo en tu PC), que **no se comparten** con terceros y **cómo revocar el acceso** (<https://myaccount.google.com/permissions>). Puedes basarte en la de Evolai: <https://gabrielbarrientos99.github.io/evolai/privacidad.html>.
4. **Settings → Pages → Build and deployment → Source: Deploy from a branch**, rama `main`, carpeta `/ (root)`, **Save**.
5. En 1–2 minutos tu web queda en `https://<tu-usuario>.github.io/mi-app/`. Abre las dos páginas para comprobarlo.

## Paso 5 · Demuestra que el dominio es tuyo (Search Console)
Google solo acepta dominios verificados.
1. Entra a <https://search.google.com/search-console> → **Agregar propiedad** → **Prefijo de la URL** → `https://<tu-usuario>.github.io/mi-app/`.
2. Elige el método **Archivo HTML**: descarga el archivo `googleXXXX.html`, súbelo a la raíz de tu repo (**Add file → Upload files**) y espera 1–2 minutos.
3. Pulsa **Verificar**.

## Paso 6 · Información de la marca
En <https://console.cloud.google.com/auth/branding>:
1. Sube tu **logo**.
2. **Página principal:** `https://<tu-usuario>.github.io/mi-app/`
3. **Política de privacidad:** `https://<tu-usuario>.github.io/mi-app/privacidad.html`
4. **Dominios autorizados:** `<tu-usuario>.github.io`
5. **Guardar**.

## Paso 7 · Permisos (scopes) que pide tu app
En <https://console.cloud.google.com/auth/scopes> → **Agregar o quitar permisos** → busca y marca:
- `https://www.googleapis.com/auth/youtube` (administrar tu cuenta de YouTube: subir, editar, listas).

Si solo vas a subir videos, `.../auth/youtube.upload` es más limitado y Google lo revisa más rápido.

## Paso 8 · Crea tus credenciales (cliente OAuth)
En <https://console.cloud.google.com/auth/clients> → **Crear cliente**. Hay dos tipos y puedes tener ambos:

| Para usar… | Tipo de aplicación | Qué completas | Qué obtienes |
|---|---|---|---|
| Scripts y notebooks en tu PC (Python) | **App de escritorio** | Solo un nombre | **Descargar JSON** → guárdalo como `credenciales/client_secret.json` |
| Una web (tu web o la de Evolai) | **Aplicación web** | **Orígenes de JavaScript autorizados**: la URL de la web, sin ruta (ej. `https://gabrielbarrientos99.github.io`) | Un **ID de cliente** (`….apps.googleusercontent.com`) |

- El **ID de cliente** no es secreto: puede ir en una web.
- El **secreto del cliente** y el archivo JSON **sí son privados**: no los subas a GitHub ni los pegues en chats. Agrega `credenciales/` a tu `.gitignore`.

## Paso 9 · Agrega tu correo como usuario de prueba
Mientras la app esté en estado **Prueba**, solo los correos de esta lista pueden autorizarla.
1. <https://console.cloud.google.com/auth/audience> → **Usuarios de prueba → Add users**.
2. Escribe el correo propietario del canal → **Guardar**.

> En estado Prueba, los tokens **caducan a los 7 días** y hay que volver a autorizar. Por eso conviene publicar la app (paso 10).

## Paso 10 · Publica la app (pasar a Producción)
1. En **Público** pulsa **Publicar app** → **Confirmar**.
2. Como el permiso de YouTube es **sensible**, Google puede pedirte una **verificación**. En el **Centro de verificación** te pedirá:
   - **Por qué** necesitas cada permiso (ej.: "subir y programar videos en mi propio canal").
   - Un **video demostrativo** (súbelo a YouTube como **no listado**) donde se vea: la URL de tu página, el inicio de sesión con Google con la pantalla de permisos en inglés, y la app usando la API (subir o programar un video).
   - Que la página principal y la de privacidad coincidan con lo que declaraste.
3. Mientras Google revisa (de unos días a varias semanas) puedes seguir usándola: al autorizar verás **"Google no verificó esta app"** → **Configuración avanzada** → **Ir a … (no seguro)**. Es normal en apps personales.

## Paso 11 · Cuota y límites (importante)
- Cada proyecto tiene **10 000 unidades al día** gratis. Subir un video cuesta unas **1 600** unidades → **unas 6 subidas al día**. Consultar o editar cuesta 1–50 unidades.
- Si un video subido queda **"Bloqueado como privado"**, tu proyecto necesita la **auditoría de la API de YouTube** (formulario *YouTube API Services – Audit and Quota Extension*). Con ese mismo formulario pides más cuota.

---

## Paso 12 · Úsalo
### Opción A · Desde tu PC (Python), ya disponible
1. Instala Python 3.11+ y las librerías:
   ```bash
   pip install google-api-python-client google-auth-oauthlib
   ```
2. Autoriza una vez (abre el navegador, eliges la cuenta y el canal) y guarda el token:
   ```python
   from google_auth_oauthlib.flow import InstalledAppFlow
   flow = InstalledAppFlow.from_client_secrets_file(
       "credenciales/client_secret.json",
       scopes=["https://www.googleapis.com/auth/youtube"])
   creds = flow.run_local_server(port=0)
   open("token.json", "w").write(creds.to_json())
   ```
3. Sube y **programa** un video (queda privado y se publica solo a la hora indicada):
   ```python
   from google.oauth2.credentials import Credentials
   from googleapiclient.discovery import build
   from googleapiclient.http import MediaFileUpload

   yt = build("youtube", "v3", credentials=Credentials.from_authorized_user_file("token.json"))
   body = {
       "snippet": {"title": "Mi primer video automático", "description": "Subido con la API", "categoryId": "28"},
       "status": {"privacyStatus": "private", "publishAt": "2026-12-01T23:00:00Z",
                  "selfDeclaredMadeForKids": False, "containsSyntheticMedia": True},
   }
   req = yt.videos().insert(part="snippet,status", body=body,
                            media_body=MediaFileUpload("video.mp4", resumable=True))
   resp = None
   while resp is None:
       _, resp = req.next_chunk()
   print("https://youtu.be/" + resp["id"])
   ```
   - `publishAt` va en **UTC** (Perú es UTC−5: 18:00 en Perú = 23:00Z).
   - `containsSyntheticMedia: True` declara que el video tiene contenido generado con IA, como pide YouTube.

### Opción B · Desde la web de Evolai (próximamente)
Inicias sesión, pegas tu **ID de cliente web** (paso 8) en **Mi conexión** y subes o programas desde el navegador. Tu token se queda solo en tu navegador.

---

## Checklist final
- [ ] Proyecto creado y YouTube Data API v3 habilitada
- [ ] Pantalla de permisos configurada (Externo)
- [ ] Web y política de privacidad publicadas en GitHub Pages
- [ ] Dominio verificado en Search Console y cargado en Información de la marca
- [ ] Permiso `youtube` agregado
- [ ] Cliente OAuth creado (escritorio y/o web) y guardado **fuera** de GitHub
- [ ] Tu correo como usuario de prueba
- [ ] App publicada (y verificación enviada si Google la pide)
- [ ] Primer video programado con éxito
