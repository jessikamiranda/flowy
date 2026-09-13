'use client'

import { LogOut } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { useRouter } from '@/i18n/navigation'
import { createClient } from '@/lib/supabase/client'

export function LogoutButton() {
  const t = useTranslations('general')
  const router = useRouter()

  const [isPending, setIsPending] = useState(false)

  async function handleLogout() {
    setIsPending(true)

    const supabase = createClient()

    await supabase.auth.signOut()

    router.replace('/login')
    router.refresh()
  }

  return (
    <Button
      type="button"
      variant="ghost"
      disabled={isPending}
      onClick={handleLogout}
      className="w-full justify-start"
    >
      <LogOut aria-hidden="true" />

      <span>{t('auth.logout')}</span>
    </Button>
  )
}
