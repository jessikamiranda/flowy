'use client'

import { PanelLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { useSidebar } from '@/components/ui/sidebar'

export function AppSidebarTrigger() {
  const t = useTranslations('general.appShell')

  const { toggleSidebar } = useSidebar()

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={t('toggleSidebar')}
      onClick={toggleSidebar}
      className="size-9 rounded-xl border border-border/70 bg-card/70 text-muted-foreground shadow-none hover:bg-card hover:text-foreground"
    >
      <PanelLeft aria-hidden="true" />
    </Button>
  )
}
