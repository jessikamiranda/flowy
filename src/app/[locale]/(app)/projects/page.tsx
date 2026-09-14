import { getTranslations } from 'next-intl/server'

import { PageContainer, PageHeader } from '@/components/layout/page'
import { getClients } from '@/features/clients/queries/getClients'
import { NewProjectSheet } from '@/features/projects/components/NewProjectSheet'
import { ProjectsTable } from '@/features/projects/components/ProjectsTable'
import { getProjects } from '@/features/projects/queries/getProjects'

export default async function ProjectsPage() {
  const [t, projects, clients] = await Promise.all([
    getTranslations('general.projects'),
    getProjects(),
    getClients(),
  ])

  return (
    <PageContainer size="full" className="py-8 lg:py-10">
      <div className="space-y-8">
        <PageHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
          actions={<NewProjectSheet clients={clients} />}
        />

        <ProjectsTable projects={projects} clients={clients} />
      </div>
    </PageContainer>
  )
}
