'use client'

import { RefreshCw } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

import { PageContainer } from '@/components/layout/page'
import { ErrorState } from '@/components/states'
import { Button } from '@/components/ui/button'

type Props = {
  error: Error & {
    digest?: string
  }
  reset: () => void
}

export default function AppError({ error, reset }: Props) {
  const t = useTranslations('general.states')

  useEffect(() => {
    console.error('Application route error:', error)
  }, [error])

  return (
    <PageContainer size="full">
      <ErrorState
        title={t('error.title')}
        description={t('error.description')}
        className="min-h-[calc(100vh-10rem)]"
        action={
          <Button type="button" onClick={reset}>
            <RefreshCw aria-hidden="true" />
            {t('error.retry')}
          </Button>
        }
      />
    </PageContainer>
  )
}
