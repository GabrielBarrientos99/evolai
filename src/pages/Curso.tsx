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
import {Link} from '@astryxdesign/core/Link';
import {useMediaQuery} from '@astryxdesign/core/hooks';
import {lecciones, textoLeccion, bakeoffs, conexiones, publicaciones, ESTADO, fechaPeru, urlPublica} from '../app/datos';

const EXTRA = [
  {slug: 'pruebas', titulo: 'Pruebas y costos reales'},
  {slug: 'publicaciones', titulo: 'Publicaciones'},
  {slug: 'conexiones', titulo: 'Conexiones'},
];

const leerHash = () => decodeURIComponent(window.location.hash.slice(1)) || lecciones[0]?.slug || 'pruebas';

function Pruebas() {
  return (
    <VStack gap={6}>
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

function Publicaciones() {
  return (
    <Table
      data={publicaciones}
      idKey="id"
      columns={[
        {key: 'titulo', header: 'Video', renderCell: p => (p.url ? <Link href={p.url}>{p.titulo}</Link> : p.titulo)},
        {key: 'canal', header: 'Canal'},
        {
          key: 'estado',
          header: 'Estado',
          renderCell: p => <Badge label={ESTADO[p.estado].label} variant={ESTADO[p.estado].variant} />,
        },
        {
          key: 'programado_utc',
          header: 'Fecha (Perú)',
          renderCell: p => fechaPeru(p.programado_utc ?? p.publicado_utc),
        },
      ]}
    />
  );
}

function Conexiones() {
  return (
    <VStack gap={4}>
      <Text color="secondary">
        Servicios conectados al proyecto. Las credenciales viven solo en la PC del titular; esta página muestra si
        existen, nunca su valor. Guía paso a paso de Google Cloud y OAuth:{' '}
        <Link href={urlPublica('tutorial/index.html')}>tutorial completo</Link>.
      </Text>
      <Table
        data={conexiones.map((c, i) => ({...c, i: String(i)}))}
        idKey="i"
        columns={[
          {key: 'servicio', header: 'Servicio'},
          {key: 'cuenta', header: 'Cuenta'},
          {
            key: 'estado',
            header: 'Estado',
            renderCell: c => (
              <Badge
                label={c.estado}
                variant={c.estado === 'autorizado' || c.estado === 'conectado' ? 'success' : 'warning'}
              />
            ),
          },
        ]}
      />
    </VStack>
  );
}

export default function Curso() {
  const [actual, setActual] = useState(leerHash);
  const esMovil = useMediaQuery('(max-width: 768px)');
  useEffect(() => {
    const f = () => setActual(leerHash());
    window.addEventListener('hashchange', f);
    return () => window.removeEventListener('hashchange', f);
  }, []);
  const ir = (slug: string) => {
    window.location.hash = slug;
    window.scrollTo({top: 0});
  };
  const todas = [...lecciones, ...EXTRA];
  const titulo = todas.find(l => l.slug === actual)?.titulo ?? '';

  const nav = (
    <SideNav>
      <SideNavSection title="Lecciones y guías">
        {lecciones.map(l => (
          <SideNavItem key={l.slug} label={l.titulo} href={`#${l.slug}`} isSelected={l.slug === actual} />
        ))}
      </SideNavSection>
      <SideNavSection title="Pruebas exactas">
        {EXTRA.map(l => (
          <SideNavItem key={l.slug} label={l.titulo} href={`#${l.slug}`} isSelected={l.slug === actual} />
        ))}
      </SideNavSection>
    </SideNav>
  );

  return (
    <Layout
      height="auto"
      start={
        esMovil ? undefined : (
          <LayoutPanel width={280} hasDivider isScrollable={false} label="Índice del curso">
            {nav}
          </LayoutPanel>
        )
      }
      content={
        <LayoutContent isScrollable={false} padding={8}>
          <VStack gap={6}>
            <VStack gap={2}>
              <HStack gap={2}>
                <Badge label="Curso · Shorts con IA" variant="info" />
              </HStack>
              {esMovil && (
                <Selector
                  label="Lección"
                  options={todas.map(l => ({value: l.slug, label: l.titulo}))}
                  value={actual}
                  onChange={ir}
                  width="100%"
                />
              )}
              {!lecciones.some(l => l.slug === actual) && <Heading level={1}>{titulo}</Heading>}
            </VStack>
            {actual === 'pruebas' ? (
              <Pruebas />
            ) : actual === 'publicaciones' ? (
              <Publicaciones />
            ) : actual === 'conexiones' ? (
              <Conexiones />
            ) : (
              <Markdown contentWidth={760}>{textoLeccion(actual)}</Markdown>
            )}
          </VStack>
        </LayoutContent>
      }
    />
  );
}
