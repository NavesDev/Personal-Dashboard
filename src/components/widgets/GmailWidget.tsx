import { Mail, RefreshCw, AlertCircle, Clock } from 'lucide-react'
import { useGmailSummary } from '@/hooks/useGmailSummary'

/** Shortens an email address / display name */
function shortSender(from: string): string {
  // "John Doe <john@example.com>" → "John Doe"
  const match = from.match(/^([^<]+)/)
  if (match) return match[1].trim().replace(/"/g, '')
  return from.split('@')[0]
}

/** "Mon, 28 Apr 2025 10:30:00 -0300" → "10:30" or "Ontem" */
function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr)
    const now = new Date()
    const isToday =
      d.getDate() === now.getDate() &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()

    if (isToday) return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

    const yesterday = new Date(now)
    yesterday.setDate(now.getDate() - 1)
    if (
      d.getDate() === yesterday.getDate() &&
      d.getMonth() === yesterday.getMonth() &&
      d.getFullYear() === yesterday.getFullYear()
    )
      return 'Ontem'

    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
  } catch {
    return ''
  }
}

export default function GmailWidget() {
  const { summary, emails, loading, error, lastFetched, refresh } = useGmailSummary()

  const unreadCount = emails.filter((e) => e.isUnread).length

  return (
    <div className="card h-full" id="gmail-widget">
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
        {loading && emails.length === 0 && (
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
              {error.includes('auth') || error.includes('token')
                ? 'Autorize o acesso ao Gmail clicando em Atualizar ↗'
                : error}
            </p>
            <button
              onClick={refresh}
              className="text-xs px-3 py-1 rounded-lg transition-colors"
              style={{ background: 'var(--t-accent)', color: 'var(--t-accent-text)' }}
            >
              Tentar novamente
            </button>
          </div>
        )}

        {/* AI Summary */}
        {summary && !loading && (
          <div
            className="rounded-lg p-2.5 flex-shrink-0"
            style={{ background: 'var(--t-accent-dim)', border: '1px solid var(--t-border)' }}
          >
            <div className="flex items-center gap-1 mb-1.5">
              <span
                className="text-[9px] font-bold uppercase tracking-widest"
                style={{ background: 'var(--t-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                ✦ Resumo IA
              </span>
            </div>
            <p
              className="text-xs leading-relaxed"
              style={{ color: 'var(--t-text-secondary)', lineHeight: 1.55 }}
            >
              {summary}
            </p>
          </div>
        )}

        {/* Email list */}
        {emails.length > 0 && (
          <div className="space-y-0.5 flex-shrink-0">
            {emails.slice(0, 5).map((email) => (
              <div key={email.id} className="widget-row">
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0 mr-2"
                  style={{ background: email.isUnread ? 'var(--t-accent)' : 'transparent' }}
                />
                <div className="min-w-0 flex-1">
                  <p
                    className="text-sm truncate"
                    style={{
                      color: email.isUnread ? 'var(--t-text)' : 'var(--t-text-secondary)',
                      fontWeight: email.isUnread ? 500 : 400,
                    }}
                  >
                    {shortSender(email.from)}
                  </p>
                  <p className="text-xs truncate" style={{ color: 'var(--t-text-muted)' }}>
                    {email.subject}
                  </p>
                </div>
                <span className="text-xs ml-2 flex-shrink-0" style={{ color: 'var(--t-text-muted)' }}>
                  {formatDate(email.date)}
                </span>
              </div>
            ))}
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
        <button className="ver-mais" style={{ marginTop: 0 }}>ver mais →</button>
      </div>
    </div>
  )
}
