import {useCallback, useEffect, useState} from 'react';
import {VStack, HStack} from '@astryxdesign/core/Stack';
import {Heading, Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Badge} from '@astryxdesign/core/Badge';
import {Banner} from '@astryxdesign/core/Banner';
import {Card} from '@astryxdesign/core/Card';
import {Grid} from '@astryxdesign/core/Grid';
import {List, ListItem} from '@astryxdesign/core/List';
import {Link} from '@astryxdesign/core/Link';
import {TextInput} from '@astryxdesign/core/TextInput';
import {TextArea} from '@astryxdesign/core/TextArea';
import {Selector} from '@astryxdesign/core/Selector';
import {CodeBlock} from '@astryxdesign/core/CodeBlock';
import {Spinner} from '@astryxdesign/core/Spinner';
import {AspectRatio} from '@astryxdesign/core/AspectRatio';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';
import {entrar, useSesion} from '../app/auth';
import {llamar, urlArchivo} from '../app/apiLocal';

// ── Tipos que devuelve la API local (motor/proyectos.py) ────────────────────────────────────────
type Modelo = {id: string; nombre: string; costo: number; nota: string};
type Paso = {estado: 'pendiente' | 'generando' | 'listo' | 'error'; archivo?: string; costo?: number; error?: string; terminado?: string};
type Escena = {
  n: number; texto: string; prompt_imagen: string; modelo_imagen: string;
  prompt_video: string; modelo_video: string; imagen: Paso; video: Paso;
};
type Proyecto = {id: string; titulo: string; cuenta: string; guion: string; gastado_usd: number; escenas: Escena[]};
type Resumen = {id: string; titulo: string; cuenta: string; escenas: number; gastado_usd: number};
type Cuenta = {id: string; canal: string; handle: string; youtube: boolean; puede_subir: boolean};

const usd = (n: number) => `US$ ${n.toFixed(n < 0.1 ? 3 : 2)}`;
const media = {width: '100%', height: '100%', objectFit: 'cover' as const, borderRadius: 'var(--radius-page)'};
const ESTADO_PASO = {
  pendiente: {label: 'Pendiente', variant: 'neutral'},
  generando: {label: 'Generando…', variant: 'info'},
  listo: {label: 'Listo', variant: 'success'},
  error: {label: 'Error', variant: 'error'},
} as const;

// ── 1 · Conectar cuentas ────────────────────────────────────────────────────────────────────────
function Conectar({cuentas, apiOk}: {cuentas: Cuenta[]; apiOk: boolean}) {
  const {sesion} = useSesion();
  const [replicate, setReplicate] = useState<string | null>(null);
  return (
    <VStack gap={6}>
      <Card>
        <VStack gap={3}>
          <Heading level={2}>Lo que necesitas</Heading>
          <List listStyle="decimal" density="compact">
            <ListItem label="Una cuenta en esta web (inicia sesión con Google)." />
            <ListItem
              label={
                <Text>
                  Tu proyecto de Google con la API de YouTube y tu canal autorizado —{' '}
                  <Link href="curso.html#api-youtube">tutorial gratis</Link>.
                </Text>
              }
            />
            <ListItem
              label={
                <Text>
                  Un token de Replicate con saldo para generar imágenes y videos —{' '}
                  <Link href="curso.html#replicate">curso gratis</Link>.
                </Text>
              }
            />
            <ListItem label="La app de automatización encendida en tu PC (por ahora; luego correrá en la nube)." />
          </List>
        </VStack>
      </Card>

      <Grid columns={{minWidth: 260}} gap={4}>
        <Card>
          <VStack gap={2}>
            <HStack gap={2} vAlign="center">
              <Text weight="semibold">Cuenta Biai</Text>
              <Badge label={sesion ? 'Conectada' : 'Sin sesión'} variant={sesion ? 'success' : 'warning'} />
            </HStack>
            <Text type="supporting" color="secondary">Supabase guarda tu perfil y tus proyectos.</Text>
          </VStack>
        </Card>
        <Card>
          <VStack gap={2}>
            <HStack gap={2} vAlign="center">
              <Text weight="semibold">App en tu PC</Text>
              <Badge label={apiOk ? 'Encendida' : 'Apagada'} variant={apiOk ? 'success' : 'error'} />
            </HStack>
            <Text type="supporting" color="secondary">Genera y sube usando tus credenciales locales.</Text>
          </VStack>
        </Card>
        <Card>
          <VStack gap={2}>
            <HStack gap={2} vAlign="center">
              <Text weight="semibold">Replicate</Text>
              {replicate && <Badge label={replicate.startsWith('Token OK') ? 'Conectado' : 'Revisar'} variant={replicate.startsWith('Token OK') ? 'success' : 'warning'} />}
            </HStack>
            <Text type="supporting" color="secondary">{replicate ?? 'Imagen y video con IA, pago por uso.'}</Text>
            <Button
              label="Comprobar token"
              size="sm"
              isDisabled={!apiOk}
              clickAction={async () => setReplicate((await llamar<{salida: string}>('replicate/saldo', {})).salida)}
            />
          </VStack>
        </Card>
      </Grid>

      <VStack gap={3}>
        <Heading level={2}>Canales de YouTube</Heading>
        <Grid columns={{minWidth: 260}} gap={4}>
          {cuentas.map(c => (
            <Card key={c.id}>
              <VStack gap={2}>
                <HStack gap={2} vAlign="center" wrap="wrap">
                  <Text weight="semibold">{c.canal}</Text>
                  <Badge label={c.youtube ? 'Autorizado' : 'Sin autorizar'} variant={c.youtube ? 'success' : 'warning'} />
                </HStack>
                <Text type="supporting" color="secondary">
                  {c.handle} · {c.puede_subir ? 'puede subir y programar' : 'falta su script de subida'}
                </Text>
              </VStack>
            </Card>
          ))}
        </Grid>
      </VStack>
    </VStack>
  );
}

