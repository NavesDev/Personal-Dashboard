import { useState, useEffect } from 'react'
import SearchBar from '@/components/SearchBar'
import QuickLinks from '@/components/QuickLinks'
import SpeedDial from '@/components/SpeedDial'
import Notes from '@/components/Notes'

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 6) return 'Boa madrugada'
  if (hour < 12) return 'Bom dia'
  if (hour < 18) return 'Boa tarde'
  return 'Boa noite'
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })
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

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 font-sans antialiased">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16 flex flex-col gap-10">
        {/* Clock & Greeting */}
        <header className="text-center space-y-1.5">
          <h1 className="text-6xl sm:text-7xl font-extralight tracking-tight text-neutral-100">
            {formatTime(now)}
          </h1>
          <p className="text-sm text-neutral-500 tracking-wide capitalize">
            {getGreeting()} &middot; {formatDate(now)}
          </p>
        </header>

        {/* Search */}
        <SearchBar />

        {/* Quick Links Grid */}
        <QuickLinks />

        {/* Speed Dial */}
        <SpeedDial />

        {/* Notes */}
        <div className="max-w-2xl mx-auto w-full">
          <Notes />
        </div>
      </div>
    </div>
  )
}
