import { Mail } from 'lucide-react'

const mockEmails = [
  { id: 1, from: 'João Silva', subject: 'Reunião amanhã às 10h', time: '09:30', unread: true },
  { id: 2, from: 'Maria Costa', subject: 'Relatório mensal pronto', time: '08:15', unread: true },
  { id: 3, from: 'GitHub', subject: 'New pull request #42', time: 'Ontem', unread: false },
  { id: 4, from: 'Newsletter', subject: 'As top 5 tendências de tech', time: 'Ontem', unread: false },
]

export default function GmailWidget() {
  return (
    <div className="card h-full" id="gmail-widget">
      <div className="widget-header">
        <div className="accent-bar" />
        <Mail size={12} style={{ color: 'var(--t-accent)' }} />
        <span className="widget-title">Gmail</span>
        <span className="badge">2</span>
      </div>

      <div className="flex-1 min-h-0 overflow-auto space-y-0.5">
        {mockEmails.map((email) => (
          <div key={email.id} className="widget-row">
            <div
              className="w-1.5 h-1.5 rounded-full flex-shrink-0 mr-2.5"
              style={{ background: email.unread ? 'var(--t-accent)' : 'transparent' }}
            />
            <div className="min-w-0 flex-1">
              <p
                className="text-[11px] truncate"
                style={{
                  color: email.unread ? 'var(--t-text)' : 'var(--t-text-secondary)',
                  fontWeight: email.unread ? 500 : 400,
                }}
              >
                {email.from}
              </p>
              <p className="text-[10px] truncate line-clamp-1" style={{ color: 'var(--t-text-muted)' }}>
                {email.subject}
              </p>
            </div>
            <span className="text-[9px] ml-2 flex-shrink-0" style={{ color: 'var(--t-text-muted)' }}>
              {email.time}
            </span>
          </div>
        ))}
      </div>
      <button className="ver-mais">ver mais →</button>
    </div>
  )
}
