import { useState, useEffect } from 'react';
import type { Token } from '../App';

interface TokenChartProps {
  token: Token;
  onClose: () => void;
}

const chainColors: Record<string, string> = {
  ETH: '#627eea',
  SOL: '#14f195',
  BSC: '#f3ba2f',
  BASE: '#0052ff',
  ARB: '#28a0f0',
};

const formatNumber = (num: number, decimals = 2): string => {
  if (num >= 1e9) return `${(num / 1e9).toFixed(decimals)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(decimals)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(decimals)}K`;
  return num.toFixed(decimals);
};

const formatPrice = (price: number): string => {
  if (price < 0.00001) return price.toExponential(4);
  if (price < 0.01) return price.toFixed(8);
  if (price < 1) return price.toFixed(6);
  return price.toFixed(4);
};

export default function TokenChart({ token, onClose }: TokenChartProps) {
  const [timeframe, setTimeframe] = useState('1H');
  const [chartData, setChartData] = useState<number[]>([]);

  useEffect(() => {
    // Generate mock chart data based on timeframe
    const points = timeframe === '5M' ? 60 : timeframe === '1H' ? 60 : timeframe === '4H' ? 48 : 24;
    const volatility = 0.02;
    let price = token.price;
    const data: number[] = [];

    for (let i = 0; i < points; i++) {
      price = price * (1 + (Math.random() - 0.5) * volatility);
      data.push(price);
    }
    setChartData(data);
  }, [timeframe, token.price]);

  const min = Math.min(...chartData);
  const max = Math.max(...chartData);
  const range = max - min || 1;

  const chartPath = chartData.map((val, i) => {
    const x = (i / (chartData.length - 1)) * 100;
    const y = 100 - ((val - min) / range) * 90;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  const areaPath = `${chartPath} L 100 100 L 0 100 Z`;
  const isPositive = chartData[chartData.length - 1] > chartData[0];

  return (
    <div className="chart-container">
      <div className="chart-header">
        <div className="chart-token-info">
          <button className="back-btn" onClick={onClose}>
            ← BACK
          </button>
          <span
            className="chart-chain-badge"
            style={{ background: chainColors[token.chain] }}
          >
            {token.chain}
          </span>
          <div className="chart-token-names">
            <span className="chart-symbol">{token.symbol}</span>
            <span className="chart-name">{token.name}</span>
          </div>
          <span className="chart-dex">{token.dex}</span>
        </div>

        <div className="chart-price-section">
          <span className="chart-price">${formatPrice(token.price)}</span>
          <span className={`chart-change ${token.priceChange24h >= 0 ? 'positive' : 'negative'}`}>
            {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
          </span>
        </div>
      </div>

      <div className="chart-timeframes">
        {['5M', '1H', '4H', '24H'].map(tf => (
          <button
            key={tf}
            className={`tf-btn ${timeframe === tf ? 'active' : ''}`}
            onClick={() => setTimeframe(tf)}
          >
            {tf}
          </button>
        ))}
      </div>

      <div className="chart-area">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="chart-svg">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isPositive ? '#00ff88' : '#ff3366'} stopOpacity="0.3" />
              <stop offset="100%" stopColor={isPositive ? '#00ff88' : '#ff3366'} stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Grid lines */}
          {[20, 40, 60, 80].map(y => (
            <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="var(--border-color)" strokeWidth="0.2" />
          ))}
          {/* Area fill */}
          <path d={areaPath} fill="url(#chartGradient)" />
          {/* Line */}
          <path
            d={chartPath}
            fill="none"
            stroke={isPositive ? 'var(--accent-green)' : 'var(--accent-red)'}
            strokeWidth="0.5"
            vectorEffect="non-scaling-stroke"
            style={{ filter: `drop-shadow(0 0 4px ${isPositive ? 'var(--accent-green)' : 'var(--accent-red)'})` }}
          />
        </svg>
        <div className="chart-labels">
          <span className="label-high">${formatPrice(max)}</span>
          <span className="label-low">${formatPrice(min)}</span>
        </div>
      </div>

      <div className="chart-stats">
        <div className="stat-grid">
          <div className="stat-card">
            <span className="stat-label">MARKET CAP</span>
            <span className="stat-value">${formatNumber(token.marketCap)}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">LIQUIDITY</span>
            <span className="stat-value">${formatNumber(token.liquidity)}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">24H VOLUME</span>
            <span className="stat-value cyan">${formatNumber(token.volume24h)}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">24H TXNS</span>
            <span className="stat-value">{formatNumber(token.txns24h, 0)}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">BUYS / SELLS</span>
            <span className="stat-value">
              <span className="positive">{formatNumber(token.buys24h, 0)}</span>
              <span className="sep"> / </span>
              <span className="negative">{formatNumber(token.sells24h, 0)}</span>
            </span>
          </div>
          <div className="stat-card">
            <span className="stat-label">MAKERS</span>
            <span className="stat-value">{formatNumber(token.makers, 0)}</span>
          </div>
        </div>

        <div className="price-changes">
          <div className="change-item">
            <span className="change-label">5M</span>
            <span className={token.priceChange5m >= 0 ? 'positive' : 'negative'}>
              {token.priceChange5m >= 0 ? '+' : ''}{token.priceChange5m.toFixed(2)}%
            </span>
          </div>
          <div className="change-item">
            <span className="change-label">1H</span>
            <span className={token.priceChange1h >= 0 ? 'positive' : 'negative'}>
              {token.priceChange1h >= 0 ? '+' : ''}{token.priceChange1h.toFixed(2)}%
            </span>
          </div>
          <div className="change-item">
            <span className="change-label">6H</span>
            <span className={token.priceChange6h >= 0 ? 'positive' : 'negative'}>
              {token.priceChange6h >= 0 ? '+' : ''}{token.priceChange6h.toFixed(2)}%
            </span>
          </div>
          <div className="change-item">
            <span className="change-label">24H</span>
            <span className={token.priceChange24h >= 0 ? 'positive' : 'negative'}>
              {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      <div className="chart-actions">
        <button className="action-primary">
          <span>⚡</span> TRADE ON {token.dex.toUpperCase()}
        </button>
        <button className="action-secondary">
          <span>◈</span> ADD TO WATCHLIST
        </button>
        <button className="action-secondary">
          <span>↗</span> SHARE
        </button>
      </div>

      <style>{`
        .chart-container {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          overflow: hidden;
          animation: slide-in 0.3s ease-out;
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 1.5rem;
          background: linear-gradient(180deg, var(--bg-tertiary) 0%, var(--bg-card) 100%);
          border-bottom: 1px solid var(--border-color);
        }

        .chart-token-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .back-btn {
          padding: 0.5rem 0.75rem;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 4px;
          color: var(--text-secondary);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .back-btn:hover {
          border-color: var(--accent-green);
          color: var(--accent-green);
        }

        .chart-chain-badge {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.3rem 0.6rem;
          border-radius: 4px;
          color: var(--bg-primary);
          box-shadow: 0 0 12px currentColor;
        }

        .chart-token-names {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .chart-symbol {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .chart-name {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .chart-dex {
          font-size: 0.7rem;
          color: var(--accent-purple);
          background: rgba(179, 102, 255, 0.1);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
        }

        .chart-price-section {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.25rem;
        }

        .chart-price {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .chart-change {
          font-size: 1rem;
          font-weight: 600;
        }

        .chart-timeframes {
          display: flex;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border-bottom: 1px solid var(--border-color);
        }

        .tf-btn {
          padding: 0.5rem 1rem;
          background: transparent;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          color: var(--text-muted);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .tf-btn:hover {
          border-color: var(--accent-green);
          color: var(--accent-green);
        }

        .tf-btn.active {
          background: var(--accent-green);
          border-color: var(--accent-green);
          color: var(--bg-primary);
          box-shadow: 0 0 15px rgba(0, 255, 136, 0.3);
        }

        .chart-area {
          position: relative;
          height: 300px;
          padding: 1rem 1.5rem;
        }

        .chart-svg {
          width: 100%;
          height: 100%;
        }

        .chart-labels {
          position: absolute;
          right: 1.75rem;
          top: 1rem;
          bottom: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          pointer-events: none;
        }

        .label-high, .label-low {
          font-size: 0.65rem;
          color: var(--text-muted);
          background: var(--bg-card);
          padding: 0.15rem 0.35rem;
          border-radius: 2px;
        }

        .chart-stats {
          padding: 1rem 1.5rem;
          border-top: 1px solid var(--border-color);
        }

        .stat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .stat-card {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding: 0.75rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 4px;
        }

        .stat-label {
          font-size: 0.6rem;
          color: var(--text-muted);
          letter-spacing: 0.1em;
        }

        .stat-value {
          font-family: 'Orbitron', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .stat-value.cyan {
          color: var(--accent-cyan);
          text-shadow: 0 0 10px var(--accent-cyan);
        }

        .stat-value .sep {
          color: var(--text-muted);
          margin: 0 0.25rem;
        }

        .price-changes {
          display: flex;
          gap: 1.5rem;
          padding: 0.75rem;
          background: var(--bg-primary);
          border-radius: 4px;
        }

        .change-item {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .change-label {
          font-size: 0.6rem;
          color: var(--text-muted);
          letter-spacing: 0.1em;
        }

        .chart-actions {
          display: flex;
          gap: 0.75rem;
          padding: 1rem 1.5rem;
          border-top: 1px solid var(--border-color);
        }

        .action-primary {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: linear-gradient(135deg, var(--accent-green-dim) 0%, var(--accent-green) 100%);
          border: none;
          border-radius: 4px;
          color: var(--bg-primary);
          font-family: 'Orbitron', sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-primary:hover {
          box-shadow: var(--glow-green);
          transform: translateY(-2px);
        }

        .action-secondary {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 4px;
          color: var(--text-secondary);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .action-secondary:hover {
          border-color: var(--accent-green);
          color: var(--accent-green);
        }

        @media (max-width: 768px) {
          .chart-header {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }

          .chart-price-section {
            align-items: flex-start;
          }

          .chart-area {
            height: 200px;
          }

          .chart-actions {
            flex-wrap: wrap;
          }

          .action-secondary {
            flex: 1;
          }
        }
      `}</style>
    </div>
  );
}