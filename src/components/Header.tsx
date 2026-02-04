import { useState } from 'react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Header({ searchQuery, setSearchQuery }: HeaderProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <span className="logo-icon">◈</span>
          <span className="logo-text">DEX<span className="logo-highlight">SCAN</span></span>
          <span className="logo-tag">v2.0</span>
        </div>
      </div>

      <div className={`search-container ${isFocused ? 'focused' : ''}`}>
        <span className="search-icon">⌕</span>
        <input
          type="text"
          placeholder="Search tokens, pairs, contracts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="search-input"
        />
        <span className="search-shortcut">⌘K</span>
      </div>

      <div className="header-right">
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-label">PAIRS</span>
            <span className="stat-value">2.4M</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">24H VOL</span>
            <span className="stat-value">$847M</span>
          </div>
        </div>
        <button className="connect-btn">
          <span className="btn-dot" />
          CONNECT
        </button>
      </div>

      <style>{`
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
          border-bottom: 1px solid var(--border-color);
          position: sticky;
          top: 0;
          z-index: 100;
          gap: 1rem;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Orbitron', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .logo-icon {
          color: var(--accent-green);
          font-size: 1.5rem;
          animation: glow-pulse 2s ease-in-out infinite;
          text-shadow: var(--glow-green);
        }

        .logo-text {
          color: var(--text-primary);
        }

        .logo-highlight {
          color: var(--accent-green);
          text-shadow: var(--glow-green);
        }

        .logo-tag {
          font-size: 0.6rem;
          color: var(--text-muted);
          border: 1px solid var(--border-color);
          padding: 0.1rem 0.3rem;
          border-radius: 2px;
          margin-left: 0.25rem;
        }

        .search-container {
          flex: 1;
          max-width: 500px;
          position: relative;
          display: flex;
          align-items: center;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: 4px;
          padding: 0 1rem;
          transition: all 0.2s ease;
        }

        .search-container.focused {
          border-color: var(--accent-green);
          box-shadow: 0 0 15px rgba(0, 255, 136, 0.15);
        }

        .search-icon {
          color: var(--text-muted);
          font-size: 1.1rem;
          margin-right: 0.5rem;
        }

        .search-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-primary);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          padding: 0.75rem 0;
        }

        .search-input::placeholder {
          color: var(--text-muted);
        }

        .search-shortcut {
          font-size: 0.7rem;
          color: var(--text-muted);
          background: var(--bg-primary);
          padding: 0.2rem 0.4rem;
          border-radius: 3px;
          border: 1px solid var(--border-color);
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .header-stats {
          display: flex;
          gap: 1.5rem;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.1rem;
        }

        .stat-label {
          font-size: 0.6rem;
          color: var(--text-muted);
          letter-spacing: 0.1em;
        }

        .stat-value {
          font-size: 0.9rem;
          color: var(--accent-green);
          font-weight: 600;
          text-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
        }

        .connect-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1rem;
          background: linear-gradient(135deg, var(--accent-green-dim) 0%, var(--accent-green) 100%);
          border: none;
          border-radius: 4px;
          color: var(--bg-primary);
          font-family: 'Orbitron', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .connect-btn:hover {
          box-shadow: var(--glow-green);
          transform: translateY(-1px);
        }

        .btn-dot {
          width: 6px;
          height: 6px;
          background: var(--bg-primary);
          border-radius: 50%;
          animation: glow-pulse 1s ease-in-out infinite;
        }

        @media (max-width: 900px) {
          .header-stats {
            display: none;
          }
        }

        @media (max-width: 600px) {
          .header {
            padding: 0.5rem 1rem;
          }

          .search-container {
            max-width: 200px;
          }

          .search-shortcut {
            display: none;
          }

          .logo-tag {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}