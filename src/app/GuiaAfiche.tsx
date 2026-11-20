import {useMemo, useState, type ReactNode} from 'react';
import {Markdown} from '@astryxdesign/core/Markdown';
import {Lightbox} from '@astryxdesign/core/Lightbox';
import {MediaLeccion} from './MediaLeccion';
import './guiaAfiche.css';

/*
 * Lección en formato afiche: portada con ficha, cajas y una fila por paso.
 * Se escribe en Markdown con una forma fija (ejemplo completo: src/data/lecciones/meta-02-business-manager.md):
 *
 *   ---
 *   formato: afiche
 *   eyebrow: Curso Meta · Lección 2
 *   titular: Deja lista tu cuenta de *Business Manager*      ← lo que va entre *asteriscos* sale en verde
 *   bajada: Una o dos frases debajo del titular.
 *   estado: Datos privados difuminados                       ← pastilla debajo de la bajada
 *   pie: Texto chico al final (de dónde salen las capturas o los datos).
 *   ficha:                                                   ← la ficha de la portada
 *     Dónde: business.facebook.com
 *     Pasos: 12
 *   ---
 *   ## Título de sección          ← cada "##" es una sección; lo que va antes del primer "###" es su bajada
 *   ### Título de caja            ← un "###" sin etiquetas es una caja (1 caja = ancho completo, 2 = dos columnas, 3 = tres)
 *   ### 04 · Título del paso      ← un "###" con etiquetas o captura es un paso (el número es opcional)
 *   ![texto](curso/img/captura.jpg)        ← con captura: captura a la izquierda; sin captura: número y título a la izquierda
 *   **Qué se hizo:** ...                   ← cualquier etiqueta en negrita con dos puntos ("Qué haces:", "Por qué:", "Ejemplo:")
 *   **Por qué:** ...                       ← el texto puede seguir en varias líneas, con listas, tablas o código
 *   > **Ojo:** ...                         ← recuadro naranja (opcional)
 */

export type FichaFila = [string, string];
export type Campo = {etiqueta: string; texto: string};
export type Paso = {n: number; num: string; titulo: string; captura?: {src: string; alt: string}; intro: string; campos: Campo[]; ojo: string};
export type Caja = {titulo: string; md: string};
export type Seccion = {id: string; titulo: string; sub: string; cajas: Caja[]; pasos: Paso[]};
export type Guia = {
  eyebrow?: string;
  titular: string;
  bajada?: string;
  estado?: string;
  pie?: string;
  ficha: FichaFila[];
  secciones: Seccion[];
};

const FRONT = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
const IMAGEN = /^!\[([^\]]*)\]\(([^)\s]+)\)\s*$/;
const CAMPO = /^\*\*([^*\n]{2,40}?):\*\*\s*(.*)$/;
const ES_PASO = /^(?:!\[[^\]]*\]\([^)\s]+\)\s*$|(?:>\s?)?\*\*[^*\n]{2,40}?:\*\*)/m;

/** true si la lección empieza con `formato: afiche` en su encabezado. */
export const esAfiche = (md: string) => /^formato:\s*afiche\s*$/m.test(md.match(FRONT)?.[1] ?? '');

function leerEncabezado(txt: string) {
  const datos: Record<string, string> = {};
  const ficha: FichaFila[] = [];
  let enFicha = false;
  for (const linea of txt.split(/\r?\n/)) {
    const m = linea.trim().match(/^([^:]+):\s*(.*)$/);
    if (!m || linea.trim().startsWith('#')) continue;
    const [clave, valor] = [m[1].trim(), m[2].trim()];
    if (/^\s/.test(linea) && enFicha) {
      ficha.push([clave, valor]);
      continue;
    }
    enFicha = clave === 'ficha' && !valor;
    if (!enFicha) datos[clave] = valor;
  }
  return {datos, ficha};
}

const aId = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

