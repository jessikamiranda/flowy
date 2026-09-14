'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar'
import { appNavigationGroups } from '@/config/navigation'
import { LogoutButton } from '@/features/auth/components/LogoutButton'

export function AppSidebar() {
  const locale = useLocale()
  const pathname = usePathname()

  const t = useTranslations('general.navigation')
  const tShell = useTranslations('general.appShell')

  const { isMobile, setOpenMobile } = useSidebar()

  function handleNavigate() {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      mobileTitle={tShell('navigationTitle')}
      mobileDescription={tShell('navigationDescription')}
    >
      <SidebarHeader className="px-4 py-1.5 group-data-[collapsible=icon]:px-2">
        <Link
          href={`/${locale}/dashboard`}
          onClick={handleNavigate}
          className="flex h-10 items-center group-data-[collapsible=icon]:justify-center"
        >
          <span className="group-data-[collapsible=icon]:hidden">
            <Image
              src="/brand/logo-color-black.svg"
              alt="Flowy"
              width={118}
              height={34}
              priority
              className="h-7 w-auto dark:hidden"
            />

            <Image
              src="/brand/logo-color-white.svg"
              alt="Flowy"
              width={118}
              height={34}
              priority
              className="hidden h-7 w-auto dark:block"
            />
          </span>

          <Image
            src="/brand/app-icon-light.svg"
            alt=""
            width={32}
            height={32}
            aria-hidden="true"
            className="hidden size-8 rounded-[10px] group-data-[collapsible=icon]:block"
          />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {appNavigationGroups.map((group) => (
          <SidebarGroup
            key={group.labelKey}
            className="px-3 py-2 group-data-[collapsible=icon]:px-2"
          >
            <SidebarGroupLabel className="px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-sidebar-foreground/45">
              {t(group.labelKey)}
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const href = `/${locale}${item.href}`

                  const isActive = pathname === href || pathname.startsWith(`${href}/`)

                  const Icon = item.icon

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        isActive={isActive}
                        render={<Link href={href} onClick={handleNavigate} />}
                        tooltip={t(item.labelKey)}
                        className="h-10 rounded-xl px-3 text-[13px] font-medium text-sidebar-foreground/65 transition-colors hover:bg-card/70 hover:text-sidebar-foreground data-active:bg-card data-active:text-foreground data-active:shadow-sm data-active:ring-1 data-active:ring-border/70 data-active:[&_svg]:text-primary"
                      >
                        <Icon aria-hidden="true" />

                        <span>{t(item.labelKey)}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/70 p-3 group-data-[collapsible=icon]:p-2">
        <LogoutButton />
      </SidebarFooter>

      <SidebarRail aria-label={tShell('toggleSidebar')} title={tShell('toggleSidebar')} />
    </Sidebar>
  )
}
