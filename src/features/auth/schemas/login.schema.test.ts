import { describe, expect, it } from 'vitest'

import { getLoginSchema } from './login.schema'

const schema = getLoginSchema({
  required: 'Required field',
  invalidEmail: 'Invalid email',
})

describe('loginSchema', () => {
  it('accepts valid login data', () => {
    const result = schema.safeParse({
      email: 'jessika@example.com',
      password: '12345678',
    })

    expect(result.success).toBe(true)
  })

  it('rejects an invalid email', () => {
    const result = schema.safeParse({
      email: 'invalid-email',
      password: '12345678',
    })

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: ['email'],
            message: 'Invalid email',
          }),
        ]),
      )
    }
  })

  it('requires a password', () => {
    const result = schema.safeParse({
      email: 'jessika@example.com',
      password: '',
    })

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: ['password'],
            message: 'Required field',
          }),
        ]),
      )
    }
  })
})
