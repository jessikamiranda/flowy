import {
  ArrowDownRight,
  ArrowRight,
  Check,
  FolderKanban,
  ListTodo,
  Users,
} from 'lucide-react'

type Props = {
  eyebrow: string
  titleStart: string
  titleAccent: string
  description: string
  clientLabel: string
  clientTitle: string
  clientDescription: string
  projectLabel: string
  projectTitle: string
  projectDescription: string
  taskLabel: string
  taskTitle: string
  taskDescription: string
  progressLabel: string
  progressTitle: string
  progressDescription: string
}

export function LandingWorkflow({
  eyebrow,
  titleStart,
  titleAccent,
  description,
  clientLabel,
  clientTitle,
  clientDescription,
  projectLabel,
  projectTitle,
  projectDescription,
  taskLabel,
  taskTitle,
  taskDescription,
  progressLabel,
  progressTitle,
  progressDescription,
}: Props) {
  return (
    <section id="workflow" className="scroll-mt-20">
      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-28 lg:px-10 lg:py-36">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              {eyebrow}
            </p>

            <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-5xl lg:text-6xl">
              {titleStart}{' '}
              <span className="font-editorial font-normal italic text-primary">
                {titleAccent}
              </span>
            </h2>

            <p className="mt-6 max-w-md text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
              {description}
            </p>

            <div className="mt-10 hidden items-center gap-3 text-xs font-semibold text-muted-foreground lg:flex">
              <span className="flex size-8 items-center justify-center rounded-full border border-border bg-card">
                01
              </span>

              <ArrowDownRight aria-hidden="true" className="size-4 text-primary" />

              <span>04</span>
            </div>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute top-14 bottom-14 left-[1.45rem] hidden w-px bg-border lg:block"
            />

            <div className="space-y-4">
              <WorkflowRow
                number="01"
                label={clientLabel}
                title={clientTitle}
                description={clientDescription}
                icon={Users}
                tone="cream"
              />

              <WorkflowConnector />

              <WorkflowRow
                number="02"
                label={projectLabel}
                title={projectTitle}
                description={projectDescription}
                icon={FolderKanban}
                tone="violet"
              />

              <WorkflowConnector />

              <WorkflowRow
                number="03"
                label={taskLabel}
                title={taskTitle}
                description={taskDescription}
                icon={ListTodo}
                tone="cream"
              />

              <WorkflowConnector />

              <WorkflowRow
                number="04"
                label={progressLabel}
                title={progressTitle}
                description={progressDescription}
                icon={Check}
                tone="lime"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

type WorkflowRowProps = {
  number: string
  label: string
  title: string
  description: string
  icon: typeof Users
  tone: 'cream' | 'violet' | 'lime'
}

function WorkflowRow({
  number,
  label,
  title,
  description,
  icon: Icon,
  tone,
}: WorkflowRowProps) {
  const styles = {
    cream: 'border-border/70 bg-card text-foreground',
    violet: 'border-brand-violet bg-brand-violet text-brand-cream',
    lime: 'border-brand-lime bg-brand-lime text-brand-ink',
  }

  const mutedStyles = {
    cream: 'text-muted-foreground',
    violet: 'text-white/60',
    lime: 'text-brand-ink/60',
  }

  const iconStyles = {
    cream: 'bg-accent text-primary',
    violet: 'bg-white/10 text-brand-lime',
    lime: 'bg-brand-ink/10 text-brand-ink',
  }

  return (
    <article
      className={`relative overflow-hidden rounded-[1.75rem] border p-5 sm:p-6 lg:p-7 ${styles[tone]}`}
    >
      {tone === 'violet' && (
        <div
          aria-hidden="true"
          className="absolute -right-12 -top-16 size-44 rounded-full border-[36px] border-white/10"
        />
      )}

      <div className="relative grid gap-6 sm:grid-cols-[auto_1fr_auto] sm:items-start">
        <div className="flex items-center gap-3">
          <span
            className={`flex size-11 items-center justify-center rounded-2xl ${iconStyles[tone]}`}
          >
            <Icon aria-hidden="true" className="size-4.5" />
          </span>

          <span className="text-xs font-semibold tabular-nums opacity-40 sm:hidden">
            {number}
          </span>
        </div>

        <div className="min-w-0">
          <p
            className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${mutedStyles[tone]}`}
          >
            {label}
          </p>

          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.045em] sm:text-3xl">
            {title}
          </h3>

          <p className={`mt-3 max-w-lg text-sm leading-6 ${mutedStyles[tone]}`}>
            {description}
          </p>
        </div>

        <span className="hidden text-xs font-semibold tabular-nums opacity-35 sm:block">
          {number}
        </span>
      </div>
    </article>
  )
}

function WorkflowConnector() {
  return (
    <div aria-hidden="true" className="relative h-8">
      <div className="absolute left-[1.45rem] top-1/2 flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background text-muted-foreground">
        <ArrowRight className="size-3.5 rotate-90" />
      </div>
    </div>
  )
}
