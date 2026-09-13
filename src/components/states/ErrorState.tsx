import { TriangleAlert } from 'lucide-react'
import type { ReactNode } from 'react'

import { StatePlaceholder, type StateTitleElement } from './StatePlaceholder'

type Props = {
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
  icon?: ReactNode
  className?: string
  titleAs?: StateTitleElement
}

export function ErrorState({
  title,
  description,
  action,
  icon = <TriangleAlert aria-hidden="true" className="size-6" />,
  className,
  titleAs,
}: Props) {
  return (
    <StatePlaceholder
      icon={icon}
      title={title}
      description={description}
      action={action}
      className={className}
      variant="destructive"
      titleAs={titleAs}
    />
  )
}
