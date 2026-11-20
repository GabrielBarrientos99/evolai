---
formato: afiche
eyebrow: Curso Meta · Lección 5 · creativos
titular: Creativos con *capturas reales* y fondos con IA
bajada: En Meta, **el creativo decide a quién le llega tu anuncio** (Lección 1). Aquí armamos los flyers de una campaña real para clínicas: qué va a publicidad, qué se manda en el chat y cómo sumarles un fondo de foto con IA por menos de 1 dólar.
estado: Menos de US$ 1 en total
pie: Precios revisados en replicate.com el 16/11/2026; cambian, revísalos antes de gastar. Pruebas con personaje hechas el 16/11/2026.
ficha:
  Anuncios: 3 a 5 ideas distintas por conjunto
  Tamaños: 4:5 (1080 × 1350) y 9:16 (1080 × 1920)
  Fondos con IA: comparar 6 modelos ≈ US$ 0.20 · producir ≈ US$ 0.50
  Personaje: Seedream 4 · US$ 0.03 por imagen
---

# Lección 5 · Creativos para tus anuncios: capturas reales y fondos con IA

## ¿Anuncio o pieza del chat?

Antes de diseñar, separa tus piezas en dos grupos. Un carrusel de "cómo funciona en 5 pasos" es excelente dentro del chat, pero como anuncio es demasiado largo.

### Anuncio

- **Dónde se ve:** feed, Historias y Reels, **antes** de que te escriban.
- **Qué tiene que lograr:** detener el scroll y que escriba **solo tu cliente ideal**.

### Pieza del chat

- **Dónde se ve:** dentro de WhatsApp, **después** de que te escribieron.
- **Qué tiene que lograr:** explicar, responder dudas y cerrar.

## Cuántos anuncios y cuáles

Meta recomienda **de 3 a 5 anuncios con ideas distintas** en el mismo conjunto. Una idea distinta es otro ángulo, no otro color.

### 5 ideas para clínicas

| Idea | Ejemplo |
|---|---|
| **Dolor + prueba real** | "Escribió a las 10:55 p. m. y a las 11:01 ya tenía su cita" (con la captura real) |
| **Comparación** | "Sin asistente: lo ves al día siguiente. Con asistente: cita en 6 minutos" |
| **Resultado con número** | "Cientos de citas agendadas por WhatsApp en una clínica dental" |
| **La oferta** | "5 cupos para clínicas fundadoras" |
| **La misma prueba con un personaje** | Para comparar si el personaje ayuda o distrae |

### Tamaños y zona segura

- Para cada idea, **dos tamaños**: 4:5 (1080 × 1350) para el feed y 9:16 (1080 × 1920) para Historias y Reels.
- En Meta se suben **en el mismo anuncio**, como versiones por ubicación.
- **Zona segura de Historias:** los últimos 250 a 340 px de abajo los tapa la barra de respuesta. El botón de WhatsApp va más arriba.

## Lo que aprendimos de la competencia

Revisamos los anuncios activos en la Biblioteca de Anuncios (Lección 3).

### Fotos reales

Los que más anuncian usan **fotos reales y video de una persona hablando a cámara**, no diseños con tarjetas de vidrio o robots 3D.

### Lenguaje de flyer

En Perú funciona el **flyer**: letra gruesa condensada, resaltador amarillo, bloques rectos y el WhatsApp en grande.

### Prueba real

Una **captura del panel con la hora exacta** convence más que una foto armada. Por eso usamos capturas reales, con los datos de los pacientes difuminados.

## Fondos con IA, paso a paso

En lugar de adivinar qué modelo usar, hacemos una **comparación**: el mismo prompt en varios modelos, y elegimos el que se ve mejor **detrás del texto**.

### 01 · Compara modelos baratos

**Qué haces:** Corre el mismo prompt en varios modelos de Replicate y compara.

| Modelo | Precio por imagen 4:5 | Para qué sirve |
|---|---|---|
| `flux-2-klein-4b` | ~US$ 0.0014 | **Borradores** casi gratis para probar el encuadre |
| `flux-krea-dev` | US$ 0.025 | Fotos que **no se ven "IA"** (menos saturadas) |
| `seedream-4` | US$ 0.03 | Realista y barato |
| `flux-2-pro` | ~US$ 0.037 | Buena calidad general |
| `flux-3-image` | US$ 0.048 | El más nuevo de Black Forest Labs |
| `flux-1.1-pro-ultra` (modo `raw`) | US$ 0.06 | Aspecto natural de foto |
| `flux-2-max` | ~US$ 0.084 | Máxima fidelidad (no hace falta para un fondo desenfocado) |

