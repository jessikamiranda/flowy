import { Building2, FolderKanban } from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'

import { PageContainer } from '@/components/layout/page'
import { DashboardFocusCard } from '@/features/dashboard/components/DashboardFocusCard'
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
    <PageContainer size="full" className="py-8 lg:py-10">
      <div className="space-y-8">
        <header className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            {t('hero.eyebrow')}
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">
            {t('hero.title')}{' '}
            <span className="font-editorial font-normal italic text-primary">
              {t('hero.accent')}
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            {t('hero.description')}
          </p>
        </header>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)]">
          <DashboardFocusCard
            eyebrow={t('focus.eyebrow')}
            openTasks={metrics.openTasks}
            openTasksLabel={t('focus.openTasks')}
            dueSoon={metrics.tasksDueSoon}
            dueSoonLabel={t('focus.dueSoon')}
            overdue={metrics.overdueTasks}
            overdueLabel={t('focus.overdue')}
            viewTasksLabel={t('focus.viewTasks')}
          />

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
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
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
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
        </div>
      </div>
    </PageContainer>
  )
}
