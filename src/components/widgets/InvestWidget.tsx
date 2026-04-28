import { TrendingUp, TrendingDown } from 'lucide-react'

interface Ticker {
  symbol: string
  value: string
  change: number
}

const mockTickers: Ticker[] = [
  { symbol: 'IBOV', value: '128.540', change: 1.24 },
  { symbol: 'BTC', value: '$67.280', change: -0.85 },
  { symbol: 'USD/BRL', value: 'R$ 5,12', change: -0.32 },
  { symbol: 'ETH', value: '$3.450', change: 2.10 },
]

export default function InvestWidget() {
  return (
    <div className="card h-full flex flex-col" id="invest-widget">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <TrendingUp size={16} className="text-emerald-400" />
          <h2 className="widget-title">Investimentos</h2>
        </div>
      </div>
      <ul className="flex-1 space-y-1.5 overflow-auto min-h-0">
        {mockTickers.map((t) => (
          <li
            key={t.symbol}
            className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-[var(--t-card-hover)] transition-colors"
          >
            <span className="text-xs font-medium text-[var(--t-text)]">
              {t.symbol}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--t-text-secondary)]">
                {t.value}
              </span>
              <span
                className={`text-[11px] font-medium flex items-center gap-0.5 ${
                  t.change >= 0 ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                {t.change >= 0 ? (
                  <TrendingUp size={10} />
                ) : (
                  <TrendingDown size={10} />
                )}
                {t.change >= 0 ? '+' : ''}
                {t.change.toFixed(2)}%
              </span>
            </div>
          </li>
        ))}
      </ul>
      <button className="ver-mais">Ver mais →</button>
    </div>
  )
}
