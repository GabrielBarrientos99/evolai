import {useState} from 'react';
import {VStack, HStack} from '@astryxdesign/core/Stack';
import {Heading, Text} from '@astryxdesign/core/Text';
import {Card} from '@astryxdesign/core/Card';
import {Badge} from '@astryxdesign/core/Badge';
import {Grid} from '@astryxdesign/core/Grid';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import vocesJson from '../data/voces.json';
import {urlPublica} from './datos';

type Voz = {nombre: string; categoria: 'web' | 'pc' | 'pago'; costo: string; url: string; nota?: string; elegida?: boolean};
const catalogo = vocesJson as {frase: string; voces: Voz[]};

const CATEGORIA = {
  web: {label: 'Gratis en línea', variant: 'success'},
  pc: {label: 'Gratis en tu PC', variant: 'teal'},
  pago: {label: 'Pago', variant: 'warning'},
} as const;

const audioStyle = {width: '100%'};

// Reproductores de todas las muestras de voz (generadas con la misma frase), con filtro por costo.
export function Voces() {
  const [filtro, setFiltro] = useState<'todas' | Voz['categoria']>('todas');
  const lista = catalogo.voces.filter(v => filtro === 'todas' || v.categoria === filtro);
  return (
    <VStack gap={4}>
      <VStack gap={1}>
        <Heading level={2}>Escucha y compara</Heading>
        <Text color="secondary">Todas dicen la misma frase: «{catalogo.frase}»</Text>
      </VStack>
      <SegmentedControl label="Filtrar voces por costo" value={filtro} onChange={v => setFiltro(v as typeof filtro)}>
        <SegmentedControlItem value="todas" label={`Todas (${catalogo.voces.length})`} />
        <SegmentedControlItem value="web" label="Gratis en línea" />
        <SegmentedControlItem value="pc" label="Gratis en tu PC" />
        <SegmentedControlItem value="pago" label="Pago" />
      </SegmentedControl>
      <Grid columns={{minWidth: 240}} gap={3}>
        {lista.map(v => (
          <Card key={v.url} variant={v.elegida ? 'muted' : 'default'}>
            <VStack gap={2}>
              <HStack gap={2} wrap="wrap">
                <Badge label={CATEGORIA[v.categoria].label} variant={CATEGORIA[v.categoria].variant} />
                {v.elegida && <Badge label="★ Voz del canal" variant="info" />}
              </HStack>
              <Text weight="semibold">{v.nombre}</Text>
              <Text type="supporting" color="secondary">
                {v.costo}
                {v.nota ? ` · ${v.nota}` : ''}
              </Text>
              <audio controls preload="none" src={urlPublica(v.url)} style={audioStyle}>
                Tu navegador no puede reproducir audio.
              </audio>
            </VStack>
          </Card>
        ))}
      </Grid>
    </VStack>
  );
}
