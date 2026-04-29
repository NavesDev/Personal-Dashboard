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

function formatDateFull(d: Date) {
  const raw = d.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
  return raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase()
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
      className="dashboard-root"
      style={{ background: 'var(--t-bg)', color: 'var(--t-text)', fontFamily: 'var(--font-sans)' }}
    >
      {/* Settings fab */}
      <button
        onClick={() => setSettingsOpen(true)}
        className="settings-fab"
        aria-label="Abrir configurações"
        id="settings-button"
      >
        <SettingsIcon size={15} />
      </button>

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="hero-section">
        <div className="hero-greeting animate-in">
          <span className="hero-time gradient-text">{formatTime(now)}</span>
          <h1 className="hero-salutation">{getGreeting()}</h1>
          <p className="hero-date">{formatDateFull(now)}</p>
        </div>

        <div className="hero-search animate-in" style={{ animationDelay: '50ms' }}>
          <SearchBar />
        </div>

        <div className="hero-speed-dial animate-in" style={{ animationDelay: '100ms' }}>
          <SpeedDial />
        </div>
      </section>

      {/* ── Widgets ───────────────────────────────────────────────── */}
      <main className="widget-grid animate-in" style={{ animationDelay: '150ms' }}>
        <div className="wg wg--mail"><GmailWidget /></div>
        <div className="wg wg--news"><NewsWidget /></div>
        <div className="wg wg--market"><InvestWidget /></div>
        <div className="wg wg--agenda"><AgendaWidget /></div>
        <div className="wg wg--notes"><Notes /></div>
      </main>

      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  )
}
