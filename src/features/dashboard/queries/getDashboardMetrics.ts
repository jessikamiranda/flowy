import { createClient } from '@/lib/supabase/server'

function serializeDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export async function getDashboardMetrics() {
  const supabase = await createClient()

  const today = new Date()
  const sevenDaysFromNow = new Date(today)

  sevenDaysFromNow.setDate(today.getDate() + 7)

  const todayString = serializeDate(today)
  const sevenDaysFromNowString = serializeDate(sevenDaysFromNow)

  const [clientsResult, activeProjectsResult, openTasksResult, dueSoonResult] =
    await Promise.all([
      supabase.from('clients').select('*', {
        count: 'exact',
        head: true,
      }),

      supabase
        .from('projects')
        .select('*', {
          count: 'exact',
          head: true,
        })
        .neq('status', 'completed'),

      supabase
        .from('tasks')
        .select('*', {
          count: 'exact',
          head: true,
        })
        .neq('status', 'done'),

      supabase
        .from('tasks')
        .select('*', {
          count: 'exact',
          head: true,
        })
        .neq('status', 'done')
        .gte('due_date', todayString)
        .lte('due_date', sevenDaysFromNowString),
    ])

  const error =
    clientsResult.error ??
    activeProjectsResult.error ??
    openTasksResult.error ??
    dueSoonResult.error

  if (error) {
    throw new Error(`Failed to fetch dashboard metrics: ${error.message}`)
  }

  return {
    totalClients: clientsResult.count ?? 0,
    activeProjects: activeProjectsResult.count ?? 0,
    openTasks: openTasksResult.count ?? 0,
    tasksDueSoon: dueSoonResult.count ?? 0,
  }
}
