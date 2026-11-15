# Lección 4 · Montaje en Remotion: textos, música original y loop

> Cómo convertir 4 clips de IA en un Short listo para publicar: ganchos de texto, música propia sincronizada a la historia, efectos, transiciones, loop y masterizado. **Costo: US$ 0.00** (todo local). Caso real: *Huevitos Sorpresa* Ep. 1, 15-nov-2026.

## Resumen

| Dato | Valor |
|---|---|
| Duración final | **18.5 s** (los Shorts que mejor funcionaron en el canal duran 16–21 s) |
| Formato | 1080×1920, 30 fps, H.264 + AAC |
| Volumen | **-14 LUFS** (el estándar de YouTube) |
| Tiempo de render | ~1 min en una PC normal |
| Costo | **US$ 0.00**: Remotion, Python y FFmpeg son gratis |

## Paso 1 · Una sola línea de tiempo para todo
Un archivo JSON define **cuándo pasa cada cosa** (en frames, 30 por segundo). Lo leen tanto el video como el generador de música, así **todo queda sincronizado** y cambiar un tiempo no rompe nada.

```json
{"n": 3, "clip": "huevitos/ep01/escena_03_video.mp4", "inicio": 255, "frames": 150, "marcas": {"estornudo": 56}}
```

**Truco:** para saber en qué frame exacto pasa algo (el estornudo), buscamos el pico de volumen del audio que trae el clip de Kling. El estornudo cae en el frame 56 de la escena 3.

## Paso 2 · Música original sincronizada (sin reclamos)
Un script de Python **sintetiza** la música nota por nota: marimba, bajo, shaker y bombo, tropical, Do mayor, 105 BPM. Al no usar samples de nadie, **no hay reclamos de Content ID**.

```bash
cd cuenta_gabito-tu-ia/remotion
python scripts/musica_huevitos.py      # → public/musica/huevitos_ep01.wav
```

| Momento | Qué hace la música | Por qué |
|---|---|---|
| 0–3.5 s (huevo) | Silencio con **latidos graves** | Suspenso: ¿qué hay adentro? |
| 3.5 s (eclosión) | **Firma de la serie**: arpegio de marimba de 2 s | Sonido reconocible en todos los episodios |
| 10.4 s (estornudo) | **Se corta** medio segundo y vuelve con notas que "caen" | Remata el chiste |
| 13.5 s (huevo negro) | Se apaga; quedan zumbido grave y latidos | Cambia el tono: amenaza |
| 16.9 s (cartel) | Dos notas de pregunta en tono menor | Invita a comentar |

## Paso 3 · Textos y efectos en Remotion
La composición `src/HuevitosEp01.tsx` reutiliza los componentes del canal (cámara con zoom, destello, sticker):

![Textos de cada escena](curso/img/ep01-montaje-textos.jpg)

| Escena | Texto en pantalla | Efecto |
|---|---|---|
| 1 | **¿VOLVIÓ?** (gancho en el primer segundo) | Zoom lento hacia el huevo |
| 2 | **MAGMA 🔥** · *nació del huevo de lava* | Destello de lava al entrar + golpe de zoom en el bostezo |
| 3 | **MI PLÁTANO… 🍌🔥** | Golpe de zoom + temblor en el estornudo |
| 4 | **EP. 2 MAÑANA** · *¿Qué saldrá del huevo negro? 👀* | Cartel que late |
| Siempre | Etiqueta *Huevitos Sorpresa · Ep. 1* | Identidad de la serie |

**Reglas de diseño para Shorts:**
- Textos en la **mitad superior**: abajo y a la derecha están los botones de YouTube.
- Letras gruesas (Montserrat 900) con **contorno oscuro**: se leen sobre cualquier fondo.
- Sin diálogos: la historia se entiende sin sonido y en cualquier idioma.
- **Loop:** el video empieza y termina con un huevo. La última escena no tiene transición de salida, así el salto al inicio parece continuo y el Short se ve 2 veces.

## Paso 4 · Render y masterizado

```bash
npx remotion studio                                   # vista previa en el navegador
npx remotion render Huevitos-Ep01 out/huevitos_ep01_bruto.mp4
ffmpeg -i out/huevitos_ep01_bruto.mp4 -c:v copy -af loudnorm=I=-14:TP=-1:LRA=11 -c:a aac -b:a 192k final.mp4
```

Cuadros del video final (inicio, transición de eclosión, Magma, Dojo, estornudo, cartel):

![Cuadros del video final](curso/img/ep01-final-cuadros.jpg)

## Costo total del episodio piloto

| Etapa | Costo |
|---|---|
| Fichas de personaje (Lección 2) | US$ 0.24 |
| Cuadros + correcciones + animación (Lección 3) | US$ 2.06 |
| Montaje, música, efectos y masterizado (esta lección) | US$ 0.00 |
| **Total** | **US$ 2.30** |

## Checklist
- [x] Línea de tiempo compartida (`src/huevitos_ep01.json`)
- [x] Música original sincronizada (`scripts/musica_huevitos.py`)
- [x] Textos, efectos, transiciones y loop
- [x] Render a 1080×1920 y masterizado a -14 LUFS (`final.mp4`)
- [x] Subido en privado por la API y programado para el 16-nov 18:00 (Lección 5)
