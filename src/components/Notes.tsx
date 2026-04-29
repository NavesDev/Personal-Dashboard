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
    <div className="card" id="notes-widget">
      <div className="wg-header">
        <div
          className="wg-header-icon"
          style={{ background: 'var(--t-accent-dim)', color: 'var(--t-accent)' }}
        >
          <StickyNote size={14} />
        </div>
        <span className="wg-header-title">Notas rápidas</span>
      </div>
      <textarea
        value={localNotes}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Escreva suas notas aqui…"
        aria-label="Notas"
        className="notes-textarea"
      />
    </div>
  )
}
