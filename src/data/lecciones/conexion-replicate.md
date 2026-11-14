# Replicate · pruebas de modelos de video e imagen

Replicate cobra **por uso**, con saldo prepagado y sin suscripción. Sirve para comparar muchos modelos y hacer borradores baratos.

## 1. Conectar tu cuenta (lo haces tú, una vez)

1. Entra a <https://replicate.com/account/api-tokens> y crea un token.
2. Crea el archivo `00_general_youtube/credenciales/replicate.env` con esta línea:
   ```
   REPLICATE_API_TOKEN=r8_tu_token_aqui
   ```
   La carpeta `credenciales/` está en `.gitignore`. No pegues el token en el chat.
3. Comprueba que funciona:
   ```bash
   python 00_general_youtube/herramientas/replicate/replicate_cli.py saldo-check
   ```
4. Si no tienes saldo, en <https://replicate.com/account/billing> pulsa **Add credit**. US$ 10 alcanza para todas las pruebas iniciales. El saldo dura 1 año y no se reembolsa.

## 2. Comandos

| Comando | Qué hace | ¿Gasta? |
|---|---|---|
| `saldo-check` | Verifica el token | No |
| `esquema <owner/modelo>` | Lista los parámetros que acepta un modelo | No |
| `correr <modelo> entrada.json <carpeta> --costo-estimado X` | Muestra lo que enviaría | No |
| `correr ... --confirmar` | Genera, descarga el resultado y lo anota en `registro_replicate.csv` | **Sí** |

## 3. Precios

Están en `precios_replicate.json`, leídos el 13 nov 2026. La comparación con Higgsfield está en `COMPARATIVA_COSTOS.md`.
