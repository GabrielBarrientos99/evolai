# Lección 5 · Subir y programar el Short con la API de YouTube

> Con la API conectada (tutorial gratis), publicar es un solo comando: sube en privado, pone la portada, crea la playlist y deja el video programado. **Costo: US$ 0.00** (la API es gratis; una subida usa ~1.700 de las 10.000 unidades diarias). Caso real: *Huevitos Sorpresa* Ep. 1, subido el 15-nov-2026.

## Paso 1 · La carpeta de publicación
Cada video listo va en `publicaciones/AAAA-MM-DD_tema/` (la fecha es la de **producción**):

| Archivo | Para qué |
|---|---|
| `huevitos_ep01_FINAL.mp4` | El video final (1080×1920, −14 LUFS) |
| `portada.jpg` | Un cuadro del video (aquí, la presentación de Magma) |
| `publicacion.md` | Título, descripción, etiquetas, comentario fijado, costos y checklist |

El script **lee el título, la descripción y las etiquetas desde `publicacion.md`**: escribes el copy una vez y queda documentado.

**Copy usado (reglas de la serie):** título-historia de menos de 60 caracteres + nombre de la serie, descripción de una línea con una pregunta para comentar y solo 3 hashtags.

## Paso 2 · Subir y programar (un comando)

```bash
cd cuenta_gabito-tu-ia
python scripts/subir_youtube.py publicaciones/2026-11-15_huevitos-sorpresa_ep01 huevitos_ep01_FINAL.mp4 \
  --programar 2026-11-16T18:00:00-05:00 --portada portada.jpg --categoria 1 \
  --playlist "Huevitos Sorpresa: La Isla (T1)" --desc-playlist "Serie animada con IA…"
```

| Opción | Qué hace |
|---|---|
| `--programar` | Fecha **con zona horaria** (−05:00 = Perú). YouTube lo publica solo a esa hora |
| `--portada` | Sube la miniatura |
| `--categoria 1` | Cine y animación (por defecto 28, Ciencia y tecnología) |
| `--playlist` | La busca por nombre; si no existe la crea (privada) y añade el video |

Salida real (20 MB, ~30 s):
```
Subiendo «¡El huevito de lava ha vuelto! | Huevitos Sorpresa Ep.1» (20.0 MB) en privado, programado para 2026-11-16T23:00:00Z…
ID: h-yIPuzr0k4 · https://youtu.be/h-yIPuzr0k4
Portada subida
Playlist creada: PLc3PNT4zjFbA
```

## Paso 3 · Verifica (no confíes, comprueba)
Consulta el video con la API y revisa cada campo:

| Campo | Valor esperado | Resultado |
|---|---|---|
| `privacyStatus` | `private` (hasta la hora programada) | ✅ |
| `publishAt` | `2026-11-16T23:00:00Z` (18:00 Perú) | ✅ |
| `categoryId` | `1` | ✅ |
| `selfDeclaredMadeForKids` | `false` | ✅ |
| Miniaturas | `default` … `maxres` | ✅ |
| `containsSyntheticMedia` | `true` | ⚠️ La API no lo devuelve al consultar: confírmalo en Studio |

## Decisiones importantes

| Decisión | Por qué |
|---|---|
| **No** marcar "hecho para niños" | Aunque es animación familiar, "para niños" **desactiva los comentarios** y la serie depende de las votaciones |
| Declarar contenido sintético | Es obligatorio en YouTube para videos realistas hechos con IA y evita sanciones |
| Publicar a las 18:00 | La hora en que mejor funcionaron los Shorts del canal |
| No publicar dos videos el mismo día a la misma hora | La Parte 2 de "6 IAs" sale el 15-nov a las 18:00; el Ep. 1 queda para el 16-nov |

## Lo que la API NO puede hacer (hazlo en Studio)
- [ ] **Fijar el comentario** (`¿Qué creen que saldrá del huevo negro? 🥚🖤`)
- [ ] Hacer **pública la playlist** cuando el episodio ya sea público
- [ ] Confirmar la etiqueta de contenido alterado o sintético

## Paso 4 · Medir
A las **48 h** y a los **7 días**: vistas, % visto y comentarios en `pruebas_ia/registro_pruebas.csv`. Meta de la serie: **1.200 vistas a 7 días** de promedio (Lección 0). Si a las 48 h va bajo, se prueba el título B: *Le quemó el plátano a Dojo 🔥 | Huevitos Sorpresa Ep.1*.
