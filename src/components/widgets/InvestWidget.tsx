import { TrendingUp } from 'lucide-react'

const mockTickers = [
  { symbol: 'IBOV', name: 'Ibovespa', value: '128.540', change: 1.24 },
  { symbol: 'BTC',  name: 'Bitcoin',  value: '$67.280', change: -0.85 },
  { symbol: 'USD',  name: 'Dólar',    value: 'R$ 5,12', change: -0.32 },
  { symbol: 'ETH',  name: 'Ethereum', value: '$3.450',  change: 2.10 },
]

export default function InvestWidget() {
  return (
    <div className="card" id="invest-widget">
      <div className="wg-header">
        <div
          className="wg-header-icon"
          style={{ background: 'var(--t-accent-dim)', color: 'var(--t-accent)' }}
        >
          <TrendingUp size={14} />
        </div>
        <span className="wg-header-title">Mercado</span>
      </div>

      <div className="market-list">
        {mockTickers.map((t) => (
          <div key={t.symbol} className="market-item">
            <div>
              <div className="market-symbol">{t.symbol}</div>
              <div className="market-name">{t.name}</div>
            </div>
            <div className="market-right">
              <div className="market-value">{t.value}</div>
              <div className={`market-change ${t.change >= 0 ? 'market-change--up' : 'market-change--down'}`}>
                {t.change >= 0 ? '▲' : '▼'} {t.change >= 0 ? '+' : ''}{t.change.toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
