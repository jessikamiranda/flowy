'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

type QueryValue = string | number | boolean | null | undefined

type Options = {
  resetQueryKeys?: string[]
}

const EMPTY_KEYS: string[] = []

export function useQueryFilters({ resetQueryKeys = EMPTY_KEYS }: Options = {}) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const replaceQuery = useCallback(
    (updates: Record<string, QueryValue>) => {
      const params = new URLSearchParams(searchParams.toString())

      for (const key of resetQueryKeys) {
        if (!(key in updates)) {
          params.delete(key)
        }
      }

      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === undefined || value === '') {
          params.delete(key)
          continue
        }

        params.set(key, String(value))
      }

      const query = params.toString()

      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      })
    },
    [pathname, resetQueryKeys, router, searchParams],
  )

  const setQueryValue = useCallback(
    (key: string, value: QueryValue) => {
      replaceQuery({
        [key]: value,
      })
    },
    [replaceQuery],
  )

  const clearQueryValues = useCallback(
    (keys: string[]) => {
      replaceQuery(Object.fromEntries(keys.map((key) => [key, null])))
    },
    [replaceQuery],
  )

  const getQueryValue = useCallback(
    (key: string) => {
      return searchParams.get(key) ?? ''
    },
    [searchParams],
  )

  return {
    searchParams,

    getQueryValue,
    setQueryValue,
    replaceQuery,
    clearQueryValues,
  }
}
