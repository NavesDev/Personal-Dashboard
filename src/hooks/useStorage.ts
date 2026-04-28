import { useState, useEffect, useCallback } from 'react'
import { storage } from '@/services/storage'

/**
 * React hook that syncs state with chrome.storage.local (or localStorage in dev).
 * Provides get/set abstraction with automatic hydration on mount.
 */
export function useStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    storage.get<T>(key, initialValue).then((stored) => {
      setValue(stored)
      setLoaded(true)
    })
  }, [key]) // eslint-disable-line react-hooks/exhaustive-deps

  const setStoredValue = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved =
          typeof newValue === 'function'
            ? (newValue as (prev: T) => T)(prev)
            : newValue
        storage.set(key, resolved)
        return resolved
      })
    },
    [key],
  )

  return [value, setStoredValue, loaded] as const
}
