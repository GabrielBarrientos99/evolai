---
formato: afiche
eyebrow: Curso Replicate · conexión
titular: Conecta *Replicate* y prueba modelos de video e imagen
bajada: Replicate cobra **por uso**, con saldo prepagado y sin suscripción. Sirve para comparar muchos modelos y hacer borradores baratos.
estado: Pagas solo lo que usas
pie: Precios en `precios_replicate.json`, leídos el 13 nov 2026. La comparación con Higgsfield está en la lección de costos.
ficha:
  Token: replicate.com/account/api-tokens
  Dónde se guarda: credenciales/replicate.env
  Saldo inicial: US$ 10 alcanza para las pruebas iniciales
  Vigencia del saldo: 1 año, no se reembolsa
---

# Replicate · pruebas de modelos de video e imagen

## ¿Qué es Replicate y por qué usarlo?

### Qué es

Una plataforma con **cientos de modelos de IA** (video, imagen, voz) que llamas desde tus scripts. Pagas cada vez que generas algo.

### Por qué así

- **Sin suscripción:** si un mes no generas nada, no pagas nada.
- **Muchos modelos:** puedes comparar el mismo plano en 5 modelos y elegir el mejor.
- **API directa:** tus scripts lo llaman sin abrir ninguna web.

## Conecta tu cuenta (una sola vez)

### 01 · Crea tu token

**Qué haces:** Entra a <https://replicate.com/account/api-tokens> y crea un token.

**Por qué:** El token es la llave con la que tus scripts usan tu cuenta y tu saldo.

### 02 · Guárdalo en un archivo

**Qué haces:** Crea el archivo `00_general_youtube/credenciales/replicate.env` con esta línea:

```
REPLICATE_API_TOKEN=r8_tu_token_aqui
```

**Por qué:** La carpeta `credenciales/` está en `.gitignore`: el token nunca sube a GitHub.

> **Ojo:** no pegues el token en el chat ni en ningún documento.

### 03 · Comprueba que funciona

**Qué haces:**

```bash
python 00_general_youtube/herramientas/replicate/replicate_cli.py saldo-check
```

**Por qué:** Verifica el token sin gastar nada.

### 04 · Carga saldo

**Qué haces:** En <https://replicate.com/account/billing> pulsa **Add credit**.

**Cuánto:** US$ 10 alcanza para todas las pruebas iniciales.

> **Ojo:** el saldo dura **1 año** y **no se reembolsa**.

## Los comandos

Todos se corren con `replicate_cli.py`. Solo uno gasta saldo.

### Qué hace cada uno

| Comando | Qué hace | ¿Gasta? |
|---|---|---|
| `saldo-check` | Verifica el token | No |
| `esquema <owner/modelo>` | Lista los parámetros que acepta un modelo | No |
| `correr <modelo> entrada.json <carpeta> --costo-estimado X` | Muestra lo que enviaría | No |
| `correr ... --confirmar` | Genera, descarga el resultado y lo anota en `registro_replicate.csv` | **Sí** |

## Lo que sigue

### Tu tarea

- Crea tu token, guárdalo en `replicate.env` y corre `saldo-check`.
- Antes de gastar, corre `correr` **sin** `--confirmar` para ver qué enviaría.

### Dónde queda guardado

- **Token:** `credenciales/replicate.env`.
- **Lo que gastaste:** `registro_replicate.csv`.
- **PDF para imprimir:** [Descargar la lección](curso/pdf/conexion-replicate.pdf).
- **Siguiente:** [Costos: Replicate frente a otras plataformas](#replicate/costos-replicate).
