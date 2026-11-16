import {VStack, HStack} from '@astryxdesign/core/Stack';
import {Text, Heading} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Icon} from '@astryxdesign/core/Icon';
import {Card} from '@astryxdesign/core/Card';
import {Badge} from '@astryxdesign/core/Badge';
import {Grid} from '@astryxdesign/core/Grid';
import {List, ListItem} from '@astryxdesign/core/List';
import {Link} from '@astryxdesign/core/Link';
import {AspectRatio} from '@astryxdesign/core/AspectRatio';
import {ArrowRightIcon} from '@heroicons/react/20/solid';
import {
  BeakerIcon,
  CodeBracketIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  FilmIcon,
  MegaphoneIcon,
} from '@heroicons/react/24/outline';
import {publicaciones, ESTADO, fechaPeru, urlPublica} from '../app/datos';

const WHATSAPP = 'https://wa.me/51937460009?text=Hola%20Biai%2C%20quiero%20una%20demo%20de%20LAIA';

const SERVICIOS = [
  {
    icon: ChatBubbleLeftRightIcon,
    etiqueta: 'Partner oficial de LAIA',
    t: 'Asistente de IA en tu WhatsApp',
    d: 'Implementamos LAIA: atiende a tus clientes 24/7, responde consultas, agenda citas y cierra ventas. Instalación, capacitación y soporte en Perú.',
    accion: {label: 'Pedir demo gratis', href: WHATSAPP},
  },
  {
    icon: FilmIcon,
    etiqueta: 'Video con IA',
    t: 'Videos para tu marca',
    d: 'Anuncios, Shorts y videos explicativos hechos con IA: comparamos modelos para darte calidad al menor costo.',
    accion: {label: 'Ver nuestros videos', href: '#videos'},
  },
  {
    icon: AcademicCapIcon,
    etiqueta: 'Cursos',
    t: 'Tutoriales de automatización',
    d: 'Aprende a automatizar paso a paso: YouTube, Replicate, voces con IA, Shorts y anuncios en Meta. Con capturas y costos reales.',
    accion: {label: 'Ver cursos', href: 'curso.html'},
  },
];

const RANKING = [
  ['Seedance 2.0 Fast', '$0.75', 'la más fiel al personaje'],
  ['Veo 3.1 Fast', '$0.60', 'sale y ruge'],
  ['Kling 4.0 Flash', '$0.47', 'mejor valor'],
  ['H3 Lite HD', '$0.10', 'no sale del huevo'],
  ['H3 Lite', '$0.06', 'borroso'],
  ['Wan 2.5', '$0.50', 'le puso alas'],
];

const FEATS = [
  {icon: BeakerIcon, t: 'Comparativas', d: 'Los mismos prompts en varios modelos, con el costo real de cada clip.'},
  {icon: CodeBracketIcon, t: 'Prompts abiertos', d: 'Cada video trae en la descripción los prompts usados, listos para copiar.'},
  {icon: AcademicCapIcon, t: 'Curso de Shorts', d: 'Cómo producir Shorts con IA de punta a punta: guion, voz, edición y publicación.'},
];

const portadaStyle = {width: '100%', height: '100%', objectFit: 'cover' as const, borderRadius: 'var(--radius-page)'};

