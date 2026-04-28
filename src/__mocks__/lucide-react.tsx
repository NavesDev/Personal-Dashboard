// Lightweight mock for lucide-react icons
// Returns simple div elements instead of SVGs

const createIcon = (name: string) => {
  const Icon = (_props: Record<string, unknown>) => null
  Icon.displayName = name
  return Icon
}

export const Search = createIcon('Search')
export const Mail = createIcon('Mail')
export const TrendingUp = createIcon('TrendingUp')
export const TrendingDown = createIcon('TrendingDown')
export const Newspaper = createIcon('Newspaper')
export const CalendarDays = createIcon('CalendarDays')
export const StickyNote = createIcon('StickyNote')
export const Plus = createIcon('Plus')
export const X = createIcon('X')
export const Globe = createIcon('Globe')
export const ExternalLink = createIcon('ExternalLink')
export const Star = createIcon('Star')
export const Settings = createIcon('Settings')
export const Palette = createIcon('Palette')
export const Key = createIcon('Key')

// Default export for named import compatibility
export default {}
