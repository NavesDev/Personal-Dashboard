import { useState, useRef, type FormEvent, type KeyboardEvent } from 'react'
import { Search } from 'lucide-react'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(trimmed)}`
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setQuery('')
      inputRef.current?.blur()
    }
  }

  return (
    <form onSubmit={handleSearch} id="search-bar" className="w-full group">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2
                     text-[var(--t-text-muted)] group-focus-within:text-[var(--t-text-secondary)]
                     transition-colors duration-300"
        />
        <input
          ref={inputRef}
          autoFocus
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Pesquisar no Google..."
          aria-label="Pesquisar no Google"
          className="w-full py-2.5 pl-10 pr-4 rounded-xl
                     bg-[var(--t-input)] border border-[var(--t-input-border)]
                     text-[var(--t-text)] placeholder:text-[var(--t-text-muted)]
                     outline-none
                     focus:border-[var(--t-border-hover)] focus:ring-1 focus:ring-[var(--t-border-hover)]
                     hover:border-[var(--t-border-hover)]
                     transition-all duration-300
                     text-sm tracking-wide"
        />
      </div>
    </form>
  )
}
