import { getTranslations } from 'next-intl/server'

import { PageContainer, PageHeader } from '@/components/layout/page'
import { getProjects } from '@/features/projects/queries/getProjects'
import { NewTaskSheet } from '@/features/tasks/components/NewTaskSheet'
import { TasksTable } from '@/features/tasks/components/TasksTable'
import { getTasks } from '@/features/tasks/queries/getTasks'

export default async function TasksPage() {
  const [t, tasks, projects] = await Promise.all([
    getTranslations('general.tasks'),
    getTasks(),
    getProjects(),
  ])

  return (
    <PageContainer size="full" className="py-8 lg:py-10">
      <div className="space-y-8">
        <PageHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
          actions={<NewTaskSheet projects={projects} />}
        />

        <TasksTable tasks={tasks} projects={projects} />
      </div>
    </PageContainer>
  )
}
