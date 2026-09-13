import { Building2, CalendarClock, FolderKanban, ListTodo } from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'

import { PageContainer, PageHeader } from '@/components/layout/page'
import { DashboardMetricCard } from '@/features/dashboard/components/DashboardMetricCard'
import { RecentProjects } from '@/features/dashboard/components/RecentProjects'
import { UpcomingTasks } from '@/features/dashboard/components/UpcomingTasks'
import { getDashboardMetrics } from '@/features/dashboard/queries/getDashboardMetrics'
import { getDashboardOverview } from '@/features/dashboard/queries/getDashboardOverview'

export default async function DashboardPage() {
  const [t, locale, metrics, overview] = await Promise.all([
    getTranslations('general.dashboard'),
    getLocale(),
    getDashboardMetrics(),
    getDashboardOverview(),
  ])

  return (
    <PageContainer size="full">
      <div className="space-y-8">
        <PageHeader title={t('title')} description={t('description')} />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <DashboardMetricCard
            title={t('metrics.totalClients.title')}
            value={metrics.totalClients}
            description={t('metrics.totalClients.description')}
            icon={Building2}
          />

          <DashboardMetricCard
            title={t('metrics.activeProjects.title')}
            value={metrics.activeProjects}
            description={t('metrics.activeProjects.description')}
            icon={FolderKanban}
          />

          <DashboardMetricCard
            title={t('metrics.openTasks.title')}
            value={metrics.openTasks}
            description={t('metrics.openTasks.description')}
            icon={ListTodo}
          />

          <DashboardMetricCard
            title={t('metrics.tasksDueSoon.title')}
            value={metrics.tasksDueSoon}
            description={t('metrics.tasksDueSoon.description')}
            icon={CalendarClock}
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <RecentProjects
            projects={overview.recentProjects}
            title={t('recentProjects.title')}
            description={t('recentProjects.description')}
            emptyMessage={t('recentProjects.empty')}
            viewAllLabel={t('viewAll')}
            statusLabels={{
              planning: t('status.planning'),
              inProgress: t('status.inProgress'),
              onHold: t('status.onHold'),
              completed: t('status.completed'),
            }}
          />

          <UpcomingTasks
            tasks={overview.upcomingTasks}
            locale={locale}
            title={t('upcomingTasks.title')}
            description={t('upcomingTasks.description')}
            emptyMessage={t('upcomingTasks.empty')}
            viewAllLabel={t('viewAll')}
            priorityLabels={{
              low: t('priority.low'),
              medium: t('priority.medium'),
              high: t('priority.high'),
            }}
          />
        </div>
      </div>
    </PageContainer>
  )
}
