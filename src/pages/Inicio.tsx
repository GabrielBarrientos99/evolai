import {VStack, HStack} from '@astryxdesign/core/Stack';
import {Text, Heading} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Icon} from '@astryxdesign/core/Icon';
import {Grid} from '@astryxdesign/core/Grid';
import {List, ListItem} from '@astryxdesign/core/List';
import {Link} from '@astryxdesign/core/Link';
import {ArrowRightIcon} from '@heroicons/react/20/solid';
import {CURSOS} from '../app/cursos';
import {TarjetaCurso} from '../app/TarjetaCurso';

export default function Inicio() {
  const gratis = CURSOS.filter(c => c.tipo === 'gratis');
  const pago = CURSOS.filter(c => c.tipo === 'pago');
  return (
    <VStack gap={10} paddingBlock={8} style={{maxWidth: 1040, marginInline: 'auto', width: '100%'}}>
      <VStack gap={6} hAlign="center">
        <VStack gap={3} hAlign="center">
          <Text type="label" color="accent">
            Evolai · Videos con IA
          </Text>
          <Heading level={1} type="display-2" justify="center" textWrap="balance">
            Aprende a crear y automatizar videos con IA.
          </Heading>
          <Text type="large" color="secondary" justify="center" textWrap="balance">
            Empieza gratis conectando la API de YouTube, Replicate y voces con IA. Luego aprende la producción
            completa con pruebas y costos reales.
          </Text>
        </VStack>
        <HStack gap={3} wrap="wrap" hAlign="center">
          <Button
            label="Empezar gratis"
            variant="primary"
            href="curso.html#api-youtube"
            endContent={<Icon icon={ArrowRightIcon} size="sm" color="inherit" />}
          />
          <Button label="Ver todos los cursos" variant="secondary" href="curso.html" />
        </HStack>
      </VStack>

      <VStack gap={4} id="gratis">
        <Heading level={2}>Cursos gratis</Heading>
        <Grid columns={{minWidth: 260}} gap={4}>
          {gratis.map(c => (
            <TarjetaCurso key={c.id} curso={c} />
          ))}
        </Grid>
      </VStack>

      <VStack gap={4} id="pago">
        <Heading level={2}>Cursos de pago</Heading>
        <Grid columns={{minWidth: 260}} gap={4}>
          {pago.map(c => (
            <TarjetaCurso key={c.id} curso={c} />
          ))}
        </Grid>
      </VStack>

      {/* Google revisa esta sección para aprobar la app OAuth: no quitarla. */}
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
