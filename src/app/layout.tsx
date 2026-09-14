import './globals.css'

import type { Metadata } from 'next'
import { Geist_Mono, Instrument_Serif, Manrope } from 'next/font/google'
import { getLocale } from 'next-intl/server'

import { Toaster } from '@/components/ui/toaster'
import { appConfig } from '@/config/app'
import { ThemeProvider } from '@/providers/ThemeProvider'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-instrument-serif',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: {
    default: appConfig.name,
    template: `%s | ${appConfig.name}`,
  },
  description: appConfig.description,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()

  return (
    <html
      lang={locale}
      className={`${manrope.variable} ${instrumentSerif.variable} ${geistMono.variable}`}
      data-color-theme={appConfig.theme.defaultColorTheme}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
