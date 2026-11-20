---
formato: afiche
eyebrow: Curso API de YouTube · paso a paso
titular: Sube y programa videos *sin abrir YouTube Studio*
bajada: Creas tu proyecto en Google Cloud, activas la API de YouTube, publicas tu app con GitHub Pages y subes tu primer video con un script. Cada paso tiene su captura real.
estado: Gratis · datos personales ocultos en las capturas
pie: Capturas de Google Cloud y Supabase con los datos personales y los secretos ocultos. Límite de la API: 10 000 unidades al día por proyecto; cada subida usa unas 1 600.
ficha:
  Tiempo: 1 hora
  Necesitas: la cuenta de Google dueña del canal y una cuenta de GitHub
  Pasos: 18 (15 con captura)
  Costo: US$ 0 · unas 6 subidas al día gratis
---

# Automatiza tu canal con la API de YouTube

## ¿Qué es la API de YouTube y por qué usarla?

Es la puerta para que **un programa** haga lo mismo que tú haces a mano en YouTube Studio: subir, poner título, programar la hora.

### Qué vas a poder hacer

- **Subir videos** desde tu PC con un comando.
- **Programarlos** para una fecha y hora exactas.
- Más adelante, **automatizar** la publicación de una serie entera.

### Por qué así

- **Google exige** un proyecto, una pantalla de permisos y una web con política de privacidad para dejarte usar la API.
- Se hace **una sola vez**: después solo corres el script.
- La API es **gratis**: unas 6 subidas al día por proyecto (10 000 unidades ÷ 1 600 por subida).

## Google Cloud: proyecto y API

### Crea tu proyecto

![Crear proyecto](tutorial/img/01-crear-proyecto.jpg)

