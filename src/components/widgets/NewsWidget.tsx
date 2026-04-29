import { Newspaper } from 'lucide-react'

const mockNews = [
  { id: 1, title: 'IA generativa transforma mercado de trabalho em 2026', source: 'Folha', time: '2h' },
  { id: 2, title: 'Banco Central mantém Selic em 10,5% ao ano', source: 'G1', time: '4h' },
  { id: 3, title: 'Novo framework React Server Components ganha tração', source: 'Dev.to', time: '5h' },
  { id: 4, title: 'Brasil avança em energia renovável com recorde solar', source: 'Reuters', time: '6h' },
  { id: 5, title: 'Apple anuncia novo chip M4 Ultra para Mac Pro', source: 'MacRumors', time: '8h' },
]

export default function NewsWidget() {
  return (
    <div className="card" id="news-widget">
      <div className="wg-header">
        <div
          className="wg-header-icon"
          style={{ background: 'var(--t-accent-dim)', color: 'var(--t-accent)' }}
        >
          <Newspaper size={14} />
        </div>
        <span className="wg-header-title">Notícias</span>
        <div className="wg-header-actions">
          <button className="link-btn">ver tudo →</button>
        </div>
      </div>

      <div className="news-list">
        {mockNews.map((n, i) => (
          <div key={n.id} className="news-item">
            <span className="news-item-number">{String(i + 1).padStart(2, '0')}</span>
            <div className="news-item-content">
              <p className="news-item-title">{n.title}</p>
              <div className="news-item-meta">
                <span className="news-item-source">{n.source}</span>
                <span className="news-item-time">{n.time} atrás</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
