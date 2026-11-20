---
formato: afiche
eyebrow: Curso Meta · Lección 10 · ventas con píxel
titular: Una campaña de *Ventas* que lleva a tu página
bajada: Con el objetivo Ventas, Meta busca gente que compra. Para eso necesita enterarse de lo que pasa en tu página, y eso lo hace el píxel. Así armamos la campaña de Biai que lleva a la página de LAIA (18 nov 2026).
estado: Se arma apagada · se publicó con OK
pie: Capturas del Administrador de anuncios de Biai (18 nov 2026), con ids y la foto de perfil difuminados. La referencia de unos 50 resultados por semana es de Meta (fase de aprendizaje).
ficha:
  Objetivo: Ventas → Sitio web, con el píxel
  Evento: Finalización de compra iniciada (eligió un plan)
  Presupuesto: S/ 20 al día para toda la campaña
  Público: Perú, desde 25 años, Advantage+
  Pasos: 8, cada uno con su captura
---

# Lección 10 · Campaña de Ventas con el píxel

## ¿Qué es el píxel y por qué hace falta?

Con WhatsApp, Meta ve solo cuándo alguien abre un chat, porque WhatsApp es suyo. Con una **página web**, Meta no sabe quién compró… a menos que **tú le avises**. Eso hace el píxel.

### El píxel en simple

El **píxel** es un código de Meta que se pega en tu web. Hoy Meta lo llama **"conjunto de datos"** y está en el **Administrador de eventos**. Cada vez que alguien hace algo en tu web, le avisa a Meta con un **evento**:

| Evento | Cuándo | Ejemplo |
|---|---|---|
| `PageView` | Abre una página | Entra a la web |
| `ViewContent` | Ve el producto | Abre la página del plan |
| `Lead` | Deja sus datos | Formulario "quiero una demo" |
| `InitiateCheckout` | Empieza a pagar | Elige un plan |
| `Purchase` | Pagó (con el monto) | Página de "gracias por tu compra" |

### Para qué sirve (3 usos)

1. **Medir:** une "vio o clicó el anuncio" con "compró después" (hasta 7 días después del clic). Así sabes cuánto te costó cada venta.
2. **Optimizar:** Meta estudia a **los que compraron** y busca gente parecida a ellos. Cuantas más compras ve, mejor apunta.
3. **Públicos:** volver a mostrar el anuncio a quien entró y no compró, crear públicos **parecidos** a tus compradores y **excluir** a los que ya compraron.

## ¿Por qué "eligió un plan" y no "compró"?

### La regla del volumen

- Meta aprende con **unos 50 resultados por semana** en cada conjunto.
- Con cero ventas al empezar, pedirle "compras" saldría caro y no aprendería.
- Por eso se le pide un paso antes: **Finalización de compra iniciada** (`InitiateCheckout`), que pasa más seguido.

### Cuándo se cambia

- Las **compras se miden igual** desde el primer día, aunque no sean el objetivo.
- Cuando haya unas **10 a 15 ventas por semana**, se cambia el evento del conjunto a **Compra** (`Purchase`).

## Los 8 pasos, con su captura

Captura a la izquierda, explicación a la derecha. Toca una captura para verla en grande.

### La campaña de Ventas, en borrador y apagada

![Campaña de Ventas en borrador y apagada](curso/img/meta/ventas/01_campana_ventas_borrador_apagada.jpg)

**Qué se hizo:** Creamos la campaña `BIAI | Ventas | Pagina LAIA | 2026-11` con objetivo **Ventas**, presupuesto de campaña de **S/ 20 al día** y estrategia de costo más bajo. El interruptor, **apagado**.

**Por qué:** Todo se arma apagado: nada sale al aire hasta que lo decidas.

### El conjunto: sitio web, píxel y evento

![Aviso de edad máxima y puntuación](curso/img/meta/ventas/02_aviso_edad_maxima_y_puntuacion.jpg)

**Qué se hizo:** En el conjunto: conversión en **Sitio web**, el conjunto de datos **Biai - Pixel web** y el evento **Finalización de compra iniciada**. Perú, desde 25 años. Meta avisó "No se puede usar la edad máxima" y la quitamos.

