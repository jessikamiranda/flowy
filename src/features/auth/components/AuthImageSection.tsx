'use client'

import { CheckCircle2, FolderKanban, ListTodo, Users } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export function AuthImageSection() {
  const t = useTranslations('general.auth.brandPanel')

  return (
    <div className="relative hidden min-h-0 flex-1 overflow-hidden rounded-[2rem] bg-brand-violet text-brand-cream lg:flex lg:flex-col">
      <div
        aria-hidden="true"
        className="absolute -top-28 -right-20 size-80 rounded-full border-[56px] border-white/10"
      />

      <div
        aria-hidden="true"
        className="absolute top-44 right-20 size-7 rounded-full bg-brand-lime"
      />

      <div
        aria-hidden="true"
        className="absolute right-40 bottom-20 size-32 rounded-full bg-black/10 blur-2xl"
      />

      <div className="relative z-10 flex h-full flex-col p-8 xl:p-10">
        <Image
          src="/brand/logo-color-white.svg"
          alt="Flowy"
          width={120}
          height={35}
          priority
          className="h-8 w-auto self-start"
        />

        <div className="mt-auto max-w-xl pb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90">
            {t('eyebrow')}
          </p>

          <h2 className="mt-5 text-[clamp(2.75rem,4vw,4.75rem)] font-semibold leading-[0.94] tracking-[-0.065em]">
            {t('titleStart')}{' '}
            <span className="font-editorial font-normal italic text-brand-lime">
              {t('titleAccent')}
            </span>
          </h2>

          <p className="mt-6 max-w-md text-sm leading-6 text-white/90">
            {t('description')}
          </p>

          <div className="mt-10 grid grid-cols-2 gap-3">
            <div className="rounded-[1.4rem] border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex size-9 items-center justify-center rounded-xl bg-white/10">
                  <ListTodo aria-hidden="true" className="size-4 text-brand-lime" />
                </div>

                <span className="text-3xl font-semibold tracking-[-0.05em]">08</span>
              </div>

              <p className="mt-5 text-xs font-medium text-white/90">{t('openTasks')}</p>
            </div>

            <div className="rounded-[1.4rem] border border-white/10 bg-brand-lime p-4 text-brand-ink">
              <div className="flex items-center justify-between">
                <div className="flex size-9 items-center justify-center rounded-xl bg-brand-ink/10">
                  <FolderKanban aria-hidden="true" className="size-4" />
                </div>

                <CheckCircle2 aria-hidden="true" className="size-5" />
              </div>

              <p className="mt-5 text-xl font-semibold tracking-[-0.04em]">
                {t('projectsOnTrack')}
              </p>
            </div>

            <div className="col-span-2 flex items-center justify-between rounded-[1.4rem] border border-white/10 bg-brand-ink/20 px-4 py-3.5">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-xl bg-white/10">
                  <Users aria-hidden="true" className="size-4" />
                </div>

                <div>
                  <p className="text-sm font-semibold">{t('clients')}</p>

                  <p className="mt-0.5 text-xs text-white/90">
                    {t('clientsDescription')}
                  </p>
                </div>
              </div>

              <div className="flex -space-x-2">
                <span className="size-8 rounded-full border-2 border-brand-violet bg-[#f2b7c3]" />
                <span className="size-8 rounded-full border-2 border-brand-violet bg-[#9fd6cc]" />
                <span className="size-8 rounded-full border-2 border-brand-violet bg-[#d7c1ff]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
