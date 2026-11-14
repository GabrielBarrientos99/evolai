import {VStack, HStack} from '@astryxdesign/core/Stack';
import {Heading, Text} from '@astryxdesign/core/Text';
import {ClickableCard} from '@astryxdesign/core/ClickableCard';
import {Badge} from '@astryxdesign/core/Badge';
import {AspectRatio} from '@astryxdesign/core/AspectRatio';
import {Center} from '@astryxdesign/core/Center';
import {Icon} from '@astryxdesign/core/Icon';
import type {Curso} from './cursos';
import {urlPublica} from './datos';

const imagen = {width: '100%', height: '100%', objectFit: 'cover' as const, borderRadius: 'var(--radius-page)'};
const fondoIcono = {width: '100%', height: '100%', borderRadius: 'var(--radius-page)', background: 'var(--color-background-muted, rgba(127,127,127,.12))'};

export function TarjetaCurso({curso}: {curso: Curso}) {
  return (
    <ClickableCard href={`curso.html#${curso.id}`} label={curso.titulo}>
      <VStack gap={3}>
        <AspectRatio ratio={16 / 9}>
          {curso.portada ? (
            <img src={urlPublica(curso.portada)} alt="" style={imagen} />
          ) : (
            <Center style={fondoIcono}>
              <Icon icon={curso.icono} size="lg" color="secondary" />
            </Center>
          )}
        </AspectRatio>
        <HStack gap={2} wrap="wrap">
          <Badge label={curso.tipo === 'gratis' ? 'Gratis' : curso.precio ?? 'De pago'} variant={curso.tipo === 'gratis' ? 'success' : 'warning'} />
          <Badge label={`${curso.lecciones.length} ${curso.lecciones.length === 1 ? 'lección' : 'lecciones'}`} variant="neutral" />
          <Badge label={curso.nivel} variant="neutral" />
        </HStack>
        <Heading level={3}>{curso.titulo}</Heading>
        <Text color="secondary">{curso.resumen}</Text>
      </VStack>
    </ClickableCard>
  );
}
