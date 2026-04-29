import ReactMarkdown from 'react-markdown'
import { Mail, RefreshCw, AlertCircle, Clock, Sparkles, ExternalLink } from 'lucide-react'
import { useGmailSummary } from '@/hooks/useGmailSummary'

export default function GmailWidget() {
  const { summary, emails, loading, error, lastFetched, refresh } = useGmailSummary()
  const unreadCount = emails.filter((e) => e.isUnread).length

  return (
    <div className="card" id="gmail-widget" style={{ height: '100%' }}>
      {/* Header */}
      <div className="wg-header">
        <div
          className="wg-header-icon"
          style={{ background: 'var(--t-accent-dim)', color: 'var(--t-accent)' }}
        >
          <Mail size={14} />
        </div>
        <div>
          <span className="wg-header-title">Gmail</span>
          {unreadCount > 0 && (
            <span className="wg-header-sub">· {unreadCount} não lidas</span>
          )}
        </div>
        <div className="wg-header-actions">
          <button
            onClick={refresh}
            disabled={loading}
            style={{
              color: 'var(--t-text-muted)',
              background: 'none',
              border: 'none',
              cursor: loading ? 'default' : 'pointer',
              opacity: loading ? 0.3 : 0.6,
              padding: '4px',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => !loading && (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => !loading && (e.currentTarget.style.opacity = '0.6')}
            title="Atualizar"
            aria-label="Atualizar emails"
          >
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="gmail-body">
        {/* Loading */}
        {loading && summary === null && (
          <div className="gmail-skeleton">
            <div className="gmail-skeleton-line" style={{ width: '80%' }} />
            <div className="gmail-skeleton-line" style={{ width: '100%' }} />
            <div className="gmail-skeleton-line" style={{ width: '60%' }} />
            <div className="gmail-skeleton-line" style={{ width: '90%' }} />
            <div className="gmail-skeleton-line" style={{ width: '45%' }} />
            <p style={{
              fontSize: '0.72rem',
              color: 'var(--t-text-muted)',
              textAlign: 'center',
              marginTop: '16px',
            }}>
              Gerando resumo inteligente…
            </p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="gmail-error">
            <div className="gmail-error-icon">
              <AlertCircle size={18} style={{ color: 'var(--t-accent)' }} />
            </div>
            <p>{error}</p>
          </div>
        )}

        {/* Summary */}
        {summary && (
          <>
            <div className="gmail-summary-label">
              <Sparkles size={10} />
              Resumo inteligente
            </div>
            <div className="md-prose">
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p>{children}</p>,
                  ul: ({ children }) => <ul>{children}</ul>,
                  li: ({ children }) => <li>{children}</li>,
                  strong: ({ children }) => <strong>{children}</strong>,
                  h1: ({ children }) => <h1>{children}</h1>,
                  h2: ({ children }) => <h2>{children}</h2>,
                  h3: ({ children }) => <h3>{children}</h3>,
                }}
              >
                {summary}
              </ReactMarkdown>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="gmail-footer">
        {lastFetched ? (
          <span className="gmail-footer-time">
            <Clock size={9} />
            Atualizado às {lastFetched.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
          </span>
        ) : (
          <span />
        )}
        {error ? (
          <button onClick={refresh} className="link-btn">Conectar Gmail →</button>
        ) : (
          <a
            href="https://mail.google.com/"
            target="_blank"
            rel="noreferrer"
            className="link-btn"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            Abrir Gmail <ExternalLink size={10} />
          </a>
        )}
      </div>
    </div>
  )
}
