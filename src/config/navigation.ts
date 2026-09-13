import { LayoutDashboard, type LucideIcon } from 'lucide-react'

export type AppNavigationItem = {
  href: string
  labelKey: 'dashboard'
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
    ],
  },
]
