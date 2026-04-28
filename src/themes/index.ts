export interface ThemeColors {
  '--t-bg': string
  '--t-bg-alt': string
  '--t-card': string
  '--t-card-hover': string
  '--t-border': string
  '--t-border-hover': string
  '--t-text': string
  '--t-text-secondary': string
  '--t-text-muted': string
  '--t-accent': string
  '--t-accent-hover': string
  '--t-accent-text': string
  '--t-input': string
  '--t-input-border': string
  '--t-scrollbar': string
  '--t-scrollbar-hover': string
  '--t-danger': string
}

export interface Theme {
  id: string
  name: string
  mode: 'light' | 'dark'
  emoji: string
  colors: ThemeColors
}

export const themes: Theme[] = [
  {
    id: 'midnight-ocean',
    name: 'Midnight Ocean',
    mode: 'dark',
    emoji: '🌊',
    colors: {
      '--t-bg': '#080e1a',
      '--t-bg-alt': '#0c1425',
      '--t-card': '#101c30',
      '--t-card-hover': '#142240',
      '--t-border': '#1a2d4a',
      '--t-border-hover': '#234272',
      '--t-text': '#e2e8f0',
      '--t-text-secondary': '#94a3b8',
      '--t-text-muted': '#4a6382',
      '--t-accent': '#3b82f6',
      '--t-accent-hover': '#60a5fa',
      '--t-accent-text': '#ffffff',
      '--t-input': '#0c1628',
      '--t-input-border': '#1a2d4a',
      '--t-scrollbar': '#1a2d4a',
      '--t-scrollbar-hover': '#234272',
      '--t-danger': '#ef4444',
    },
  },
  {
    id: 'aurora',
    name: 'Aurora Boreal',
    mode: 'dark',
    emoji: '🌌',
    colors: {
      '--t-bg': '#080f0d',
      '--t-bg-alt': '#0c1612',
      '--t-card': '#111f1a',
      '--t-card-hover': '#172b24',
      '--t-border': '#1b3328',
      '--t-border-hover': '#264a3a',
      '--t-text': '#d1ede4',
      '--t-text-secondary': '#7fb8a4',
      '--t-text-muted': '#3d7360',
      '--t-accent': '#34d399',
      '--t-accent-hover': '#6ee7b7',
      '--t-accent-text': '#022c22',
      '--t-input': '#0a1610',
      '--t-input-border': '#1b3328',
      '--t-scrollbar': '#1b3328',
      '--t-scrollbar-hover': '#264a3a',
      '--t-danger': '#f87171',
    },
  },
  {
    id: 'volcanic',
    name: 'Vulcânico',
    mode: 'dark',
    emoji: '🌋',
    colors: {
      '--t-bg': '#0c0806',
      '--t-bg-alt': '#110d09',
      '--t-card': '#1a140f',
      '--t-card-hover': '#231b14',
      '--t-border': '#2e2318',
      '--t-border-hover': '#3d2f20',
      '--t-text': '#f5e6d3',
      '--t-text-secondary': '#c4a882',
      '--t-text-muted': '#6b5439',
      '--t-accent': '#f59e0b',
      '--t-accent-hover': '#fbbf24',
      '--t-accent-text': '#1a0f00',
      '--t-input': '#120d08',
      '--t-input-border': '#2e2318',
      '--t-scrollbar': '#2e2318',
      '--t-scrollbar-hover': '#3d2f20',
      '--t-danger': '#ef4444',
    },
  },
  {
    id: 'cloud',
    name: 'Nuvem',
    mode: 'light',
    emoji: '☁️',
    colors: {
      '--t-bg': '#f1f5f9',
      '--t-bg-alt': '#e8edf3',
      '--t-card': '#ffffff',
      '--t-card-hover': '#f8fafc',
      '--t-border': '#cbd5e1',
      '--t-border-hover': '#94a3b8',
      '--t-text': '#0f172a',
      '--t-text-secondary': '#475569',
      '--t-text-muted': '#94a3b8',
      '--t-accent': '#2563eb',
      '--t-accent-hover': '#3b82f6',
      '--t-accent-text': '#ffffff',
      '--t-input': '#ffffff',
      '--t-input-border': '#cbd5e1',
      '--t-scrollbar': '#cbd5e1',
      '--t-scrollbar-hover': '#94a3b8',
      '--t-danger': '#dc2626',
    },
  },
  {
    id: 'sakura',
    name: 'Sakura',
    mode: 'light',
    emoji: '🌸',
    colors: {
      '--t-bg': '#fdf2f4',
      '--t-bg-alt': '#fbe8ec',
      '--t-card': '#ffffff',
      '--t-card-hover': '#fef7f8',
      '--t-border': '#f2c4cf',
      '--t-border-hover': '#e8899e',
      '--t-text': '#2d0a16',
      '--t-text-secondary': '#7a2845',
      '--t-text-muted': '#c47a92',
      '--t-accent': '#e11d48',
      '--t-accent-hover': '#f43f5e',
      '--t-accent-text': '#ffffff',
      '--t-input': '#ffffff',
      '--t-input-border': '#f2c4cf',
      '--t-scrollbar': '#f2c4cf',
      '--t-scrollbar-hover': '#e8899e',
      '--t-danger': '#be123c',
    },
  },
  {
    id: 'mint',
    name: 'Hortelã',
    mode: 'light',
    emoji: '🍃',
    colors: {
      '--t-bg': '#ecfdf5',
      '--t-bg-alt': '#d5f5e8',
      '--t-card': '#ffffff',
      '--t-card-hover': '#f0fdf4',
      '--t-border': '#a7f3d0',
      '--t-border-hover': '#6ee7b7',
      '--t-text': '#022c22',
      '--t-text-secondary': '#065f46',
      '--t-text-muted': '#6bbf9e',
      '--t-accent': '#059669',
      '--t-accent-hover': '#10b981',
      '--t-accent-text': '#ffffff',
      '--t-input': '#ffffff',
      '--t-input-border': '#a7f3d0',
      '--t-scrollbar': '#a7f3d0',
      '--t-scrollbar-hover': '#6ee7b7',
      '--t-danger': '#dc2626',
    },
  },
]

export function getThemeById(id: string): Theme {
  return themes.find((t) => t.id === id) || themes[0]
}
