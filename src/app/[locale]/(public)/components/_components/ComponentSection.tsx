import type { ReactNode } from 'react'

type Props = {
  title: ReactNode
  description?: ReactNode
  children: ReactNode
}

export function ComponentSection({ title, description, children }: Props) {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>

        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>

      <div className="rounded-xl border bg-card p-4 sm:p-6">{children}</div>
    </section>
  )
}
