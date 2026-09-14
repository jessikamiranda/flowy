import Image from 'next/image'

import { ThemeSwitcher } from '@/components/theme'

import { AppSidebarTrigger } from './AppSidebarTrigger'

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-border/60 bg-background/85 px-4 backdrop-blur-xl md:px-6">
      <AppSidebarTrigger />

      <div className="md:hidden">
        <Image
          src="/brand/logo-color-black.svg"
          alt="Flowy"
          width={92}
          height={27}
          priority
          className="h-6 w-auto dark:hidden"
        />

        <Image
          src="/brand/logo-color-white.svg"
          alt="Flowy"
          width={92}
          height={27}
          priority
          className="hidden h-6 w-auto dark:block"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <ThemeSwitcher />
      </div>
    </header>
  )
}
