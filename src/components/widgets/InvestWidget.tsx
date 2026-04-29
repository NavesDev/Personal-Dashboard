import { TrendingUp, TrendingDown } from 'lucide-react'

const mockTickers = [
  { symbol: 'IBOV', name: 'Ibovespa', value: '128.540', change: 1.24 },
  { symbol: 'BTC',  name: 'Bitcoin',  value: '$67.280', change: -0.85 },
  { symbol: 'USD',  name: 'Dólar',    value: 'R$ 5,12', change: -0.32 },
  { symbol: 'ETH',  name: 'Ethereum', value: '$3.450',  change: 2.10 },
]

export default function InvestWidget() {
  return (
    <div className="card h-full" id="invest-widget">
      <div className="widget-header">
        <div className="accent-bar" />
        <TrendingUp size={12} style={{ color: 'var(--t-accent)' }} />
        <span className="widget-title">Mercado</span>
      </div>

      <div className="flex-1 min-h-0 overflow-auto space-y-0.5">
        {mockTickers.map((t) => (
          <div key={t.symbol} className="widget-row">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold" style={{ color: 'var(--t-text)' }}>
                  {t.symbol}
                </span>
                <span className="text-xs" style={{ color: 'var(--t-text-muted)' }}>
                  {t.name}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-sm tabular-nums" style={{ color: 'var(--t-text-secondary)' }}>
                {t.value}
              </span>
              <span
                className="text-xs font-medium flex items-center gap-0.5 tabular-nums"
                style={{ color: t.change >= 0 ? '#34d399' : '#f87171' }}
              >
                {t.change >= 0
                  ? <TrendingUp size={12} />
                  : <TrendingDown size={12} />
                }
                {t.change >= 0 ? '+' : ''}{t.change.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
      <button className="ver-mais">ver mais →</button>
    </div>
  )
}
