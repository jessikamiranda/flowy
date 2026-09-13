'use client'

import { useLocale, useTranslations } from 'next-intl'

import { PageHeader } from '@/components/layout/page'
import { Button } from '@/components/ui/button'

import { ComponentSection } from './ComponentSection'

export function LayoutShowcase() {
  const t = useTranslations('general.showcase.layout')

  const locale = useLocale()

  return (
    <ComponentSection title={t('title')} description={t('description')}>
      <PageHeader
        breadcrumbs={[
          {
            label: t('breadcrumbs.parent'),
            href: `/${locale}/components`,
          },
          {
            label: t('breadcrumbs.current'),
          },
        ]}
        title={t('example.title')}
        description={t('example.description')}
        actions={<Button size="sm">{t('example.action')}</Button>}
        headingAs="h3"
      />
    </ComponentSection>
  )
}
