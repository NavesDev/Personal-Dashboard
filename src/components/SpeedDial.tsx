import { useState, type FormEvent } from 'react'
import { useStorage } from '@/hooks/useStorage'
import { Plus, X, Globe, ExternalLink } from 'lucide-react'

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

    // Auto-prepend protocol
    if (!/^https?:\/\//i.test(trimmedUrl)) {
      trimmedUrl = 'https://' + trimmedUrl
    }

    const newLink: SpeedDialLink = {
      id: generateId(),
      title: trimmedTitle,
      url: trimmedUrl,
    }

    setLinks((prev) => [...prev, newLink])
    setTitle('')
    setUrl('')
    setIsAdding(false)
  }

  const handleRemove = (id: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== id))
  }

  if (!loaded) return null

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-widest">
          Favoritos
        </h2>
        <button
          onClick={() => setIsAdding((p) => !p)}
          className="flex items-center gap-1.5 text-xs text-neutral-500
                     hover:text-neutral-300 transition-colors duration-200
                     px-2.5 py-1.5 rounded-lg hover:bg-[#111]"
        >
          {isAdding ? (
            <>
              <X size={14} /> Cancelar
            </>
          ) : (
            <>
              <Plus size={14} /> Adicionar
            </>
          )}
        </button>
      </div>

      {/* Add Form */}
      {isAdding && (
        <form
          onSubmit={handleAdd}
          className="mb-4 p-4 rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a]
                     flex flex-col sm:flex-row gap-3 animate-in fade-in duration-200"
        >
          <input
            autoFocus
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título"
            className="flex-1 px-3.5 py-2.5 rounded-xl
                       bg-[#0e0e0e] border border-[#1a1a1a]
                       text-neutral-300 placeholder:text-neutral-600
                       text-sm outline-none focus:border-[#2a2a2a]
                       transition-colors duration-200"
          />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="URL (ex: github.com)"
            className="flex-1 px-3.5 py-2.5 rounded-xl
                       bg-[#0e0e0e] border border-[#1a1a1a]
                       text-neutral-300 placeholder:text-neutral-600
                       text-sm outline-none focus:border-[#2a2a2a]
                       transition-colors duration-200"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl text-sm font-medium
                       bg-white/5 border border-[#1a1a1a]
                       text-neutral-300 hover:bg-white/10 hover:border-[#2a2a2a]
                       transition-all duration-200"
          >
            Salvar
          </button>
        </form>
      )}

      {/* Links Grid */}
      {links.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {links.map((link) => (
            <div key={link.id} className="relative group">
              {/* Remove button */}
              <button
                onClick={() => handleRemove(link.id)}
                className="absolute -top-1.5 -right-1.5 z-10
                           w-5 h-5 rounded-full bg-[#1a1a1a] border border-[#2a2a2a]
                           flex items-center justify-center
                           opacity-0 group-hover:opacity-100
                           hover:bg-red-500/20 hover:border-red-500/40
                           transition-all duration-200"
                title="Remover"
              >
                <X size={10} className="text-neutral-400 group-hover:text-red-400" />
              </button>

              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-2
                           rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a]
                           py-5 px-3
                           hover:border-[#2a2a2a] hover:bg-[#0e0e0e]
                           transition-all duration-300
                           focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#333]"
              >
                <img
                  src={getFaviconUrl(link.url)}
                  alt=""
                  className="w-6 h-6 rounded-sm opacity-70 group-hover:opacity-100
                             transition-opacity duration-300"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextElementSibling?.classList.remove('hidden')
                  }}
                />
                <Globe
                  size={20}
                  className="hidden text-neutral-500 group-hover:text-neutral-300
                             transition-colors duration-300"
                />
                <span
                  className="text-xs text-neutral-500 group-hover:text-neutral-300
                             transition-colors duration-300 truncate max-w-full
                             tracking-wide"
                >
                  {link.title}
                </span>
                <ExternalLink
                  size={12}
                  className="absolute top-2.5 right-2.5 text-neutral-700
                             group-hover:text-neutral-500 transition-colors duration-300"
                />
              </a>
            </div>
          ))}
        </div>
      ) : (
        !isAdding && (
          <div
            className="rounded-2xl border border-dashed border-[#1a1a1a]
                       py-10 flex flex-col items-center gap-2 text-neutral-600"
          >
            <Globe size={28} className="opacity-40" />
            <p className="text-sm">Nenhum favorito ainda</p>
            <button
              onClick={() => setIsAdding(true)}
              className="mt-1 text-xs text-neutral-500 hover:text-neutral-300
                         transition-colors underline underline-offset-2"
            >
              Adicionar o primeiro
            </button>
          </div>
        )
      )}
    </div>
  )
}
