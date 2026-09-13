import { ThemeSwitcher } from '@/components/theme'

import { AppSidebarTrigger } from './AppSidebarTrigger'

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <AppSidebarTrigger />

      <div className="ml-auto flex items-center gap-2">
        <ThemeSwitcher />
      </div>
    </header>
  )
}
