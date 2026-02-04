import type { Token } from '../App';

interface TrendingBarProps {
  tokens: Token[];
}

const chainColors: Record<string, string> = {
  ETH: '#627eea',
  SOL: '#14f195',
  BSC: '#f3ba2f',
  BASE: '#0052ff',
  ARB: '#28a0f0',
};

export default function TrendingBar({ tokens }: TrendingBarProps) {
  return (
    <div className="trending-bar">
      <div className="trending-label">
        <span className="fire-icon">🔥</span>
        <span>TRENDING</span>
      </div>
      <div className="trending-scroll">
        <div className="trending-track">
          {[...tokens, ...tokens].map((token, i) => (
            <div key={`${token.id}-${i}`} className="trending-item">
              <span className="trending-rank">#{(i % tokens.length) + 1}</span>
              <span
                className="chain-dot"
                style={{ background: chainColors[token.chain] }}
              />
              <span className="token-symbol">{token.symbol}</span>
              <span className={`token-change ${token.priceChange24h >= 0 ? 'positive' : 'negative'}`}>
                {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .trending-bar {
          display: flex;
          align-items: center;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border-color);
          overflow: hidden;
          position: relative;
        }

        .trending-bar::before,
        .trending-bar::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 60px;
          z-index: 10;
          pointer-events: none;
        }

        .trending-bar::before {
          left: 100px;
          background: linear-gradient(90deg, var(--bg-secondary), transparent);
        }

        .trending-bar::after {
          right: 0;
          background: linear-gradient(270deg, var(--bg-secondary), transparent);
        }

        .trending-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1rem;
          background: linear-gradient(90deg, rgba(255, 136, 0, 0.15) 0%, transparent 100%);
          border-right: 1px solid var(--border-color);
          font-family: 'Orbitron', sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: var(--accent-yellow);
          white-space: nowrap;
          flex-shrink: 0;
        }

        .fire-icon {
          font-size: 0.9rem;
          animation: glow-pulse 0.5s ease-in-out infinite;
        }

        .trending-scroll {
          flex: 1;
          overflow: hidden;
        }

        .trending-track {
          display: flex;
          animation: scroll-left 30s linear infinite;
        }

        .trending-track:hover {
          animation-play-state: paused;
        }

        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .trending-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1rem;
          border-right: 1px solid var(--border-color);
          cursor: pointer;
          transition: background 0.2s ease;
          white-space: nowrap;
        }

        .trending-item:hover {
          background: var(--bg-tertiary);
        }

        .trending-rank {
          font-size: 0.65rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .chain-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          box-shadow: 0 0 6px currentColor;
        }

        .token-symbol {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .token-change {
          font-size: 0.75rem;
          font-weight: 600;
        }

        @media (max-width: 600px) {
          .trending-label span:last-child {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}