---
formato: afiche
eyebrow: Curso API de YouTube · estructura
titular: Así se ordena *tu proyecto* de videos
bajada: Todo lo que comparten los canales vive en una sola carpeta, `00_general_youtube`. Aquí ves qué hay en cada parte y cuál no debes compartir nunca.
estado: Una sola app OAuth para todos los canales
pie: Estructura del proyecto de automatización de Biai. La carpeta `credenciales/` nunca se sube a GitHub.
ficha:
  Carpeta: 00_general_youtube
  Credencial: credenciales/client_secret.json
  Instalar: pip install -r requirements.txt
  Canales: cada uno en su carpeta cuenta_<alias>/
---

# 00 · General YouTube

## ¿Por qué una carpeta general?

### Qué es

Es la carpeta con **lo que comparten todos los canales**: la guía, la credencial de la app, la plantilla para crear un canal nuevo, la música y el curso.

### Por qué así

- **Una sola credencial** sirve para todos los canales: no repites la configuración de Google Cloud.
- Para un canal nuevo **copias la plantilla** y no empiezas de cero.
- Si algo cambia (una herramienta, una música), lo cambias **en un solo lugar**.

## Las carpetas, una por una

### `tutorial/index.html`

**Qué es:** La guía: configuración de Google Cloud, kit de video con Claude, referencia de la API y laboratorio.

### `credenciales/client_secret.json`

**Qué es:** La identidad de la app OAuth "Automatizacion Videos". Una sola para todos los canales.

> **Ojo:** **no la compartas** ni la subas a GitHub. Quien la tenga puede hacerse pasar por tu app.

### `plantilla_cuenta/`

**Qué es:** `cuenta.json` + un notebook base para crear `cuenta_<alias>/`, la carpeta de cada canal.

### `musica/`

**Qué es:** Música de fondo: originales libres de reclamos, pistas de CapCut (solo para CapCut) y generadores.

> **Ojo:** las pistas de CapCut solo se pueden usar dentro de CapCut.

### `curso/`

**Qué es:** Las lecciones del curso (.md), sus imágenes (`img/`) y los PDFs con plantilla profesional (`pdf/`).

**Cómo se generan los PDF:** Con `herramientas/exportar_pdf.py`.

### `skills_exportadas/`

**Qué es:** Las skills de edición de video en .zip, para instalarlas en otra cuenta de Claude.

### `requirements.txt`

**Qué es:** La lista de librerías de Python del proyecto.

**Cómo se usa:** `pip install -r requirements.txt`

## Lo que sigue

### Tu tarea

- Crea tu carpeta `00_general_youtube` con esta misma forma.
- Copia `plantilla_cuenta/` como `cuenta_<tu-canal>/` para tu primer canal.

### Dónde queda guardado

- **Proyecto de Google Cloud de Biai:** `automatizacion-videos-514616`.
- **PDF para imprimir:** [Descargar la lección](curso/pdf/conexion-youtube.pdf).
- **Anterior:** [Paso a paso: API de YouTube](#api-youtube/tutorial-gratis).
