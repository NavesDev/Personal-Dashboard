import { CalendarDays } from 'lucide-react'

const mockEvents = [
  { id: 1, time: '09:00', title: 'Daily standup', color: 'bg-sky-400' },
  { id: 2, time: '10:30', title: 'Review de código', color: 'bg-violet-400' },
  { id: 3, time: '14:00', title: 'Sprint planning', color: 'bg-emerald-400' },
  { id: 4, time: '16:00', title: 'Mentoria técnica', color: 'bg-amber-400' },
]

export default function AgendaWidget() {
  return (
    <div className="card h-full flex flex-col" id="agenda-widget">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <CalendarDays size={16} className="text-violet-400" />
          <h2 className="widget-title">Agenda</h2>
        </div>
        <span className="badge">Hoje</span>
      </div>
      <ul className="flex-1 space-y-1 overflow-auto min-h-0">
        {mockEvents.map((ev) => (
          <li
            key={ev.id}
            className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-[var(--t-card-hover)] transition-colors cursor-pointer"
          >
            <div className={`w-1 h-6 rounded-full ${ev.color} flex-shrink-0 opacity-70`} />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-[var(--t-text)] truncate">{ev.title}</p>
              <p className="text-[10px] text-[var(--t-text-muted)]">{ev.time}</p>
            </div>
          </li>
        ))}
      </ul>
      <button className="ver-mais">Ver mais →</button>
    </div>
  )
}
