import { CalendarDays } from 'lucide-react'

const mockEvents = [
  { id: 1, time: '09:00', title: 'Daily standup', colorVar: 'var(--t-accent)' },
  { id: 2, time: '10:30', title: 'Review de código', colorVar: 'var(--t-accent2)' },
  { id: 3, time: '14:00', title: 'Sprint planning', colorVar: 'var(--t-accent)' },
  { id: 4, time: '16:00', title: 'Mentoria técnica', colorVar: 'var(--t-accent2)' },
]

export default function AgendaWidget() {
  return (
    <div className="card h-full" id="agenda-widget">
      <div className="widget-header">
        <div className="accent-bar" />
        <CalendarDays size={12} style={{ color: 'var(--t-accent)' }} />
        <span className="widget-title">Agenda</span>
        <span className="badge">hoje</span>
      </div>

      <div className="flex-1 min-h-0 overflow-auto space-y-1">
        {mockEvents.map((ev) => (
          <div
            key={ev.id}
            className="widget-row"
            style={{
              borderLeft: `2px solid ${ev.colorVar}`,
              paddingLeft: '8px',
              borderRadius: '0 6px 6px 0',
            }}
          >
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-medium" style={{ color: 'var(--t-text)' }}>
                {ev.title}
              </p>
              <p className="text-[9px]" style={{ color: 'var(--t-text-muted)' }}>
                {ev.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button className="ver-mais">ver mais →</button>
    </div>
  )
}
