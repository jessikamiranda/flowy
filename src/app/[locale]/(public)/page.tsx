import { getTranslations } from 'next-intl/server'

import {
  LandingFeatures,
  LandingFinalCta,
  LandingFooter,
  LandingHeader,
  LandingHero,
  LandingWorkflow,
} from '@/features/landing/components'

export default async function HomePage() {
  const t = await getTranslations('general.landing')

  return (
    <main className="landing-theme min-h-screen bg-background text-foreground">
      <LandingHeader
        navigation={{
          product: t('navigation.product'),
          workflow: t('navigation.workflow'),
          features: t('navigation.features'),
        }}
        loginLabel={t('navigation.login')}
        ctaLabel={t('navigation.cta')}
      />

      <LandingHero
        eyebrow={t('hero.eyebrow')}
        titleStart={t('hero.titleStart')}
        titleAccent={t('hero.titleAccent')}
        titleEnd={t('hero.titleEnd')}
        description={t('hero.description')}
        primaryCta={t('hero.primaryCta')}
        secondaryCta={t('hero.secondaryCta')}
        note={t('hero.note')}
      />

      <LandingWorkflow
        eyebrow={t('workflow.eyebrow')}
        titleStart={t('workflow.titleStart')}
        titleAccent={t('workflow.titleAccent')}
        description={t('workflow.description')}
        clientLabel={t('workflow.client.label')}
        clientTitle={t('workflow.client.title')}
        clientDescription={t('workflow.client.description')}
        projectLabel={t('workflow.project.label')}
        projectTitle={t('workflow.project.title')}
        projectDescription={t('workflow.project.description')}
        taskLabel={t('workflow.task.label')}
        taskTitle={t('workflow.task.title')}
        taskDescription={t('workflow.task.description')}
        progressLabel={t('workflow.progress.label')}
        progressTitle={t('workflow.progress.title')}
        progressDescription={t('workflow.progress.description')}
      />

      <LandingFeatures
        eyebrow={t('features.eyebrow')}
        titleStart={t('features.titleStart')}
        titleAccent={t('features.titleAccent')}
        description={t('features.description')}
        clientsTitle={t('features.clients.title')}
        clientsDescription={t('features.clients.description')}
        projectsTitle={t('features.projects.title')}
        projectsDescription={t('features.projects.description')}
        tasksTitle={t('features.tasks.title')}
        tasksDescription={t('features.tasks.description')}
        inlineTitle={t('features.inline.title')}
        inlineDescription={t('features.inline.description')}
      />

      <LandingFinalCta
        eyebrow={t('finalCta.eyebrow')}
        titleStart={t('finalCta.titleStart')}
        titleAccent={t('finalCta.titleAccent')}
        description={t('finalCta.description')}
        ctaLabel={t('finalCta.cta')}
        note={t('finalCta.note')}
      />

      <LandingFooter
        tagline={t('footer.tagline')}
        productLabel={t('navigation.product')}
        workflowLabel={t('navigation.workflow')}
        featuresLabel={t('navigation.features')}
        loginLabel={t('navigation.login')}
        copyright={t('footer.copyright', {
          year: new Date().getFullYear(),
        })}
        creditLabel={t('footer.credit')}
        viewSourceLabel={t('footer.viewSource')}
        linkedinUrl="https://www.linkedin.com/in/jessika-miranda/"
        repositoryUrl="https://github.com/jessikamiranda/flowy"
      />
    </main>
  )
}
