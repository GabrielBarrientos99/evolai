# Evolai

Sitio de Evolai (canal **Gabito Tu IA**) y curso de Shorts con IA. React + [Astryx](https://astryx.atmeta.com/components) + Vite, publicado con GitHub Pages:
https://gabrielbarrientos99.github.io/evolai/

| Página | Para qué |
|---|---|
| `index.html` → `src/pages/Inicio.tsx` | Inicio: canal, videos y la app **Automatizacion Videos** |
| `curso.html` → `src/pages/Curso.tsx` | Curso: lecciones, pruebas con costos reales, publicaciones y conexiones |
| `privacidad.html` → `src/pages/Privacidad.tsx` | Política de privacidad (la pide Google para la app OAuth) |
| `panel.html` → `src/pages/Panel.tsx` | **Solo local** (`npm run dev`): aprobar y programar publicaciones. No se publica. |

Las URLs de `index.html` y `privacidad.html` están registradas en Google Cloud → Google Auth Platform → Información de la marca. No las cambies de nombre.

## Datos
`src/data/` y `public/portadas`, `public/tutorial` los genera el exportador del proyecto de automatización (nunca copia tokens ni credenciales):

```bash
python "../Automatizacion videos IA/00_general_youtube/herramientas/exportar_web.py"
```

## Trabajar en local
```bash
npm run dev                                                          # web + panel en http://localhost:5173
python "../Automatizacion videos IA/00_general_youtube/panel/servidor.py"   # API del panel (127.0.0.1:8770)
```

## Publicar
`git push` a `main`: el workflow `.github/workflows/pages.yml` compila y despliega. En GitHub → Settings → Pages, la fuente debe ser **GitHub Actions**.
