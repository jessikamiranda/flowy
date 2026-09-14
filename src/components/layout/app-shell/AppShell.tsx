import type { ReactNode } from 'react'

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

import { AppHeader } from './AppHeader'
import { AppSidebar } from './AppSidebar'

type Props = {
  children: ReactNode
}

export function AppShell({ children }: Props) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="min-w-0 overflow-hidden border border-border/60 md:rounded-[1.5rem] md:shadow-[0_1px_2px_rgb(27_26_24/0.03),0_16px_48px_rgb(27_26_24/0.04)]">
        <AppHeader />

        <div className="min-w-0 flex-1">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
