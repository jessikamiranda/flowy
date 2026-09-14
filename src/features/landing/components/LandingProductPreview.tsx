import {
  Check,
  Circle,
  FolderKanban,
  LayoutDashboard,
  ListTodo,
  Users,
} from 'lucide-react'

export function LandingProductPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[1180px]">
      <div className="overflow-hidden rounded-[1.75rem] border border-white/15 bg-[#171614] shadow-[0_40px_100px_rgb(27_26_24/0.22)]">
        <div className="flex min-h-[430px] sm:min-h-[520px]">
          <aside className="hidden w-52 shrink-0 border-r border-white/10 bg-[#1d1c19] p-4 text-white md:block">
            <div className="mb-8 flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-[10px] bg-brand-violet">
                <span className="size-3 rounded-full bg-brand-lime" />
              </div>

              <span className="text-sm font-semibold">flowy</span>
            </div>

            <div className="space-y-1">
              <PreviewNavigationItem icon={LayoutDashboard} label="Dashboard" active />

              <PreviewNavigationItem icon={Users} label="Clients" />

              <PreviewNavigationItem icon={FolderKanban} label="Projects" />

              <PreviewNavigationItem icon={ListTodo} label="Tasks" />
            </div>
          </aside>

          <div className="min-w-0 flex-1 bg-[#f6f3eb] p-4 text-brand-ink sm:p-7 lg:p-9">
            <div className="mb-8">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-brand-violet">
                Workspace overview
              </p>

              <h3 className="mt-2 text-xl font-semibold tracking-[-0.05em] sm:text-3xl">
                Keep work{' '}
                <span className="font-editorial font-normal italic text-brand-violet">
                  moving.
                </span>
              </h3>
            </div>

            <div className="grid gap-3 lg:grid-cols-[1.3fr_0.7fr]">
              <div className="relative overflow-hidden rounded-[1.4rem] bg-brand-ink p-5 text-brand-cream">
                <div className="absolute -top-16 -right-12 size-40 rounded-full bg-brand-violet" />

                <div className="relative">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/45">
                    Workload
                  </p>

                  <p className="mt-6 text-4xl font-semibold tracking-[-0.06em] sm:mt-8 sm:text-5xl"></p>

                  <p className="mt-1 text-xs text-white/90">Open tasks</p>

                  <div className="mt-8 flex gap-2">
                    <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] text-white/90">
                      3 due soon
                    </span>

                    <span className="rounded-full bg-brand-lime px-3 py-1.5 text-[10px] font-semibold text-brand-ink">
                      All on track
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
                <PreviewMetric label="Active projects" value="06" />

                <PreviewMetric label="Clients" value="14" />
              </div>
            </div>

            <div className="mt-3 rounded-[1.4rem] border border-[#ddd8ce] bg-[#fffefb] p-3 sm:p-4">
              <div className="flex items-center justify-between border-b border-[#e8e3da] pb-3">
                <div>
                  <p className="text-xs font-semibold">Upcoming tasks</p>

                  <p className="mt-0.5 text-[9px] text-[#77736b]">
                    What needs attention next
                  </p>
                </div>

                <span className="text-[9px] font-semibold text-brand-violet">
                  View all ↗
                </span>
              </div>

              <PreviewTask
                title="Review landing page"
                project="Website redesign"
                priority="High"
              />

              <PreviewTask
                title="Prepare client presentation"
                project="Brand refresh"
                priority="Medium"
              />

              <PreviewTask
                title="Validate final assets"
                project="Mobile launch"
                priority="Low"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute -right-4 -bottom-5 size-16 rounded-full bg-brand-lime sm:-right-6 sm:size-20"
      />
    </div>
  )
}

type NavigationItemProps = {
  icon: typeof LayoutDashboard
  label: string
  active?: boolean
}

function PreviewNavigationItem({ icon: Icon, label, active }: NavigationItemProps) {
  return (
    <div
      className={
        active
          ? 'flex items-center gap-3 rounded-xl bg-white/10 px-3 py-2.5 text-xs font-semibold text-white'
          : 'flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium text-white/45'
      }
    >
      <Icon className="size-3.5" />
      {label}
    </div>
  )
}

function PreviewMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.4rem] border border-[#ddd8ce] bg-[#fffefb] p-4">
      <div className="flex size-7 items-center justify-center rounded-lg bg-[#ece8ff] text-brand-violet">
        <Check className="size-3.5" />
      </div>

      <p className="mt-5 text-3xl font-semibold tracking-[-0.05em]">{value}</p>

      <p className="mt-1 text-[10px] text-[#77736b]">{label}</p>
    </div>
  )
}

function PreviewTask({
  title,
  project,
  priority,
}: {
  title: string
  project: string
  priority: string
}) {
  return (
    <div className="flex items-center gap-3 border-b border-[#eeeae2] py-3 last:border-0 last:pb-0">
      <Circle className="size-2 fill-brand-violet stroke-none text-brand-violet" />

      <div className="min-w-0 flex-1">
        <p className="truncate text-[11px] font-semibold">{title}</p>

        <p className="mt-0.5 truncate text-[9px] text-[#77736b]">{project}</p>
      </div>

      <span className="hidden rounded-full bg-[#ece8ff] px-2 py-1 text-[9px] font-semibold text-brand-violet sm:block">
        {priority}
      </span>
    </div>
  )
}
