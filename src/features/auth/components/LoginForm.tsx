'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { FormInput } from '@/components/form/FormInput/FormInput'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { useRouter } from '@/i18n/navigation'
import { createClient } from '@/lib/supabase/client'

import { getLoginSchema } from '../schemas/login.schema'
import { AuthPage } from './AuthPage'

export function LoginForm() {
  const t = useTranslations('general')
  const router = useRouter()

  const loginSchema = getLoginSchema({
    required: t('fieldMessages.required'),
    invalidEmail: t('fieldMessages.invalidEmail'),
  })

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: { email: string; password: string }) {
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    })

    if (error) {
      if (error.code === 'invalid_credentials') {
        toast.error(t('auth.form.invalidCredentials'))
        return
      }

      toast.error(t('auth.form.loginError'))
      return
    }

    router.replace('/dashboard')
    router.refresh()
  }

  return (
    <AuthPage>
      <div className="mb-9">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
          {t('auth.form.eyebrow')}
        </p>

        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.055em] text-foreground sm:text-5xl">
          {t('auth.welcomeBack')}
        </h1>

        <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
          {t('auth.loginDescription')}
        </p>
      </div>

      <form noValidate className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <FormInput
            control={control}
            name="email"
            label={t('auth.form.email')}
            placeholder={t('auth.form.emailPlaceholder')}
            type="email"
            autoComplete="email"
          />

          <FormInput
            control={control}
            name="password"
            label={t('auth.form.password')}
            placeholder="••••••••"
            type="password"
            autoComplete="current-password"
            passwordVisibilityLabels={{
              show: t('auth.form.showPassword'),
              hide: t('auth.form.hidePassword'),
            }}
          />
        </FieldGroup>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full rounded-xl font-semibold shadow-none"
        >
          {t('auth.form.loginButton')}
        </Button>
      </form>

      <div className="mt-8 flex items-center gap-3">
        <div className="h-px flex-1 bg-border/70" />

        <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          Flowy
        </span>

        <div className="h-px flex-1 bg-border/70" />
      </div>

      <p className="mt-5 text-center text-xs leading-5 text-muted-foreground">
        {t('auth.form.workspaceHint')}
      </p>
    </AuthPage>
  )
}
