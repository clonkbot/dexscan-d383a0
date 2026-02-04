export default function Footer() {
  return (
    <footer className="footer">
      <span className="footer-text">
        Requested by <a href="https://twitter.com/GoldenFarFR" target="_blank" rel="noopener noreferrer">@GoldenFarFR</a> · Built by <a href="https://twitter.com/clonkbot" target="_blank" rel="noopener noreferrer">@clonkbot</a>
      </span>

      <style>{`
        .footer {
          padding: 1rem 1.5rem;
          text-align: center;
          border-top: 1px solid var(--border-color);
          background: var(--bg-secondary);
        }

        .footer-text {
          font-size: 0.7rem;
          color: var(--text-muted);
          letter-spacing: 0.02em;
        }

        .footer-text a {
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .footer-text a:hover {
          color: var(--accent-green);
          text-shadow: 0 0 8px rgba(0, 255, 136, 0.5);
        }
      `}</style>
    </footer>
  );
}