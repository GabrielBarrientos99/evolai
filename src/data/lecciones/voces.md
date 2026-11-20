---
formato: afiche
eyebrow: Curso Voces con IA · guía
titular: Voz en off para tus Shorts, *gratis o de pago*
bajada: Opciones para la voz de tus videos: **gratis en tu PC**, **gratis en línea** y **de pago en Replicate**. Escucha cada muestra abajo: todas dicen la misma frase.
estado: Revisada el 14 nov 2026
pie: Precios de Replicate revisados el 14 nov 2026. Lo de Gemini es un cálculo aproximado (unos 30 s de audio ≈ 1.000 tokens de salida); hay que confirmarlo con una prueba.
ficha:
  Frase de prueba: "Le di esta misma imagen a seis inteligencias artificiales. ¿Cuál lo hace mejor?"
  Gratis para empezar: edge-tts · es-PE Alex o Camila (Perú)
  Voz del canal: Gemini 3.8 Flash TTS · voz Puck
  Costo: menos de US$ 0.05 por Short
---

# Voces para los videos (texto a voz)

## Gratis en tu PC (sin internet ni API)

Con una tarjeta **NVIDIA de 8 GB** (por ejemplo una RTX 5060) puedes correr voces de código abierto en tu PC.

### Las opciones

| Opción | Calidad | Voces en español | Instalación | Licencia / uso comercial | Muestra |
|---|---|---|---|---|---|
| **Windows (SAPI)** | Baja, robótica | Sabina (México) | Ya viene con Windows | Uso libre | `gratis_windows_sabina.mp3` |
| **Piper** | Media-buena, natural para su peso | es_MX-claude, es_AR-daniela, es_ES-davefx… | `pip install piper-tts` + descargar la voz (60–115 MB) | Varía por voz; revisar su MODEL_CARD | `gratis_piper_*.mp3` |
| **Kokoro-82M** | Buena | ef_dora, em_alex, em_santa | `pip install kokoro` + PyTorch con CUDA (~3 GB) | Apache 2.0, comercial OK | (pendiente) |
| **Chatterbox Multilingual** | Muy buena, con emociones y **clonación de voz** | Español entre 23 idiomas | Pinokio (1 clic) o pip + PyTorch | MIT, comercial OK | (pendiente) |
| **F5-TTS (español)** | Muy buena, con clonación | Modelo afinado en español | Pinokio o pip + PyTorch | Modelo base CC-BY-NC: **no comercial** | (pendiente) |
| **XTTS-v2 (Coqui)** | Buena, con clonación | Sí | Pinokio o pip | CPML: **no comercial** | (pendiente) |

## Instalar sin complicarte

### 01 · Pinokio: un clic para los modelos pesados

