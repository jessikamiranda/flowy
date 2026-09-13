'use client'

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
import { appConfig } from '@/config/app'
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
      collapsible="icon"
      mobileTitle={tShell('navigationTitle')}
      mobileDescription={tShell('navigationDescription')}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={<Link href={`/${locale}/dashboard`} onClick={handleNavigate} />}
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary font-semibold text-primary-foreground">
                {appConfig.name.charAt(0).toUpperCase()}
              </span>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{appConfig.name}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {appNavigationGroups.map((group) => (
          <SidebarGroup key={group.labelKey}>
            <SidebarGroupLabel>{t(group.labelKey)}</SidebarGroupLabel>

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

      <SidebarFooter>
        <LogoutButton />
      </SidebarFooter>

      <SidebarRail aria-label={tShell('toggleSidebar')} title={tShell('toggleSidebar')} />
    </Sidebar>
  )
}
