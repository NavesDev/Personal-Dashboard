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
  const h = new Date().getHours()
  if (h < 6) return 'Boa madrugada'
  if (h < 12) return 'Bom dia'
  if (h < 18) return 'Boa tarde'
  return 'Boa noite'
}

function formatTime(d: Date) {
  return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

function formatDateShort(d: Date) {
  return d.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' })
}

export default function App() {
  const [now, setNow] = useState(new Date())
  const [settingsOpen, setSettingsOpen] = useState(false)

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div
      className="h-screen overflow-hidden flex flex-col"
      style={{ background: 'var(--t-bg)', color: 'var(--t-text)', fontFamily: 'var(--font-sans)' }}
    >
      {/* ── Header ─────────────────────────────────────────────────── */}
      <header
        className="flex-shrink-0 flex items-center gap-3 px-4"
        style={{
          height: '48px',
          background: 'var(--t-surface)',
          borderBottom: '1px solid var(--t-border)',
        }}
      >
        {/* Clock */}
        <div className="flex items-baseline gap-2 flex-shrink-0">
          <span
            className="text-xl font-semibold tabular-nums tracking-tight gradient-text"
          >
            {formatTime(now)}
          </span>
          <span className="text-[10px] hidden sm:block" style={{ color: 'var(--t-text-muted)' }}>
            {getGreeting()} · {formatDateShort(now)}
          </span>
        </div>

        {/* Divider */}
        <div className="h-5 w-px flex-shrink-0" style={{ background: 'var(--t-border)' }} />

        {/* Search — takes remaining space */}
        <div className="flex-1 min-w-0">
          <SearchBar />
        </div>

        {/* Settings */}
        <button
          onClick={() => setSettingsOpen(true)}
          className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-lg transition-colors"
          style={{ color: 'var(--t-text-muted)' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--t-card)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          aria-label="Abrir configurações"
          id="settings-button"
        >
          <SettingsIcon size={15} />
        </button>
      </header>

      {/* ── Grid ───────────────────────────────────────────────────── */}
      <main
        className="flex-1 min-h-0 p-3 gap-3"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1.15fr 0.85fr',
          gridTemplateRows: '1fr 1fr',
        }}
      >
        {/* Gmail — spans 2 rows, col 1 */}
        <div style={{ gridRow: '1 / 3', gridColumn: '1 / 2', minHeight: 0 }}>
          <GmailWidget />
        </div>

        {/* Notícias — row 1, col 2 */}
        <div style={{ gridRow: '1 / 2', gridColumn: '2 / 3', minHeight: 0 }}>
          <NewsWidget />
        </div>

        {/* Investimentos — row 2, col 2 */}
        <div style={{ gridRow: '2 / 3', gridColumn: '2 / 3', minHeight: 0 }}>
          <InvestWidget />
        </div>

        {/* Agenda — row 1, col 3 */}
        <div style={{ gridRow: '1 / 2', gridColumn: '3 / 4', minHeight: 0 }}>
          <AgendaWidget />
        </div>

        {/* Favoritos + Notas stacked — row 2, col 3 */}
        <div
          className="gap-3 min-h-0"
          style={{ display: 'grid', gridTemplateRows: 'auto 1fr', gridRow: '2 / 3', gridColumn: '3 / 4' }}
        >
          <SpeedDial />
          <Notes />
        </div>
      </main>

      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  )
}
