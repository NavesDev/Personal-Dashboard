import { useState, useEffect } from 'react'
import { Settings as SettingsIcon } from 'lucide-react'
import SearchBar from '@/components/SearchBar'
import GmailWidget from '@/components/widgets/GmailWidget'
import InvestWidget from '@/components/widgets/InvestWidget'
import NewsWidget from '@/components/widgets/NewsWidget'
import AgendaWidget from '@/components/widgets/AgendaWidget'
import SpeedDial from '@/components/SpeedDial'
import Notes from '@/components/Notes'
import SettingsModal from '@/components/Settings'

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 6) return 'Boa madrugada'
  if (hour < 12) return 'Bom dia'
  if (hour < 18) return 'Boa tarde'
  return 'Boa noite'
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}

export default function App() {
  const [now, setNow] = useState(new Date())
  const [settingsOpen, setSettingsOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="h-screen overflow-hidden bg-[var(--t-bg)] text-[var(--t-text)] font-sans antialiased flex flex-col p-4 gap-3">
      {/* Header: Clock + Search + Settings */}
      <header className="flex items-center gap-4 flex-shrink-0">
        <div className="flex items-baseline gap-3 flex-shrink-0">
          <h1 className="text-3xl font-extralight tracking-tight text-[var(--t-text)]">
            {formatTime(now)}
          </h1>
          <p className="text-xs text-[var(--t-text-muted)] capitalize hidden sm:block">
            {getGreeting()} · {formatDate(now)}
          </p>
        </div>

        <div className="flex-1 max-w-xl">
          <SearchBar />
        </div>

        <button
          onClick={() => setSettingsOpen(true)}
          className="p-2 rounded-lg text-[var(--t-text-muted)] hover:text-[var(--t-text)]
                     hover:bg-[var(--t-card)] transition-colors flex-shrink-0"
          aria-label="Abrir configurações"
          id="settings-button"
        >
          <SettingsIcon size={18} />
        </button>
      </header>

      {/* Dashboard Grid: 3 cols × 2 rows */}
      <main className="flex-1 min-h-0 grid grid-cols-3 grid-rows-2 gap-3">
        <GmailWidget />
        <InvestWidget />
        <NewsWidget />
        <AgendaWidget />
        <SpeedDial />
        <Notes />
      </main>

      {/* Settings Modal */}
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  )
}
