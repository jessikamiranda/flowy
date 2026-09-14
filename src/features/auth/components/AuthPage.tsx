'use client'

import { ArrowLeft } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { ReactNode } from 'react'

import { Link } from '@/i18n/navigation'

import { AuthImageSection } from './AuthImageSection'

type Props = {
  children: ReactNode
  showBackButton?: boolean
}

export function AuthPage({ children, showBackButton = true }: Props) {
  const t = useTranslations('general')

  return (
    <main className="min-h-screen bg-background p-3 sm:p-4">
      <div className="mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-[1600px] gap-4 sm:min-h-[calc(100vh-2rem)]">
        <AuthImageSection />

        <section className="relative flex min-w-0 flex-1 flex-col rounded-[2rem] bg-card lg:max-w-[42rem]">
          <div className="flex items-center justify-between px-6 pt-6 sm:px-8 sm:pt-8 lg:px-12">
            <div className="lg:hidden">
              <Image
                src="/brand/logo-color-black.svg"
                alt="Flowy"
                width={100}
                height={29}
                priority
                className="h-7 w-auto dark:hidden"
              />

              <Image
                src="/brand/logo-color-white.svg"
                alt="Flowy"
                width={100}
                height={29}
                priority
                className="hidden h-7 w-auto dark:block"
              />
            </div>

            {showBackButton && (
              <Link
                href="/"
                className="ml-auto inline-flex h-9 items-center gap-2 rounded-xl px-3 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <ArrowLeft aria-hidden="true" className="size-3.5" />

                {t('auth.back')}
              </Link>
            )}
          </div>

          <div className="flex flex-1 items-center px-6 py-12 sm:px-8 lg:px-12 xl:px-16">
            <motion.div
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.35,
                ease: 'easeOut',
              }}
              className="mx-auto w-full max-w-md"
            >
              {children}
            </motion.div>
          </div>

          <div className="px-6 pb-6 text-center text-[11px] text-muted-foreground sm:px-8">
            © {new Date().getFullYear()} Flowy
          </div>
        </section>
      </div>
    </main>
  )
}
