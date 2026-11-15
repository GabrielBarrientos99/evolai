# Lección 3 · Del guion a las escenas: el episodio piloto

> Cómo convertir un guion de 24 segundos en 4 escenas animadas con personajes que se ven iguales, cuánto cuesta cada paso y qué salió mal en el camino. Caso real: *Huevitos Sorpresa* Ep. 1, 15-nov-2026.

## Resumen de costos (real)

| Paso | Herramienta | Cantidad | Precio unitario | Total |
|---|---|---|---|---|
| Fichas de personaje (Lección 2) | Seedream 4 | 8 imágenes | US$ 0.03 | **US$ 0.24** |
| Cuadros iniciales de las escenas | Seedream 4 | 4 imágenes | US$ 0.03 | **US$ 0.12** |
| Correcciones de la escena 1 | Seedream 4 | 2 imágenes | US$ 0.03 | **US$ 0.06** |
| Animación de las escenas | Kling 4.0 Flash (5 s, 720p) | 4 clips | US$ 0.47 | **US$ 1.88** |
| Música, efectos, montaje y subida | Remotion + API de YouTube | — | Gratis | **US$ 0.00** |
| **Total del episodio piloto** | | | | **US$ 2.30** |

> Los episodios siguientes cuestan menos (~US$ 2.00): las fichas de personaje se hacen una sola vez y se reutilizan.

## Paso 1 · Divide el guion en escenas

| Escena | Tiempo | Qué pasa | Personajes (ficha) |
|---|---|---|---|
| 1 | 0–3 s | Huevo de lava humeando en la arena | — |
| 2 | 3–9 s | Nace Magma y bosteza | Magma |
| 3 | 9–18 s | Magma estornuda chispas y quema el plátano de Dojo | Dojo + Magma |
| 4 | 18–24 s | Atardecer; detrás de las rocas se mueve un huevo negro | Dojo + Magma |

Cada escena lleva **dos prompts**: uno para la **imagen inicial** (cómo se ve el primer cuadro) y otro para el **video** (qué se mueve).

## Paso 2 · Genera la imagen inicial de cada escena desde las fichas
El truco para que los personajes no cambien: pasar las fichas a Seedream como **`image_input`** y nombrarlas en el prompt (*"the monkey from the first reference…"*).

```bash
cd cuenta_gabito-tu-ia/pruebas_ia/01_huevos_sorpresa_ia/temporada_01/episodios/ep01
python generar_ep01.py imagenes               # muestra el costo
python generar_ep01.py imagenes --confirmar   # 4 cuadros (~US$ 0.12, 5–16 s cada uno)
```

**Primer intento:** Dojo y Magma salen idénticos a sus fichas, pero el huevo de la escena 1 tiene cara.

![Primer intento: el huevo de la escena 1 salió con ojos](curso/img/ep01-cuadros-intento1.jpg)

## Paso 3 · Corrige lo que falle (sin rehacer todo)

| Intento | Qué cambiamos | Resultado | Costo |
|---|---|---|---|
| 1 | Prompt con el estilo de la serie (*"big expressive eyes"*) | El huevo sale con ojos y boca | US$ 0.03 |
| 2 | Agregamos *"NO face, NO eyes"* | **Peor:** ojos más grandes. Nombrar algo, aunque sea para prohibirlo, lo hace aparecer | US$ 0.03 |
| 3 | Estilo sin "ojos grandes" y describir el huevo como **piedra de basalto** | ✅ Huevo de roca sin cara | US$ 0.03 |

```bash
python generar_ep01.py imagenes --solo 1 --confirmar   # rehace solo la escena 1 (US$ 0.03)
```

![Escena 1 corregida](curso/img/ep01-escena1-corregida.jpg)

**Lección aprendida:** en los prompts de imagen, describe **lo que sí quieres** (materiales, formas) en vez de prohibir. Y revisa los cuadros **antes** de animar: corregir una imagen cuesta US$ 0.03; un video, US$ 0.47.

Cuadros finales aprobados:

![Los 4 cuadros iniciales aprobados](curso/img/ep01-cuadros-final.jpg)

## Paso 4 · Anima cada cuadro
Cada cuadro aprobado entra como **`start_image`** de Kling 4.0 Flash (el ganador del bake-off por calidad/precio) junto con el prompt de movimiento.

```bash
python generar_ep01.py videos --confirmar            # 4 clips de 5 s (~US$ 1.88)
python generar_ep01.py videos --solo 3 --confirmar   # rehacer solo una escena (US$ 0.47)
```

**Resultado real:** las 4 escenas salieron bien al primer intento. Kling devuelve clips de 5 s en 720×1280 **con sonido** incluido.

| Escena | Tiempo de generación | Costo | Qué hizo Kling |
|---|---|---|---|
| 1 | 75 s | US$ 0.47 | Las grietas laten, sube el humo, la cámara se acerca |
| 2 | 69 s | US$ 0.47 | Magma bosteza y abre sus ojos ámbar |
| 3 | 80 s | US$ 0.47 | Estornudo de chispas: el plátano explota en humo y Dojo queda en shock |
| 4 | 90 s | US$ 0.47 | El huevo negro brilla en morado; la cámara avanza hacia las rocas |

Cuadros al inicio, a la mitad y al final de cada clip:

![Cuadros de los 4 clips generados con Kling](curso/img/ep01-clips-kling.jpg)

> Unidos sin editar suman **20 s** (`borrador_ep01_sin_montaje.mp4`). Falta el montaje: textos, música, efectos ASMR y el loop final (Lección 4).

## Checklist
- [x] Guion dividido en 4 escenas con prompts de imagen y de video
- [x] 4 cuadros iniciales desde las fichas (US$ 0.12 + US$ 0.06 de correcciones)
- [x] 4 clips animados con Kling (US$ 1.88, ~5 min en total)
- [ ] Montaje en Remotion con música, sonido y textos (Lección 4)