**Qué es:** [Pinokio](https://pinokio.co) es un instalador de un clic para apps de IA locales. Tiene scripts para Kokoro, Chatterbox, F5-TTS y otros.

**Por qué:** Instala todo aislado, con su propio Python y PyTorch, y abre una interfaz web local. Es la forma más fácil de probar los modelos pesados sin tocar tu Python.

### 02 · Piper desde la terminal

**Qué haces:**

```bash
pip install piper-tts
python -m piper.download_voices --download-dir 00_general_youtube/voces/modelos_piper es_MX-claude-high
echo "Hola, soy Magma" | python -m piper -m 00_general_youtube/voces/modelos_piper/es_MX-claude-high.onnx -f salida.wav
```

**Por qué:** Piper es liviano: corre rápido incluso sin tarjeta gráfica.

## Gratis en línea (sin pagar, necesita internet)

### Las opciones

| Opción | Calidad | Voces | Límites / advertencias | Muestra |
|---|---|---|---|---|
| **edge-tts** (voces neuronales de Microsoft Edge) | Muy buena | **es-PE Alex y Camila (Perú)**, es-MX Jorge y Dalia, es-AR Tomás y Elena, es-CO, es-ES, es-US | Librería no oficial que usa el servicio de lectura de Edge. Sin clave ni costo, pero sin garantía. Revisa los términos de Microsoft antes de uso comercial intensivo | `gratis_edge_*.mp3` |
| **Hugging Face Spaces** | Variable (Kokoro, F5, Chatterbox…) | Según el Space | Demos gratuitas con cuota diaria de GPU (ZeroGPU). Hay colas y límites. Bien para probar, mal para producir en serie | — |

### 03 · edge-tts con voz peruana

**Qué haces:**

```bash
pip install edge-tts
edge-tts --list-voices | grep es-PE
edge-tts --voice es-PE-AlexNeural --rate=+5% --text "Hola, soy Magma" --write-media salida.mp3
```

**Por qué:** Suena natural, tiene acento peruano y cuesta $0.

> **Ojo:** es una librería no oficial. Revisa los términos de Microsoft antes de usarla para producir en serie.

## De pago en Replicate (API, precio por uso)

**Referencia de costo:** un Short de 30 s tiene unos **400 caracteres** de guion, y un mes de 20 Shorts unos 8.000.

### Modelo por modelo

| Modelo | Precio | Por Short (400 car.) | Por mes (20 Shorts) | Destaca por |
|---|---|---|---|---|
| `jaaari/kokoro-82m` | ~$0.00095 por ejecución | ~$0.001 | ~$0.02 | Lo más barato (también corre gratis en tu PC) |
| `qwen/qwen3-tts` | $0.02 / 1.000 caracteres | $0.008 | $0.16 | Diseño de voz por descripción y clonación |
| `inworld/realtime-tts-2` | $0.025 / 1.000 caracteres | $0.010 | $0.20 | Expresivo, guiado con lenguaje natural |
| `google/gemini-3.8-flash-lite-tts` | $0.50 / M tokens de entrada + $6 / M de salida | ~$0.006* | ~$0.12* | Dirección actuada, risas y pausas |
| `google/gemini-3.8-flash-tts` | $0.50 / M de entrada + $9 / M de salida | ~$0.009* | ~$0.18* | Mejor calidad según Hume AI; diálogo de 2 voces |
| `elevenlabs/flash-v2.5` | $0.05 / 1.000 caracteres | $0.020 | $0.40 | Rápido |
| `minimax/speech-02-turbo` · `speech-2.8-turbo` | $0.06 / 1.000 tokens | $0.024 | $0.48 | Spanish_CaptivatingStoryteller |
| `minimax/speech-2.8-hd` | $0.10 / 1.000 tokens | $0.040 | $0.80 | Calidad de estudio |
| `elevenlabs/v3` | $0.10 / 1.000 caracteres | $0.040 | $0.80 | El más expresivo de ElevenLabs |
| `elevenlabs/v2-multilingual` | $0.10 / 1.000 caracteres | $0.040 | $0.80 | Estable en más de 30 idiomas |
| `minimax/voice-cloning` | **$3 por voz clonada** (una vez) | — | — | Clonar TU voz para usarla con MiniMax |
| `resemble-ai/chatterbox-multilingual` | Por tiempo de GPU (L40S) | — | — | Clonación; gratis si lo corres en local |

\* Gemini cobra por tokens de audio: es un cálculo aproximado.

## La recomendación

La voz elegida para el canal (14 nov 2026) es **Gemini 3.8 Flash TTS · voz `Puck`**, con estilo por línea y `<laugh>` / `<short pause>`. Ganó la comparación en el Short "6 IAs" y cuesta menos de $0.05 por Short. Respaldo gratis: Alex con tonos (`voz_edge_tonos.py`).

### 01 · Para empezar, gratis

**Qué usas:** **edge-tts con `es-PE-AlexNeural` o `es-MX-JorgeNeural`**.

**Por qué:** Suenan naturales, tienen acento latino (¡peruano!) y cuestan $0.

### 02 · Narrador fijo, gratis y local

**Qué usas:** **Chatterbox o Kokoro con Pinokio** en tu GPU.

**Por qué:** Chatterbox además puede **clonar tu voz** con una muestra de 10 a 20 s.

### 03 · Más actuación

**Qué usas:** **Gemini 3.8 Flash TTS** o **ElevenLabs v3** en Replicate.

**Por qué:** Risas, susurros o dos personajes hablando, y siguen costando menos de $1 al mes.

### 04 · Voces que no son texto

**Qué usas:** Un banco de efectos o un modelo de audio aparte.

**Por qué:** Los chillidos y gruñidos de un personaje como Magma no son texto a voz.

## Lo que sigue

### Tu tarea

- Escucha las muestras de arriba y elige **una voz gratis** y **una de pago**.
- Genera tu frase con edge-tts y compárala con las muestras.

### Dónde queda guardado

- **Muestras:** carpeta `muestras/` (`gratis_*` = costo $0 · `pago_*` = Replicate).
- **Comparación de la voz del canal:** `cuenta_gabito-tu-ia/publicaciones/2026-11-14_6ias-mismo-dinosaurio_parte1/comparar_voces/`.
- **PDF para imprimir:** [Descargar la lección](curso/pdf/voces.pdf).
