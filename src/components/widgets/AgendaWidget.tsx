import { CalendarDays } from 'lucide-react'

const mockEvents = [
  { id: 1, time: '09:00', title: 'Daily standup', color: 'var(--t-accent)' },
  { id: 2, time: '10:30', title: 'Review de código', color: 'var(--t-accent2)' },
  { id: 3, time: '14:00', title: 'Sprint planning', color: 'var(--t-accent)' },
  { id: 4, time: '16:00', title: 'Mentoria técnica', color: 'var(--t-accent2)' },
]

export default function AgendaWidget() {
  return (
    <div className="card" id="agenda-widget">
      <div className="wg-header">
        <div
          className="wg-header-icon"
          style={{ background: 'var(--t-accent-dim)', color: 'var(--t-accent)' }}
        >
          <CalendarDays size={14} />
        </div>
        <span className="wg-header-title">Agenda</span>
        <div className="wg-header-actions">
          <span className="badge">hoje</span>
        </div>
      </div>

      <div className="agenda-list">
        {mockEvents.map((ev) => (
          <div key={ev.id} className="agenda-item">
            <div className="agenda-dot" style={{ background: ev.color }} />
            <div className="agenda-item-content">
              <div className="agenda-title">{ev.title}</div>
              <div className="agenda-time">{ev.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
