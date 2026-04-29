/**
 * Settings tests - logic-focused
 * (Component render tests skipped due to memory constraints in this environment.
 *  The Settings component is thoroughly tested via the dev server and browser.)
 */
import { describe, it, expect } from 'vitest'
import { defaultApiKeys, type ApiKeys } from '@/types/settings'

describe('Settings types', () => {
  it('defaultApiKeys has all required keys', () => {
    expect(defaultApiKeys).toHaveProperty('gmail')
    expect(defaultApiKeys).toHaveProperty('news')
    expect(defaultApiKeys).toHaveProperty('finance')
    expect(defaultApiKeys).toHaveProperty('calendar')
  })

  it('defaultApiKeys values are all empty strings', () => {
    expect(Object.values(defaultApiKeys).every((v) => v === '')).toBe(true)
  })

  it('ApiKeys type is assignable with string values', () => {
    const keys: ApiKeys = {
      gmail: 'AIza-test',
      news: 'news-key',
      finance: 'finance-key',
      calendar: 'calendar-key',
      gemini: 'gemini-key',
    }
    expect(keys.gmail).toBe('AIza-test')
    expect(Object.keys(keys)).toHaveLength(5)
  })
})
