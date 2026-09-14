import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

import { Link } from '@/i18n/navigation'

type Props = {
  tagline: string
  productLabel: string
  workflowLabel: string
  featuresLabel: string
  loginLabel: string
  copyright: string
  creditLabel: string
  viewSourceLabel: string
  linkedinUrl: string
  repositoryUrl: string
}

export function LandingFooter({
  tagline,
  productLabel,
  workflowLabel,
  featuresLabel,
  loginLabel,
  copyright,
  creditLabel,
  viewSourceLabel,
  linkedinUrl,
  repositoryUrl,
}: Props) {
  return (
    <footer className="bg-brand-ink text-brand-cream">
      <div className="mx-auto max-w-[1440px] px-5 pb-8 pt-10 sm:px-8 sm:pb-10 lg:px-10">
        <div className="grid gap-10 border-t border-white/10 pt-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Image
              src="/brand/logo-color-white.svg"
              alt="Flowy"
              width={112}
              height={32}
              className="h-7 w-auto"
            />

            <p className="mt-4 max-w-sm text-sm leading-6 text-white/45">{tagline}</p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-white/90"
          >
            <a href="#product" className="transition-colors hover:text-white">
              {productLabel}
            </a>

            <a href="#workflow" className="transition-colors hover:text-white">
              {workflowLabel}
            </a>

            <a href="#features" className="transition-colors hover:text-white">
              {featuresLabel}
            </a>

            <Link href="/login" className="transition-colors hover:text-white">
              {loginLabel}
            </Link>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-5 text-[11px] text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <span>{copyright}</span>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>
              {creditLabel}{' '}
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-white/60 transition-colors hover:text-brand-lime"
              >
                Jessika Miranda
                <ArrowUpRight aria-hidden="true" className="size-3" />
              </a>
            </span>

            <span aria-hidden="true" className="text-white/15">
              ·
            </span>

            <a
              href={repositoryUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-white/60 transition-colors hover:text-brand-lime"
            >
              {viewSourceLabel}

              <ArrowUpRight aria-hidden="true" className="size-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
