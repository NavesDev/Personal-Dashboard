import { Newspaper } from 'lucide-react'

const mockNews = [
  { id: 1, title: 'IA generativa transforma mercado de trabalho em 2026', source: 'Folha', time: '2h' },
  { id: 2, title: 'Banco Central mantém Selic em 10,5% ao ano', source: 'G1', time: '4h' },
  { id: 3, title: 'Novo framework React Server Components ganha tração', source: 'Dev.to', time: '5h' },
  { id: 4, title: 'Brasil avança em energia renovável com recorde solar', source: 'Reuters', time: '6h' },
  { id: 5, title: 'Apple anuncia novo chip M4 Ultra para Mac Pro', source: 'MacRumors', time: '8h' },
  { id: 6, title: 'Startup brasileira levanta $50M em rodada série B', source: 'Valor', time: '10h' },
]

export default function NewsWidget() {
  return (
    <div className="card h-full" id="news-widget">
      <div className="widget-header">
        <div className="accent-bar" />
        <Newspaper size={12} style={{ color: 'var(--t-accent)' }} />
        <span className="widget-title">Notícias</span>
      </div>

      <div className="flex-1 min-h-0 overflow-auto space-y-0.5">
        {mockNews.map((n) => (
          <div key={n.id} className="widget-row" style={{ alignItems: 'flex-start', cursor: 'pointer' }}>
            {/* Gradient accent dot */}
            <div
              className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1 mr-2.5"
              style={{ background: 'var(--t-gradient)' }}
            />
            <div className="min-w-0 flex-1">
              <p
                className="text-[11px] line-clamp-2 leading-relaxed"
                style={{ color: 'var(--t-text)', lineHeight: '1.45' }}
              >
                {n.title}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[9px]" style={{ color: 'var(--t-accent)', fontWeight: 500 }}>
                  {n.source}
                </span>
                <span className="text-[9px]" style={{ color: 'var(--t-text-muted)' }}>
                  {n.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="ver-mais">ver mais →</button>
    </div>
  )
}
