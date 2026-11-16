# Lección 5 · Creativos para tus anuncios: capturas reales y fondos con IA

En Meta, **el creativo decide a quién le llega tu anuncio** (lo vimos en la Lección 1). En esta lección armamos los flyers de una campaña real para clínicas: qué piezas van a publicidad, cuáles se mandan dentro del chat y cómo agregarles un fondo de foto realista con IA por menos de 1 dólar.

## 1. Anuncio no es lo mismo que pieza del chat

Antes de diseñar, separa tus piezas en dos grupos:

| Uso | Dónde se ve | Qué tiene que lograr |
|---|---|---|
| **Anuncio** | Feed, Historias y Reels, **antes** de que te escriban | Detener el scroll y que escriba **solo tu cliente ideal** |
| **Pieza del chat** | Dentro de WhatsApp, **después** de que te escribieron | Explicar, responder dudas y cerrar |

Un carrusel de "cómo funciona en 5 pasos" es excelente dentro del chat, pero como anuncio es demasiado largo. Y un anuncio de "oferta" no sirve como respuesta a "¿y si no vienen a la cita?".

## 2. Cuántos anuncios y cuáles

Meta recomienda **de 3 a 5 anuncios con ideas distintas** en el mismo conjunto. Una idea distinta es otro ángulo, no otro color:

| Idea | Ejemplo para clínicas |
|---|---|
| **Dolor + prueba real** | "Escribió a las 10:55 p. m. y a las 11:01 ya tenía su cita" (con la captura real) |
| **Comparación** | "Sin asistente: lo ves al día siguiente. Con asistente: cita en 6 minutos" |
| **Resultado con número** | "Cientos de citas agendadas por WhatsApp en una clínica dental" |
| **La oferta** | "5 cupos para clínicas fundadoras" |
| **La misma prueba con un personaje** | Para comparar si el personaje ayuda o distrae |

Para cada idea, haz **dos tamaños**: 4:5 (1080 × 1350) para el feed y 9:16 (1080 × 1920) para Historias y Reels. En Meta se suben **en el mismo anuncio**, como versiones por ubicación.

**Cuida la zona segura de Historias:** los últimos 250 a 340 px de abajo los tapa la barra de respuesta. El botón de WhatsApp tiene que quedar más arriba.

## 3. Lo que aprendimos de la competencia

Revisamos los anuncios activos de los competidores en la Biblioteca de Anuncios (Lección 3):
- **Los que más anuncian usan fotos reales y video de una persona hablando a cámara**, no diseños con tarjetas de vidrio o robots 3D.
- **El lenguaje que funciona en Perú es el del flyer:** letra gruesa condensada, resaltador amarillo, bloques rectos y el WhatsApp en grande.
- **La prueba real pesa más que el diseño:** una captura del panel con la hora exacta convence más que una foto armada.

Por eso nuestras piezas usan **capturas reales** (con los datos de los pacientes difuminados) y les sumamos **un fondo de foto** para que no se vean planas.

## 4. Fondos con IA: elige el modelo con una comparación barata

Hay muchos modelos de imagen en Replicate. En lugar de adivinar, hacemos una **comparación**: el mismo prompt en varios modelos, y elegimos el que se ve mejor **detrás del texto**.

Precios revisados en replicate.com el 16/11/2026 (cambian: revísalos antes de gastar):

| Modelo | Precio por imagen 4:5 | Para qué sirve |
|---|---|---|
| `flux-2-klein-4b` | ~US$ 0.0014 | **Borradores** casi gratis para probar el encuadre |
| `flux-krea-dev` | US$ 0.025 | Fotos que **no se ven "IA"** (menos saturadas) |
| `seedream-4` | US$ 0.03 | Realista y barato |
| `flux-2-pro` | ~US$ 0.037 | Buena calidad general |
| `flux-3-image` | US$ 0.048 | El más nuevo de Black Forest Labs |
| `flux-1.1-pro-ultra` (modo `raw`) | US$ 0.06 | Modo `raw`: aspecto natural de foto |
| `flux-2-max` | ~US$ 0.084 | Máxima fidelidad (no hace falta para un fondo desenfocado) |

