export interface ThemeColors {
  '--t-bg': string
  '--t-bg-alt': string
  '--t-surface': string        // slightly above bg
  '--t-card': string
  '--t-card-hover': string
  '--t-border': string
  '--t-border-hover': string
  '--t-text': string
  '--t-text-secondary': string
  '--t-text-muted': string
  '--t-accent': string
  '--t-accent-dim': string     // 20-30% opacity accent for backgrounds
  '--t-accent-hover': string
  '--t-accent-text': string
  '--t-accent2': string        // second accent, for gradients / variety
  '--t-gradient': string       // accent gradient used on special elements
  '--t-input': string
  '--t-input-border': string
  '--t-scrollbar': string
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
  /* ─────────────────────────────────────────────
     ZINC — Pure charcoal dark, cyan accent
     "the minimal hacker theme"
  ───────────────────────────────────────────── */
  {
    id: 'zinc',
    name: 'Zinc',
    mode: 'dark',
    emoji: '⬛',
    colors: {
      '--t-bg':             '#0d0d0f',
      '--t-bg-alt':         '#111114',
      '--t-surface':        '#17171b',
      '--t-card':           '#1c1c21',
      '--t-card-hover':     '#212126',
      '--t-border':         '#2a2a32',
      '--t-border-hover':   '#3a3a46',
      '--t-text':           '#e8e8ee',
      '--t-text-secondary': '#8c8c9e',
      '--t-text-muted':     '#4a4a5c',
      '--t-accent':         '#22d3ee',
      '--t-accent-dim':     '#22d3ee18',
      '--t-accent-hover':   '#67e8f9',
      '--t-accent-text':    '#0d0d0f',
      '--t-accent2':        '#818cf8',
      '--t-gradient':       'linear-gradient(135deg, #22d3ee, #818cf8)',
      '--t-input':          '#111114',
      '--t-input-border':   '#2a2a32',
      '--t-scrollbar':      '#2a2a32',
      '--t-danger':         '#f87171',
    },
  },
  /* ─────────────────────────────────────────────
     OBSIDIAN — Near-black + violet accent
     "premium & focused"
  ───────────────────────────────────────────── */
  {
    id: 'obsidian',
    name: 'Obsidian',
    mode: 'dark',
    emoji: '💜',
    colors: {
      '--t-bg':             '#09090e',
      '--t-bg-alt':         '#0e0e16',
      '--t-surface':        '#12121c',
      '--t-card':           '#16161f',
      '--t-card-hover':     '#1c1c28',
      '--t-border':         '#252535',
      '--t-border-hover':   '#383855',
      '--t-text':           '#e2e0f0',
      '--t-text-secondary': '#8880b0',
      '--t-text-muted':     '#44425a',
      '--t-accent':         '#a78bfa',
      '--t-accent-dim':     '#a78bfa18',
      '--t-accent-hover':   '#c4b5fd',
      '--t-accent-text':    '#0d0b1a',
      '--t-accent2':        '#f472b6',
      '--t-gradient':       'linear-gradient(135deg, #a78bfa, #f472b6)',
      '--t-input':          '#0e0e16',
      '--t-input-border':   '#252535',
      '--t-scrollbar':      '#252535',
      '--t-danger':         '#fb7185',
    },
  },
  /* ─────────────────────────────────────────────
     SLATE — Dark slate + emerald accent
     "focused productivity"
  ───────────────────────────────────────────── */
  {
    id: 'slate',
    name: 'Slate',
    mode: 'dark',
    emoji: '🟢',
    colors: {
      '--t-bg':             '#0b0f0e',
      '--t-bg-alt':         '#0f1412',
      '--t-surface':        '#141918',
      '--t-card':           '#191f1e',
      '--t-card-hover':     '#1f2624',
      '--t-border':         '#263030',
      '--t-border-hover':   '#344040',
      '--t-text':           '#dceee8',
      '--t-text-secondary': '#7fa898',
      '--t-text-muted':     '#3d5550',
      '--t-accent':         '#34d399',
      '--t-accent-dim':     '#34d39918',
      '--t-accent-hover':   '#6ee7b7',
      '--t-accent-text':    '#022c22',
      '--t-accent2':        '#38bdf8',
      '--t-gradient':       'linear-gradient(135deg, #34d399, #38bdf8)',
      '--t-input':          '#0f1412',
      '--t-input-border':   '#263030',
      '--t-scrollbar':      '#263030',
      '--t-danger':         '#f87171',
    },
  },
  /* ─────────────────────────────────────────────
     CARBON — Warm charcoal + amber accent
     "warm & professional"
  ───────────────────────────────────────────── */
  {
    id: 'carbon',
    name: 'Carbon',
    mode: 'dark',
    emoji: '🟠',
    colors: {
      '--t-bg':             '#0e0c0a',
      '--t-bg-alt':         '#131109',
      '--t-surface':        '#18160e',
      '--t-card':           '#1e1b12',
      '--t-card-hover':     '#252218',
      '--t-border':         '#302c1c',
      '--t-border-hover':   '#443c26',
      '--t-text':           '#f0e8d8',
      '--t-text-secondary': '#a89472',
      '--t-text-muted':     '#4e4232',
      '--t-accent':         '#f59e0b',
      '--t-accent-dim':     '#f59e0b18',
      '--t-accent-hover':   '#fbbf24',
      '--t-accent-text':    '#1a0f00',
      '--t-accent2':        '#ef4444',
      '--t-gradient':       'linear-gradient(135deg, #f59e0b, #ef4444)',
      '--t-input':          '#131109',
      '--t-input-border':   '#302c1c',
      '--t-scrollbar':      '#302c1c',
      '--t-danger':         '#ef4444',
    },
  },
  /* ─────────────────────────────────────────────
     PAPER — Light warm-white, ink accent
     "clean & editorial"
  ───────────────────────────────────────────── */
  {
    id: 'paper',
    name: 'Paper',
    mode: 'light',
    emoji: '📄',
    colors: {
      '--t-bg':             '#f6f4f0',
      '--t-bg-alt':         '#eeeae3',
      '--t-surface':        '#f9f7f4',
      '--t-card':           '#ffffff',
      '--t-card-hover':     '#faf9f7',
      '--t-border':         '#ddd8ce',
      '--t-border-hover':   '#bfb8ac',
      '--t-text':           '#1a1714',
      '--t-text-secondary': '#5a5248',
      '--t-text-muted':     '#a89e90',
      '--t-accent':         '#2563eb',
      '--t-accent-dim':     '#2563eb14',
      '--t-accent-hover':   '#3b82f6',
      '--t-accent-text':    '#ffffff',
      '--t-accent2':        '#7c3aed',
      '--t-gradient':       'linear-gradient(135deg, #2563eb, #7c3aed)',
      '--t-input':          '#ffffff',
      '--t-input-border':   '#ddd8ce',
      '--t-scrollbar':      '#ddd8ce',
      '--t-danger':         '#dc2626',
    },
  },
  /* ─────────────────────────────────────────────
     FROST — Cool light, ocean blue accent
     "airy & modern"
  ───────────────────────────────────────────── */
  {
    id: 'frost',
    name: 'Frost',
    mode: 'light',
    emoji: '❄️',
    colors: {
      '--t-bg':             '#f0f4f8',
      '--t-bg-alt':         '#e4ebf3',
      '--t-surface':        '#f7f9fb',
      '--t-card':           '#ffffff',
      '--t-card-hover':     '#f5f8fc',
      '--t-border':         '#c8d8e8',
      '--t-border-hover':   '#8aaac8',
      '--t-text':           '#0f1f2e',
      '--t-text-secondary': '#3d6080',
      '--t-text-muted':     '#7a9ab8',
      '--t-accent':         '#0ea5e9',
      '--t-accent-dim':     '#0ea5e914',
      '--t-accent-hover':   '#38bdf8',
      '--t-accent-text':    '#ffffff',
      '--t-accent2':        '#6366f1',
      '--t-gradient':       'linear-gradient(135deg, #0ea5e9, #6366f1)',
      '--t-input':          '#ffffff',
      '--t-input-border':   '#c8d8e8',
      '--t-scrollbar':      '#c8d8e8',
      '--t-danger':         '#dc2626',
    },
  },
]

export function getThemeById(id: string): Theme {
  return themes.find((t) => t.id === id) || themes[0]
}
