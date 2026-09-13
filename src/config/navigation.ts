import {
  Building2,
  FolderKanban,
  LayoutDashboard,
  ListTodo,
  type LucideIcon,
} from 'lucide-react'

export type AppNavigationItem = {
  href: string
  labelKey: 'dashboard' | 'clients' | 'projects' | 'tasks'
  icon: LucideIcon
}

export type AppNavigationGroup = {
  labelKey: 'main'
  items: AppNavigationItem[]
}

export const appNavigationGroups: AppNavigationGroup[] = [
  {
    labelKey: 'main',
    items: [
      {
        href: '/dashboard',
        labelKey: 'dashboard',
        icon: LayoutDashboard,
      },
      {
        href: '/clients',
        labelKey: 'clients',
        icon: Building2,
      },
      {
        href: '/projects',
        labelKey: 'projects',
        icon: FolderKanban,
      },
      {
        href: '/tasks',
        labelKey: 'tasks',
        icon: ListTodo,
      },
    ],
  },
]