**Por qué:** Con público Advantage+, la edad máxima no puede ser un límite fijo: solo la mínima.

> **Ojo:** Meta sugiere "atribución de visualización con interacción" (contar también a quien vio el video y luego compró). Se dejó la atribución estándar para que los resultados sean más fáciles de entender.

### Los anuncios y la vista previa

![Vista previa del anuncio de video](curso/img/meta/ventas/03_vista_previa_anuncio_video_fundador.jpg)

**Qué se hizo:** 3 anuncios con los videos de la página, los mismos textos y el botón **Más información** hacia la página. Seguimiento con el píxel marcado. Mejoras automáticas de IA, **apagadas**.

**Por qué:** Meta prueba las combinaciones de video y texto, y le da más presupuesto al que consigue más "eligió un plan" por sol. Con las mejoras apagadas, Meta no cambia tus videos.

> **Ojo:** no toques "Revisar y publicar (N)" ni la tecla Escape en el editor: pueden publicar todos los borradores.

### Después: revisar las ubicaciones

![Sección Ubicaciones del conjunto](curso/img/meta/ventas/06_conjunto_seccion_ubicaciones_advantage_desactivado.jpg)

**Qué se hizo:** Ya publicada, en las primeras horas casi todas las vistas salían en **Audience Network** (apps y juegos de terceros). Fuimos al conjunto → **Editar** → sección **Ubicaciones**.

**Por qué:** En Audience Network los clics son baratos, pero casi nunca compran.

### Mostrar más opciones → Plataformas

![Plataformas sin Audience Network](curso/img/meta/ventas/08_plataformas_sin_audience_network.jpg)

**Qué se hizo:** Dentro de Ubicaciones, **Mostrar más opciones de configuración** → aparece **Plataformas**.

**Por qué:** Ahí se elige en qué apps de Meta sale el anuncio.

### Desmarcar Audience Network

![Casilla de Audience Network desmarcada](curso/img/meta/ventas/09_casillas_plataformas_audience_network_desmarcada.jpg)

**Qué se hizo:** Lápiz ✏️ en Plataformas → **desmarcar Audience Network** y dejar Facebook, Instagram, WhatsApp y Threads → **Publicar**.

**Por qué:** Así el presupuesto va a lugares donde la gente sí puede comprar.

> **Ojo:** cambiar ubicaciones reinicia el aprendizaje y la campaña vuelve a "En revisión". Por eso conviene hacerlo el primer día, cuando todavía no aprendió nada.

### Ver dónde sale cada campaña: Desglose

![Menú Desglose → Ubicación](curso/img/meta/ventas/11_menu_desglose_ubicacion.jpg)

**Qué se hizo:** En la pestaña **Campañas** → botón **Desglose** → marcar **Ubicación**.

**Por qué:** Es la forma de ver en qué lugar se gasta cada sol, sin abrir cada anuncio.

### La tabla por ubicación

![Tabla desglosada por ubicación](curso/img/meta/ventas/12_tabla_desglosada_por_ubicacion_audience_network.jpg)

**Qué se hizo:** Debajo de cada campaña aparece una fila por lugar (plataforma · ubicación · dispositivo).

**Por qué:** Ahí se vio que la de Ventas salía en "Audience Network · Nativo, banner e intersticial" y "Vídeo con premio". Así se detectó el problema.

> **Ojo:** Meta anunció que pronto la exclusión de plataformas no estará en el conjunto, sino en **Controles de cuenta**.

## Lo que falta y quién lo hace

### Tú

- A los 7 días: revisar el costo por "eligió un plan" y por compra.
- Con unas 10 a 15 ventas por semana: cambiar el evento a **Compra**.
- Indicar a Meta si los videos tienen contenido hecho con IA, si aplica.

### Dónde queda guardado

- **El píxel y sus eventos:** Administrador de eventos → conjunto de datos.
- **El evento de la campaña:** en el conjunto de anuncios → Conversión.
- **Antes:** [Qué tipo de campaña usar y cuándo](#marketing-meta/meta-07-tipos-campana).
