import {
  ArrowUpRight,
  CalendarDays,
  Check,
  Circle,
  ListFilter,
  PencilLine,
  Users,
} from 'lucide-react'

type Props = {
  eyebrow: string
  titleStart: string
  titleAccent: string
  description: string

  clientsTitle: string
  clientsDescription: string

  projectsTitle: string
  projectsDescription: string

  tasksTitle: string
  tasksDescription: string

  inlineTitle: string
  inlineDescription: string
}

export function LandingFeatures({
  eyebrow,
  titleStart,
  titleAccent,
  description,

  clientsTitle,
  clientsDescription,

  projectsTitle,
  projectsDescription,

  tasksTitle,
  tasksDescription,

  inlineTitle,
  inlineDescription,
}: Props) {
  return (
    <section id="features" className="scroll-mt-20 bg-brand-ink text-brand-cream">
      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-28 lg:px-10 lg:py-36">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-lime">
              {eyebrow}
            </p>

            <h2 className="mt-4 max-w-4xl text-4xl font-semibold leading-[0.96] tracking-[-0.06em] sm:text-5xl lg:text-7xl">
              {titleStart}{' '}
              <span className="font-editorial font-normal italic text-brand-lime">
                {titleAccent}
              </span>
            </h2>
          </div>

          <p className="max-w-lg text-sm leading-6 text-white/90 sm:text-base sm:leading-7 lg:justify-self-end">
            {description}
          </p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-12">
          <article className="relative overflow-hidden rounded-[2rem] bg-brand-violet p-6 sm:p-8 lg:col-span-7 lg:min-h-[31rem]">
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-20 size-72 rounded-full border-[54px] border-white/10"
            />

            <div className="relative flex h-full flex-col">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/90">
                    01
                  </p>

                  <h3 className="mt-3 max-w-md text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
                    {clientsTitle}
                  </h3>

                  <p className="mt-4 max-w-md text-sm leading-6 text-white/60">
                    {clientsDescription}
                  </p>
                </div>

                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-brand-lime">
                  <Users aria-hidden="true" className="size-5" />
                </div>
              </div>

              <div className="mt-12 flex-1 rounded-[1.6rem] bg-brand-cream p-4 text-brand-ink sm:p-5">
                <div className="flex items-center justify-between border-b border-[#ded8ce] pb-4">
                  <div>
                    <p className="text-sm font-semibold">Clients</p>

                    <p className="mt-1 text-[10px] text-[#77736b]">
                      People behind the work
                    </p>
                  </div>

                  <span className="rounded-full bg-[#ece8ff] px-3 py-1.5 text-[10px] font-semibold text-brand-violet">
                    14 active
                  </span>
                </div>

                <FeatureClient
                  initial="A"
                  name="Acme Studio"
                  contact="Olivia Martin"
                  status="Active"
                />

                <FeatureClient
                  initial="N"
                  name="Northstar"
                  contact="Daniel Reed"
                  status="Active"
                />

                <FeatureClient
                  initial="V"
                  name="Vela Labs"
                  contact="Mia Costa"
                  status="Active"
                />
              </div>
            </div>
          </article>

          <article className="rounded-[2rem] bg-brand-lime p-6 text-brand-ink sm:p-8 lg:col-span-5">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-ink/45">
                  02
                </p>

                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.045em]">
                  {projectsTitle}
                </h3>

                <p className="mt-4 max-w-md text-sm leading-6 text-brand-ink/60">
                  {projectsDescription}
                </p>
              </div>

              <ArrowUpRight aria-hidden="true" className="size-5" />
            </div>

            <div className="mt-10 space-y-3">
              <FeatureProject
                name="Website redesign"
                client="Acme Studio"
                status="In progress"
                progress={72}
              />

              <FeatureProject
                name="Brand refresh"
                client="Northstar"
                status="Planning"
                progress={34}
              />

              <FeatureProject
                name="Mobile launch"
                client="Vela Labs"
                status="In progress"
                progress={58}
              />
            </div>
          </article>

          <article className="rounded-[2rem] bg-[#24221f] p-6 sm:p-8 lg:col-span-5">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
                  03
                </p>

                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.045em]">
                  {tasksTitle}
                </h3>

                <p className="mt-4 max-w-md text-sm leading-6 text-white/90">
                  {tasksDescription}
                </p>
              </div>

              <CalendarDays aria-hidden="true" className="size-5 text-brand-lime" />
            </div>

            <div className="mt-10 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5">
              <FeatureTask title="Review landing page" date="Today" urgent />

              <FeatureTask title="Send client presentation" date="Tomorrow" />

              <FeatureTask title="Validate final assets" date="Sep 18" />
            </div>
          </article>

          <article className="relative overflow-hidden rounded-[2rem] bg-brand-cream p-6 text-brand-ink sm:p-8 lg:col-span-7">
            <div
              aria-hidden="true"
              className="absolute right-8 top-8 size-3 rounded-full bg-brand-lime"
            />

            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-violet">
                  04
                </p>

                <h3 className="mt-3 max-w-lg text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
                  {inlineTitle}
                </h3>

                <p className="mt-4 max-w-lg text-sm leading-6 text-[#77736b]">
                  {inlineDescription}
                </p>
              </div>

              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#ece8ff] text-brand-violet">
                <PencilLine aria-hidden="true" className="size-5" />
              </div>
            </div>

            <div className="mt-10 rounded-[1.5rem] border border-[#ded8ce] bg-white p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ListFilter className="size-4 text-[#77736b]" />

                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#77736b]">
                    Project
                  </span>
                </div>

                <span className="text-[10px] text-[#77736b]">Status</span>
              </div>

              <div className="mt-4 flex items-center justify-between gap-4 rounded-xl bg-[#f6f3eb] p-3.5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">Website redesign</p>

                  <p className="mt-0.5 text-[10px] text-[#77736b]">Acme Studio</p>
                </div>

                <div className="flex shrink-0 items-center gap-2 rounded-full bg-[#d8ceff] px-3 py-1.5 text-[10px] font-semibold text-[#5526f9]">
                  <Circle className="size-1.5 fill-current stroke-none" />
                  In progress
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2 text-[10px] font-medium text-[#77736b]">
                <Check className="size-3.5 text-brand-violet" />
                Update status without leaving the table
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

function FeatureClient({
  initial,
  name,
  contact,
  status,
}: {
  initial: string
  name: string
  contact: string
  status: string
}) {
  return (
    <div className="flex items-center gap-3 border-b border-[#eeeae2] py-3.5 last:border-0 last:pb-0">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#ece8ff] text-xs font-bold text-brand-violet">
        {initial}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-semibold">{name}</p>

        <p className="mt-0.5 text-[9px] text-[#77736b]">{contact}</p>
      </div>

      <span className="text-[9px] font-semibold text-[#2d9b6f]">{status}</span>
    </div>
  )
}

function FeatureProject({
  name,
  client,
  status,
  progress,
}: {
  name: string
  client: string
  status: string
  progress: number
}) {
  return (
    <div className="rounded-[1.25rem] bg-brand-ink/10 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold">{name}</p>

          <p className="mt-1 text-[10px] text-brand-ink/50">{client}</p>
        </div>

        <span className="rounded-full bg-brand-ink px-2.5 py-1 text-[9px] font-semibold text-brand-cream">
          {status}
        </span>
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-brand-ink/10">
        <div
          className="h-full rounded-full bg-brand-ink"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

function FeatureTask({
  title,
  date,
  urgent,
}: {
  title: string
  date: string
  urgent?: boolean
}) {
  return (
    <div className="flex items-center gap-3 border-b border-white/10 px-4 py-4 last:border-0">
      <span
        className={
          urgent ? 'size-2 rounded-full bg-red-400' : 'size-2 rounded-full bg-brand-lime'
        }
      />

      <p className="min-w-0 flex-1 truncate text-xs font-semibold">{title}</p>

      <span
        className={
          urgent
            ? 'rounded-full bg-red-400/15 px-2.5 py-1 text-[9px] font-semibold text-red-300'
            : 'rounded-full bg-white/10 px-2.5 py-1 text-[9px] font-semibold text-white/90'
        }
      >
        {date}
      </span>
    </div>
  )
}
