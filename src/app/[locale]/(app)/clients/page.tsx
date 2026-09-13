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
    <PageContainer size="full">
      <div className="space-y-6">
        <PageHeader
          title={t('title')}
          description={t('description')}
          actions={<NewClientSheet />}
        />

        <ClientsTable clients={clients} />
      </div>
    </PageContainer>
  )
}
