import Image from 'next/image'

import { appConfig } from '@/config/app'

export function AuthImageSection() {
  return (
    <div className="relative hidden w-1/2 overflow-hidden lg:block">
      <Image
        src={appConfig.auth.imageUrl}
        alt=""
        fill
        sizes="50vw"
        className="object-cover"
        priority
      />
    </div>
  )
}
