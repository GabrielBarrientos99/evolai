---
formato: afiche
eyebrow: Curso Meta · Lección 14 · WhatsApp
titular: Hazte *Tech Provider* de WhatsApp: la revisión de Meta paso a paso
bajada: Para que otras empresas conecten su WhatsApp a tu plataforma con un botón, Meta tiene que aprobar tu app. Qué pide, en qué orden y los errores que nos pasaron llenando el formulario de la app LAIA (23 nov 2026).
estado: Revisión enviada · en curso (Meta tarda hasta 20 días)
pie: Capturas de la app LAIA en Meta for Developers (23 nov 2026), con las llaves de acceso y el correo de contacto tapados. Fuentes de Meta: "Incorporación como proveedor de tecnología", "Registro insertado (Embedded Signup)", "Revisión de la aplicación" y "Normas sobre el tratamiento de datos".
ficha:
  Qué es: permiso para conectar el WhatsApp de otras empresas
  Paso 1: negocio verificado
  Paso 2: revisión de la app con 2 videos
  También pide: ícono, política, categoría y 1 llamada por permiso
  Tiempo: el formulario 1 hora, la respuesta hasta 20 días
  Límite al inicio: 10 empresas nuevas cada 7 días
---

# Lección 14 · Hazte Tech Provider de WhatsApp

## Qué cambia al ser Tech Provider

### Sin aprobación

Cada empresa crea **su propia app** en Meta, genera un token (una llave de acceso) y lo pega en tu plataforma. Es donde se pierden los clientes. Tu botón «Conectar con Facebook» solo funciona para ti y para quien tenga un rol en tu app.

### Con aprobación

La empresa toca **«Conectar con Facebook»**, elige su cuenta de WhatsApp y su número, y listo. Tu app recibe sus mensajes. Meta llama a esto **Embedded Signup** (registro insertado).

## Lo que hay que tener antes de empezar

| Requisito | Dónde se ve | Por qué |
|---|---|---|
| Negocio verificado | Paso 1 de 2 en «Incorporación de proveedores de tecnología» | Meta confirma que tu empresa existe |
| Ícono, política de privacidad, categoría y dominios | Configuración de la app → Información básica | Meta también revisa eso |
| 1 llamada de prueba por permiso | Casos de uso → Permisos y funciones (columna «Llamadas») | Demuestra que tu app usa el permiso de verdad |
| 2 videos | Los subes en el formulario | Uno enviando un mensaje y otro creando una plantilla |
| Una descripción del servicio | La escribes en el formulario | Qué hace tu plataforma para sus clientes |

## Paso a paso

### 01 · Los dos pasos que pide Meta

![Incorporación como proveedor de tecnología: verificación aprobada y revisión de la app](curso/img/meta/tech-provider/01_dos_pasos_tech_provider.jpg)

**Dónde:** App → Casos de uso → Conectar en WhatsApp → **Incorporación de proveedores de tecnología**.

**Qué se ve:** «1 de 2 pasos completados». La verificación del negocio está aprobada; falta la **revisión de la aplicación**, con 3 partes: configuración de la app, videos y envío.

**Por qué:** Es el mapa de todo lo que sigue. Arriba de cada parte hay un botón «Mostrar instrucciones» con lo que Meta quiere ver en cada video.

### 02 · Configuración de la app

![Información básica con dominios, política, eliminación de datos y categoría](curso/img/meta/tech-provider/02_configuracion_de_la_app.jpg)

**Qué haces:** En **Información básica**:
- los dominios de tu web;
- la URL de tu **política de privacidad**;
- la URL de las condiciones del servicio;
- la URL de cómo pedir que se **borren los datos**;
- la **categoría**;
- un **ícono de 1024×1024**.

Después, **Guardar cambios**.

**Por qué:** Sin esto el formulario no deja avanzar. La política tiene que ser una página clara, no un PDF de términos: explica qué datos de Meta usas, con quién los compartes y cómo pedir que se borren.

> **Ojo:** el ícono se guarda solo si esperas el aviso verde «Se han guardado los cambios». La primera vez no quedó porque no se llegó a guardar.

### 03 · Las llamadas de prueba, con el número de prueba

![Configuración de la API con el número de prueba de Meta elegido](curso/img/meta/tech-provider/03_numero_de_prueba.jpg)

**Qué haces:** En **Configuración de la API**:
1. **Generar identificador de acceso** (una llave que dura unas horas). En la ventana de Facebook, elige **solo la cuenta de prueba**.
2. En **Desde**, el **número de prueba** que regala Meta (+1 555…).
3. En **A**, tu celular: lo agregas en «Administrar lista de números de teléfono» y escribes el código que te llega.
4. **Enviar mensaje**.

Te llega un «Hello World»: esa es la llamada de **mensajes**.

**Por qué:** El número de prueba es gratis y no toca los números que usan tus clientes.

> **Ojo:** la pantalla muestra la llave entera. No mandes capturas de esa parte a nadie.

### 04 · La llamada de plantillas

![Explorador de la API Graph: la respuesta con la plantilla hello_world aprobada](curso/img/meta/tech-provider/04_llamada_de_plantillas.jpg)

**Qué haces:** En el **Explorador de la API Graph** (developers.facebook.com/tools/explorer):
1. Elige tu app.
2. Pega la llave del paso anterior.
3. Consulta `GET /<cuenta de prueba>/message_templates`.

La respuesta trae `hello_world` con estado `APPROVED`: esa es la llamada de **plantillas**.

**Por qué:** Solo **lee**, no cambia nada. Es la forma más segura de usar el permiso de administración.

