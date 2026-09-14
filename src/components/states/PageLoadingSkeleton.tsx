'use client'

import { useTranslations } from 'next-intl'

import { PageContainer } from '@/components/layout/page'
import { Skeleton } from '@/components/ui/skeleton'

type Props = {
  variant: 'table' | 'dashboard'
}

export function PageLoadingSkeleton({ variant }: Props) {
  const t = useTranslations('general.states')

  if (variant === 'dashboard') {
    return (
      <PageContainer size="full" className="py-8 lg:py-10">
        <div className="space-y-8" role="status" aria-live="polite" aria-busy="true">
          <span className="sr-only">{t('loading')}</span>

          <div className="space-y-3">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-12 w-96 max-w-full" />
            <Skeleton className="h-5 w-[32rem] max-w-full" />
          </div>

          <div className="grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)]">
            <Skeleton className="h-[25rem] rounded-[1.75rem]" />

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              <Skeleton className="h-48 rounded-[1.5rem]" />
              <Skeleton className="h-48 rounded-[1.5rem]" />
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Skeleton className="h-80 rounded-[1.5rem]" />
            <Skeleton className="h-80 rounded-[1.5rem]" />
          </div>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer size="full">
      <div className="space-y-6" role="status" aria-live="polite" aria-busy="true">
        <span className="sr-only">{t('loading')}</span>

        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-9 w-40" />
            <Skeleton className="h-5 w-72 max-w-full" />
          </div>

          <Skeleton className="h-9 w-32" />
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Skeleton className="h-9 w-64" />
            <Skeleton className="h-9 w-32" />
            <Skeleton className="ml-auto h-9 w-28" />
          </div>

          <div className="overflow-hidden rounded-xl border">
            <div className="flex gap-8 border-b p-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>

            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex gap-8 border-b p-4 last:border-b-0">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
