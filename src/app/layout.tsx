import './globals.css'

import type { Metadata } from 'next'
import { Geist_Mono, Inter } from 'next/font/google'
import { getLocale } from 'next-intl/server'

import { Toaster } from '@/components/ui/toaster'
import { appConfig } from '@/config/app'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { colorThemeScript } from '@/theme/color-theme-script'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
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
      className={`${inter.variable} ${geistMono.variable}`}
      data-color-theme={appConfig.theme.defaultColorTheme}
      suppressHydrationWarning
    >
      <head>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: colorThemeScript,
          }}
        />
      </head>

      <body>
        <ThemeProvider>
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
