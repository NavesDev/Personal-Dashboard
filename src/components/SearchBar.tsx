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
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto group">
      <div className="relative">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500
                     group-focus-within:text-neutral-300 transition-colors duration-300"
        />
        <input
          ref={inputRef}
          autoFocus
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Pesquisar no Google..."
          className="w-full py-3.5 pl-12 pr-4 rounded-2xl
                     bg-[#0e0e0e] border border-[#1a1a1a]
                     text-neutral-200 placeholder:text-neutral-600
                     outline-none
                     focus:border-[#2a2a2a] focus:ring-1 focus:ring-[#2a2a2a]
                     hover:border-[#222]
                     transition-all duration-300
                     text-[15px] tracking-wide"
        />
      </div>
    </form>
  )
}
