'use client'

import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'
import type { ReactNode } from 'react'

import { appConfig } from '@/config/app'
import { Link } from '@/i18n/navigation'

import { AuthImageSection } from './AuthImageSection'

type Props = {
  children: ReactNode
  showBackButton?: boolean
}

export function AuthPage({ children, showBackButton = true }: Props) {
  const t = useTranslations('general')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex min-h-screen bg-background"
    >
      <AuthImageSection />

      <div className="z-10 flex w-full flex-col justify-center px-8 sm:px-12 lg:w-1/2 lg:px-24">
        {showBackButton && (
          <Link
            href="/"
            className="group absolute top-8 left-8 flex items-center gap-2 text-sm tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground"
          >
            ← {t('auth.back')}
          </Link>
        )}

        <div className="mx-auto w-full max-w-md">
          <div className="mb-12">
            <Link href="/">
              <h2 className="mb-6 text-3xl font-bold">{appConfig.name}</h2>
            </Link>
          </div>

          {children}
        </div>
      </div>
    </motion.div>
  )
}
