import { describe, expect, it } from 'vitest'

import { clientSchema } from './client.schema'

describe('clientSchema', () => {
  it('accepts valid client data', () => {
    const result = clientSchema.safeParse({
      name: 'Olivia Martin',
      company: 'Acme Studio',
      email: 'olivia@acme.com',
      phone: '+1 555 123 4567',
      status: 'active',
    })

    expect(result.success).toBe(true)
  })

  it('trims text fields', () => {
    const result = clientSchema.safeParse({
      name: '  Olivia Martin  ',
      company: '  Acme Studio  ',
      email: '  olivia@acme.com  ',
      phone: '  +1 555 123 4567  ',
      status: 'active',
    })

    expect(result.success).toBe(true)

    if (result.success) {
      expect(result.data).toEqual({
        name: 'Olivia Martin',
        company: 'Acme Studio',
        email: 'olivia@acme.com',
        phone: '+1 555 123 4567',
        status: 'active',
      })
    }
  })

  it('allows an empty email', () => {
    const result = clientSchema.safeParse({
      name: 'Olivia Martin',
      company: 'Acme Studio',
      email: '',
      phone: '',
      status: 'inactive',
    })

    expect(result.success).toBe(true)
  })

  it('rejects an invalid email', () => {
    const result = clientSchema.safeParse({
      name: 'Olivia Martin',
      company: 'Acme Studio',
      email: 'not-an-email',
      phone: '',
      status: 'active',
    })

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: ['email'],
          }),
        ]),
      )
    }
  })

  it('requires a name and company', () => {
    const result = clientSchema.safeParse({
      name: '',
      company: '',
      email: '',
      phone: '',
      status: 'active',
    })

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: ['name'],
          }),
          expect.objectContaining({
            path: ['company'],
          }),
        ]),
      )
    }
  })
})