> **Ojo:** el primer intento dio «(#200) You do not have permission» porque el Explorador tenía una llave vieja de anuncios. Fíjate que la llave pegada empiece distinto.

### 05 · Esperar a que Meta las cuente

![Permisos y funciones: 1 llamada en cada permiso de WhatsApp](curso/img/meta/tech-provider/05_llamadas_contadas.jpg)

**Qué se vio:** A los 2 minutos los dos permisos seguían en 0. **Unas 3 horas después** marcaban 1 y 1.

**Por qué:** Meta cuenta con demora (dice «hasta 24 horas»). Sin ese 1, el formulario no avanza.

### 06 · Abrir la revisión

![Envíos de revisión: solicitud sin enviar con los 2 permisos](curso/img/meta/tech-provider/06_solicitud_sin_enviar.jpg)

**Qué haces:** «Iniciar revisión de la aplicación» → **Continuar**. Meta arma sola la solicitud con los dos permisos: `whatsapp_business_messaging` (mensajes) y `whatsapp_business_management` (cuentas y plantillas).

**Por qué:** Entrar al formulario no envía nada: se guarda solo y puedes volver cuando quieras.

### 07 · Escribe tú la descripción

![La sugerencia de texto de la IA de Meta, que no se usó](curso/img/meta/tech-provider/07_sugerencia_ia_no_usar.jpg)

**Qué haces:** Por permiso, una línea sobre tu empresa → **Empezar**. Meta propone un texto con su IA. **No lo uses:** pega tu propia descripción en el cuadro de abajo.

**Por qué no la IA:**
- Es una carta genérica que termina en «[Your Name]».
- Promete cosas que tu video no muestra.
- Para usarla hay que aceptar los términos de IA de Meta.

Los revisores rechazan cuando el texto no coincide con el video.

**Ejemplo:** «La empresa conecta su número a LAIA; sus agentes y el asistente responden desde la bandeja de LAIA. El video muestra a un agente escribiendo y al cliente recibiéndolo en WhatsApp».

### 08 · Sube los videos y marca la casilla

![Uso permitido: los dos permisos en verde](curso/img/meta/tech-provider/08_uso_permitido_en_verde.jpg)

**Qué haces:** En cada permiso:
1. **Subir archivo** con su video.
2. Marcar «Confirmo que… se usarán de acuerdo con el uso permitido».
3. **Guardar**.

Cuando quedan los dos en verde, pasas a la sección siguiente.

**Qué videos:**
- **Mensajes:** escribir y enviar desde tu plataforma, y verlo llegar al WhatsApp.
- **Plantillas:** crear una plantilla desde tu plataforma hasta verla «En revisión». También vale crearla en el WhatsApp Manager de Meta, pero desde tu plataforma se ve mejor que la usas.

> **Ojo:** al subir el video sale el aviso «Procesando vídeo». Ciérralo con su **Cerrar** azul, no con la **X** de la ventana grande: esa cierra sin guardar y se pierde el texto.

### 09 · Tratamiento de datos

![Encargados del tratamiento: AWS y OpenAI](curso/img/meta/tech-provider/09_proveedores_de_datos.jpg)

**Qué responde:**

| Pregunta | Qué se respondió |
|---|---|
| ¿Quién trata los datos por ti? | Los proveedores reales: dónde guardas los datos (servidores) y quién procesa los mensajes (la IA). Con su país |
| ¿Quién es el responsable? | Tu empresa y su país |
| ¿Entregaste datos a autoridades por seguridad nacional? | Lo que sea cierto |
| Políticas ante esos pedidos | Solo las que de verdad aplicas |

**Por qué:** Son declaraciones legales de tu empresa. Lo que pongas tiene que coincidir con tu política de privacidad.

> **Ojo:** la lista de países toma las letras como atajos: escribir «Per» eligió «Antillas Neerlandesas». Ábrela con la flecha y busca en su buscador.

### 10 · Todo en verde y enviar

![Las 4 secciones en verde y el botón Enviar a revisión](curso/img/meta/tech-provider/10_todo_en_verde.jpg)

**Qué haces:** Con las 4 secciones en verde (verificación, configuración, uso permitido y gestión de datos), tocas **Enviar a revisión**.

**Por qué:** El botón solo se activa cuando todo está completo. El envío lo hace el dueño de la cuenta.

### 11 · Revisión en curso

![Envíos de revisión: revisión en curso](curso/img/meta/tech-provider/11_revision_en_curso.jpg)

**Qué se ve:** «Revisión en curso. La mayoría de los envíos se revisan en un plazo de 20 días».

**Mientras tanto:**
- No cambies el ícono, la política ni los dominios.
- No borres la plantilla ni los videos.

Si Meta pide algo, se responde en «Ver detalles de la solicitud».

## Los errores que nos pasaron

| Error | Cómo evitarlo |
|---|---|
| El ícono no se guardó | Esperar siempre el aviso verde «Se han guardado los cambios» |
| Las llamadas seguían en 0 | Esperar unas horas: Meta las cuenta con demora |
| «(#200) You do not have permission» en el Explorador | Pegar la llave nueva de WhatsApp, no la vieja de anuncios |
| Se perdió el texto de la descripción | Cerrar «Procesando vídeo» con su botón azul, no con la X de la ventana |
| El país quedó «Antillas Neerlandesas» | Abrir la lista con la flecha y usar su buscador |
| Texto genérico de la IA de Meta | Escribir el propio, igual a lo que muestra el video |

## Después de la aprobación

| Paso | Para qué |
|---|---|
| Configurar el webhook de la app | La dirección a la que Meta manda los mensajes de todos los clientes conectados |
| Publicar la app | Para recibir mensajes reales (en desarrollo solo llegan los de prueba) |
| Abrir el botón «Conectar con Facebook» a los clientes | Cada empresa conecta su WhatsApp sola. Al inicio, hasta 10 empresas nuevas cada 7 días; 200 después de verificación y revisión |
