import {useEffect, useRef, type CSSProperties, type RefObject} from 'react';
import {CURSOS} from '../app/cursos';
import {urlPublica} from '../app/datos';
import '../app/guiaAfiche.css';
import '../app/inicio.css';

const WHATSAPP = 'https://wa.me/51937460009?text=Hola%20Biai%2C%20quiero%20una%20demo%20de%20LAIA';

// Capturas reales de las lecciones y portadas del canal: el fondo de la portada.
const FONDO = [
  'curso/img/meta/portada.jpg',
  'tutorial/img/02-api-habilitada.jpg',
  'curso/img/meta/06-conectar-pagina.jpg',
  'portadas/2026-11-14_6ias-mismo-dinosaurio_parte1.jpg',
  'curso/img/meta/11-grupo-activos.jpg',
  'tutorial/img/05c-cliente-creado.jpg',
  'curso/img/meta/13-metodo-pago.jpg',
  'portadas/2026-11-15_huevitos-sorpresa_ep01.jpg',
  'curso/img/meta/09-whatsapp-principal.jpg',
  'tutorial/img/03c-publico-externo.jpg',
  'curso/img/meta/03-informacion-legal.jpg',
  'portadas/2026-11-14_6ias-mismo-dinosaurio_parte2.jpg',
];

const TEMAS = ['Meta Ads', 'Business Manager', 'Anuncios a WhatsApp', 'API de YouTube', 'Replicate', 'Voces con IA', 'Shorts con IA', 'Creativos con IA'];

const PASOS = [
  {t: 'Elige un curso', d: 'Si vendes por WhatsApp, empieza por Anuncios en Meta. Si haces videos, por la API de YouTube.'},
  {t: 'Síguelo con tu cuenta abierta', d: 'Cada paso muestra la pantalla real: haces lo mismo en la tuya, al mismo tiempo.'},
  {t: 'Aplica y mide', d: 'Cada lección termina con una tarea y con dónde queda guardado cada ajuste.'},
];

const retraso = (ms: number) => ({'--d': `${ms}ms`}) as CSSProperties;

/** Aparición al hacer scroll (.aparece → .visible) y fondo de la portada que se mueve más lento que la página. */
function useEfectos(raiz: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    const elementos = [...el.querySelectorAll<HTMLElement>('.aparece')];
    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (quieto || !('IntersectionObserver' in window)) {
      elementos.forEach(e => e.classList.add('visible'));
      return;
    }
    const io = new IntersectionObserver(
      entradas =>
        entradas.forEach(en => {
          if (en.isIntersecting) {
            en.target.classList.add('visible');
            io.unobserve(en.target);
          }
        }),
      {threshold: 0.12, rootMargin: '0px 0px -8% 0px'},
    );
    elementos.forEach(e => io.observe(e));

    const fondo = el.querySelector<HTMLElement>('.ini-fondo');
    let cuadro = 0;
    const mover = () => {
      cuadro = 0;
      fondo?.style.setProperty('--y', `${Math.min(window.scrollY, 1000) * 0.28}px`);
    };
    const alBajar = () => {
      if (!cuadro) cuadro = requestAnimationFrame(mover);
    };
    window.addEventListener('scroll', alBajar, {passive: true});
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', alBajar);
      cancelAnimationFrame(cuadro);
    };
  }, [raiz]);
}