**Cuánto cuesta:** Comparar 6 modelos ≈ US$ 0.20, y producir 5 fondos × 2 variantes con el ganador ≈ US$ 0.50. **Menos de US$ 1 en total.**

### 02 · Escribe el prompt del fondo

**Qué haces:**
1. **En inglés**, describiendo una foto: cámara, lente, luz. Por ejemplo: *"Photorealistic editorial photo, 35mm lens at f/2.0, shallow depth of field, natural soft light"*.
2. **Deja espacio para tu texto:** *"the LEFT 50% of the frame is calm, softly out-of-focus negative space"*.
3. **Prohíbe el texto:** *"no text, no letters, no logos"*.
4. **Usa los colores de tu marca:** *"soft lavender and pale violet tones"*.
5. **Ubica la escena:** *"Latin American setting, Peru"*.

**Por qué:** El texto lo pones tú en el diseño: la IA lo escribe mal.

### 03 · Ponlo detrás de tu flyer

**Qué haces:**
- Desenfoca un poco la foto (2 px) y ponle encima un **velo del color de tu fondo**: casi sólido del lado del texto (92 a 97 %) y más transparente del lado de la captura (20 a 45 %).
- Si el texto ocupa todo el ancho, usa un velo parejo (75 a 90 %).

> **Ojo:** prueba primero con una imagen de relleno llena de manchas. Si el texto se lee con eso, se lee con cualquier foto.

## Tu personaje dentro de una escena real

Un estilo que casi nadie usa en Perú, y por eso destaca: **la mascota 3D de tu marca dentro de una foto real** (un consultorio, una recepción de noche), con un celular en la mano.

### 04 · Pásale tu personaje como referencia

**Qué haces:** Le pasas al modelo **el PNG de tu personaje como imagen de referencia** y describes la escena. Después pones encima tu titular, tu captura real y el botón.

**Resultado:** Lo probamos con 2 escenas en 4 modelos (costo total: unos **US$ 0.41**).

| Modelo | Precio | Resultado |
|---|---|---|
| **Seedream 4** | US$ 0.03 | **El mejor**: respeta al personaje (cara, colores, logo) y la escena se ve natural |
| FLUX 3 | US$ 0.048 | Muy bueno; el personaje sale grande |
| FLUX 2 Pro | ~US$ 0.05 | Cambia algunos detalles del personaje |
| nano-banana | US$ 0.039 | El personaje sale chico |

> **Ojo:** el texto y la captura **nunca los hace la IA**.

### 05 · Deja libre la zona del texto

**Qué haces:** Pídele al modelo dónde va el personaje (*"the robot in the RIGHT half"*) y deja libre la zona de tu texto (*"the TOP 38% calm and uncluttered"*).

**Por qué:** Si no, tu captura o tu titular terminan tapando al personaje.

### 06 · Si la IA edita un flyer ya hecho

**Qué pasó:** Le pasamos un flyer terminado a dos modelos de edición. **FLUX Kontext Pro** borró un detalle de la captura y oscureció tanto el fondo que el titular dejó de leerse. **nano-banana** mantuvo todo y solo cambió el fondo.

> **Ojo:** si la IA edita una imagen con textos o capturas, **revisa letra por letra** contra el original. Puede cambiar un número sin avisar.

## Reglas para no meterte en problemas

### Datos y casos reales

- **Nunca subas a un servicio de IA capturas con datos de clientes.** A Replicate solo se envía el texto del prompt.
- **Pide permiso por escrito** al cliente cuyo caso muestras.
- Si el anuncio dice "caso real", el fondo **no debe hacerse pasar por el lugar real**: sin personas, desenfocado y con un texto chico que diga **"Foto referencial"**.

### Políticas de Meta

- **No imites noticias** ("ÚLTIMA HORA"): se puede tomar como formato engañoso.
- **No le hables al usuario de su condición personal** (salud, dinero). Háblale a su negocio: "¿Tu clínica pierde citas de noche?".

## Lo que sigue

### Tu tarea

- Elige **3 a 5 ideas** de la tabla y haz cada una en 4:5 y 9:16.
- Si quieres fondo, compara primero con `flux-2-klein-4b`, que cuesta casi nada.

### Dónde queda guardado

- **Precios:** revisados en replicate.com el 16/11/2026.
- **Siguiente:** en la [Lección 6](#marketing-meta/meta-06-crear-campana) subes estos creativos a tu campaña de WhatsApp.
