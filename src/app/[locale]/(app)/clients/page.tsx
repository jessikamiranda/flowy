import { getTranslations } from 'next-intl/server'

import { PageContainer, PageHeader } from '@/components/layout/page'
import { ClientsTable } from '@/features/clients/components/ClientsTable'
import { NewClientSheet } from '@/features/clients/components/NewClientSheet'
import { getClients } from '@/features/clients/queries/getClients'

export default async function ClientsPage() {
  const [t, clients] = await Promise.all([
    getTranslations('general.clients'),
    getClients(),
  ])

  return (
    <PageContainer size="full" className="py-8 lg:py-10">
      <div className="space-y-8">
        <PageHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
          actions={<NewClientSheet />}
        />

        <ClientsTable clients={clients} />
      </div>
    </PageContainer>
  )
}
