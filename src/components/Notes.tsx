import { useState, useEffect, useRef, useCallback } from 'react'
import { useStorage } from '@/hooks/useStorage'
import { StickyNote } from 'lucide-react'

export default function Notes() {
  const [notes, setNotes, loaded] = useStorage<string>('dashboard_notes', '')
  const [localNotes, setLocalNotes] = useState('')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Hydrate local state once storage loads
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
    <div
      className="rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a]
                    p-5 flex flex-col gap-3 h-full"
    >
      <div className="flex items-center gap-2.5">
        <StickyNote size={18} className="text-amber-400/80" />
        <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-widest">
          Notas
        </h2>
      </div>

      <textarea
        value={localNotes}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Escreva suas notas aqui..."
        className="flex-1 min-h-[140px] resize-none rounded-xl
                   bg-[#0e0e0e] border border-[#1a1a1a] p-4
                   text-neutral-300 placeholder:text-neutral-600
                   text-sm leading-relaxed
                   outline-none focus:border-[#2a2a2a]
                   transition-colors duration-300"
      />
    </div>
  )
}
