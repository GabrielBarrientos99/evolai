import type {ReactNode} from 'react';
import {Theme} from '@astryxdesign/core/theme';
import {Layout, LayoutContent, LayoutFooter, LayoutHeader} from '@astryxdesign/core/Layout';
import {TopNav, TopNavHeading, TopNavItem} from '@astryxdesign/core/TopNav';
import {NavIcon} from '@astryxdesign/core/NavIcon';
import {Icon} from '@astryxdesign/core/Icon';
import {VStack, HStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {Link} from '@astryxdesign/core/Link';
import {Button} from '@astryxdesign/core/Button';
import {Avatar} from '@astryxdesign/core/Avatar';
import {Badge} from '@astryxdesign/core/Badge';
import {DropdownMenu} from '@astryxdesign/core/DropdownMenu';
import {useMediaQuery} from '@astryxdesign/core/hooks';
import {SparklesIcon, Bars3Icon} from '@heroicons/react/24/outline';
import {themes, defaultThemeSlug} from '../../astryx-themes';
import {entrar, salir, useSesion} from './auth';

export type Pagina = 'index' | 'curso' | 'automatizacion' | 'privacidad' | 'panel';

const NAV: {id: Pagina; label: string; href: string}[] = [
  {id: 'index', label: 'Inicio', href: './'},
  {id: 'curso', label: 'Curso', href: 'curso.html'},
  {id: 'automatizacion', label: 'Automatización', href: 'automatizacion.html'},
  {id: 'privacidad', label: 'Privacidad', href: 'privacidad.html'},
];

export function Shell({actual, children}: {actual: Pagina; children: ReactNode}) {
  const {sesion, perfil, esAdmin, disponible} = useSesion();
  // El panel solo aparece para el admin (rol en Supabase). Sus acciones usan la API local de tu PC.
  const nav = esAdmin ? [...NAV, {id: 'panel' as const, label: 'Panel', href: 'panel.html'}] : NAV;
  const nombre = perfil?.nombre ?? sesion?.user.email ?? 'Usuario';
  const esMovil = useMediaQuery('(max-width: 640px)');

  // En móvil: logo + (avatar o "Entrar") + menú hamburguesa, todo en una sola fila.
  const menuMovil = (
    <HStack gap={2} vAlign="center">
      {disponible &&
        (sesion ? (
          <Avatar name={nombre} src={perfil?.avatar_url ?? undefined} size="sm" />
        ) : (
          <Button label="Entrar" variant="primary" size="sm" clickAction={entrar} />
        ))}
      <DropdownMenu
        hasChevron={false}
        alignment="end"
        button={{label: 'Menú', variant: 'ghost', size: 'sm', isIconOnly: true, icon: <Icon icon={Bars3Icon} />}}
        items={[
          ...nav.map(n => ({label: n.id === actual ? `${n.label} ·` : n.label, onClick: () => (window.location.href = n.href)})),
          ...(sesion ? [{label: esAdmin ? 'Salir (admin)' : 'Salir', onClick: () => void salir()}] : []),
        ]}
      />
    </HStack>
  );

  const cuenta = !disponible ? null : sesion ? (
    <HStack gap={2} vAlign="center">
      {esAdmin && <Badge label="Admin" variant="info" />}
      <Avatar name={nombre} src={perfil?.avatar_url ?? undefined} size="sm" />
      <Button label="Salir" variant="ghost" size="sm" clickAction={salir} />
    </HStack>
  ) : (
    <Button label="Iniciar sesión" variant="primary" size="sm" clickAction={entrar} />
  );
  return (
    <Theme theme={themes[defaultThemeSlug]} mode="dark">
      <Layout
        height="auto"
        header={
          <LayoutHeader hasDivider>
            <TopNav
              label="Navegación principal"
              heading={
                <TopNavHeading
                  heading="evolai"
                  headingHref="./"
                  logo={<NavIcon icon={<Icon icon={SparklesIcon} size="sm" />} />}
                />
              }
              startContent={
                esMovil
                  ? undefined
                  : nav.map(n => <TopNavItem key={n.id} label={n.label} href={n.href} isSelected={n.id === actual} />)
              }
              endContent={esMovil ? menuMovil : cuenta}
            />
          </LayoutHeader>
        }
        content={<LayoutContent isScrollable={false}>{children}</LayoutContent>}
        footer={
          <LayoutFooter hasDivider>
            <VStack gap={1} paddingBlock={3}>
              <Text type="supporting" color="secondary">
                Evolai · canal Gabito Tu IA · Contacto: gabriel.barrientos.c@uni.pe
              </Text>
              <HStack gap={2} wrap="wrap">
                <Link href="privacidad.html" type="supporting">
                  Política de privacidad
                </Link>
                <Text type="supporting" color="secondary">
                  · Uso de la API conforme a las
                </Text>
                <Link
                  href="https://developers.google.com/youtube/terms/api-services-terms-of-service"
                  type="supporting">
                  Condiciones del servicio de la API de YouTube
                </Link>
              </HStack>
            </VStack>
          </LayoutFooter>
        }
      />
    </Theme>
  );
}
