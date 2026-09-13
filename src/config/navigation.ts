import { Building2, FolderKanban, LayoutDashboard, type LucideIcon } from 'lucide-react'

export type AppNavigationItem = {
  href: string
  labelKey: 'dashboard' | 'clients' | 'projects'
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
    ],
  },
]
