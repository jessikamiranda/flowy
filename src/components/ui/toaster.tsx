'use client'

import { useTheme } from '@teispace/next-themes'
import { Toaster as Sonner, type ToasterProps } from 'sonner'

export function Toaster(props: ToasterProps) {
  const { theme } = useTheme()

  const currentTheme: ToasterProps['theme'] =
    theme === 'light' || theme === 'dark' || theme === 'system' ? theme : 'system'

  return <Sonner theme={currentTheme} {...props} />
}