function leerPaso(n: number, cabeza: string, texto: string): Paso {
  // "04 · Título" fija el número que se muestra; si no, se numera en orden.
  const numerado = cabeza.match(/^(\d{1,2})\s*[·.\-–]\s*(.+)$/);
  const num = (numerado?.[1] ?? String(n)).padStart(2, '0');
  const titulo = numerado?.[2] ?? cabeza;
  const intro: string[] = [];
  const ojo: string[] = [];
  const campos: {etiqueta: string; lineas: string[]}[] = [];
  let destino = intro;
  let captura: Paso['captura'];
  for (const cruda of texto.split(/\r?\n/)) {
    const img = cruda.match(IMAGEN);
    if (img && !captura) {
      captura = {alt: img[1], src: img[2]};
      continue;
    }
    const sinCita = cruda.replace(/^>\s?/, ''); // "> **Ojo:** ..." es una cita en Markdown
    const campo = sinCita.trim().match(CAMPO);
    if (campo) {
      if (/^ojo$/i.test(campo[1].trim())) destino = ojo;
      else {
        const nuevo = {etiqueta: campo[1].trim(), lineas: [] as string[]};
        campos.push(nuevo);
        destino = nuevo.lineas;
      }
      if (campo[2]) destino.push(campo[2]);
      continue;
    }
    destino.push(destino === ojo ? sinCita : cruda);
  }
  const unir = (l: string[]) => l.join('\n').trim();
  return {
    n,
    num,
    titulo,
    captura,
    intro: unir(intro),
    campos: campos.map(c => ({etiqueta: c.etiqueta, texto: unir(c.lineas)})).filter(c => c.texto),
    ojo: unir(ojo),
  };
}

