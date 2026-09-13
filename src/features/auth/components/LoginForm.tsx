'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import { FormInput } from '@/components/form/FormInput/FormInput'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'

import { getLoginSchema } from '../schemas/login.schema'
import { AuthPage } from './AuthPage'

export function LoginForm() {
  const t = useTranslations('general')
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

  function onSubmit() {
    return undefined
  }

  return (
    <AuthPage>
      <h1 className="mb-4 text-4xl text-foreground md:text-5xl">
        {t('auth.welcomeBack')}
      </h1>

      <p className="mb-12 text-foreground">{t('auth.loginDescription')}</p>

      <form noValidate className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
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
          className="mt-4 h-14 w-full rounded-full py-4 font-bold duration-300"
        >
          {t('auth.form.loginButton')}
        </Button>
      </form>
    </AuthPage>
  )
}
