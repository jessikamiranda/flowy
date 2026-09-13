import { Building2, LayoutDashboard, type LucideIcon } from 'lucide-react'

export type AppNavigationItem = {
  href: string
  labelKey: 'dashboard' | 'clients'
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
    ],
  },
]
