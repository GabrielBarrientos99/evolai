import {useCallback, useEffect, useState} from 'react';
import {VStack, HStack} from '@astryxdesign/core/Stack';
import {Heading, Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Badge} from '@astryxdesign/core/Badge';
import {Banner} from '@astryxdesign/core/Banner';
import {Card} from '@astryxdesign/core/Card';
import {Table} from '@astryxdesign/core/Table';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Selector} from '@astryxdesign/core/Selector';
import {CodeBlock} from '@astryxdesign/core/CodeBlock';
import {Link} from '@astryxdesign/core/Link';
import {ESTADO, fechaPeru, type Conexion, type Publicacion} from '../app/datos';

// Panel local: solo funciona con `npm run dev` y la API de tu PC encendida
// (python 00_general_youtube/panel/servidor.py en "Automatizacion videos IA").
const API = 'http://127.0.0.1:8770/api';

type PubPanel = Publicacion & {playlist: string | null; tiene_script: boolean};
type Resultado = {ok: boolean; salida: string};

async function llamar(ruta: string, cuerpo?: object): Promise<any> {
  const r = await fetch(`${API}/${ruta}`, {
    method: cuerpo ? 'POST' : 'GET',
    headers: cuerpo ? {'Content-Type': 'application/json'} : undefined,
    body: cuerpo ? JSON.stringify(cuerpo) : undefined,
  });
  return r.json();
}

// Mañana a la hora sugerida (p. ej. "18:00 (hora de Perú)"), en hora de Perú (UTC-5).
function propuesta(hora: string) {
  const hhmm = /(\d{1,2}):(\d{2})/.exec(hora ?? '');
  const d = new Date(Date.now() + 24 * 3600e3);
  const dia = d.toLocaleDateString('en-CA', {timeZone: 'America/Lima'});
  return `${dia}T${hhmm ? hhmm[1].padStart(2, '0') : '18'}:${hhmm ? hhmm[2] : '00'}:00-05:00`;
}

function Aprobar({p, alTerminar}: {p: PubPanel; alTerminar: (r: Resultado) => void}) {
  const [video, setVideo] = useState(p.videos[0] ?? '');
  const [cuando, setCuando] = useState(propuesta(p.hora_sugerida));
  return (
    <Card>
      <VStack gap={3}>
        <HStack gap={2} vAlign="center" wrap="wrap">
          <Badge label="Pendiente de aprobación" variant="warning" />
          <Text type="supporting" color="secondary">
            {p.canal} · {p.id}
          </Text>
        </HStack>
        <Heading level={3}>{p.titulo}</Heading>
        <Text type="supporting" color="secondary">
          Playlist: {p.playlist ?? '—'} · Hora sugerida: {p.hora_sugerida || '—'}
        </Text>
        {p.videos.length > 1 && (
          <Selector label="Video" options={p.videos} value={video} onChange={setVideo} width="100%" />
        )}
        <TextInput
          label="Publicar el (hora de Perú)"
          description="Se sube en privado y YouTube lo hace público a esa hora."
          value={cuando}
          onChange={setCuando}
          width="100%"
        />
        <HStack gap={2}>
          <Button
            label="Aprobar y programar"
            variant="primary"
            isDisabled={!p.tiene_script || !video}
            tooltip={p.tiene_script ? undefined : 'Este canal no tiene scripts/subir_youtube.py'}
            clickAction={async () => alTerminar(await llamar('aprobar', {id: p.id, video, programar: cuando}))}
          />
        </HStack>
      </VStack>
    </Card>
  );
}

export default function Panel() {
  const [datos, setDatos] = useState<{publicaciones: PubPanel[]; conexiones: Conexion[]} | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [resultado, setResultado] = useState<Resultado | null>(null);

  const cargar = useCallback(async () => {
    try {
      setDatos(await llamar('estado'));
      setError(null);
    } catch {
      setError('No hay conexión con la API local.');
    }
  }, []);
  useEffect(() => {
    void cargar();
  }, [cargar]);

  const terminar = async (r: Resultado) => {
    setResultado(r);
    await cargar();
  };

  const pendientes = datos?.publicaciones.filter(p => p.estado === 'sin_publicar') ?? [];
  const resto = datos?.publicaciones.filter(p => p.estado !== 'sin_publicar') ?? [];

  return (
    <VStack gap={8} paddingBlock={8} style={{maxWidth: 1040, marginInline: 'auto', width: '100%'}}>
      <HStack gap={3} vAlign="center" wrap="wrap" justify="between">
        <VStack gap={1}>
          <Heading level={1}>Panel de automatizaciones</Heading>
          <Text color="secondary">Solo en tu PC. Aprueba publicaciones y revisa su estado real en YouTube.</Text>
        </VStack>
        <HStack gap={2}>
          <Button label="Actualizar" clickAction={cargar} />
          <Button
            label="Exportar a la web pública"
            clickAction={async () => terminar(await llamar('exportar', {}))}
          />
        </HStack>
      </HStack>

      {error && (
        <VStack gap={2}>
          <Banner status="error" title={error} description="Enciende la API en la carpeta Automatizacion videos IA:" />
          <CodeBlock code="python 00_general_youtube/panel/servidor.py" language="bash" width="100%" />
        </VStack>
      )}

      {resultado && (
        <VStack gap={2}>
          <Banner
            status={resultado.ok ? 'success' : 'error'}
            title={resultado.ok ? 'Listo' : 'Falló'}
            isDismissable
            onDismiss={() => setResultado(null)}
          />
          <CodeBlock code={resultado.salida || '(sin salida)'} language="bash" width="100%" maxHeight={320} />
        </VStack>
      )}

      {datos && (
        <>
          <VStack gap={4}>
            <Heading level={2}>Por aprobar ({pendientes.length})</Heading>
            {pendientes.length === 0 ? (
              <Text color="secondary">Nada pendiente: todas las publicaciones están programadas o publicadas.</Text>
            ) : (
              pendientes.map(p => <Aprobar key={p.id} p={p} alTerminar={terminar} />)
            )}
          </VStack>

          <VStack gap={4}>
            <Heading level={2}>Programadas y publicadas</Heading>
            <Table
              data={resto}
              idKey="id"
              columns={[
                {
                  key: 'titulo',
                  header: 'Video',
                  renderCell: p => (p.url ? <Link href={p.url}>{p.titulo}</Link> : p.titulo),
                },
                {
                  key: 'estado',
                  header: 'Estado',
                  renderCell: p => <Badge label={ESTADO[p.estado].label} variant={ESTADO[p.estado].variant} />,
                },
                {key: 'programado_utc', header: 'Fecha (Perú)', renderCell: p => fechaPeru(p.programado_utc ?? p.publicado_utc)},
                {
                  key: 'video_id',
                  header: '',
                  align: 'end',
                  renderCell: p => (
                    <Button
                      label="Verificar en YouTube"
                      size="sm"
                      variant="ghost"
                      clickAction={async () => terminar(await llamar('verificar', {id: p.id}))}
                    />
                  ),
                },
              ]}
            />
          </VStack>

          <VStack gap={4}>
            <Heading level={2}>Conexiones</Heading>
            <Table
              data={datos.conexiones.map((c, i) => ({...c, i: String(i)}))}
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
        </>
      )}
    </VStack>
  );
}
