import { useState, type FormEvent } from 'react'
import { useStorage } from '@/hooks/useStorage'
import { Plus, X, Globe, Star } from 'lucide-react'

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
  const [links, setLinks, loaded] = useStorage<SpeedDialLink[]>(
    'dashboard_speed_dial',
    [],
  )
  const [isAdding, setIsAdding] = useState(false)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleAdd = (e: FormEvent) => {
    e.preventDefault()
    const trimmedTitle = title.trim()
    let trimmedUrl = url.trim()
    if (!trimmedTitle || !trimmedUrl) return

    if (!/^https?:\/\//i.test(trimmedUrl)) {
      trimmedUrl = 'https://' + trimmedUrl
    }

    setLinks((prev) => [
      ...prev,
      { id: generateId(), title: trimmedTitle, url: trimmedUrl },
    ])
    setTitle('')
    setUrl('')
    setIsAdding(false)
  }

  const handleRemove = (id: string) => {
    setLinks((prev) => prev.filter((l) => l.id !== id))
  }

  if (!loaded) return null

  return (
    <div className="card h-full flex flex-col" id="speed-dial-widget">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Star size={16} className="text-yellow-400" />
          <h2 className="widget-title">Favoritos</h2>
        </div>
        <button
          onClick={() => setIsAdding((p) => !p)}
          className="flex items-center gap-1 text-[10px] text-[var(--t-text-muted)]
                     hover:text-[var(--t-text)] transition-colors px-1.5 py-0.5 rounded
                     hover:bg-[var(--t-card-hover)]"
          aria-label={isAdding ? 'Cancelar' : 'Adicionar favorito'}
        >
          {isAdding ? <X size={12} /> : <Plus size={12} />}
          {isAdding ? 'Cancelar' : 'Novo'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="mb-2 flex gap-1.5" data-testid="speed-dial-form">
          <input
            autoFocus
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título"
            className="flex-1 min-w-0 px-2 py-1.5 rounded-lg text-[11px]
                       bg-[var(--t-input)] border border-[var(--t-input-border)]
                       text-[var(--t-text)] placeholder:text-[var(--t-text-muted)]
                       outline-none focus:border-[var(--t-border-hover)]"
          />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="URL"
            className="flex-1 min-w-0 px-2 py-1.5 rounded-lg text-[11px]
                       bg-[var(--t-input)] border border-[var(--t-input-border)]
                       text-[var(--t-text)] placeholder:text-[var(--t-text-muted)]
                       outline-none focus:border-[var(--t-border-hover)]"
          />
          <button
            type="submit"
            className="px-2.5 py-1.5 rounded-lg text-[11px] font-medium
                       bg-[var(--t-accent)] text-[var(--t-accent-text)]
                       hover:bg-[var(--t-accent-hover)] transition-colors"
          >
            OK
          </button>
        </form>
      )}

      <div className="flex-1 overflow-auto min-h-0">
        {links.length > 0 ? (
          <div className="grid grid-cols-4 gap-1.5">
            {links.map((link) => (
              <div key={link.id} className="relative group">
                <button
                  onClick={() => handleRemove(link.id)}
                  className="absolute -top-1 -right-1 z-10 w-4 h-4 rounded-full
                             bg-[var(--t-border)] flex items-center justify-center
                             opacity-0 group-hover:opacity-100
                             hover:bg-[var(--t-danger)] hover:text-white
                             transition-all duration-200"
                  aria-label={`Remover ${link.title}`}
                >
                  <X size={8} />
                </button>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1 p-2 rounded-lg
                             hover:bg-[var(--t-card-hover)] transition-colors"
                >
                  <img
                    src={getFaviconUrl(link.url)}
                    alt=""
                    className="w-5 h-5 rounded-sm"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).style.display = 'none'
                    }}
                  />
                  <span className="text-[10px] text-[var(--t-text-secondary)] truncate max-w-full">
                    {link.title}
                  </span>
                </a>
              </div>
            ))}
          </div>
        ) : (
          !isAdding && (
            <div className="flex flex-col items-center justify-center h-full text-[var(--t-text-muted)]">
              <Globe size={20} className="opacity-40 mb-1" />
              <p className="text-[10px]">Sem favoritos</p>
            </div>
          )
        )}
      </div>
    </div>
  )
}
