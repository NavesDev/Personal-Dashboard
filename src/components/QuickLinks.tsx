import { Mail, TrendingUp, Newspaper, CalendarDays, StickyNote } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface QuickCard {
  label: string
  icon: LucideIcon
  url: string
  accent: string // tailwind text color
}

const cards: QuickCard[] = [
  {
    label: 'Gmail',
    icon: Mail,
    url: 'https://mail.google.com',
    accent: 'text-red-400',
  },
  {
    label: 'Investimentos',
    icon: TrendingUp,
    url: 'https://www.google.com/finance',
    accent: 'text-emerald-400',
  },
  {
    label: 'Notícias',
    icon: Newspaper,
    url: 'https://news.google.com',
    accent: 'text-sky-400',
  },
  {
    label: 'Agenda',
    icon: CalendarDays,
    url: 'https://calendar.google.com',
    accent: 'text-violet-400',
  },
  {
    label: 'Notas',
    icon: StickyNote,
    url: 'https://keep.google.com',
    accent: 'text-amber-400',
  },
]

export default function QuickLinks() {
  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-2xl mx-auto">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <a
            key={card.label}
            href={card.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center gap-2.5
                       rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a]
                       py-6 px-4
                       hover:border-[#2a2a2a] hover:bg-[#0e0e0e]
                       transition-all duration-300
                       focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#333]"
          >
            <Icon
              size={24}
              className={`${card.accent} opacity-70 group-hover:opacity-100
                         group-hover:scale-110 transition-all duration-300`}
            />
            <span
              className="text-xs font-medium text-neutral-500
                         group-hover:text-neutral-300 transition-colors duration-300
                         tracking-wide"
            >
              {card.label}
            </span>
          </a>
        )
      })}
    </div>
  )
}
