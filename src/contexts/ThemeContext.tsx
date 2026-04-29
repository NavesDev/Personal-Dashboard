import { createContext, useContext, useEffect, type ReactNode } from 'react'
import { useStorage } from '@/hooks/useStorage'
import { themes, getThemeById, type Theme } from '@/themes'

interface ThemeContextValue {
  theme: Theme
  setThemeId: (id: string) => void
  allThemes: Theme[]
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useStorage('dashboard_theme', 'zinc')
  const theme = getThemeById(themeId)

  useEffect(() => {
    const root = document.documentElement
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
    root.dataset.mode = theme.mode
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setThemeId, allThemes: themes }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
