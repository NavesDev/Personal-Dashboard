import { useState, useRef, type FormEvent, type KeyboardEvent } from 'react'
import { Search } from 'lucide-react'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(q)}`
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setQuery('')
      inputRef.current?.blur()
    }
  }

  return (
    <form onSubmit={handleSearch} id="search-bar" style={{ width: '100%' }}>
      <div className={`search-hero${focused ? ' search-hero--focused' : ''}`}>
        <Search
          size={16}
          style={{
            color: focused ? 'var(--t-accent)' : 'var(--t-text-muted)',
            flexShrink: 0,
            transition: 'color 0.2s',
          }}
        />
        <input
          ref={inputRef}
          autoFocus
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Pesquisar na web..."
          aria-label="Pesquisar no Google"
        />
        {query && (
          <button
            type="button"
            onClick={() => { setQuery(''); inputRef.current?.focus() }}
            style={{
              color: 'var(--t-text-muted)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              lineHeight: 1,
              padding: 0,
              flexShrink: 0,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--t-text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--t-text-muted)')}
          >
            ×
          </button>
        )}
      </div>
    </form>
  )
}
