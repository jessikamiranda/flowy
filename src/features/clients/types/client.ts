export type ClientStatus = 'active' | 'inactive'

export type Client = {
  id: string
  name: string
  company: string
  email: string | null
  phone: string | null
  status: ClientStatus
  created_at: string
  updated_at: string
}
