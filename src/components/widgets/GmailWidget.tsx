import { Mail } from 'lucide-react'

const mockEmails = [
  { id: 1, from: 'João Silva', subject: 'Reunião amanhã às 10h', time: '09:30', unread: true },
  { id: 2, from: 'Maria Costa', subject: 'Relatório mensal pronto', time: '08:15', unread: true },
  { id: 3, from: 'GitHub', subject: 'New pull request #42', time: 'Ontem', unread: false },
  { id: 4, from: 'Newsletter', subject: 'As top 5 tendências de tech', time: 'Ontem', unread: false },
]

export default function GmailWidget() {
  return (
    <div className="card h-full flex flex-col" id="gmail-widget">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Mail size={16} className="text-red-400" />
          <h2 className="widget-title">Gmail</h2>
        </div>
        <span className="badge">2 novos</span>
      </div>
      <ul className="flex-1 space-y-1 overflow-auto min-h-0">
        {mockEmails.map((email) => (
          <li
            key={email.id}
            className="flex items-start gap-2 px-2 py-1.5 rounded-lg hover:bg-[var(--t-card-hover)] transition-colors cursor-pointer group"
          >
            <div
              className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                email.unread ? 'bg-[var(--t-accent)]' : 'bg-transparent'
              }`}
            />
            <div className="min-w-0 flex-1">
              <p
                className={`text-xs truncate ${
                  email.unread ? 'text-[var(--t-text)] font-medium' : 'text-[var(--t-text-secondary)]'
                }`}
              >
                {email.from}
              </p>
              <p className="text-[11px] text-[var(--t-text-muted)] truncate">
                {email.subject}
              </p>
            </div>
            <span className="text-[10px] text-[var(--t-text-muted)] flex-shrink-0 mt-0.5">
              {email.time}
            </span>
          </li>
        ))}
      </ul>
      <button className="ver-mais">Ver mais →</button>
    </div>
  )
}
