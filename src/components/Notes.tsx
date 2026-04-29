import { useState, useEffect, useRef, useCallback } from 'react'
import { useStorage } from '@/hooks/useStorage'
import { StickyNote } from 'lucide-react'

export default function Notes() {
  const [notes, setNotes, loaded] = useStorage<string>('dashboard_notes', '')
  const [localNotes, setLocalNotes] = useState('')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (loaded) setLocalNotes(notes)
  }, [loaded]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = useCallback(
    (value: string) => {
      setLocalNotes(value)
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => setNotes(value), 400)
    },
    [setNotes],
  )

  return (
    <div className="card" id="notes-widget" style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <div className="widget-header">
        <div className="accent-bar" />
        <StickyNote size={12} style={{ color: 'var(--t-accent)' }} />
        <span className="widget-title">Notas</span>
      </div>
      <textarea
        value={localNotes}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Escreva suas notas aqui..."
        aria-label="Notas"
        className="flex-1 min-h-0 resize-none rounded-lg placeholder:text-[var(--t-text-muted)] outline-none transition-colors duration-300"
        style={{
          background: 'var(--t-bg-alt)',
          border: '1px solid var(--t-border)',
          padding: '12px',
          color: 'var(--t-text)',
          fontSize: '14px',
          lineHeight: '1.5',
        }}
        onFocus={e => (e.target.style.borderColor = 'var(--t-border-hover)')}
        onBlur={e => (e.target.style.borderColor = 'var(--t-border)')}
      />
    </div>
  )
}
