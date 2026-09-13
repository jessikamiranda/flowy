import { getTranslations } from 'next-intl/server'

import { ThemeSwitcher } from '@/components/theme'

import { DataTableShowcase } from './_components/DataTableShowcase'
import { DialogShowcase } from './_components/DialogShowcase'
import { FiltersShowcase } from './_components/FiltersShowcase'
import { FormShowcase } from './_components/FormShowcase'
import { LayoutShowcase } from './_components/LayoutShowcase'
import { StatesShowcase } from './_components/StatesShowcase'

export default async function ComponentsPage() {
  const t = await getTranslations('general.showcase.page')

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight">{t('title')}</h1>

            <p className="max-w-2xl text-muted-foreground">{t('description')}</p>
          </div>

          <ThemeSwitcher />
        </div>

        <LayoutShowcase />

        <StatesShowcase />

        <FormShowcase />

        <FiltersShowcase />

        <DialogShowcase />

        <DataTableShowcase />
      </div>
    </main>
  )
}