export default function Inicio() {
  const visibles = publicaciones.filter(p => p.estado !== 'sin_publicar').slice(-3).reverse();
  return (
    <VStack gap={10} paddingBlock={8} style={{maxWidth: 1040, marginInline: 'auto', width: '100%'}}>
      <VStack gap={6} hAlign="center">
        <VStack gap={3} hAlign="center">
          <Text type="label" color="accent">
            Biai · Partner oficial de LAIA
          </Text>
          <Heading level={1} type="display-2" justify="center" textWrap="balance">
            Agencia de IA para tu negocio, 24/7.
          </Heading>
          <Text type="large" color="secondary" justify="center" textWrap="balance">
            Asistentes que atienden, agendan y venden por WhatsApp, videos hechos con IA y cursos para que automatices
            tu negocio paso a paso.
          </Text>
        </VStack>
        <HStack gap={3} wrap="wrap" hAlign="center">
          <Button
            label="Pedir demo por WhatsApp"
            variant="primary"
            href={WHATSAPP}
            endContent={<Icon icon={ArrowRightIcon} size="sm" color="inherit" />}
          />
          <Button label="Ver cursos" variant="secondary" href="curso.html" />
        </HStack>
      </VStack>

      <Grid columns={{minWidth: 260}} gap={4}>
        {SERVICIOS.map(s => (
          <Card key={s.t}>
            <VStack gap={3}>
              <HStack gap={2} vAlign="center">
                <Icon icon={s.icon} size="md" color="accent" />
                <Text type="label" color="secondary">
                  {s.etiqueta}
                </Text>
              </HStack>
              <Heading level={3}>{s.t}</Heading>
              <Text color="secondary">{s.d}</Text>
              <Link href={s.accion.href}>{s.accion.label}</Link>
            </VStack>
          </Card>
        ))}
      </Grid>

      <VStack gap={3}>
        <HStack gap={2} vAlign="center">
          <Icon icon={MegaphoneIcon} size="md" color="accent" />
          <Heading level={2}>Nuevo: anuncios en Meta para tu negocio</Heading>
        </HStack>
        <Text color="secondary">
          Cómo funciona hoy el algoritmo de Meta, cómo configurar Business Manager y WhatsApp, y el plan por fases que
          usamos para lanzar nuestras propias campañas. Gratis y con capturas.
        </Text>
        <HStack gap={3} wrap="wrap">
          <Button label="Ver el curso de anuncios" variant="secondary" href="curso.html#marketing-meta" />
        </HStack>
      </VStack>

      <VStack gap={4}>
        <Heading level={2} id="videos">
          Videos del canal Gabito Tu IA
        </Heading>
        <Grid columns={{minWidth: 160, max: 4}} gap={4}>
          {visibles.map(p => (
            <Card key={p.id}>
              <VStack gap={3}>
                {p.portada && (
                  <AspectRatio ratio={9 / 16}>
                    <img src={urlPublica(p.portada)} alt={`Portada de ${p.titulo}`} style={portadaStyle} />
                  </AspectRatio>
                )}
                <HStack gap={2}>
                  <Badge label={ESTADO[p.estado].label} variant={ESTADO[p.estado].variant} />
                </HStack>
                <Heading level={3}>{p.titulo}</Heading>
                <Text type="supporting" color="secondary">
                  {p.estado === 'programado' ? `Sale el ${fechaPeru(p.programado_utc)} (Perú)` : fechaPeru(p.publicado_utc)}
                </Text>
                {p.url && p.estado === 'publicado' && (
                  <Link href={p.url} isExternalLink>
                    Ver en YouTube
                  </Link>
                )}
              </VStack>
            </Card>
          ))}
        </Grid>
      </VStack>

      <VStack gap={4}>
        <Heading level={2}>Último experimento · 6 IAs, un dinosaurio</Heading>
        <Text color="secondary">
          MiniMax H3, Wan 2.5, Veo 3.1, Kling 4.0 y Seedance 2.0 animan el mismo huevo de lava. Costo por clip de 5 s:
        </Text>
        <List listStyle="decimal" hasDividers>
          {RANKING.map(([m, c, n]) => (
            <ListItem key={m} label={m} description={n} endContent={<Text hasTabularNumbers>{c}</Text>} />
          ))}
        </List>
      </VStack>

      <Grid columns={{minWidth: 240}} gap={4}>
        {FEATS.map(f => (
          <Card key={f.t}>
            <VStack gap={2}>
              <Icon icon={f.icon} size="md" color="secondary" />
              <Heading level={3}>{f.t}</Heading>
              <Text color="secondary">{f.d}</Text>
            </VStack>
          </Card>
        ))}
      </Grid>

      <VStack gap={3} id="app">
        <Heading level={2}>Automatizacion Videos</Heading>
        <Text>
          Automatizacion Videos es la herramienta de escritorio de uso personal con la que publicamos en nuestros
          propios canales. Usa la API de datos de YouTube (YouTube Data API v3) para:
        </Text>
        <List listStyle="disc" density="compact">
          <ListItem label="Subir los videos que producimos, con su título, descripción y etiquetas, y programar su publicación." />
          <ListItem label="Organizarlos en listas de reproducción." />
          <ListItem label="Consultar estadísticas básicas (vistas, comentarios) de nuestros propios videos." />
        </List>
        <Text>
          Solo la usa el titular de los canales; no es un servicio abierto al público ni administra canales de otras
          personas. Lee la <Link href="privacidad.html">Política de privacidad</Link>.
        </Text>
      </VStack>
    </VStack>
  );
}
