import { useState, type FormEvent } from 'react'
import { useStorage } from '@/hooks/useStorage'
import { Plus, X, Globe } from 'lucide-react'

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
    <div className="card" id="speed-dial-widget" style={{ minHeight: 0 }}>
      {/* Header */}
      <div className="widget-header">
        <div className="accent-bar" />
        <Globe size={12} style={{ color: 'var(--t-accent)' }} />
        <span className="widget-title">Favoritos</span>
        <button
          onClick={() => setIsAdding((p) => !p)}
          className="ml-auto flex items-center gap-1 transition-colors"
          style={{ fontSize: '10px', color: 'var(--t-text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
          aria-label={isAdding ? 'Cancelar' : 'Adicionar favorito'}
        >
          {isAdding ? <X size={11} /> : <Plus size={11} />}
          {isAdding ? 'Cancelar' : 'Novo'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="flex gap-1.5 mb-2" data-testid="speed-dial-form">
          <input
            autoFocus
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título"
            className="flex-1 min-w-0 px-2 py-1 rounded-md text-[10px] outline-none placeholder:text-[var(--t-text-muted)]"
            style={{
              background: 'var(--t-input)',
              border: '1px solid var(--t-input-border)',
              color: 'var(--t-text)',
            }}
          />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="URL"
            className="flex-1 min-w-0 px-2 py-1 rounded-md text-[10px] outline-none placeholder:text-[var(--t-text-muted)]"
            style={{
              background: 'var(--t-input)',
              border: '1px solid var(--t-input-border)',
              color: 'var(--t-text)',
            }}
          />
          <button
            type="submit"
            className="px-2.5 py-1 rounded-md text-[10px] font-semibold transition-colors"
            style={{ background: 'var(--t-accent)', color: 'var(--t-accent-text)' }}
          >
            OK
          </button>
        </form>
      )}

      {links.length > 0 ? (
        <div className="grid grid-cols-5 gap-1.5">
          {links.map((link) => (
            <div key={link.id} className="relative group">
              <button
                onClick={() => handleRemove(link.id)}
                className="absolute -top-1 -right-1 z-10 w-3.5 h-3.5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                style={{ background: 'var(--t-danger)', color: '#fff' }}
                aria-label={`Remover ${link.title}`}
              >
                <X size={7} />
              </button>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 p-1.5 rounded-lg transition-colors"
                style={{ background: 'transparent' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--t-card-hover)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <img
                  src={getFaviconUrl(link.url)}
                  alt=""
                  className="w-5 h-5 rounded-sm"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
                <span className="text-[9px] truncate max-w-full" style={{ color: 'var(--t-text-muted)' }}>
                  {link.title}
                </span>
              </a>
            </div>
          ))}
        </div>
      ) : (
        !isAdding && (
          <div className="flex items-center justify-center py-3">
            <p className="text-[9px]" style={{ color: 'var(--t-text-muted)' }}>Sem favoritos</p>
          </div>
        )
      )}
    </div>
  )
}
