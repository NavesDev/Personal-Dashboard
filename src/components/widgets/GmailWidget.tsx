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
          <div className="rounded-lg pt-1">
            <div className="flex items-center gap-1 mb-2">
              <span
                className="text-[10px] font-bold uppercase tracking-widest"
                style={{ background: 'var(--t-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                ✦ Resumo Inteligente
              </span>
            </div>
            <div
              className="text-sm leading-relaxed whitespace-pre-wrap markdown-content pr-2"
              style={{ color: 'var(--t-text)', lineHeight: 1.5 }}
            >
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-1 text-[13px] text-[var(--t-text-secondary)]">{children}</p>,
                  ul: ({ children }) => <ul className="mb-2 flex flex-col gap-1.5">{children}</ul>,
                  li: ({ children }) => (
                    <li className="flex items-start gap-2.5 text-[13px] text-[var(--t-text-secondary)]">
                      <span className="mt-[6px] w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--t-accent)', boxShadow: '0 0 4px var(--t-accent)' }} />
                      <span className="flex-1 leading-snug">{children}</span>
                    </li>
                  ),
                  strong: ({ children }) => <strong style={{ color: 'var(--t-text)' }} className="font-semibold">{children}</strong>,
                  h1: ({ children }) => <h1 className="font-bold text-base mb-1 mt-2 text-[var(--t-text)]">{children}</h1>,
                  h2: ({ children }) => <h2 className="font-bold text-[14px] mb-1 mt-2 text-[var(--t-text)]">{children}</h2>,
                  h3: ({ children }) => (
                    <h3 className="font-semibold text-[13px] mt-3 mb-1.5 pb-1 border-b border-[var(--t-border)] text-[var(--t-text)] tracking-wide">
                      {children}
                    </h3>
                  ),
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