**Qué se hizo:** Entramos a [console.cloud.google.com/projectcreate](https://console.cloud.google.com/projectcreate), pusimos el nombre de la app y pulsamos **Crear**.

**Por qué:** Todo vive dentro de un proyecto: la API, la pantalla de permisos y las credenciales.

### Habilita la API de YouTube

![Habilitar la API](tutorial/img/02a-habilitar.jpg)

**Qué se hizo:** Abrimos [YouTube Data API v3](https://console.cloud.google.com/apis/library/youtube.googleapis.com) y pulsamos **Habilitar**.

**Por qué:** Sin habilitarla, cualquier pedido a YouTube responde con error.

### Confirma que quedó habilitada

![API habilitada](tutorial/img/02-api-habilitada.jpg)

**Qué se hizo:** Revisamos que diga **API habilitada**.

**Por qué:** Es la señal de que el proyecto ya puede hablar con YouTube.

## La pantalla de permisos

Es la ventana que ves al iniciar sesión, donde Google te pregunta si dejas que la app use tu canal.

### Comienza la configuración

![Comenzar](tutorial/img/03a-comenzar.jpg)

**Qué se hizo:** En [Google Auth Platform](https://console.cloud.google.com/auth/overview) pulsamos **Comenzar**.

**Por qué:** Sin esta pantalla, Google no entrega el permiso para subir videos.

### Nombre de la app y correo

![Información de la app](tutorial/img/03b-info-app.jpg)

**Qué se hizo:** Pusimos el nombre de la app y el correo de asistencia.

**Por qué:** Es lo que verás (y verá quien use la app) al dar permiso.

### Público: Externo

![Público externo](tutorial/img/03c-publico-externo.jpg)

**Qué se hizo:** Elegimos **Externo**.

**Por qué:** "Interno" solo existe para empresas con Google Workspace. Con una cuenta normal de Gmail, la opción es Externo.

### Correo de contacto

![Contacto](tutorial/img/03d-contacto.jpg)

**Qué se hizo:** Pusimos el correo de contacto.

**Por qué:** Google escribe ahí si hay algún problema con la app.

### Acepta y crea

![Finalizar](tutorial/img/03e-finalizar.jpg)

**Qué se hizo:** Aceptamos la política de datos de Google y pulsamos **Crear**.

**Por qué:** Con esto la pantalla de permisos queda lista.

## Usuario de prueba y credenciales

### Abre Público

![Público](tutorial/img/04a-publico.jpg)

**Qué se hizo:** Entramos a **Público → Add users**.

**Por qué:** Mientras la app está "en prueba", solo los usuarios de esta lista pueden iniciar sesión.

### Agrega tu correo

![Agregar usuarios](tutorial/img/04b-agregar-usuarios.jpg)

**Qué se hizo:** Escribimos el correo dueño del canal y pulsamos **Guardar**.

**Por qué:** Sin esto, al iniciar sesión Google te bloquea con "acceso denegado".

### Elige el tipo de cliente

![Tipo de aplicación](tutorial/img/05a-tipo-app.jpg)

**Qué se hizo:** Fuimos a [Clientes → Crear cliente](https://console.cloud.google.com/auth/clients/create) para elegir el tipo de aplicación.

**Por qué:** El tipo depende de dónde vas a usar la API: en tu PC o en una web.

### App de escritorio, para Python en tu PC

![App de escritorio](tutorial/img/05b-escritorio.jpg)

**Qué se hizo:** Elegimos **App de escritorio**.

**Por qué:** Así el script abre el navegador de tu PC para que des permiso, sin servidor. Para una web se usa **Aplicación web** (paso 16).

### Descarga el JSON

![Cliente creado](tutorial/img/05c-cliente-creado.jpg)

**Qué se hizo:** Descargamos el **JSON** y lo guardamos como `credenciales/client_secret.json`.

**Por qué:** Ese archivo es la identidad de tu app: el script lo lee para pedir permiso.

> **Ojo:** **nunca lo subas a GitHub.** Y descárgalo en este momento: Google avisa que después de cerrar la ventana ya no podrás ver ni descargar el secreto.

## Web, política de privacidad y publicar la app

### 14 · Publica tu web y tu política de privacidad

**Qué haces:**
1. En GitHub crea un repositorio **público** con `index.html` (qué hace tu app) y `privacidad.html`. Puedes copiar la de [Evolai](https://gabrielbarrientos99.github.io/evolai/privacidad.html).
2. **Settings → Pages → Source:** rama `main` → **Save**.
3. Tu web queda en `https://TU-USUARIO.github.io/TU-REPO/`.

**Por qué:** Google exige una página de inicio y una de privacidad públicas para publicar la app.

### 15 · Publica la app

**Qué haces:**
1. Verifica tu web en [Search Console](https://search.google.com/search-console) (método **Archivo HTML**).
2. En [Información de la marca](https://console.cloud.google.com/auth/branding) pon tu logo, la página de inicio, la de privacidad y el dominio `TU-USUARIO.github.io`.
3. En [Público](https://console.cloud.google.com/auth/audience) pulsa **Publicar app**.

**Por qué:** Mientras la app está en prueba, el permiso vence a los 7 días y tendrías que volver a iniciar sesión.

> **Ojo:** si Google pide verificación, explica para qué usas YouTube y sube un video demo **no listado**. Mientras revisa, puedes usarla con el aviso *"Google no verificó esta app" → Avanzado → Ir a…*

## Login con Google en tu web (opcional, con Supabase)

### Crea un cliente "Aplicación web"

![Cliente web](tutorial/img/06-cliente-web-supabase.jpg)

**Qué se hizo:** Creamos otro cliente, tipo **Aplicación web**, con nuestro dominio y la Callback URL de Supabase.

**Por qué:** Así tu web puede tener el botón "Iniciar sesión con Google".

### Pega el ID y el secreto en Supabase

![Supabase Google](tutorial/img/07-supabase-google.jpg)

**Qué se hizo:** En Supabase → **Authentication → Sign In / Providers → Google**, pegamos el ID y el secreto del cliente web.

**Por qué:** Supabase hace el inicio de sesión por ti y guarda quién entró.

## Tu primer video automático

### 18 · Sube y programa tu primer video

**Instala:**

```bash
pip install google-api-python-client google-auth-oauthlib
```

**El script:**

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

**Por qué:** Se sube como **privado** con `publishAt`, y YouTube lo hace público solo a esa hora.

> **Ojo:** `publishAt` va en hora **UTC**: 18:00 en Perú = 23:00Z.

## Lo que sigue

### Tu tarea

- Sube un video de prueba **privado** y revisa en YouTube Studio que quedó programado.
- Guarda `credenciales/` fuera de cualquier repositorio.

### Dónde queda guardado

- **Credenciales:** `credenciales/client_secret.json` en tu PC.
- **Tu app:** Google Cloud → Google Auth Platform.
- **PDF para imprimir:** [Descargar el tutorial](curso/pdf/tutorial-gratis.pdf).
- **Siguiente:** [Estructura del proyecto y credenciales](#api-youtube/conexion-youtube).
