---
formato: afiche
eyebrow: Curso Dominio propio · Lección 1 · antes de empezar
titular: Qué aguanta *GitHub Pages* (y qué no)
bajada: GitHub Pages publica tu web gratis desde un repositorio. Antes de ponerle tu dominio, conviene saber cuánto aguanta, qué no puede hacer y qué tipo de web no permite.
estado: Límites oficiales de GitHub
pie: Límites y reglas: documentación oficial de GitHub ("GitHub Pages limits" y "About GitHub Pages"), revisada el 20 nov 2026. El peso de la página y el cálculo de visitas son una estimación con el Inicio de Biai.
ficha:
  Tamaño del sitio: hasta 1 GB
  Ancho de banda: 100 GB al mes (límite blando)
  Publicaciones: 10 por hora (no aplica con GitHub Actions)
  Costo: S/ 0
---

# Lección 1 · Qué aguanta GitHub Pages

## ¿Qué es GitHub Pages?

### Qué es

- Un servicio de GitHub que **publica una web desde un repositorio**.
- Es **gratis** y la dirección queda como `TU-USUARIO.github.io/TU-REPO`.
- Sirve páginas **estáticas**: HTML, CSS, JavaScript, imágenes, videos y PDF.

### Qué no puede hacer

- **No corre un servidor** (nada de PHP ni de código que se ejecute en GitHub).
- **No tiene base de datos.** Para iniciar sesión o guardar datos se usa otro servicio, como Supabase.
- En el **plan gratis** se publica desde un repositorio **público**: todo el código se puede ver.

## Los límites, en números

### Lo que dice GitHub

| Límite | Cuánto | Qué significa |
|---|---|---|
| Tamaño del sitio publicado | **1 GB** | Todo lo que se publica, sumado |
| Tamaño del repositorio | **1 GB** (recomendado) | El código con su historial |
| Ancho de banda | **100 GB al mes** (blando) | Lo que descargan todas las visitas juntas |
| Publicaciones | **10 por hora** (blando) | No aplica si publicas con GitHub Actions |
| Tiempo de publicación | **10 minutos** | Si tarda más, se cancela |

"Blando" significa que no se corta en seco: si te pasas seguido, GitHub puede escribirte o limitar el sitio.

## ¿Cuántas visitas aguanta tu web?

Un ejemplo real con el Inicio de Biai.

### 01 · Mide cuánto pesa tu página

**Qué haces:** Suma lo que descarga una visita nueva. En Biai, el Inicio carga unos **2.5 MB**: 1.2 MB de código y 1.3 MB de imágenes de fondo.

**Por qué:** El ancho de banda se gasta con cada visita. Una página liviana aguanta más visitas.

### 02 · Divide el límite entre el peso

**Qué haces:** 100 GB ÷ 2.5 a 3 MB por visita ≈ **34 mil a 41 mil visitas nuevas al mes**.

**Por qué:** Quien vuelve usa lo que ya guardó su navegador (la caché) y descarga mucho menos. Las visitas reales que aguanta son más.

> **Ojo:** los videos pesan mucho. Si tu página tiene videos que se reproducen solos, el cálculo cambia.

### 03 · Revisa el tamaño del sitio

**Qué haces:** Mira cuánto pesa la carpeta que se publica (en Vite, `dist`). El sitio de Biai pesa unos **14 MB**: el 1.4 % del límite de 1 GB.

**Por qué:** Imágenes muy pesadas o videos largos son lo que más llena ese giga. Comprímelos antes de subirlos.

## Lo que GitHub no permite

### La regla

- GitHub Pages **no se puede usar como hosting gratis para un negocio en línea, una tienda o una web cuyo fin principal sea cobrar**, ni para vender software como servicio (SaaS).
- Tampoco para **datos delicados**, como contraseñas o números de tarjeta.

### Qué significa en la práctica

- **Sí:** cursos, portafolio, documentación, la web de tu marca.
- **Mejor en otro hosting:** una tienda o una página de venta cuyo fin principal es cobrar. Hay opciones gratis, como Cloudflare Pages o Netlify; revisa sus condiciones.
- **Los pagos, siempre en la pasarela** (Mercado Pago, Izipay…): nunca pidas la tarjeta en tu propia web.

## Lo que sigue

### Tu tarea

- Mira cuánto pesa tu carpeta `dist` y cuánto pesa tu página principal.
- Decide si tu web es informativa (GitHub Pages está bien) o una tienda (mejor otro hosting).

### Dónde queda guardado

- **Cuánto usa tu sitio:** en GitHub → tu repositorio → **Actions** ves cada publicación y su tamaño.
- **Siguiente:** en la [Lección 2](#dominio-propio/dominio-02-comprar) compras tu dominio.
