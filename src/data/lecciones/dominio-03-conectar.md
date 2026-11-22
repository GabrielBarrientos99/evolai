---
formato: afiche
eyebrow: Curso Dominio propio · Lección 3 · conectar
titular: Conecta tu dominio a *GitHub Pages*
bajada: Con el dominio comprado, faltan tres cosas: decirle al DNS que tu dominio apunta a GitHub, decirle a GitHub cuál es tu dominio y prender el candado (HTTPS). Las direcciones viejas de github.io pasan solas al dominio nuevo.
estado: Gratis · se hace una sola vez
pie: Direcciones IP y pasos: documentación oficial de GitHub ("Managing a custom domain for your GitHub Pages site" y "Verifying your custom domain"), revisada el 20 nov 2026.
ficha:
  Dónde: panel DNS del registrador + Settings → Pages del repositorio
  Registros: 4 de tipo A + 1 CNAME para www
  Candado (HTTPS): gratis, lo pone GitHub
  Espera: de minutos a 24 horas
---

# Lección 3 · Conecta tu dominio a GitHub Pages

## ¿Qué es el DNS?

### Qué es

- La **guía telefónica de internet**: dice a qué servidor ir cuando alguien escribe tu dominio.
- Se cambia en el **panel del registrador** donde compraste el dominio.
- Cada línea se llama **registro**: tiene un tipo (A, AAAA, CNAME, TXT), un nombre y un valor.

### Los registros para GitHub Pages

| Tipo | Nombre | Valor | Para qué |
|---|---|---|---|
| A | `@` (el dominio solo) | `185.199.108.153` | Dominio principal |
| A | `@` | `185.199.109.153` | Dominio principal |
| A | `@` | `185.199.110.153` | Dominio principal |
| A | `@` | `185.199.111.153` | Dominio principal |
| CNAME | `www` | `TU-USUARIO.github.io` | Que también funcione con www |
| CNAME | un subdominio, ej. `ventas` | `TU-USUARIO.github.io` | Otra página en otro repositorio |

Opcional: 4 registros AAAA (`2606:50c0:8000::153`, `…8001::153`, `…8002::153`, `…8003::153`) para conexiones IPv6.

## Los 8 pasos

### 01 · Verifica el dominio en tu cuenta de GitHub

**Qué haces:** En GitHub, tu foto → **Settings** → **Pages** → **Add a domain**. GitHub te da un registro **TXT** con el nombre `_github-pages-challenge-TU-USUARIO`. Créalo en el DNS y vuelve a GitHub → **Verify**.

**Por qué:** Así nadie más puede usar tu dominio en GitHub, aunque un día tu web quede desconectada.

### 02 · Crea los 4 registros A

**Qué haces:** En el panel DNS del registrador, crea los 4 registros **A** con nombre `@` y las 4 direcciones de la tabla.

**Por qué:** Son los servidores de GitHub Pages. Con 4, si uno falla, responden los otros.

> **Ojo:** si usas el DNS de Cloudflare, deja estos registros en **"solo DNS"** (nube gris). Con la nube naranja, GitHub no puede darte el candado.

### 03 · Crea el CNAME de www

**Qué haces:** Un registro **CNAME** con nombre `www` y valor `TU-USUARIO.github.io`.

**Por qué:** Así funciona igual `tunegocio.pe` que `www.tunegocio.pe`.

> **Ojo:** el valor es solo `TU-USUARIO.github.io`, **sin** el nombre del repositorio.

### 04 · Pon el dominio en el repositorio

**Qué haces:** En GitHub → tu repositorio → **Settings** → **Pages** → **Custom domain** → escribe tu dominio → **Save**.

**Por qué:** Le dice a GitHub qué repositorio responde cuando alguien entra a tu dominio.

> **Ojo:** si publicas con GitHub Actions, no necesitas el archivo `CNAME` en el repositorio: basta con este ajuste.

### 05 · Espera el chequeo del DNS

**Qué haces:** Debajo del dominio, GitHub revisa el DNS. Espera a que diga que está bien.

**Por qué:** Los cambios de DNS tardan en llegar a todo internet: de minutos a 24 horas.

### 06 · Prende el candado (HTTPS)

**Qué haces:** Cuando aparezca disponible, marca **Enforce HTTPS**.

**Por qué:** Sin candado, el navegador marca tu web como "no segura", y Meta y Google desconfían.

### 07 · Ajusta tu web si usaba la ruta del repositorio

**Qué haces:** Si tu web se armó para vivir en `/TU-REPO/` (en Vite, `base: '/TU-REPO/'`), cámbiala a `/` y publica de nuevo.

**Por qué:** Con dominio propio la web vive en la raíz. Si no lo cambias, busca sus archivos en una carpeta que ya no existe.

> **Ojo:** este es el error que deja la página **en blanco**. Revisa primero esto si tu web no carga.

### 08 · Prueba las dos direcciones

**Qué haces:** Abre tu dominio nuevo y también la dirección vieja `TU-USUARIO.github.io/TU-REPO`.

**Por qué:** La vieja debe llevarte sola al dominio nuevo. Así los enlaces que ya compartiste siguen funcionando.

## Dos páginas, un dominio

### Con subdominios

- Cada repositorio puede tener **su propio subdominio**: `tunegocio.pe` para uno y `ventas.tunegocio.pe` para otro.
- En el DNS: un **CNAME** por subdominio, con valor `TU-USUARIO.github.io`.
- En cada repositorio: **Settings → Pages → Custom domain** con su subdominio.

### Lo que no se puede

- Dos repositorios con **el mismo** dominio o subdominio.
- Poner el dominio en GitHub antes de crear los registros: GitHub avisará que el DNS no está listo (no pasa nada, solo espera).

## Lo que sigue

### Tu tarea

- Crea los registros, pon el dominio en el repositorio y espera el candado.
- Abre tu web en el celular con datos móviles (no con el wifi) para confirmar que ya llegó a todo internet.

### Dónde queda guardado

- **Los registros:** en el panel DNS del registrador.
- **El dominio de cada web:** en cada repositorio → Settings → Pages.
- **Siguiente:** en la [Lección 4](#dominio-propio/dominio-04-despues) actualizas Google, Supabase y Meta.