export default function Inicio() {
  const raiz = useRef<HTMLElement>(null);
  useEfectos(raiz);
  const gratis = CURSOS.filter(c => c.tipo === 'gratis');
  const lecciones = CURSOS.reduce((total, c) => total + c.lecciones.length, 0);

  return (
    <article className="ini" ref={raiz}>
      {/* Portada */}
      <section className="ini-hero" aria-labelledby="t-inicio">
        <figure className="ini-fondo" aria-hidden="true">
          {FONDO.map(src => (
            <img key={src} src={urlPublica(src)} alt="" loading="eager" />
          ))}
        </figure>
        <section className="ini-ancho">
          <section className="ini-hero-txt">
            <p className="ini-eyebrow ini-entra">Biai · cursos con pantallas reales</p>
            <h1 id="t-inicio" className="ini-entra" style={retraso(80)}>
              Aprende Meta Ads e IA, <em>paso a paso</em>
            </h1>
            <p className="ini-lead ini-entra" style={retraso(160)}>
              Cursos con las pantallas reales, explicados en simple: qué se hizo, por qué y en qué fijarte para no
              equivocarte. Empieza gratis hoy.
            </p>
            <nav className="ini-botones ini-entra" style={retraso(240)} aria-label="Empezar">
              <a className="ini-btn uno" href="#cursos">
                Ver los cursos ↓
              </a>
              <a className="ini-btn dos" href="curso.html#marketing-meta">
                Empezar gratis: Anuncios en Meta
              </a>
            </nav>
            <dl className="ini-cifras ini-entra" style={retraso(320)} aria-label="Los cursos en números">
              <div>
                <dt>Cursos</dt>
                <dd>{CURSOS.length}</dd>
              </div>
              <div>
                <dt>Gratis</dt>
                <dd>{gratis.length}</dd>
              </div>
              <div>
                <dt>Lecciones</dt>
                <dd>{lecciones}</dd>
              </div>
            </dl>
          </section>
        </section>
        <a className="ini-bajar" href="#cursos">
          Desliza
        </a>
      </section>

      {/* Franja de temas */}
      <section className="ini-franja" aria-label="Temas de los cursos">
        <p className="ini-cinta">
          {[...TEMAS, ...TEMAS].map((t, i) => (
            <span key={i} aria-hidden={i >= TEMAS.length}>
              {t}
            </span>
          ))}
        </p>
      </section>

      {/* Cursos */}
      <section className="ini-sec" id="cursos" aria-labelledby="t-cursos">
        <section className="ini-ancho">
          <header className="ini-cab aparece">
            <hgroup>
              <p className="ini-eyebrow">Qué vas a aprender</p>
              <h2 id="t-cursos">Elige tu curso</h2>
              <p className="ini-sub">
                {gratis.length} cursos gratis para dejar todo conectado y uno de pago con la producción completa.
              </p>
            </hgroup>
            <a href="curso.html">Ver todos los cursos →</a>
          </header>
          <section className="ini-cursos">
            {CURSOS.map((c, i) => (
              <a className="ini-curso aparece" style={retraso(i * 90)} href={`curso.html#${c.id}`} key={c.id}>
                {c.portada ? (
                  <img className="ini-curso-img" src={urlPublica(c.portada)} alt="" loading="lazy" />
                ) : (
                  <span className="ini-curso-icono">
                    <c.icono aria-hidden="true" />
                  </span>
                )}
                <section className="ini-curso-txt">
                  <p className="ini-chips">
                    <span className={c.tipo === 'gratis' ? 'ini-chip' : 'ini-chip pago'}>
                      {c.tipo === 'gratis' ? 'Gratis' : c.precio ?? 'De pago'}
                    </span>
                    <span className="ini-chip">
                      {c.lecciones.length} {c.lecciones.length === 1 ? 'lección' : 'lecciones'}
                    </span>
                  </p>
                  <h3>{c.titulo}</h3>
                  <p>{c.resumen}</p>
                  <span className="ini-ir">Entrar al curso →</span>
                </section>
              </a>
            ))}
          </section>
        </section>
      </section>

      {/* Muestra de una lección */}
      <section className="ini-sec" aria-labelledby="t-muestra">
        <section className="ini-ancho">
          <header className="ini-cab aparece">
            <hgroup>
              <p className="ini-eyebrow">Así es cada lección</p>
              <h2 id="t-muestra">Una captura real en cada paso</h2>
              <p className="ini-sub">
                A la izquierda, la pantalla tal como la vas a ver. A la derecha, qué se hizo, por qué y el aviso para
                no equivocarte.
              </p>
            </hgroup>
            <a href="curso.html#marketing-meta/meta-02-business-manager">Ver la lección completa →</a>
          </header>
          <section className="guia ini-muestra aparece">
            <ol className="guia-pasos">
              <li className="guia-paso">
                <figure className="guia-cap">
                  <a className="guia-zoom" href="curso.html#marketing-meta/meta-02-business-manager" aria-label="Abrir la Lección 2: Business Manager">
                    <img
                      src={urlPublica('curso/img/meta/06-conectar-pagina.jpg')}
                      alt="Captura: conectar la página de Facebook con el número de WhatsApp"
                      loading="lazy"
                    />
                  </a>
                  <figcaption>
                    <code>06-conectar-pagina.jpg</code>
                    <span>Lección 2 · Business Manager</span>
                  </figcaption>
                </figure>
                <section className="guia-txt">
                  <span className="guia-num">05</span>
                  <h3>Conecta tu página de Facebook con WhatsApp</h3>
                  <dl>
                    <div className="guia-campo">
                      <dt>Qué se hizo</dt>
                      <dd>En el panel del número: Cuentas de redes sociales → Facebook → Conectar página → Conectar.</dd>
                    </div>
                    <div className="guia-campo">
                      <dt>Por qué</dt>
                      <dd>Con la conexión, la página muestra el botón de WhatsApp y puedes crear anuncios que llevan al chat.</dd>
                    </div>
                  </dl>
                  <aside className="guia-aviso">
                    <span className="guia-tag">Ojo</span>
                    <section>Sin esta conexión no puedes hacer anuncios que lleven a WhatsApp.</section>
                  </aside>
                </section>
              </li>
            </ol>
          </section>
        </section>
      </section>

      {/* Empieza en 3 pasos */}
      <section className="ini-sec" aria-labelledby="t-empieza">
        <section className="ini-ancho">
          <hgroup className="aparece">
            <p className="ini-eyebrow">Cómo empezar</p>
            <h2 id="t-empieza">Empieza en 3 pasos</h2>
          </hgroup>
          <ol className="ini-tres">
            {PASOS.map((p, i) => (
              <li className="aparece" style={retraso(i * 120)} key={p.t}>
                <b>{String(i + 1).padStart(2, '0')}</b>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </li>
            ))}
          </ol>
        </section>
      </section>

      {/* Biai / LAIA */}
      <section className="ini-banda" aria-labelledby="t-laia">
        <section className="ini-ancho aparece">
          <hgroup>
            <h2 id="t-laia">¿Prefieres que lo hagamos por ti?</h2>
            <p>
              Biai es partner oficial de LAIA: instalamos un asistente de IA que atiende, agenda y vende por WhatsApp,
              y te acompañamos con los anuncios.
            </p>
          </hgroup>
          <a className="ini-btn uno" href={WHATSAPP}>
            Pedir demo por WhatsApp
          </a>
        </section>
      </section>

      {/* Google pide que la página de inicio de la app explique para qué usa la API de YouTube: no quitar. */}
      <section className="ini-app" id="app" aria-labelledby="t-app">
        <section className="ini-ancho">
          <section>
            <h2 id="t-app">Automatizacion Videos</h2>
            <p>
              Automatizacion Videos es la herramienta de escritorio de uso personal con la que publicamos en nuestros
              propios canales. Usa la API de datos de YouTube (YouTube Data API v3) para:
            </p>
            <ul>
              <li>Subir los videos que producimos, con su título, descripción y etiquetas, y programar su publicación.</li>
              <li>Organizarlos en listas de reproducción.</li>
              <li>Consultar estadísticas básicas (vistas, comentarios) de nuestros propios videos.</li>
            </ul>
            <p>
              Solo la usa el titular de los canales; no es un servicio abierto al público ni administra canales de otras
              personas. Lee la <a href="privacidad.html">Política de privacidad</a>.
            </p>
          </section>
        </section>
      </section>
    </article>
  );
}