// ── 2 · Crear video: una escena ─────────────────────────────────────────────────────────────────
function TarjetaEscena({
  p, e, modelos, cambiar, quitar, generar,
}: {
  p: Proyecto; e: Escena; modelos: {imagen: Modelo[]; video: Modelo[]};
  cambiar: (c: Partial<Escena>) => void; quitar?: () => void; generar: (paso: 'imagen' | 'video') => Promise<void>;
}) {
  const mImg = modelos.imagen.find(m => m.id === e.modelo_imagen);
  const mVid = modelos.video.find(m => m.id === e.modelo_video);
  const version = (x: Paso) => x.terminado ?? '';
  return (
    <Card>
      <VStack gap={4}>
        <HStack gap={2} vAlign="center" justify="between">
          <Heading level={3}>Escena {e.n}</Heading>
          {quitar && <Button label="Quitar" size="sm" variant="ghost" onClick={quitar} />}
        </HStack>
        <TextArea label="Narración (lo que dice la voz)" value={e.texto} onChange={v => cambiar({texto: v})} />
        <Grid columns={{minWidth: 280}} gap={4}>
          <VStack gap={2}>
            <HStack gap={2} vAlign="center">
              <Text weight="semibold">1 · Imagen</Text>
              <Badge label={ESTADO_PASO[e.imagen.estado].label} variant={ESTADO_PASO[e.imagen.estado].variant} />
            </HStack>
            <TextArea label="Prompt de la imagen" value={e.prompt_imagen} onChange={v => cambiar({prompt_imagen: v})} />
            <Selector
              label="Modelo"
              options={modelos.imagen.map(m => ({value: m.id, label: `${m.nombre} · ${usd(m.costo)}`, description: m.nota}))}
              value={e.modelo_imagen}
              onChange={v => cambiar({modelo_imagen: v})}
              width="100%"
            />
            <Button
              label={`Generar imagen · ${mImg ? usd(mImg.costo) : ''}`}
              variant="primary"
              isDisabled={e.imagen.estado === 'generando' || !e.prompt_imagen.trim()}
              clickAction={() => generar('imagen')}
            />
            {e.imagen.estado === 'generando' && <Spinner label="Generando imagen…" />}
            {e.imagen.estado === 'error' && <Banner status="error" title="La imagen falló" description={e.imagen.error} />}
            {e.imagen.archivo && (
              <AspectRatio ratio={9 / 16}>
                <img src={urlArchivo(p.id, e.imagen.archivo, version(e.imagen))} alt={`Imagen de la escena ${e.n}`} style={media} />
              </AspectRatio>
            )}
          </VStack>
          <VStack gap={2}>
            <HStack gap={2} vAlign="center">
              <Text weight="semibold">2 · Video</Text>
              <Badge label={ESTADO_PASO[e.video.estado].label} variant={ESTADO_PASO[e.video.estado].variant} />
            </HStack>
            <TextArea label="Prompt del movimiento" value={e.prompt_video} onChange={v => cambiar({prompt_video: v})} />
            <Selector
              label="Modelo"
              options={modelos.video.map(m => ({value: m.id, label: `${m.nombre} · ${usd(m.costo)}`, description: m.nota}))}
              value={e.modelo_video}
              onChange={v => cambiar({modelo_video: v})}
              width="100%"
            />
            <Button
              label={`Animar · ${mVid ? usd(mVid.costo) : ''}`}
              variant="primary"
              isDisabled={e.video.estado === 'generando' || e.imagen.estado !== 'listo' || !e.prompt_video.trim()}
              tooltip={e.imagen.estado !== 'listo' ? 'Primero genera la imagen' : undefined}
              clickAction={() => generar('video')}
            />
            {e.video.estado === 'generando' && <Spinner label="Animando… (1–4 min)" />}
            {e.video.estado === 'error' && <Banner status="error" title="El video falló" description={e.video.error} />}
            {e.video.archivo && (
              <AspectRatio ratio={9 / 16}>
                <video src={urlArchivo(p.id, e.video.archivo, version(e.video))} controls playsInline style={media} />
              </AspectRatio>
            )}
          </VStack>
        </Grid>
      </VStack>
    </Card>
  );
}