**Cuánto cuesta todo:** comparar 6 modelos ≈ US$ 0.20, y producir 5 fondos × 2 variantes con el ganador ≈ US$ 0.50. **Menos de US$ 1 en total.**

### Cómo escribir el prompt de un fondo
1. **En inglés**, describiendo una foto: cámara, lente, luz. Por ejemplo: *"Photorealistic editorial photo, 35mm lens at f/2.0, shallow depth of field, natural soft light"*.
2. **Deja espacio para tu texto:** *"the LEFT 50% of the frame is calm, softly out-of-focus negative space"*.
3. **Prohíbe el texto:** *"no text, no letters, no logos"*. El texto lo pones tú en el diseño; la IA lo escribe mal.
4. **Usa los colores de tu marca:** *"soft lavender and pale violet tones"*.
5. **Ubica la escena:** *"Latin American setting, Peru"*.

### Cómo ponerlo detrás de tu flyer sin que se pierda el texto
- Desenfoca un poco la foto (2 px) y ponle encima un **velo del color de tu fondo**: casi sólido del lado del texto (92 a 97 %) y más transparente del lado de la captura (20 a 45 %).
- Si el texto ocupa todo el ancho, usa un velo parejo (75 a 90 %).
- Prueba primero con una imagen de relleno llena de manchas: si el texto se lee con eso, se lee con cualquier foto.

## 5. Reglas para no meterte en problemas

- **Nunca subas a un servicio de IA capturas con datos de clientes.** A Replicate solo se envía el texto del prompt.
- **Si el anuncio dice "caso real", el fondo no debe hacerse pasar por el lugar real:** sin personas, desenfocado y con un texto chico que diga **"Foto referencial"**.
- **No imites noticias** ("ÚLTIMA HORA") en un anuncio de Meta: se puede tomar como formato engañoso.
- **No le hables al usuario de su condición personal** (salud, dinero). Háblale a su negocio: "¿Tu clínica pierde citas de noche?".
- **Pide permiso por escrito** al cliente cuyo caso muestras.

## 6. Tu personaje dentro de una escena real

Un estilo que casi nadie usa en Perú, y por eso destaca: **la mascota 3D de tu marca dentro de una foto real** (un consultorio, una recepción de noche), con un celular en la mano.

**Cómo se hace:** le pasas al modelo **el PNG de tu personaje como imagen de referencia** y describes la escena. Después pones encima tu titular, tu captura real y el botón. El texto y la captura nunca los hace la IA.

Lo probamos con 2 escenas en 4 modelos que aceptan imagen de referencia (16/11/2026):

| Modelo | Precio | Resultado |
|---|---|---|
| **Seedream 4** | US$ 0.03 | **El mejor**: respeta al personaje (cara, colores, logo) y la escena se ve natural |
| FLUX 3 | US$ 0.048 | Muy bueno; el personaje sale grande |
| FLUX 2 Pro | ~US$ 0.05 | Cambia algunos detalles del personaje |
| nano-banana | US$ 0.039 | El personaje sale chico |

**Costo total de la prueba: unos US$ 0.41.**

### ¿Y si le pido a la IA que complete el fondo de mi flyer ya hecho?
Se puede, pero con cuidado. Le pasamos un flyer terminado a dos modelos de edición:
- **FLUX Kontext Pro** borró un detalle de la captura y oscureció tanto el fondo que el titular dejó de leerse.
- **nano-banana** mantuvo todo y solo cambió el fondo.

**Regla:** si la IA edita una imagen con textos o capturas, **revisa letra por letra** contra el original antes de publicar. Puede cambiar un número sin avisar.

### Tip de composición
Pídele al modelo dónde va el personaje (*"the robot in the RIGHT half"*) y deja libre la zona donde irá tu texto (*"the TOP 38% calm and uncluttered"*). Si no, tu captura o tu titular terminan tapando al personaje.
