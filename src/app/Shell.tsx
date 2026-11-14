import type {ReactNode} from 'react';
import {Theme} from '@astryxdesign/core/theme';
import {Layout, LayoutContent, LayoutFooter, LayoutHeader} from '@astryxdesign/core/Layout';
import {TopNav, TopNavHeading, TopNavItem} from '@astryxdesign/core/TopNav';
import {NavIcon} from '@astryxdesign/core/NavIcon';
import {Icon} from '@astryxdesign/core/Icon';
import {VStack, HStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {Link} from '@astryxdesign/core/Link';
import {SparklesIcon} from '@heroicons/react/24/outline';
import {themes, defaultThemeSlug} from '../../astryx-themes';

export type Pagina = 'index' | 'curso' | 'privacidad' | 'panel';

const NAV: {id: Pagina; label: string; href: string}[] = [
  {id: 'index', label: 'Inicio', href: './'},
  {id: 'curso', label: 'Curso', href: 'curso.html'},
  {id: 'privacidad', label: 'Privacidad', href: 'privacidad.html'},
];

export function Shell({actual, children}: {actual: Pagina; children: ReactNode}) {
  // El panel solo existe en desarrollo (npm run dev): habla con la API local de tu PC.
  const nav = import.meta.env.DEV ? [...NAV, {id: 'panel' as const, label: 'Panel local', href: 'panel.html'}] : NAV;
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
              startContent={nav.map(n => (
                <TopNavItem key={n.id} label={n.label} href={n.href} isSelected={n.id === actual} />
              ))}
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
