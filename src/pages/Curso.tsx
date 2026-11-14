import {useEffect, useState} from 'react';
import {Heading, Text} from '@astryxdesign/core/Text';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Layout, LayoutContent, LayoutPanel} from '@astryxdesign/core/Layout';
import {SideNav, SideNavItem, SideNavSection} from '@astryxdesign/core/SideNav';
import {Selector} from '@astryxdesign/core/Selector';
import {Markdown} from '@astryxdesign/core/Markdown';
import {Table} from '@astryxdesign/core/Table';
import {Badge} from '@astryxdesign/core/Badge';
import {Banner} from '@astryxdesign/core/Banner';
import {Button} from '@astryxdesign/core/Button';
import {Grid} from '@astryxdesign/core/Grid';
import {Link} from '@astryxdesign/core/Link';
import {useMediaQuery} from '@astryxdesign/core/hooks';
import {textoLeccion, bakeoffs} from '../app/datos';
import {CURSOS, cursoPorId, type Curso as TCurso} from '../app/cursos';
import {TarjetaCurso} from '../app/TarjetaCurso';
import {entrar, useSesion} from '../app/auth';

// Hash: "" → catálogo · "#<curso>" → primera lección · "#<curso>/<lección>".
function leerHash(): {curso?: TCurso; slug?: string} {
  const [a, b] = decodeURIComponent(window.location.hash.slice(1)).split('/');
  if (!a) return {};
  const curso = cursoPorId(a) ?? CURSOS.find(c => c.lecciones.some(l => l.slug === a)); // enlaces viejos
  if (!curso) return {};
  const slug = curso.lecciones.find(l => l.slug === (b ?? (cursoPorId(a) ? undefined : a)))?.slug ?? curso.lecciones[0].slug;
  return {curso, slug};
}

function Pruebas() {
  return (
    <VStack gap={6}>
      <Heading level={1}>Pruebas y costos reales</Heading>
      <Text color="secondary">
        Resultados exactos de cada bake-off: misma imagen y mismo prompt en cada modelo. Costo estimado por clip y
        segundos que tardó Replicate en generarlo.
      </Text>
      {bakeoffs.map(b => (
        <VStack gap={3} key={b.id}>
          <Text type="code">{b.id}</Text>
          <Table
            data={b.pruebas.map(p => ({...p, costo: `$${p.costo_usd.toFixed(2)}`, seg: `${p.segundos_generacion} s`}))}
            idKey="prueba"
            isStriped
            columns={[
              {key: 'prueba', header: 'Prueba'},
              {key: 'costo', header: 'Costo', align: 'end'},
              {key: 'seg', header: 'Generación', align: 'end'},
            ]}
          />
          {b.errores.length > 0 && (
            <Banner
              status="warning"
              title={`${b.errores.length} intentos fallaron y se reintentaron`}
              description={b.errores[0].detalle}
            />
          )}
        </VStack>
      ))}
    </VStack>
  );
}

function Catalogo() {
  const gratis = CURSOS.filter(c => c.tipo === 'gratis');
  const pago = CURSOS.filter(c => c.tipo === 'pago');
  return (
    <VStack gap={10} paddingBlock={8} style={{maxWidth: 1040, marginInline: 'auto', width: '100%'}}>
      <VStack gap={2}>
        <Heading level={1}>Cursos</Heading>
        <Text color="secondary">
          Aprende a producir y automatizar videos con IA. Los cursos gratis te dejan todo conectado; los de pago
          enseñan la producción completa con pruebas reales.
        </Text>
      </VStack>
      <VStack gap={4}>
        <Heading level={2}>Gratis</Heading>
        <Grid columns={{minWidth: 260}} gap={4}>
          {gratis.map(c => (
            <TarjetaCurso key={c.id} curso={c} />
          ))}
        </Grid>
      </VStack>
      <VStack gap={4}>
        <Heading level={2}>De pago</Heading>
        <Grid columns={{minWidth: 260}} gap={4}>
          {pago.map(c => (
            <TarjetaCurso key={c.id} curso={c} />
          ))}
        </Grid>
      </VStack>
    </VStack>
  );
}

function Bloqueado({curso}: {curso: TCurso}) {
  const {sesion} = useSesion();
  return (
    <VStack gap={4}>
      <Banner
        status="info"
        title="Lección del curso de pago"
        description={`«${curso.titulo}» estará disponible pronto. Inicia sesión para que te avisemos cuando abra.`}
      />
      {!sesion && <Button label="Iniciar sesión" variant="primary" clickAction={entrar} />}
    </VStack>
  );
}

function VistaCurso({curso, slug}: {curso: TCurso; slug: string}) {
  const esMovil = useMediaQuery('(max-width: 768px)');
  const {esAdmin} = useSesion();
  const ir = (s: string) => {
    window.location.hash = `${curso.id}/${s}`;
    window.scrollTo({top: 0});
  };
  // Las lecciones de pago solo las ve el admin mientras el curso no está a la venta.
  const puedeVer = curso.tipo === 'gratis' || esAdmin;

  return (
    <Layout
      height="auto"
      start={
        esMovil ? undefined : (
          <LayoutPanel width={300} hasDivider isScrollable={false} label="Lecciones del curso">
            <SideNav>
              <SideNavSection title={curso.titulo}>
                {curso.lecciones.map(l => (
                  <SideNavItem
                    key={l.slug}
                    label={l.titulo}
                    href={`#${curso.id}/${l.slug}`}
                    isSelected={l.slug === slug}
                  />
                ))}
              </SideNavSection>
            </SideNav>
          </LayoutPanel>
        )
      }
      content={
        <LayoutContent isScrollable={false} padding={8}>
          <VStack gap={6}>
            <VStack gap={2}>
              <Link href="curso.html">← Todos los cursos</Link>
              <HStack gap={2}>
                <Badge
                  label={curso.tipo === 'gratis' ? 'Gratis' : curso.precio ?? 'De pago'}
                  variant={curso.tipo === 'gratis' ? 'success' : 'warning'}
                />
                <Badge label={curso.nivel} variant="neutral" />
              </HStack>
              {esMovil && (
                <Selector
                  label="Lección"
                  options={curso.lecciones.map(l => ({value: l.slug, label: l.titulo}))}
                  value={slug}
                  onChange={ir}
                  width="100%"
                />
              )}
            </VStack>
            {!puedeVer ? (
              <Bloqueado curso={curso} />
            ) : slug === 'pruebas' ? (
              <Pruebas />
            ) : (
              <Markdown contentWidth={760}>{textoLeccion(slug)}</Markdown>
            )}
          </VStack>
        </LayoutContent>
      }
    />
  );
}

export default function Curso() {
  const [estado, setEstado] = useState(leerHash);
  useEffect(() => {
    const f = () => setEstado(leerHash());
    window.addEventListener('hashchange', f);
    return () => window.removeEventListener('hashchange', f);
  }, []);
  return estado.curso && estado.slug ? <VistaCurso curso={estado.curso} slug={estado.slug} /> : <Catalogo />;
}
