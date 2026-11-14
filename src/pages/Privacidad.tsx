import {VStack} from '@astryxdesign/core/Stack';
import {Heading, Text} from '@astryxdesign/core/Text';
import {Link} from '@astryxdesign/core/Link';
import {List, ListItem} from '@astryxdesign/core/List';

// Esta URL está registrada en Google Auth Platform (Información de la marca). No cambiar el nombre del archivo.
export default function Privacidad() {
  return (
    <VStack gap={5} paddingBlock={8} style={{maxWidth: 760, marginInline: 'auto', width: '100%'}}>
      <VStack gap={2}>
        <Heading level={1}>Política de privacidad de Automatizacion Videos</Heading>
        <Text type="supporting" color="secondary">
          Última actualización: 14 de noviembre de 2026
        </Text>
      </VStack>
      <Text>
        Automatizacion Videos (“la aplicación”) es una herramienta de escritorio de uso personal que usa los servicios
        de la API de YouTube para publicar y administrar videos en los canales de YouTube de su titular. Al usarla
        aceptas las <Link href="https://www.youtube.com/t/terms">Condiciones del servicio de YouTube</Link>, y tus datos
        se tratan también según la <Link href="https://policies.google.com/privacy">Política de privacidad de Google</Link>.
      </Text>

      <Heading level={2}>1. Datos a los que accede</Heading>
      <Text>Cuando autorizas la aplicación con tu cuenta de Google, accede, a través de la API de YouTube, a:</Text>
      <List listStyle="disc" density="compact">
        <ListItem label="Información básica del canal (nombre, ID del canal)." />
        <ListItem label="Los videos y las listas de reproducción del canal, para subir videos, editar su título, descripción y etiquetas, y añadirlos a listas." />
        <ListItem label="Estadísticas públicas de esos videos (vistas, “me gusta”, comentarios)." />
      </List>
      <Text>No accede a contraseñas, contactos, correos ni datos de pago.</Text>

      <Heading level={2}>2. Cómo se usan</Heading>
      <Text>
        Los datos se usan solo para lo que pide el titular de la cuenta: subir y organizar sus propios videos y revisar
        su rendimiento. No se usan para publicidad ni para crear perfiles.
      </Text>

      <Heading level={2}>3. Almacenamiento</Heading>
      <Text>
        El token de acceso que entrega Google y la información de los videos se guardan únicamente en la computadora
        del titular. La aplicación no tiene servidores propios y no envía estos datos a terceros.
      </Text>

      <Heading level={2}>4. Compartir datos</Heading>
      <Text>La aplicación no vende, alquila ni comparte datos de usuarios con terceros.</Text>

      <Heading level={2}>5. Cómo revocar el acceso y borrar los datos</Heading>
      <Text>
        Puedes revocar el acceso de la aplicación en cualquier momento desde la{' '}
        <Link href="https://security.google.com/settings/security/permissions">
          página de permisos de seguridad de Google
        </Link>
        . Al hacerlo, el token deja de funcionar. Para borrar los datos guardados localmente, elimina el archivo del
        token de la carpeta de la aplicación, o escríbenos y los borraremos en un plazo de 7 días.
      </Text>

      <Heading level={2}>6. Cambios</Heading>
      <Text>Si esta política cambia, se actualizará la fecha indicada arriba.</Text>

      <Heading level={2}>7. Contacto</Heading>
      <Text>gabriel.barrientos.c@uni.pe</Text>
      <Link href="./">← Inicio</Link>
    </VStack>
  );
}
