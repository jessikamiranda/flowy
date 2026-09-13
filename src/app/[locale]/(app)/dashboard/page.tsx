import { getTranslations } from 'next-intl/server'

import { PageContainer, PageHeader } from '@/components/layout/page'

export default async function DashboardPage() {
  const t = await getTranslations('general.dashboard')

  return (
    <PageContainer>
      <div className="space-y-6">
        <PageHeader title={t('title')} description={t('description')} />
      </div>
    </PageContainer>
  )
}
