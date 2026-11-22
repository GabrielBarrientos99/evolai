---
formato: afiche
eyebrow: Curso Dominio propio · Lección 5 · base de datos
titular: Guarda reservas y pagos *gratis* con Cloudflare D1
bajada: GitHub Pages no guarda datos. Con un Worker (un programa pequeño en Cloudflare) y su base de datos D1, cada reserva y cada pago de tu web queda en una tabla que puedes revisar y bajar a Excel, sin pagar servidor.
estado: Plan gratis · S/ 0
pie: Comandos y respuestas reales del 21 nov 2026 (wrangler 4.166), con la base de reservas de un Zoom. Límites y precios de la documentación de Cloudflare ("D1 pricing" y "D1 limits"), revisados el 21 nov 2026.
ficha:
  Dónde se ve: dash.cloudflare.com → Storage & databases → D1
  Herramienta: wrangler (programa de Cloudflare para la terminal)
  Costo: S/ 0 en el plan gratis
  Límite gratis: 100 000 filas nuevas al día y 5 GB
---

# Lección 5 · Guarda datos gratis con Cloudflare D1

## ¿Para qué una base de datos?

### El problema

- Tu web en GitHub Pages son **archivos fijos**: muestra cosas, pero **no guarda nada** (lo viste en la [Lección 1](#dominio-propio/dominio-01-github-pages)).
- Si alguien reserva o paga, el dato se pierde o queda suelto: en el WhatsApp, en Mercado Pago, en tu memoria.
- Sin una lista ordenada no sabes **qué anuncio** trajo cada reserva ni **cuántos asistieron**.

### La solución

- Un **Worker**: un programa pequeño que vive en Cloudflare y responde cuando tu web lo llama.
- Una base **D1**: la base de datos de Cloudflare. Guarda **tablas** (como una hoja de Excel) y se maneja con **SQL**, el idioma de las bases de datos.
- Tu web le manda los datos al Worker, el Worker los revisa y guarda **una fila por reserva**.

## ¿D1 o Supabase?

Las dos tienen plan gratis. Elige según dónde vive tu Worker.

### Cloudflare D1

- Vive en la **misma cuenta** que tu Worker y se conecta con un **enlace**, sin claves secretas.
- **No se pausa** aunque pasen días sin uso.
- Gratis: hasta 10 bases, 500 MB cada una (5 GB en total), 100 000 filas nuevas y 5 millones de filas leídas **al día**.

### Supabase

- Base de datos Postgres con **inicio de sesión** incluido (por eso se usa para entrar al curso).
- Para usarla desde un Worker hay que copiar una **clave secreta**.
- En el plan gratis, el proyecto **se pausa** si pasa unos 7 días sin actividad.

## ¿Cuánto cuesta?

### Plan gratis (el que usamos)

| | Gratis |
|---|---|
| Worker | 100 000 visitas al día |
| Filas nuevas | 100 000 al día |
| Filas leídas | 5 millones al día |
| Espacio | 5 GB en total |

Si te pasas, **no te cobra**: ese día las consultas fallan hasta la medianoche UTC (7 p. m. en Perú). Lo guardado no se pierde.

### Plan pagado (solo si lo eliges)

| | Pagado |
|---|---|
| Cuota fija | US$ 5 al mes por cuenta |
| Filas nuevas | 50 millones al mes; luego US$ 1 por millón |
| Filas leídas | 25 000 millones al mes; luego US$ 0.001 por millón |
| Espacio | 5 GB; luego US$ 0.75 por GB al mes |

Ejemplo real: 50 reservas al día usan unas 100 filas nuevas (con su índice): **0.1 % del límite gratis**.

## Los 8 pasos

Todo se hace en la terminal, dentro de la carpeta de tu Worker. Si todavía no tienes uno, créalo con `npm create cloudflare@latest` y elige "Hello World Worker".

### 01 · Conecta wrangler a tu cuenta (una sola vez)

**Qué haces:**

```bash
npx wrangler login
npx wrangler whoami
```

**Por qué:** `wrangler` es el programa oficial de Cloudflare para la terminal. `login` abre el navegador para que autorices tu cuenta; `whoami` muestra a qué cuenta quedó conectado.

> **Ojo:** la sesión queda guardada en tu PC. No hay contraseñas ni claves en tu código.

### 02 · Crea la base

**Qué haces:**

```bash
npx wrangler d1 create biai-reservas
```

Cloudflare responde:

```
✅ Successfully created DB 'biai-reservas' in region ENAM
[[d1_databases]]
binding = "biai_reservas"
database_name = "biai-reservas"
database_id = "c2bc07f0-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

**Por qué:** crea una base vacía en tu cuenta. El `database_id` es su número único; lo usas en el paso 03.

### 03 · Enlázala a tu Worker

**Qué haces:** agrega esto al final de `wrangler.toml` (el archivo de configuración del Worker):

```toml
[[d1_databases]]
binding = "DB"
database_name = "biai-reservas"
database_id = "c2bc07f0-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

**Por qué:** el **enlace** (binding) le da a tu código la base con el nombre `env.DB`. Cloudflare sabe que los dos son tuyos, así que no hace falta ninguna clave.

### 04 · Crea la tabla con SQL

**Qué haces:** crea el archivo `esquema_reservas.sql`:

```sql
CREATE TABLE IF NOT EXISTS reservas_zoom (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  creado     TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  variante   TEXT,   -- versión de la página
  fecha_zoom TEXT,   -- el Zoom que eligió
  nombre     TEXT,
  rubro      TEXT,
  whatsapp   TEXT,
  medio      TEXT,   -- gratis / yape / qr / tarjeta
  estado     TEXT,   -- reservado / pagado / rechazado / aviso_qr
  monto      REAL,
  orden_mp   TEXT,   -- orden de Mercado Pago
  motivo     TEXT,
  campana    TEXT,   -- de qué anuncio llegó
  asistio    INTEGER
);
CREATE INDEX IF NOT EXISTS reservas_por_fecha ON reservas_zoom (creado);
```

y ejecútalo en la base real:

```bash
npx wrangler d1 execute biai-reservas --remote --file esquema_reservas.sql
```

**Por qué:** `CREATE TABLE` crea la tabla con sus columnas. `IF NOT EXISTS` evita borrar algo si lo ejecutas dos veces. El **índice** es como el de un libro: hace rápido buscar por fecha. `--remote` lo hace en Cloudflare; sin eso, lo haría en una copia de prueba en tu PC.

> **Ojo:** la hora se guarda en **UTC** (hora mundial). En Perú son 5 horas menos.

### 05 · El código que guarda una fila

**Qué haces:** en el código del Worker (`src/index.js`):

```js
async function guardarReserva(env, f) {
  try {
    await env.DB.prepare(
      'INSERT INTO reservas_zoom (variante, fecha_zoom, nombre, rubro, medio, estado, monto, campana) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(f.variante, f.fecha_zoom, f.nombre, f.rubro, f.medio, f.estado, f.monto, f.campana).run();
  } catch (e) {
    console.log('No se pudo guardar', String(e));
  }
}
```

**Por qué:** `INSERT` agrega una fila. Los `?` se llenan con `bind(...)` **de forma segura**: aunque alguien escriba código raro en el campo del nombre, se guarda como texto y no como una orden (eso evita la "inyección SQL").

> **Ojo:** limpia y recorta los textos antes de guardarlos (largo máximo, solo letras y números). Y si la base falla, que el cobro siga igual: por eso va dentro de `try`.

### 06 · Una ruta para que la web mande los datos

**Qué haces:** en el `fetch` del Worker, una ruta `POST /reserva`:

```js
if (url.pathname === '/reserva' && request.method === 'POST') {
  const c = await request.json();
  ctx.waitUntil(guardarReserva(env, {nombre: c.nombre, rubro: c.rubro, medio: 'gratis', estado: 'reservado', monto: 0}));
  return json({ok: true}, 200, origen);
}
```

**Por qué:** `ctx.waitUntil` responde primero a la persona y guarda justo después, así nadie espera. Los pagos se guardan en la ruta de cobro **con la respuesta real de Mercado Pago**, para que nadie pueda inventar un "pagado" desde el navegador.

> **Ojo:** acepta pedidos solo desde tu web (revisa el encabezado `Origin`), como en el cobro.

### 07 · Publica el Worker

**Qué haces:**

```bash
npx wrangler deploy
```

Cloudflare responde (parte):

```
Your Worker has access to the following bindings:
env.DB (biai-reservas)      D1 Database
```

**Por qué:** sube el código nuevo. La línea `env.DB (biai-reservas)` confirma que el Worker ya ve la base.

### 08 · Tu web manda la reserva

**Qué haces:** en la página, al tocar "Reservar":

```js
fetch('https://tu-worker.workers.dev/reserva', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({nombre, rubro, reserva: {variante, fecha_zoom, campana}}),
  keepalive: true,
});
```

**Por qué:** `fetch` es como la página llama a un servidor. `keepalive` hace que el envío termine aunque la persona salte a WhatsApp. `campana` sale del link del anuncio (`utm_campaign`) o del `fbclid` que agrega Meta.

## Prueba y revisa tus datos

### 01 · Haz una reserva de prueba

**Qué haces:**

```bash
curl -X POST https://tu-worker.workers.dev/reserva -H "Origin: https://tuweb.com" -H "Content-Type: application/json" --data '{"nombre":"PRUEBA","rubro":"Servicios"}'
```

Responde `{"ok":true}`.

**Por qué:** `curl` llama al Worker desde la terminal, sin abrir la web. Así compruebas que guarda antes de probar con la página.

### 02 · Lee la tabla

**Qué haces:**

```bash
npx wrangler d1 execute biai-reservas --remote --command "SELECT id, creado, nombre, medio, estado, monto FROM reservas_zoom"
```

Resultado de la prueba real:

| id | creado (UTC) | nombre | medio | estado | monto |
|---|---|---|---|---|---|
| 1 | 2026-11-22T04:35:00Z | PRUEBA Claude | gratis | reservado | 0 |
| 2 | 2026-11-22T04:36:02Z | PRUEBA local | gratis | reservado | 0 |
| 3 | 2026-11-22T04:36:52Z | PRUEBA qr | qr | aviso_qr | 10 |

**Por qué:** `SELECT` lee filas. Así confirmas que cada camino de la web guarda bien.

### 03 · Borra las pruebas

**Qué haces:**

```bash
npx wrangler d1 execute biai-reservas --remote --command "DELETE FROM reservas_zoom WHERE nombre LIKE 'PRUEBA%'"
```

**Por qué:** `DELETE` borra filas. `LIKE 'PRUEBA%'` toma solo las que empiezan con "PRUEBA", para dejar la tabla limpia antes de las reservas reales.

> **Ojo:** un `DELETE` sin `WHERE` borra **toda** la tabla. Revisa siempre la condición.

### 04 · Entra a D1 y mira tu consumo

![Panel de D1: consumo del día contra el límite gratis y la base biai-reservas](curso/img/dominio/d1/01_d1_uso_plan_gratis.jpg)

**Qué haces:** dash.cloudflare.com → menú **Storage & databases** → **D1 SQLite Database**.

**Por qué:** arriba ves cuánto llevas usado **hoy** contra el límite gratis (aquí: 17 de 100 000 filas escritas). Abajo, la lista de tus bases.

### 05 · Abre tu base

![Resumen de la base: pestañas, filas escritas y espacio usado](curso/img/dominio/d1/02_d1_base_resumen.jpg)

**Qué haces:** clic en el nombre de tu base.

**Por qué:** el resumen muestra cuántas consultas, filas y espacio usó en las últimas 24 horas. **Time Travel** sirve para volver la base a como estaba antes, si borraste algo por error.

### 06 · Mira las filas como en Excel

![La tabla reservas_zoom abierta en Explore Data, con 3 filas de ejemplo](curso/img/dominio/d1/04_d1_tabla_reservas_ejemplo.jpg)

**Qué haces:** botón **Explore Data** → clic en `reservas_zoom`.

**Por qué:** ves cada reserva como una fila. Puedes filtrar (por ejemplo `medio = 'yape'`) sin saber SQL.

> **Ojo:** las 3 filas de la captura son de ejemplo y se borraron después.

### 07 · Escribe SQL en la Console

![Console de D1 con la consulta de resumen por ruta y su resultado](curso/img/dominio/d1/03_d1_console_resumen_por_ruta.jpg)

**Qué haces:** pestaña **Console** → escribe una consulta → **Execute**.

**Por qué:** es lo mismo que `wrangler d1 execute`, pero desde el navegador. Usa las consultas de abajo.

### Consultas útiles

```sql
-- Reservas de hoy (hora de Perú)
SELECT * FROM reservas_zoom WHERE datetime(creado, '-5 hours') >= date('now', '-5 hours') ORDER BY id DESC;
-- Cuántas y cuánto por ruta
SELECT variante, medio, estado, COUNT(*) AS n, SUM(monto) AS soles FROM reservas_zoom GROUP BY 1, 2, 3;
-- Marcar que alguien asistió
UPDATE reservas_zoom SET asistio = 1 WHERE id = 12;
```

## Lo que sigue

### Tu tarea

- Crea tu base y tu tabla con los pasos 02 a 04.
- Haz una reserva de prueba, léela y bórrala.
- Después de cada Zoom, marca quién asistió y compara las rutas con la consulta "cuántas y cuánto".

### Dónde queda guardado

- **La base:** dash.cloudflare.com → Storage & databases → D1.
- **El enlace:** `wrangler.toml` de tu Worker.
- **La tabla:** tu archivo `esquema_reservas.sql` (guárdalo junto al código).
- **Volver al inicio del curso:** [Lección 1](#dominio-propio/dominio-01-github-pages).
