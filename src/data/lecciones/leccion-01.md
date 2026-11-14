# Lección 1 · Compara 6 IAs de video y conviértelo en un Short viral

> **Resultado:** dos Shorts (“Le di el mismo dinosaurio a 6 IAs”, Partes 1 y 2) hechos de punta a punta con IA, por **unos US$ 2.70** en total.
> **Videos finales:** `cuenta_gabito-tu-ia/publicaciones/2026-11-14_6ias-mismo-dinosaurio_parte1` y `…_parte2`.

## Qué aprenderás
1. Comparar modelos de video IA de forma justa: el “bake-off”.
2. Elegir modelo por calidad **y** precio.
3. Dar voz expresiva a un Short sin sonar robótico.
4. Editar como profesional en Remotion: zooms, transiciones, subtítulos, música y audio.
5. Publicar con un copy que funcione y aproveche los prompts.

---

## Paso 1 · El bake-off: misma imagen, mismo prompt, varios modelos

**Regla de oro:** para comparar modelos, solo puede cambiar el modelo.
1. Genera **una** imagen inicial (Seedream 4, $0.03).
2. Anímala con cada modelo usando **el mismo prompt** (image-to-video).

**Prompt de imagen (Seedream 4, 2K, 9:16):**
```
Vertical 9:16 frame. Close-up on golden beach sand: a black volcanic lava egg cracked open with glowing orange cracks and sparks; a baby salamander-dragon made of cooled black lava rock with glowing orange cracks is peeking out of the shell, big adorable eyes. Cute stylized 3D animation, Pixar-like hybrid creatures, lush tropical island, golden hour lighting, soft rim light, saturated colors, shallow depth of field, cinematic
```

**Prompt de video (el mismo para todos):**
```
The lava egg bursts open in a shower of sparks; the baby lava dragon climbs out, shakes off the shell pieces and yawns adorably, tiny embers floating. Slow camera push-in. Crisp egg-cracking sounds. [mismo estilo]
```

**Anatomía del prompt de video:** acción principal + detalle físico (chispas, cáscara) + gesto del personaje (bosteza) + cámara (push-in lento) + sonido + estilo repetido de la imagen.

## Paso 2 · Resultados reales (Replicate, nov 2026)

| # | Modelo | Clip de 5 s | Audio | Qué hizo |
|---|---|---|---|---|
| 🏆 | **Seedance 2.0 Fast** (ByteDance) | $0.75 | Sí | El más fiel al personaje; acercamiento y bostezo |
| 2 | Veo 3.1 Fast (Google) | $0.60 (4 s) | Sí | Sale, se para y ruge |
| 💰 | **Kling 4.0 Flash** (Kuaishou) | $0.47 | Sí | Cumple el prompt; **mejor valor** |
| 4 | MiniMax H3 Lite 768p | $0.10 | Sí | No sale del huevo; útil como borrador |
| 5 | MiniMax H3 Lite 480p | $0.06 | Sí | No sale y se ve borroso |
| ✗ | Wan 2.5 (Alibaba) | $0.50 | Sí | **Cambió al personaje** (le puso alas) |

**Lecciones:**
- **El más caro no siempre gana por mucho.** Kling hace casi lo mismo por el 63 % del precio.
- **Un modelo barato sirve para borradores** de encuadre y luz, no para la acción.
- **480p se ve borroso en un Short.** El mínimo es 720p, y se puede escalar a 1080p gratis al editar.
- **Mira cada clip con una hoja de contacto** (6 fotogramas en fila) antes de decidir.

## Paso 3 · El guion: una línea por escena

- Escribe de 5 a 7 líneas cortas: **gancho** en la primera, **revelación o remate** en el medio y **cliffhanger o CTA** al final.
- Divide la serie en 2 partes: la Parte 1 muestra 3 modelos y deja la intriga, y la Parte 2 da el ranking y el CTA. Más episodios significa más retención y más regreso al canal.

## Paso 4 · La voz: que actúe, no que lea

