import { ArrowDownRight, ArrowUpRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'

import { LandingProductPreview } from './LandingProductPreview'

type Props = {
  eyebrow: string
  titleStart: string
  titleAccent: string
  titleEnd: string
  description: string
  primaryCta: string
  secondaryCta: string
  note: string
}

export function LandingHero({
  eyebrow,
  titleStart,
  titleAccent,
  titleEnd,
  description,
  primaryCta,
  secondaryCta,
  note,
}: Props) {
  return (
    <section className="overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-5 pt-12 sm:px-8 sm:pt-20 lg:px-10 lg:pt-24">
        <div className="grid items-end gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              <span className="size-2 rounded-full bg-brand-lime ring-4 ring-brand-lime/15" />

              {eyebrow}
            </div>

            <h1 className="mt-7 max-w-[960px] text-[clamp(3.15rem,8vw,8.25rem)] font-semibold leading-[0.84] tracking-[-0.075em] text-foreground">
              {titleStart}{' '}
              <span className="font-editorial font-normal italic text-brand-violet">
                {titleAccent}
              </span>{' '}
              {titleEnd}
            </h1>
          </div>

          <div className="pb-2 lg:pb-4">
            <p className="max-w-md text-base leading-7 text-muted-foreground lg:text-lg">
              {description}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                nativeButton={false}
                size="lg"
                className="h-12 w-full justify-center rounded-xl px-5 font-semibold shadow-none sm:w-auto [&_svg]:text-brand-lime"
                render={<Link href="/login" />}
              >
                {primaryCta}
                <ArrowUpRight />
              </Button>

              <Button
                nativeButton={false}
                size="lg"
                variant="ghost"
                className="h-12 w-full justify-center rounded-xl px-5 font-semibold sm:w-auto"
                render={<a href="#product" />}
              >
                {secondaryCta}
                <ArrowDownRight />
              </Button>
            </div>

            <p className="mt-5 text-xs text-muted-foreground/65">{note}</p>
          </div>
        </div>

        <div
          id="product"
          className="relative mt-16 rounded-t-[2.5rem] bg-brand-violet px-3 pt-12 sm:mt-20 sm:px-7 sm:pt-16 lg:mt-24 lg:px-12 lg:pt-20"
        >
          <div
            aria-hidden="true"
            className="absolute top-8 left-8 hidden font-editorial text-7xl italic text-white/10 lg:block"
          >
            flow
          </div>

          <LandingProductPreview />
        </div>
      </div>
    </section>
  )
}
