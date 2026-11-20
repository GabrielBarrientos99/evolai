---
formato: afiche
eyebrow: Curso Replicate · costos
titular: Cuánto cuesta un episodio: *Replicate* o Higgsfield
bajada: Comparamos el costo real de generar una serie de Shorts con IA. Precios leídos el 13 nov 2026 en replicate.com y en el conector de Higgsfield.
estado: Precios del 13 nov 2026
pie: Precios del 13 nov 2026; cambian seguido. La cifra de "~200 videos" del plan de Higgsfield es de Higgsfield y no está verificada.
ficha:
  Episodio: 4 planos de 5 s = 20 s de video final
  Generado: 40 s (2 variantes por plano)
  Temporada: 10 episodios
  Más barato: H3 Lite · US$ 0.50 por episodio
---

# Comparativa de costos · Replicate vs Higgsfield

## ¿Cómo se calcula?

### El supuesto

- Un episodio tiene **4 planos de 5 s** = 20 s de video final.
- Con **2 variantes por plano** se generan **40 s**.
- Una **temporada** son 10 episodios.

### Por qué así

- Casi nunca sale bien a la primera: por eso se cuentan **2 variantes** por plano.
- Con el precio por segundo de cada modelo, el costo por episodio es **precio × 40 s**.
- Así se comparan modelos con distinto precio en la misma tabla.

## Replicate: costo por episodio (40 s generados)

### Modelo por modelo

| Uso | Modelo | Precio / s | Por episodio | Por temporada |
|---|---|---|---|---|
| **Borrador** (probar prompts) | minimax/h3-lite 480p | $0.0125 | **$0.50** | $5 |
| Borrador | wan-video/wan-2.5-i2v 480p | $0.05 | $2.00 | $20 |
| **Final económico** | kwaivgi/kling-v4-flash 720p (con sonido) | $0.094 | **$3.76** | $38 |
| Final con audio | google/veo-3.1-fast con audio | $0.15 | $6.00 | $60 |
| Final | bytedance/seedance-2.0-fast 720p | $0.15 | $6.00 | $60 |
| Final con referencias de personaje | kwaivgi/kling-v3-omni-video standard 720p | $0.168 | $6.72 | $67 |
| Final | bytedance/seedance-2.0 720p | $0.18 | $7.20 | $72 |
| Final 1080p | kwaivgi/kling-v3-video pro | $0.224 | $8.96 | $90 |

## Imágenes y suscripción

### Imágenes de personajes

Unas **30 imágenes** de referencia con Seedream 4 ($0.03) o Nano Banana ($0.039) cuestan entre **$1 y $1.20 en total**, una sola vez.

### Higgsfield PLUS (suscripción)

| Plan | Precio | Créditos | Según Higgsfield |
|---|---|---|---|
| PLUS mensual | $39 / mes | 1.000 | ~200 videos de Kling 3.0 → **~$0.20 por clip** |

Una temporada son unos 80 clips, unos 400 créditos: algo menos de la mitad del plan.

## Lectura honesta

### Uno frente al otro

| | Replicate | Higgsfield PLUS |
|---|---|---|
| Kling 3.0, 1 clip de 5 s | $0.84 (standard 720p) | ~$0.20, si se cumple su cifra de "~200 videos" (no verificada) |
| Compromiso | Ninguno: pagas solo lo que usas | $39 al mes aunque no lo uses |
| Modelos | Muchísimos, y los nuevos llegan rápido | Una selección curada, con herramientas extra (lipsync, virality predictor) |
| Automatización | API directa desde tus scripts | A través de Claude (conector) |
| Mejor para | **Probar y comparar modelos, borradores baratos** | **Producción en volumen** de un modelo ya elegido |

## La recomendación, paso a paso

### 01 · Ahora: carga US$ 10 en Replicate

**Qué haces:**
- Haz un **"bake-off"**: el mismo plano del Ep. 1 en 4 o 5 modelos para elegir el mejor en calidad y precio. Cuesta unos **$3 a $5**.
- Prueba los prompts en **H3 Lite a $0.0125 por segundo**, que es 13 veces más barato que Kling 3.0.

**Por qué:** Antes de producir, sabes qué modelo gana sin casarte con una suscripción.

### 02 · Producción de la temporada 1

**Qué haces:** Si gana **Kling 4.0 Flash**, produce en Replicate.

**Cuánto sale:** Unos **$45 por temporada** ($38 de video, más borradores e imágenes), similar a Higgsfield PLUS pero sin suscripción.

### 03 · Si publicas a diario

**Qué haces:** Si sacas más de 2 temporadas al mes, compara de nuevo.

**Por qué:** La suscripción puede salir más barata por clip, si la cifra de Higgsfield es real.

> **Ojo:** confirma la cifra de "~200 videos" con una prueba antes de pagar el plan.

## Lo que sigue

### Tu tarea

- Carga US$ 10 y haz tu propio bake-off con 4 o 5 modelos.
- Anota el costo real de cada clip para comparar con esta tabla.

### Dónde queda guardado

- **Precios:** `precios_replicate.json` (13 nov 2026).
- **Lo que gastaste:** `registro_replicate.csv`.
- **PDF para imprimir:** [Descargar la lección](curso/pdf/costos-replicate.pdf).
- **Anterior:** [Conectar tu cuenta y comandos](#replicate/conexion-replicate).
