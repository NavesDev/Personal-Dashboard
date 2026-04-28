import { Newspaper } from 'lucide-react'

const mockNews = [
  { id: 1, title: 'IA generativa transforma mercado de trabalho em 2026', source: 'Folha', time: '2h' },
  { id: 2, title: 'Banco Central mantém Selic em 10,5% ao ano', source: 'G1', time: '4h' },
  { id: 3, title: 'Novo framework React Server Components ganha tração', source: 'Dev.to', time: '5h' },
  { id: 4, title: 'Brasil avança em energia renovável com recorde solar', source: 'Reuters', time: '6h' },
]

export default function NewsWidget() {
  return (
    <div className="card h-full flex flex-col" id="news-widget">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Newspaper size={16} className="text-sky-400" />
          <h2 className="widget-title">Notícias</h2>
        </div>
      </div>
      <ul className="flex-1 space-y-1.5 overflow-auto min-h-0">
        {mockNews.map((n) => (
          <li
            key={n.id}
            className="px-2 py-1.5 rounded-lg hover:bg-[var(--t-card-hover)] transition-colors cursor-pointer group"
          >
            <p className="text-xs text-[var(--t-text)] group-hover:text-[var(--t-accent)] transition-colors line-clamp-2 leading-relaxed">
              {n.title}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] text-[var(--t-text-muted)]">{n.source}</span>
              <span className="text-[10px] text-[var(--t-text-muted)]">· {n.time}</span>
            </div>
          </li>
        ))}
      </ul>
      <button className="ver-mais">Ver mais →</button>
    </div>
  )
}