| Voz | Resultado | Costo |
|---|---|---|
| Alex (edge-tts) plano | Monótona | $0 |
| Alex con tonos (fragmentos con distinto pitch y rate) | Mejor, pero con saltos artificiales | $0 |
| **Gemini 3.8 Flash TTS · voz Puck, dirigida** | **Natural: actúa, ríe y hace pausas** ✅ | < $0.05 por Short |

**Por qué gana Gemini:** recibe una **dirección en lenguaje natural** por cada línea, y el modelo genera la entonación completa. Ejemplo:
```json
{"texto": "Esta le puso... ¿alas? <laugh> Nadie le pidió alas.",
 "estilo": "incrédulo y gracioso; '¿alas?' con sorpresa total, el remate rápido y con risa"}
```
**Bonus:** la voz expresiva también hace el video más ágil (31.9 s frente a 36.6 s de la voz plana).

**Subtítulos sincronizados:** Gemini no entrega el tiempo de cada palabra, así que se transcribe su audio con **Whisper local (gratis)** y se alinea con el guion.

## Paso 5 · Edición profesional en Remotion (lo que pidió la revisión, versión por versión)

| Versión | Feedback | Solución |
|---|---|---|
| v1 → v2 | “Faltan zooms, transiciones y música” | Punch-in del 14 % en palabras clave; transición zoom + desenfoque + destello + whoosh; música original sintetizada |
| v2 → v3 | “Coordina el audio con los subtítulos” y “que se note que es un modelo de IA” | Tiempos reales por palabra; tarjeta “MODELO DE IA · VIDEO” con complementos debajo |
| v3 → v4 | “Dos zooms raros al inicio” y “muestra las 6 IAs” | La escena 1 lleva un solo zoom suave; intro donde la imagen vuela a la “cabeza” de 6 IAs |
| v4 → v5 | “No se escucha el audio de los videos” | Clips a velocidad normal con su sonido, último fotograma congelado y rugido sincronizado con “ruge” |
| v5 → v6 | “El audio choca con la voz” y “falta título arriba” | Ducking: el clip baja al 45 % cuando habla la voz; título “6 MODELOS DE IA DE VIDEO” |
| v6 → v7 | “La voz es plana” | Gemini Puck dirigida |

**Reglas que quedaron:**
- Un cambio visual cada 2–5 s.
- Nunca dos sacudidas en el gancho.
- El nombre del modelo, grande.
- El audio de los modelos siempre se escucha.
- −14 LUFS para YouTube.

## Paso 6 · Publicar: el copy

- **Título:** gancho de historia, menos de 60 caracteres, con emoji y “(Parte N)”.
- **Descripción:** en Shorts solo se ve la primera línea, así que el orden importa.
  1. **Línea 1:** el gancho, que repite la intriga del video.
  2. **Lista de modelos** con su precio.
  3. **🎬 Prompts usados (cópialos):** imagen y video. Aportan valor (guardados), búsqueda (palabras clave) y transparencia.
  4. Enlace a la otra parte y CTA.
  5. “Videos generados con IA” + la voz usada.
  6. Al final, 3 hashtags.
- **Comentario fijado:** una pregunta + “los prompts están en la descripción”.
- **Divulgación:** marca “contenido alterado o sintético” cuando el video sea realista.

## Costo total

| Concepto | US$ |
|---|---|
| 6 clips de video (bake-off) + imagen inicial | 2.51 |
| Voces de prueba (MiniMax, ElevenLabs ×8) | 0.05 |
| Voz final Gemini (Partes 1 y 2) | < 0.10 |
| Música, edición, subtítulos y Whisper | 0 (local) |
| **Total, dos Shorts publicables** | **≈ 2.70** |

## Ejercicio para el alumno
1. Elige un personaje y genera **una** imagen.
2. Haz un bake-off con 3 modelos (por ejemplo H3 Lite, Kling 4.0 Flash y Seedance 2.0 Fast) por menos de $1.50.
3. Escribe un guion de 5 líneas con gancho y cliffhanger y genéralo con Gemini, dirigiendo cada línea.
4. Edita con la plantilla de la skill `short-explicativo-ia` y publícalo con prompts en la descripción.
