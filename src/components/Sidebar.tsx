interface SidebarProps {
  selectedChain: string;
  setSelectedChain: (chain: string) => void;
}

const chains = [
  { id: 'all', name: 'All Chains', icon: '◎', color: '#00ff88' },
  { id: 'ETH', name: 'Ethereum', icon: 'Ξ', color: '#627eea' },
  { id: 'SOL', name: 'Solana', icon: '◉', color: '#14f195' },
  { id: 'BSC', name: 'BNB Chain', icon: '◆', color: '#f3ba2f' },
  { id: 'BASE', name: 'Base', icon: '○', color: '#0052ff' },
  { id: 'ARB', name: 'Arbitrum', icon: '△', color: '#28a0f0' },
];

const filters = [
  { id: 'new', name: 'New Pairs', icon: '✦' },
  { id: 'gainers', name: 'Top Gainers', icon: '↑' },
  { id: 'losers', name: 'Top Losers', icon: '↓' },
  { id: 'volume', name: 'Volume', icon: '█' },
  { id: 'liquidity', name: 'Liquidity', icon: '◧' },
];

export default function Sidebar({ selectedChain, setSelectedChain }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <div className="section-header">
          <span className="section-icon">⬡</span>
          <span>NETWORKS</span>
        </div>
        <div className="chain-list">
          {chains.map(chain => (
            <button
              key={chain.id}
              className={`chain-btn ${selectedChain === chain.id ? 'active' : ''}`}
              onClick={() => setSelectedChain(chain.id)}
              style={{ '--chain-color': chain.color } as React.CSSProperties}
            >
              <span className="chain-icon" style={{ color: chain.color }}>{chain.icon}</span>
              <span className="chain-name">{chain.name}</span>
              {selectedChain === chain.id && <span className="active-indicator" />}
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <div className="section-header">
          <span className="section-icon">◈</span>
          <span>FILTERS</span>
        </div>
        <div className="filter-list">
          {filters.map(filter => (
            <button key={filter.id} className="filter-btn">
              <span className="filter-icon">{filter.icon}</span>
              <span className="filter-name">{filter.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <div className="section-header">
          <span className="section-icon">⚡</span>
          <span>QUICK STATS</span>
        </div>
        <div className="quick-stats">
          <div className="quick-stat">
            <span className="qs-label">NEW PAIRS (24H)</span>
            <span className="qs-value positive">+2,847</span>
          </div>
          <div className="quick-stat">
            <span className="qs-label">ACTIVE TRADERS</span>
            <span className="qs-value">184.2K</span>
          </div>
          <div className="quick-stat">
            <span className="qs-label">TOTAL TXNS</span>
            <span className="qs-value">8.4M</span>
          </div>
        </div>
      </div>

      <style>{`
        .sidebar {
          width: 220px;
          background: var(--bg-secondary);
          border-right: 1px solid var(--border-color);
          padding: 1rem 0;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          overflow-y: auto;
          flex-shrink: 0;
        }

        .sidebar-section {
          display: flex;
          flex-direction: column;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0 1rem;
          margin-bottom: 0.75rem;
          font-family: 'Orbitron', sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          color: var(--text-muted);
        }

        .section-icon {
          color: var(--accent-green);
          font-size: 0.8rem;
        }

        .chain-list, .filter-list {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .chain-btn, .filter-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.6rem 1rem;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.15s ease;
          text-align: left;
          position: relative;
        }

        .chain-btn:hover, .filter-btn:hover {
          background: var(--bg-tertiary);
          color: var(--text-primary);
        }

        .chain-btn.active {
          background: linear-gradient(90deg, rgba(0, 255, 136, 0.1) 0%, transparent 100%);
          color: var(--text-primary);
        }

        .chain-btn.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: var(--chain-color);
          box-shadow: 0 0 10px var(--chain-color);
        }

        .chain-icon {
          font-size: 1rem;
          width: 20px;
          text-align: center;
        }

        .chain-name, .filter-name {
          flex: 1;
        }

        .active-indicator {
          width: 6px;
          height: 6px;
          background: var(--accent-green);
          border-radius: 50%;
          box-shadow: 0 0 8px var(--accent-green);
        }

        .filter-icon {
          font-size: 0.9rem;
          color: var(--text-muted);
          width: 20px;
          text-align: center;
        }

        .quick-stats {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 0 1rem;
        }

        .quick-stat {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0;
          border-bottom: 1px dashed var(--border-color);
        }

        .quick-stat:last-child {
          border-bottom: none;
        }

        .qs-label {
          font-size: 0.65rem;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }

        .qs-value {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        @media (max-width: 1024px) {
          .sidebar {
            width: 100%;
            flex-direction: row;
            padding: 0.5rem 1rem;
            gap: 1rem;
            overflow-x: auto;
          }

          .sidebar-section {
            flex-direction: row;
            align-items: center;
            gap: 0.5rem;
          }

          .section-header {
            padding: 0;
            margin-bottom: 0;
          }

          .chain-list, .filter-list {
            flex-direction: row;
          }

          .chain-btn, .filter-btn {
            padding: 0.4rem 0.75rem;
            white-space: nowrap;
          }

          .quick-stats {
            display: none;
          }
        }
      `}</style>
    </aside>
  );
}