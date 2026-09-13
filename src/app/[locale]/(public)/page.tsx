import { appConfig } from '@/config/app'

export default function HomePage() {
  return <main>{appConfig.name}</main>
}
