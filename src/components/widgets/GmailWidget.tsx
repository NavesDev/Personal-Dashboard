import ReactMarkdown from 'react-markdown'
import { Mail, RefreshCw, AlertCircle, Clock } from 'lucide-react'
import { useGmailSummary } from '@/hooks/useGmailSummary'

export default function GmailWidget() {
  const { summary, emails, loading, error, lastFetched, refresh } = useGmailSummary()

  const unreadCount = emails.filter((e) => e.isUnread).length

  return (
    <div className="card h-full min-h-0" id="gmail-widget">
      {/* Header */}
      <div className="widget-header">
        <div className="accent-bar" />
        <Mail size={12} style={{ color: 'var(--t-accent)' }} />
        <span className="widget-title">Gmail</span>
        {unreadCount > 0 && <span className="badge">{unreadCount}</span>}

        <button
          onClick={refresh}
          disabled={loading}
          className="ml-auto transition-all"
          style={{
            color: 'var(--t-text-muted)',
            background: 'none',
            border: 'none',
            cursor: loading ? 'default' : 'pointer',
            opacity: loading ? 0.4 : 1,
            padding: 0,
          }}
          title="Atualizar agora"
          aria-label="Atualizar emails"
        >
          <RefreshCw size={11} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 min-h-0 overflow-auto flex flex-col gap-1.5">

        {/* Loading skeleton */}
        {loading && summary === null && (
          <div className="flex flex-col gap-2 pt-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-1 px-1.5">
                <div
                  className="h-3 w-3/4 rounded animate-pulse"
                  style={{ background: 'var(--t-border)' }}
                />
                <div
                  className="h-2.5 w-full rounded animate-pulse"
                  style={{ background: 'var(--t-border)', opacity: 0.6 }}
                />
              </div>
            ))}
            <p className="text-xs text-center mt-2" style={{ color: 'var(--t-text-muted)' }}>
              Buscando emails e gerando resumo...
            </p>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div
            className="flex flex-col items-center justify-center gap-2 flex-1 py-4 px-2 rounded-lg text-center"
            style={{ background: 'var(--t-accent-dim)' }}
          >
            <AlertCircle size={18} style={{ color: 'var(--t-danger)' }} />
            <p className="text-xs" style={{ color: 'var(--t-danger)', lineHeight: 1.4 }}>
              {error}
            </p>
          </div>
        )}

        {/* AI Summary */}
        {summary && (
          <div
            className="rounded-lg p-3"
            style={{ background: 'var(--t-accent-dim)' }}
          >
            <div className="flex items-center gap-1 mb-2">
              <span
                className="text-[10px] font-bold uppercase tracking-widest"
                style={{ background: 'var(--t-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                ✦ Resumo Inteligente
              </span>
            </div>
            <div
              className="text-sm leading-relaxed whitespace-pre-wrap markdown-content"
              style={{ color: 'var(--t-text)', lineHeight: 1.6 }}
            >
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
                  li: ({ children }) => <li>{children}</li>,
                  strong: ({ children }) => <strong style={{ color: 'var(--t-accent)' }} className="font-semibold">{children}</strong>,
                  h1: ({ children }) => <h1 className="font-bold text-base mb-1">{children}</h1>,
                  h2: ({ children }) => <h2 className="font-bold text-sm mb-1">{children}</h2>,
                  h3: ({ children }) => <h3 className="font-semibold text-sm mb-1">{children}</h3>,
                }}
              >
                {summary}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-2 flex-shrink-0">
        {lastFetched && (
          <span
            className="flex items-center gap-1 text-[9px]"
            style={{ color: 'var(--t-text-muted)' }}
            title={`Cache expira em ${new Date(lastFetched.getTime() + 3600000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`}
          >
            <Clock size={8} />
            {lastFetched.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
        {error ? (
          <button onClick={refresh} className="ver-mais" style={{ marginTop: 0 }}>Conectar Gmail →</button>
        ) : (
          <a href="https://mail.google.com/" target="_blank" rel="noreferrer" className="ver-mais" style={{ marginTop: 0, textDecoration: 'none' }}>
            Abrir Gmail →
          </a>
        )}
      </div>
    </div>
  )
}
