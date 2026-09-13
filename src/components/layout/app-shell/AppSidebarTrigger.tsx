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
    >
      <PanelLeft aria-hidden="true" />
    </Button>
  )
}
