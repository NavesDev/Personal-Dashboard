import { useState, type FormEvent } from 'react'
import { useStorage } from '@/hooks/useStorage'
import { Plus, X } from 'lucide-react'

export interface SpeedDialLink {
  id: string
  title: string
  url: string
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

function getFaviconUrl(url: string): string {
  try {
    const { hostname } = new URL(url)
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`
  } catch {
    return ''
  }
}

export default function SpeedDial() {
  const [links, setLinks, loaded] = useStorage<SpeedDialLink[]>('dashboard_speed_dial', [])
  const [isAdding, setIsAdding] = useState(false)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleAdd = (e: FormEvent) => {
    e.preventDefault()
    const trimmedTitle = title.trim()
    let trimmedUrl = url.trim()
    if (!trimmedTitle || !trimmedUrl) return
    if (!/^https?:\/\//i.test(trimmedUrl)) trimmedUrl = 'https://' + trimmedUrl
    setLinks((prev) => [...prev, { id: generateId(), title: trimmedTitle, url: trimmedUrl }])
    setTitle('')
    setUrl('')
    setIsAdding(false)
  }

  const handleRemove = (id: string) => {
    setLinks((prev) => prev.filter((l) => l.id !== id))
  }

  if (!loaded) return null

  return (
    <div id="speed-dial-widget">
      {/* Add form */}
      {isAdding && (
        <form onSubmit={handleAdd} className="flex gap-1.5 mb-3 justify-center" data-testid="speed-dial-form">
          <input
            autoFocus
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título"
            className="px-3 py-1.5 rounded-lg text-xs outline-none placeholder:text-[var(--t-text-muted)]"
            style={{
              background: 'var(--t-card)',
              border: '1px solid var(--t-border)',
              color: 'var(--t-text)',
              width: '120px',
            }}
          />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="URL"
            className="px-3 py-1.5 rounded-lg text-xs outline-none placeholder:text-[var(--t-text-muted)]"
            style={{
              background: 'var(--t-card)',
              border: '1px solid var(--t-border)',
              color: 'var(--t-text)',
              width: '160px',
            }}
          />
          <button
            type="submit"
            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
            style={{ background: 'var(--t-accent)', color: 'var(--t-accent-text)' }}
          >
            OK
          </button>
          <button
            type="button"
            onClick={() => setIsAdding(false)}
            className="px-2 py-1.5 rounded-lg text-xs transition-colors"
            style={{ color: 'var(--t-text-muted)', background: 'none', border: '1px solid var(--t-border)' }}
          >
            <X size={12} />
          </button>
        </form>
      )}

      {/* Links row */}
      <div className="speed-dial-inline">
        {links.map((link) => (
          <div key={link.id} className="relative group">
            <button
              onClick={() => handleRemove(link.id)}
              className="absolute -top-1.5 -right-1.5 z-10 w-4 h-4 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
              style={{ background: 'var(--t-danger)', color: '#fff' }}
              aria-label={`Remover ${link.title}`}
            >
              <X size={8} />
            </button>
            <a
              href={link.url}
              className="speed-dial-item"
            >
              <img
                src={getFaviconUrl(link.url)}
                alt=""
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
              <span>{link.title}</span>
            </a>
          </div>
        ))}

        {/* Add button */}
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="speed-dial-add"
            aria-label="Adicionar favorito"
          >
            <Plus size={14} />
          </button>
        )}
      </div>
    </div>
  )
}
