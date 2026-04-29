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
      <div
        className="flex items-center gap-2 rounded-lg transition-all duration-200"
        style={{
          background: focused ? 'var(--t-card)' : 'var(--t-bg-alt)',
          border: `1px solid ${focused ? 'var(--t-border-hover)' : 'var(--t-border)'}`,
          padding: '0 10px',
          height: '30px',
        }}
      >
        <Search
          size={13}
          style={{ color: focused ? 'var(--t-accent)' : 'var(--t-text-muted)', flexShrink: 0, transition: 'color 0.2s' }}
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
          placeholder="Pesquisar..."
          aria-label="Pesquisar no Google"
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontSize: '12px',
            color: 'var(--t-text)',
            flex: 1,
            minWidth: 0,
          }}
          // @ts-ignore — placeholder color via CSS custom property
          className="placeholder:text-[var(--t-text-muted)]"
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
              fontSize: '14px',
              lineHeight: 1,
              padding: 0,
              flexShrink: 0,
            }}
          >
            ×
          </button>
        )}
      </div>
    </form>
  )
}
