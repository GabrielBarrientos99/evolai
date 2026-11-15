# Lección 2 · Personajes consistentes para una serie con IA

> El mayor problema de la IA en una serie: **el mismo personaje sale distinto en cada video** (otro color, otra cara, otro tamaño). La solución es crear primero una **ficha oficial** de cada personaje y generar todas las escenas a partir de ella.

**Caso real:** serie *Huevitos Sorpresa: La Isla* (canal Gabito Tu IA, 15-nov-2026). **Costo de esta lección: US$ 0.24.**

## Paso 1 · Escribe la biblia de la serie
Antes de generar nada, define en un documento:
- **Estilo común** (se pega al final de todos los prompts):
  ```
  STYLE: cute stylized 3D animation, Pixar-like, big expressive eyes, soft rim light,
  saturated colors, vertical 9:16
  ```
- **Cada personaje** con una descripción visual fija en inglés:

| Personaje | Descripción para el prompt |
|---|---|
| Dojo (protagonista) | `small cute capuchin monkey with a red karate headband, mischievous grin, brown and cream fur, long curly tail, holding a yellow banana` |
| Magma (huevo de lava) | `cute baby salamander-dragon made of cooled black lava rock with glowing orange cracks, tiny stubby wings, big round amber eyes, wisps of smoke` |

## Paso 2 · Genera 4 versiones de cada personaje
Usamos **Seedream 4** en Replicate (US$ 0.03 por imagen). Al prompt se le añade un estilo de "hoja de personaje": *un solo personaje, cuerpo completo, centrado, fondo suave*.

```bash
cd cuenta_gabito-tu-ia/pruebas_ia/01_huevos_sorpresa_ia/temporada_01/referencias
python generar_referencias.py dojo magma --n 4              # muestra el costo (US$ 0.24)
python generar_referencias.py dojo magma --n 4 --confirmar  # genera
```

Resultado real (8 imágenes, ~12 s cada una):

![Referencias de Dojo y Magma](curso/img/huevitos-referencias-dojo-magma.jpg)

## Paso 3 · Elige la ficha oficial
Elige **una imagen por personaje** y guárdala como `ficha.jpg` en su carpeta (`referencias/personajes/<nombre>/`).

**Nuestra elección:** **Dojo 4** (la expresión más pícara, encaja con su personalidad) y **Magma 4** (alas y humo: se reconoce mejor en pantalla chica). Criterio: que el personaje se distinga en un celular y que su cara cuente su personalidad.

Esa imagen se usa como **imagen de entrada** en todas las escenas de video (Kling, Seedance), así el personaje se ve igual en los 10 episodios.

## Errores que tuvimos (y cómo se resolvieron)

| Error | Causa | Solución |
|---|---|---|
| `HTTP 429 Too Many Requests` | Con saldo menor a US$ 5, Replicate solo deja lanzar **una generación a la vez** | Generar de a una y reintentar tras 12 s (ya incluido en el script). No se cobra lo que falla |
| Archivos con el mismo nombre | Generar en paralelo en el mismo segundo | Generar en secuencia |

## Checklist
- [x] Biblia de la serie con estilo y descripciones fijas
- [x] 4 referencias de Dojo y 4 de Magma (US$ 0.24)
- [x] Ficha oficial elegida para cada personaje (Dojo 4, Magma 4)
- [ ] Primera escena de video generada desde la ficha
