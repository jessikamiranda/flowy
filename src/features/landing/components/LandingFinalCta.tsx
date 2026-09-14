import { ArrowUpRight, Sparkles } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'

type Props = {
  eyebrow: string
  titleStart: string
  titleAccent: string
  description: string
  ctaLabel: string
  note: string
}

export function LandingFinalCta({
  eyebrow,
  titleStart,
  titleAccent,
  description,
  ctaLabel,
  note,
}: Props) {
  return (
    <section className="bg-brand-ink text-brand-cream">
      <div className="mx-auto max-w-[1440px] px-5 pb-6 pt-8 sm:px-8 sm:pb-8 lg:px-10 lg:pb-10">
        <div className="relative overflow-hidden rounded-[2.25rem] bg-brand-violet px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <div
            aria-hidden="true"
            className="absolute -left-24 -top-24 size-72 rounded-full border-[56px] border-white/10"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-20 right-16 size-56 rounded-full bg-brand-lime/20 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute right-8 top-8 size-5 rounded-full bg-brand-lime sm:right-12 sm:top-12"
          />

          <div className="relative mx-auto max-w-5xl text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/90">
              <Sparkles aria-hidden="true" className="size-3.5 text-brand-lime" />

              {eyebrow}
            </div>

            <h2 className="mt-6 text-4xl font-semibold leading-[0.96] tracking-[-0.06em] sm:text-5xl lg:text-7xl">
              {titleStart}{' '}
              <span className="font-editorial font-normal italic text-brand-lime">
                {titleAccent}
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-6 text-white/60 sm:text-base sm:leading-7">
              {description}
            </p>

            <div className="mt-8 flex justify-center">
              <Button
                nativeButton={false}
                size="lg"
                className="h-12 rounded-xl bg-brand-cream px-5 font-semibold text-brand-ink shadow-none hover:bg-white"
                render={<Link href="/login" />}
              >
                {ctaLabel}

                <ArrowUpRight aria-hidden="true" className="text-brand-violet" />
              </Button>
            </div>

            <p className="mt-5 text-xs text-white/45">{note}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
