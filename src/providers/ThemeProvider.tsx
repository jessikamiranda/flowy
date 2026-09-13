'use client'

import { ThemeProvider as NextThemesProvider } from '@teispace/next-themes'
import type { ReactNode } from 'react'

import { appConfig } from '@/config/app'

type Props = {
  children: ReactNode
}

export function ThemeProvider({ children }: Props) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={appConfig.theme.defaultMode}
      enableSystem
      disableTransitionOnChange
      storageKey={appConfig.theme.modeStorageKey}
    >
      {children}
    </NextThemesProvider>
  )
}
