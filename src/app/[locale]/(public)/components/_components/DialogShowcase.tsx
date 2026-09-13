'use client'

import { useTranslations } from 'next-intl'

import { ConfirmDialog } from '@/components/dialogs'
import { Button } from '@/components/ui/button'

import { ComponentSection } from './ComponentSection'

export function DialogShowcase() {
  const t = useTranslations('general.showcase.dialog')

  return (
    <ComponentSection title={t('title')} description={t('description')}>
      <div className="flex flex-wrap gap-3">
        <ConfirmDialog
          trigger={<Button type="button">{t('default.trigger')}</Button>}
          title={t('default.title')}
          description={t('default.description')}
          confirmLabel={t('default.confirm')}
          onConfirm={() => {}}
        />

        <ConfirmDialog
          trigger={
            <Button type="button" variant="destructive">
              {t('destructive.trigger')}
            </Button>
          }
          title={t('destructive.title')}
          description={t('destructive.description')}
          confirmLabel={t('destructive.confirm')}
          processingLabel={t('destructive.processing')}
          variant="destructive"
          onConfirm={() =>
            new Promise((resolve) => {
              window.setTimeout(resolve, 1200)
            })
          }
        />
      </div>
    </ComponentSection>
  )
}
