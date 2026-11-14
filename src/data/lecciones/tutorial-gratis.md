# Automatiza tu canal con la API de YouTube

**Gratis · 1 hora.** Al terminar podrás subir y programar videos sin abrir YouTube Studio.

Necesitas: la cuenta de Google dueña del canal y una cuenta de GitHub.

---

## 1 · Crea tu proyecto
Entra a [console.cloud.google.com/projectcreate](https://console.cloud.google.com/projectcreate), ponle el nombre de tu app y pulsa **Crear**.

![Crear proyecto](tutorial/img/01-crear-proyecto.jpg)

## 2 · Activa la API de YouTube
Abre [YouTube Data API v3](https://console.cloud.google.com/apis/library/youtube.googleapis.com) y pulsa **Habilitar**.

![Habilitar la API](tutorial/img/02a-habilitar.jpg)

Listo cuando veas **API habilitada**:

![API habilitada](tutorial/img/02-api-habilitada.jpg)

## 3 · Configura la pantalla de permisos
En [Google Auth Platform](https://console.cloud.google.com/auth/overview) pulsa **Comenzar**.

![Comenzar](tutorial/img/03a-comenzar.jpg)

**3.1** Nombre de la app y tu correo de asistencia.

![Información de la app](tutorial/img/03b-info-app.jpg)

**3.2** Público: **Externo**.

![Público externo](tutorial/img/03c-publico-externo.jpg)

**3.3** Tu correo de contacto.

![Contacto](tutorial/img/03d-contacto.jpg)

**3.4** Acepta la política y pulsa **Crear**.

![Finalizar](tutorial/img/03e-finalizar.jpg)

## 4 · Agrega tu correo como usuario de prueba
**Público → Add users** → tu correo → **Guardar**.

![Público](tutorial/img/04a-publico.jpg)

![Agregar usuarios](tutorial/img/04b-agregar-usuarios.jpg)

## 5 · Crea tus credenciales
[Clientes → Crear cliente](https://console.cloud.google.com/auth/clients/create). Elige el tipo según dónde lo vas a usar:

![Tipo de aplicación](tutorial/img/05a-tipo-app.jpg)

**Para Python en tu PC → App de escritorio.**

![App de escritorio](tutorial/img/05b-escritorio.jpg)

Descarga el **JSON** y guárdalo como `credenciales/client_secret.json`. **Nunca lo subas a GitHub.**

![Cliente creado](tutorial/img/05c-cliente-creado.jpg)

**Para una web → Aplicación web** (ver el paso 8).

## 6 · Publica tu web y tu política de privacidad (GitHub Pages)
Google exige una página de inicio y una de privacidad públicas.

1. En GitHub crea un repositorio **público** con `index.html` (qué hace tu app) y `privacidad.html`. Puedes copiar la de [Evolai](https://gabrielbarrientos99.github.io/evolai/privacidad.html).
2. **Settings → Pages → Source:** rama `main` → **Save**.
3. Tu web queda en `https://TU-USUARIO.github.io/TU-REPO/`.

## 7 · Publica la app
1. Verifica tu web en [Search Console](https://search.google.com/search-console) (método **Archivo HTML**).
2. En [Información de la marca](https://console.cloud.google.com/auth/branding) pon tu logo, la página de inicio, la de privacidad y el dominio `TU-USUARIO.github.io`.
3. En [Público](https://console.cloud.google.com/auth/audience) pulsa **Publicar app**.

> Si Google pide verificación: explica para qué usas YouTube y sube un video demo **no listado**. Mientras revisa, puedes usarla con el aviso *"Google no verificó esta app" → Avanzado → Ir a…*

## 8 · Login con Google en tu web (opcional, con Supabase)
**8.1** Crea un cliente **Aplicación web** con tu dominio y la Callback URL de Supabase:

![Cliente web](tutorial/img/06-cliente-web-supabase.jpg)

**8.2** En Supabase → **Authentication → Sign In / Providers → Google**, pega el ID y el secreto:

![Supabase Google](tutorial/img/07-supabase-google.jpg)

## 9 · Sube y programa tu primer video
```bash
pip install google-api-python-client google-auth-oauthlib
```
```python
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

creds = InstalledAppFlow.from_client_secrets_file(
    "credenciales/client_secret.json",
    ["https://www.googleapis.com/auth/youtube"]).run_local_server(port=0)
yt = build("youtube", "v3", credentials=creds)

yt.videos().insert(part="snippet,status", media_body=MediaFileUpload("video.mp4"), body={
    "snippet": {"title": "Mi primer video automático", "categoryId": "28"},
    "status": {"privacyStatus": "private", "publishAt": "2026-12-01T23:00:00Z",
               "selfDeclaredMadeForKids": False, "containsSyntheticMedia": True},
}).execute()
```
`publishAt` va en hora **UTC** (18:00 en Perú = 23:00Z).

---

**Límite gratis:** unas 6 subidas al día por proyecto (10 000 unidades; cada subida ≈ 1 600).