// ── 2 · Crear video: editor del proyecto ────────────────────────────────────────────────────────
function EditorProyecto({id, modelos, volver}: {id: string; modelos: {imagen: Modelo[]; video: Modelo[]}; volver: () => void}) {
  const [p, setP] = useState<Proyecto | null>(null);
  const [sucio, setSucio] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    const datos = await llamar<Proyecto>(`proyectos/${id}`);
    // Mientras editas, solo refrescamos el estado de los pasos (no pisamos tus textos).
    setP(prev =>
      prev && sucio
        ? {...prev, gastado_usd: datos.gastado_usd, escenas: prev.escenas.map(e => {
            const nuevo = datos.escenas.find(x => x.n === e.n);
            return nuevo ? {...e, imagen: nuevo.imagen, video: nuevo.video} : e;
          })}
        : datos,
    );
  }, [id, sucio]);

  useEffect(() => {
    void cargar();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const generando = p?.escenas.some(e => e.imagen.estado === 'generando' || e.video.estado === 'generando');
  useEffect(() => {
    if (!generando) return;
    const t = window.setInterval(() => void cargar(), 4000);
    return () => window.clearInterval(t);
  }, [generando, cargar]);

  if (!p) return <Spinner label="Cargando proyecto" />;

  const cambiarEscena = (n: number, c: Partial<Escena>) => {
    setP({...p, escenas: p.escenas.map(e => (e.n === n ? {...e, ...c} : e))});
    setSucio(true);
  };
  const guardar = async () => {
    setP(await llamar<Proyecto>(`proyectos/${p.id}`, {titulo: p.titulo, guion: p.guion, escenas: p.escenas}));
    setSucio(false);
  };
  const generar = async (n: number, paso: 'imagen' | 'video') => {
    setAviso(null);
    try {
      if (sucio) await guardar();
      const plan = await llamar<{modelo: string; costo_usd: number}>(`proyectos/${p.id}/generar`, {escena: n, paso});
      if (!window.confirm(`${paso === 'imagen' ? 'Generar la imagen' : 'Animar'} de la escena ${n} con ${plan.modelo} cuesta ${usd(plan.costo_usd)} de tu saldo de Replicate. ¿Continuar?`)) return;
      await llamar(`proyectos/${p.id}/generar`, {escena: n, paso, confirmar: true});
      await cargar();
    } catch (err) {
      setAviso(err instanceof Error ? err.message : String(err));
    }
  };
  const agregar = () => {
    const ult = p.escenas[p.escenas.length - 1];
    setP({...p, escenas: [...p.escenas, {
      n: p.escenas.length + 1, texto: '', prompt_imagen: '', prompt_video: '',
      modelo_imagen: ult?.modelo_imagen ?? 'seedream-4', modelo_video: ult?.modelo_video ?? 'kling-4-flash',
      imagen: {estado: 'pendiente'}, video: {estado: 'pendiente'},
    }]});
    setSucio(true);
  };

  return (
    <VStack gap={5}>
      <HStack gap={2} vAlign="center" justify="between" wrap="wrap">
        <Button label="← Proyectos" variant="ghost" size="sm" onClick={volver} />
        <HStack gap={2} vAlign="center">
          <Badge label={`Gastado: ${usd(p.gastado_usd)}`} variant="neutral" />
          <Button label={sucio ? 'Guardar cambios' : 'Guardado'} variant={sucio ? 'primary' : 'secondary'} isDisabled={!sucio} clickAction={guardar} />
        </HStack>
      </HStack>
      {aviso && <Banner status="error" title={aviso} isDismissable onDismiss={() => setAviso(null)} />}
      <TextInput label="Título" value={p.titulo} onChange={v => (setP({...p, titulo: v}), setSucio(true))} width="100%" />
      <TextArea
        label="Guion completo"
        description="Escríbelo entero aquí y luego divídelo en escenas: una imagen y un clip por escena."
        value={p.guion}
        onChange={v => (setP({...p, guion: v}), setSucio(true))}
      />
      {p.escenas.map(e => (
        <TarjetaEscena
          key={e.n}
          p={p}
          e={e}
          modelos={modelos}
          cambiar={c => cambiarEscena(e.n, c)}
          quitar={p.escenas.length > 1 ? () => (setP({...p, escenas: p.escenas.filter(x => x.n !== e.n).map((x, i) => ({...x, n: i + 1}))}), setSucio(true)) : undefined}
          generar={paso => generar(e.n, paso)}
        />
      ))}
      <Button label="+ Agregar escena" onClick={agregar} />
      <Card variant="muted">
        <VStack gap={2}>
          <Text weight="semibold">Próximos pasos del flujo</Text>
          <Text type="supporting" color="secondary">
            3 · Voz (Gemini TTS / edge-tts) → 4 · Montaje en Remotion con subtítulos y música → 5 · Publicar y programar en
            YouTube. Se irán sumando a este mismo proyecto.
          </Text>
        </VStack>
      </Card>
    </VStack>
  );
}

// ── 2 · Crear video: lista de proyectos ─────────────────────────────────────────────────────────
function CrearVideo({cuentas, modelos}: {cuentas: Cuenta[]; modelos: {imagen: Modelo[]; video: Modelo[]}}) {
  const [lista, setLista] = useState<Resumen[]>([]);
  const [abierto, setAbierto] = useState<string | null>(() => new URLSearchParams(window.location.hash.slice(1)).get('p'));
  const [titulo, setTitulo] = useState('');
  const [cuenta, setCuenta] = useState(cuentas[0]?.id ?? '');
  const [error, setError] = useState<string | null>(null);

  const cargar = useCallback(async () => setLista((await llamar<{proyectos: Resumen[]}>('proyectos')).proyectos), []);
  useEffect(() => {
    void cargar();
  }, [cargar]);
  const abrir = (id: string | null) => {
    setAbierto(id);
    window.location.hash = id ? `crear&p=${id}` : 'crear';
    if (!id) void cargar();
  };

  if (abierto) return <EditorProyecto id={abierto} modelos={modelos} volver={() => abrir(null)} />;
  return (
    <VStack gap={6}>
      <Card>
        <VStack gap={3}>
          <Heading level={2}>Nuevo video</Heading>
          <Grid columns={{minWidth: 240}} gap={3}>
            <TextInput label="Título" value={titulo} onChange={setTitulo} placeholder="Le di el mismo gato a 6 IAs" width="100%" />
            <Selector
              label="Canal"
              options={cuentas.map(c => ({value: c.id, label: c.canal}))}
              value={cuenta}
              onChange={setCuenta}
              width="100%"
            />
          </Grid>
          {error && <Banner status="error" title={error} />}
          <HStack gap={2}>
            <Button
              label="Crear proyecto"
              variant="primary"
              isDisabled={!titulo.trim() || !cuenta}
              clickAction={async () => {
                try {
                  const p = await llamar<Proyecto>('proyectos', {titulo, cuenta});
                  setTitulo('');
                  abrir(p.id);
                } catch (e) {
                  setError(e instanceof Error ? e.message : String(e));
                }
              }}
            />
          </HStack>
        </VStack>
      </Card>
      <VStack gap={3}>
        <Heading level={2}>Mis proyectos</Heading>
        {lista.length === 0 ? (
          <Text color="secondary">Todavía no hay proyectos. Crea el primero arriba.</Text>
        ) : (
          <List hasDividers>
            {lista.map(r => (
              <ListItem
                key={r.id}
                label={r.titulo}
                description={`${cuentas.find(c => c.id === r.cuenta)?.canal ?? r.cuenta} · ${r.escenas} escena(s) · gastado ${usd(r.gastado_usd)}`}
                onClick={() => abrir(r.id)}
              />
            ))}
          </List>
        )}
      </VStack>
    </VStack>
  );
}

// ── Página ──────────────────────────────────────────────────────────────────────────────────────
export function PaginaAdmin() {
  const [seccion, setSeccion] = useState(() => (window.location.hash.startsWith('#crear') ? 'crear' : 'conectar'));
  const [cuentas, setCuentas] = useState<Cuenta[]>([]);
  const [modelos, setModelos] = useState<{imagen: Modelo[]; video: Modelo[]} | null>(null);
  const [apiOk, setApiOk] = useState<boolean | null>(null);

  useEffect(() => {
    Promise.all([llamar<{cuentas: Cuenta[]}>('proyectos'), llamar<{imagen: Modelo[]; video: Modelo[]}>('modelos')])
      .then(([p, m]) => {
        setCuentas(p.cuentas);
        setModelos(m);
        setApiOk(true);
      })
      .catch(() => setApiOk(false));
  }, []);

  return (
    <VStack gap={6} paddingBlock={8} style={{maxWidth: 1040, marginInline: 'auto', width: '100%'}}>
      <VStack gap={2}>
        <Heading level={1}>Automatización</Heading>
        <Text color="secondary">Conecta tus cuentas y crea videos con IA a partir de un guion: imagen, video y publicación.</Text>
      </VStack>
      <SegmentedControl
        label="Sección"
        value={seccion}
        onChange={v => {
          setSeccion(v);
          window.location.hash = v;
        }}>
        <SegmentedControlItem value="conectar" label="1 · Conectar cuentas" />
        <SegmentedControlItem value="crear" label="2 · Crear video" />
      </SegmentedControl>
      {apiOk === false && (
        <VStack gap={2}>
          <Banner
            status="warning"
            title="La app de tu PC está apagada"
            description="Enciéndela en la carpeta «Automatizacion videos IA» para ver tus canales y generar videos:"
          />
          <CodeBlock code="python 00_general_youtube/panel/servidor.py" language="bash" width="100%" />
        </VStack>
      )}
      {apiOk === null && <Spinner label="Conectando con la app de tu PC" />}
      {seccion === 'conectar' && apiOk !== null && <Conectar cuentas={cuentas} apiOk={apiOk} />}
      {seccion === 'crear' && apiOk && modelos && <CrearVideo cuentas={cuentas} modelos={modelos} />}
    </VStack>
  );
}

// Por ahora solo el admin (nuestras pruebas). Para abrirlo a otros usuarios, el motor pasa a la nube.
export default function Automatizacion() {
  const {sesion, cargando, esAdmin} = useSesion();
  if (cargando) return <Spinner label="Cargando sesión" />;
  if (esAdmin) return <PaginaAdmin />;
  return (
    <VStack gap={4} paddingBlock={10} hAlign="center">
      <Heading level={1}>Automatización</Heading>
      <Text color="secondary" justify="center">
        {sesion
          ? 'Estamos probando esta sección. Pronto podrás conectar tu canal y crear videos desde aquí.'
          : 'Inicia sesión para conectar tu canal de YouTube y crear videos con IA.'}
      </Text>
      {!sesion && <Button label="Iniciar sesión con Google" variant="primary" clickAction={entrar} />}
      <Link href="curso.html#api-youtube">Mientras tanto: tutorial gratis de la API de YouTube</Link>
    </VStack>
  );
}