/** Convierte el Markdown de una lección afiche en portada, secciones, cajas y pasos numerados. */
export function leerGuia(md: string): Guia {
  const fm = md.match(FRONT);
  const {datos, ficha} = leerEncabezado(fm?.[1] ?? '');
  let cuerpo = fm ? md.slice(fm[0].length) : md;
  let titular = datos.titular ?? '';
  const h1 = cuerpo.match(/^#\s+(.+)$/m);
  if (h1) {
    titular ||= h1[1].trim();
    cuerpo = cuerpo.replace(h1[0], '');
  }
  const partes = cuerpo.split(/^##\s+/m);
  const intro = partes.shift()!.trim();
  let n = 0;
  const secciones = partes.map(parte => {
    const [cabeza, ...resto] = parte.split(/\r?\n/);
    const bloques = resto.join('\n').split(/^###\s+/m);
    const sub = bloques.shift()!.trim();
    const cajas: Caja[] = [];
    const pasos: Paso[] = [];
    for (const bloque of bloques) {
      const [t, ...r] = bloque.split(/\r?\n/);
      const texto = r.join('\n').trim();
      if (ES_PASO.test(texto)) pasos.push(leerPaso(++n, t.trim(), texto));
      else cajas.push({titulo: t.trim(), md: texto});
    }
    return {id: aId(cabeza), titulo: cabeza.trim(), sub, cajas, pasos};
  });
  return {
    eyebrow: datos.eyebrow,
    titular,
    bajada: datos.bajada || intro || undefined,
    estado: datos.estado,
    pie: datos.pie,
    ficha,
    secciones,
  };
}

const componentesMd = {image: MediaLeccion};
const Linea = ({children}: {children: string}) => <Markdown display="inline">{children}</Markdown>;
/** Texto de una línea → en línea; varias líneas (listas, tablas, código) → bloque compacto. */
const Texto = ({children}: {children: string}) =>
  children.includes('\n') ? (
    <Markdown density="compact" contentWidth="100%" components={componentesMd}>
      {children}
    </Markdown>
  ) : (
    <Linea>{children}</Linea>
  );

/** Portada del afiche: eyebrow, titular grande, bajada, pastilla de estado y ficha con los datos clave. */
export function PortadaAfiche({
  eyebrow,
  titular,
  bajada,
  estado,
  ficha,
  etiquetaFicha = 'Datos clave',
}: Pick<Guia, 'eyebrow' | 'titular' | 'bajada' | 'estado' | 'ficha'> & {etiquetaFicha?: string}) {
  return (
    <header className="guia-hero">
      <hgroup>
        {eyebrow && <p className="guia-eyebrow">{eyebrow}</p>}
        <h1>
          <Linea>{titular}</Linea>
        </h1>
        {bajada && (
          <p className="guia-lead">
            <Linea>{bajada}</Linea>
          </p>
        )}
        {estado && <p className="guia-estado">{estado}</p>}
      </hgroup>
      {ficha.length > 0 && (
        <dl className="guia-ficha" aria-label={etiquetaFicha}>
          {ficha.map(([k, v]) => (
            <div className="guia-ficha-fila" key={k}>
              <dt>{k}</dt>
              <dd>
                <Linea>{v}</Linea>
              </dd>
            </div>
          ))}
        </dl>
      )}
    </header>
  );
}

function FilaPaso({paso, onAmpliar}: {paso: Paso; onAmpliar: () => void}) {
  const {n, num, titulo, captura, intro, campos, ojo} = paso;
  const cabeza = (
    <>
      <span className="guia-num">{num}</span>
      <h3>
        <Linea>{titulo}</Linea>
      </h3>
    </>
  );
  return (
    <li className={captura ? 'guia-paso' : 'guia-paso sin-cap'} id={`paso-${n}`}>
      {captura ? (
        <figure className="guia-cap">
          <button type="button" className="guia-zoom" onClick={onAmpliar} aria-label={`Ampliar la captura del paso ${num}`}>
            <img src={captura.src} alt={`Captura del paso ${num}: ${captura.alt || titulo}`} loading="lazy" />
          </button>
          <figcaption>
            <code>{captura.src.split('/').pop()}</code>
            <span>toca para ampliar</span>
          </figcaption>
        </figure>
      ) : (
        <header className="guia-cab">{cabeza}</header>
      )}
      <section className="guia-txt" aria-label={`Paso ${num}`}>
        {captura && cabeza}
        {intro && (
          <section className="guia-intro">
            <Texto>{intro}</Texto>
          </section>
        )}
        {campos.length > 0 && (
          <dl>
            {campos.map(c => (
              <div className="guia-campo" key={c.etiqueta}>
                <dt>{c.etiqueta}</dt>
                <dd>
                  <Texto>{c.texto}</Texto>
                </dd>
              </div>
            ))}
          </dl>
        )}
        {ojo && (
          <aside className="guia-aviso">
            <span className="guia-tag">Ojo</span>
            <section>
              <Texto>{ojo}</Texto>
            </section>
          </aside>
        )}
      </section>
    </li>
  );
}

const claseCajas = (n: number) => (n === 1 ? 'guia-grid2 una' : n === 3 ? 'guia-grid2 tres' : 'guia-grid2');

/**
 * Lección completa en formato afiche. `arriba` va antes de la portada (barra de la lección),
 * `medio` justo después de la portada (por ejemplo, los reproductores de voces) y `abajo` después del pie.
 */
export function GuiaAfiche({md, arriba, medio, abajo}: {md: string; arriba?: ReactNode; medio?: ReactNode; abajo?: ReactNode}) {
  const guia = useMemo(() => leerGuia(md), [md]);
  const pasos = guia.secciones.flatMap(s => s.pasos);
  const conCaptura = pasos.filter(p => p.captura);
  const fotos = conCaptura.map(p => ({src: p.captura!.src, alt: p.captura!.alt || p.titulo, caption: `Paso ${p.num} · ${p.titulo}`}));
  const [abierta, setAbierta] = useState<number | null>(null);

  return (
    <article className="guia">
      {arriba}
      <PortadaAfiche {...guia} etiquetaFicha="Resumen de la lección" />
      {medio && <section className="guia-sec">{medio}</section>}
      {guia.secciones.map(s => (
        <section className="guia-sec" key={s.id} aria-labelledby={`t-${s.id}`}>
          <h2 id={`t-${s.id}`}>{s.titulo}</h2>
          {s.sub && (
            <section className="guia-sub">
              <Texto>{s.sub}</Texto>
            </section>
          )}
          {s.cajas.length > 0 && (
            <section className={claseCajas(s.cajas.length)}>
              {s.cajas.map(c => (
                <section className="guia-box" key={c.titulo}>
                  <h3>{c.titulo}</h3>
                  <Markdown contentWidth="100%" density="compact" components={componentesMd}>
                    {c.md}
                  </Markdown>
                </section>
              ))}
            </section>
          )}
          {s.pasos.length > 0 && (
            <ol className="guia-pasos">
              {s.pasos.map(p => (
                <FilaPaso key={p.n} paso={p} onAmpliar={() => setAbierta(conCaptura.indexOf(p))} />
              ))}
            </ol>
          )}
        </section>
      ))}
      {guia.pie && (
        <p className="guia-pie">
          <Linea>{guia.pie}</Linea>
        </p>
      )}
      {abajo}
      {fotos.length > 0 && (
        <Lightbox
          isOpen={abierta !== null}
          onOpenChange={o => !o && setAbierta(null)}
          media={fotos}
          index={abierta ?? 0}
          onIndexChange={setAbierta}
          hasZoom
        />
      )}
    </article>
  );
}
