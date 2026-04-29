import { describe, it, expect } from 'vitest'
import { themes, getThemeById } from '@/themes'

describe('themes', () => {
  it('exports at least 6 themes', () => {
    expect(themes.length).toBeGreaterThanOrEqual(6)
  })

  it('has unique IDs for every theme', () => {
    const ids = themes.map((t) => t.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('contains both light and dark themes', () => {
    const modes = new Set(themes.map((t) => t.mode))
    expect(modes.has('light')).toBe(true)
    expect(modes.has('dark')).toBe(true)
  })

  it('every theme has all required color tokens', () => {
    const requiredKeys = [
      '--t-bg', '--t-bg-alt', '--t-surface', '--t-card', '--t-card-hover',
      '--t-border', '--t-border-hover', '--t-text', '--t-text-secondary',
      '--t-text-muted', '--t-accent', '--t-accent-dim', '--t-accent-hover',
      '--t-accent-text', '--t-accent2', '--t-gradient',
      '--t-input', '--t-input-border', '--t-scrollbar', '--t-danger',
    ]
    for (const theme of themes) {
      for (const key of requiredKeys) {
        expect(theme.colors, `${theme.id} missing ${key}`).toHaveProperty(key)
        expect(theme.colors[key as keyof typeof theme.colors], `${theme.id}.${key} is empty`).toBeTruthy()
      }
    }
  })

  it('every theme has a name, emoji, and mode', () => {
    for (const theme of themes) {
      expect(theme.name).toBeTruthy()
      expect(theme.emoji).toBeTruthy()
      expect(['light', 'dark']).toContain(theme.mode)
    }
  })

  it('first theme is zinc (default)', () => {
    expect(themes[0].id).toBe('zinc')
  })

  describe('getThemeById', () => {
    it('returns the correct theme by ID', () => {
      const result = getThemeById('obsidian')
      expect(result.id).toBe('obsidian')
      expect(result.name).toBe('Obsidian')
    })

    it('returns zinc as fallback for unknown ID', () => {
      const result = getThemeById('nonexistent-theme')
      expect(result.id).toBe('zinc')
    })
  })
})
