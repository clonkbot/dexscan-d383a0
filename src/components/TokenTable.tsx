import type { Token } from '../App';

interface TokenTableProps {
  tokens: Token[];
  onSelectToken: (token: Token) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
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
  if (price < 0.00001) return price.toExponential(2);
  if (price < 0.01) return price.toFixed(6);
  if (price < 1) return price.toFixed(4);
  return price.toFixed(2);
};

const MiniChart = ({ data, isPositive }: { data: number[]; isPositive: boolean }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * 60;
    const y = 20 - ((val - min) / range) * 18;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width="60" height="24" viewBox="0 0 60 24" className="mini-chart">
      <polyline
        points={points}
        fill="none"
        stroke={isPositive ? 'var(--accent-green)' : 'var(--accent-red)'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default function TokenTable({
  tokens,
  onSelectToken,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder
}: TokenTableProps) {
  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const SortIcon = ({ field }: { field: string }) => (
    <span className={`sort-icon ${sortBy === field ? 'active' : ''}`}>
      {sortBy === field ? (sortOrder === 'desc' ? '▼' : '▲') : '◇'}
    </span>
  );

  return (
    <div className="table-container">
      <div className="table-header">
        <h2 className="table-title">
          <span className="title-icon">◈</span>
          LIVE PAIRS
          <span className="title-count">{tokens.length}</span>
        </h2>
        <div className="table-actions">
          <button className="action-btn active">ALL</button>
          <button className="action-btn">NEW</button>
          <button className="action-btn">GAINERS</button>
          <button className="action-btn">LOSERS</button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="token-table">
          <thead>
            <tr>
              <th className="th-token">TOKEN</th>
              <th className="sortable" onClick={() => handleSort('price')}>
                PRICE <SortIcon field="price" />
              </th>
              <th className="sortable change-col" onClick={() => handleSort('priceChange5m')}>
                5M <SortIcon field="priceChange5m" />
              </th>
              <th className="sortable change-col" onClick={() => handleSort('priceChange1h')}>
                1H <SortIcon field="priceChange1h" />
              </th>
              <th className="sortable change-col" onClick={() => handleSort('priceChange24h')}>
                24H <SortIcon field="priceChange24h" />
              </th>
              <th className="sortable" onClick={() => handleSort('volume24h')}>
                VOLUME <SortIcon field="volume24h" />
              </th>
              <th className="sortable" onClick={() => handleSort('liquidity')}>
                LIQUIDITY <SortIcon field="liquidity" />
              </th>
              <th className="sortable" onClick={() => handleSort('marketCap')}>
                MCAP <SortIcon field="marketCap" />
              </th>
              <th className="sortable" onClick={() => handleSort('txns24h')}>
                TXNS <SortIcon field="txns24h" />
              </th>
              <th className="chart-col">CHART</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token, index) => (
              <tr
                key={token.id}
                className="token-row"
                onClick={() => onSelectToken(token)}
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <td className="td-token">
                  <div className="token-info">
                    <span
                      className="chain-badge"
                      style={{ background: chainColors[token.chain] }}
                    >
                      {token.chain}
                    </span>
                    <div className="token-names">
                      <span className="token-symbol">{token.symbol}</span>
                      <span className="token-name">{token.name}</span>
                    </div>
                    <span className="token-age">{token.age}</span>
                  </div>
                </td>
                <td className="td-price">${formatPrice(token.price)}</td>
                <td className={token.priceChange5m >= 0 ? 'positive' : 'negative'}>
                  {token.priceChange5m >= 0 ? '+' : ''}{token.priceChange5m.toFixed(1)}%
                </td>
                <td className={token.priceChange1h >= 0 ? 'positive' : 'negative'}>
                  {token.priceChange1h >= 0 ? '+' : ''}{token.priceChange1h.toFixed(1)}%
                </td>
                <td className={token.priceChange24h >= 0 ? 'positive' : 'negative'}>
                  {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(1)}%
                </td>
                <td className="td-volume">${formatNumber(token.volume24h)}</td>
                <td>${formatNumber(token.liquidity)}</td>
                <td>${formatNumber(token.marketCap)}</td>
                <td className="td-txns">
                  <span className="txn-count">{formatNumber(token.txns24h, 0)}</span>
                  <span className="txn-details">
                    <span className="buys">{formatNumber(token.buys24h, 0)}</span>
                    <span className="txn-sep">/</span>
                    <span className="sells">{formatNumber(token.sells24h, 0)}</span>
                  </span>
                </td>
                <td className="td-chart">
                  <MiniChart data={token.priceHistory} isPositive={token.priceChange24h >= 0} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .table-container {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          overflow: hidden;
        }

        .table-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid var(--border-color);
          background: linear-gradient(180deg, var(--bg-tertiary) 0%, var(--bg-card) 100%);
        }

        .table-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: 'Orbitron', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--text-primary);
        }

        .title-icon {
          color: var(--accent-green);
          font-size: 1.1rem;
          animation: glow-pulse 2s ease-in-out infinite;
        }

        .title-count {
          font-size: 0.7rem;
          color: var(--text-muted);
          background: var(--bg-primary);
          padding: 0.2rem 0.5rem;
          border-radius: 3px;
          font-family: 'JetBrains Mono', monospace;
        }

        .table-actions {
          display: flex;
          gap: 0.25rem;
        }

        .action-btn {
          padding: 0.4rem 0.8rem;
          background: transparent;
          border: 1px solid var(--border-color);
          border-radius: 3px;
          color: var(--text-muted);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .action-btn:hover {
          border-color: var(--accent-green);
          color: var(--accent-green);
        }

        .action-btn.active {
          background: var(--accent-green);
          border-color: var(--accent-green);
          color: var(--bg-primary);
        }

        .table-wrapper {
          overflow-x: auto;
        }

        .token-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.8rem;
        }

        .token-table th {
          padding: 0.75rem 1rem;
          text-align: left;
          font-family: 'Orbitron', sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border-color);
          white-space: nowrap;
          position: sticky;
          top: 0;
        }

        .token-table th.sortable {
          cursor: pointer;
          user-select: none;
          transition: color 0.15s ease;
        }

        .token-table th.sortable:hover {
          color: var(--accent-green);
        }

        .sort-icon {
          margin-left: 0.25rem;
          font-size: 0.6rem;
          opacity: 0.5;
        }

        .sort-icon.active {
          opacity: 1;
          color: var(--accent-green);
        }

        .token-table td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid var(--border-color);
          white-space: nowrap;
        }

        .token-row {
          cursor: pointer;
          transition: all 0.15s ease;
          animation: slide-in 0.3s ease-out forwards;
          opacity: 0;
        }

        .token-row:hover {
          background: var(--bg-tertiary);
        }

        .token-row:hover .token-symbol {
          color: var(--accent-green);
          text-shadow: 0 0 10px var(--accent-green);
        }

        .td-token {
          min-width: 200px;
        }

        .token-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .chain-badge {
          font-size: 0.6rem;
          font-weight: 700;
          padding: 0.2rem 0.4rem;
          border-radius: 3px;
          color: var(--bg-primary);
          box-shadow: 0 0 8px currentColor;
        }

        .token-names {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }

        .token-symbol {
          font-weight: 700;
          font-size: 0.9rem;
          transition: all 0.15s ease;
        }

        .token-name {
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .token-age {
          font-size: 0.65rem;
          color: var(--accent-cyan);
          background: rgba(0, 229, 255, 0.1);
          padding: 0.15rem 0.35rem;
          border-radius: 3px;
          margin-left: auto;
        }

        .td-price {
          font-weight: 600;
          font-family: 'JetBrains Mono', monospace;
        }

        .change-col {
          text-align: center;
        }

        .td-volume {
          color: var(--accent-cyan);
        }

        .td-txns {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .txn-count {
          font-weight: 600;
        }

        .txn-details {
          font-size: 0.65rem;
          color: var(--text-muted);
        }

        .buys {
          color: var(--accent-green);
        }

        .sells {
          color: var(--accent-red);
        }

        .txn-sep {
          margin: 0 0.25rem;
        }

        .td-chart {
          padding-right: 1.5rem;
        }

        .mini-chart {
          display: block;
        }

        @media (max-width: 1200px) {
          .change-col:nth-child(4),
          .change-col:nth-child(5) {
            display: none;
          }
        }

        @media (max-width: 900px) {
          .table-header {
            flex-direction: column;
            gap: 0.75rem;
            align-items: flex-start;
          }

          .table-actions {
            flex-wrap: wrap;
          }

          .token-table th:nth-child(7),
          .token-table td:nth-child(7),
          .token-table th:nth-child(8),
          .token-table td:nth-child(8) {
            display: none;
          }
        }

        @media (max-width: 600px) {
          .token-table th:nth-child(9),
          .token-table td:nth-child(9),
          .token-table th:nth-child(10),
          .token-table td:nth-child(10) {
            display: none;
          }

          .token-info {
            gap: 0.5rem;
          }

          .token-age {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}