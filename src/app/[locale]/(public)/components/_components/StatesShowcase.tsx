'use client'

import { useTranslations } from 'next-intl'

import { EmptyState, ErrorState, LoadingState } from '@/components/states'
import { Button } from '@/components/ui/button'

import { ComponentSection } from './ComponentSection'

export function StatesShowcase() {
  const t = useTranslations('general.showcase.states')

  return (
    <ComponentSection title={t('title')} description={t('description')}>
      <div className="grid gap-6 lg:grid-cols-3">
        <EmptyState
          title={t('empty.title')}
          description={t('empty.description')}
          action={<Button size="sm">{t('empty.action')}</Button>}
          className="min-h-72"
          titleAs="h3"
        />

        <ErrorState
          title={t('error.title')}
          description={t('error.description')}
          action={
            <Button type="button" size="sm" variant="outline">
              {t('error.action')}
            </Button>
          }
          className="min-h-72"
          titleAs="h3"
        />

        <div className="rounded-lg border border-dashed">
          <LoadingState label={t('loading')} className="min-h-72" />
        </div>
      </div>
    </ComponentSection>
  )
}
