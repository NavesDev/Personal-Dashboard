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
      debounceRef.current = setTimeout(() => {
        setNotes(value)
      }, 400)
    },
    [setNotes],
  )

  return (
    <div className="card h-full flex flex-col" id="notes-widget">
      <div className="flex items-center gap-2 mb-3">
        <StickyNote size={16} className="text-amber-400" />
        <h2 className="widget-title">Notas</h2>
      </div>
      <textarea
        value={localNotes}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Escreva suas notas aqui..."
        aria-label="Notas"
        className="flex-1 min-h-0 resize-none rounded-lg
                   bg-[var(--t-input)] border border-[var(--t-input-border)] p-3
                   text-[var(--t-text)] placeholder:text-[var(--t-text-muted)]
                   text-xs leading-relaxed
                   outline-none focus:border-[var(--t-border-hover)]
                   transition-colors duration-300"
      />
    </div>
  )
}
