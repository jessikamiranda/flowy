import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'

type Props = {
  navigation: {
    product: string
    workflow: string
    features: string
  }
  loginLabel: string
  ctaLabel: string
}

export function LandingHeader({ navigation, loginLabel, ctaLabel }: Props) {
  return (
    <header className="sticky top-0 z-50 border-b border-transparent bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-[1440px] items-center px-5 sm:h-20 sm:px-8 lg:px-10">
        <Link href="/" aria-label="Flowy" className="shrink-0">
          <Image
            src="/brand/logo-color-black.svg"
            alt="Flowy"
            width={108}
            height={31}
            priority
            className="h-6 w-auto sm:h-7"
          />
        </Link>

        <nav
          aria-label="Primary navigation"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center rounded-full border border-border/60 bg-card/65 p-1 backdrop-blur lg:flex"
        >
          <a
            href="#product"
            className="rounded-full px-4 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
          >
            {navigation.product}
          </a>

          <a
            href="#workflow"
            className="rounded-full px-4 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
          >
            {navigation.workflow}
          </a>

          <a
            href="#features"
            className="rounded-full px-4 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
          >
            {navigation.features}
          </a>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button
            nativeButton={false}
            variant="ghost"
            className="hidden h-10 rounded-xl px-4 font-semibold sm:inline-flex"
            render={<Link href="/login" />}
          >
            {loginLabel}
          </Button>

          <Button
            nativeButton={false}
            className="h-10 rounded-xl px-4 font-semibold shadow-none"
            render={<Link href="/login" />}
          >
            {ctaLabel}
          </Button>
        </div>
      </div>
    </header>
  )
}
