import { useState, useEffect } from 'react';
import Header from './components/Header';
import TrendingBar from './components/TrendingBar';
import TokenTable from './components/TokenTable';
import TokenChart from './components/TokenChart';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import './styles.css';

export interface Token {
  id: string;
  name: string;
  symbol: string;
  price: number;
  priceChange5m: number;
  priceChange1h: number;
  priceChange6h: number;
  priceChange24h: number;
  volume24h: number;
  liquidity: number;
  marketCap: number;
  txns24h: number;
  buys24h: number;
  sells24h: number;
  makers: number;
  age: string;
  chain: 'ETH' | 'SOL' | 'BSC' | 'BASE' | 'ARB';
  dex: string;
  priceHistory: number[];
}

const generateMockTokens = (): Token[] => {
  const names = [
    ['PEPE', 'Pepe'], ['WOJAK', 'Wojak'], ['DOGE', 'Dogecoin'], ['SHIB', 'Shiba Inu'],
    ['BONK', 'Bonk'], ['WIF', 'dogwifhat'], ['POPCAT', 'Popcat'], ['MEME', 'Memecoin'],
    ['FLOKI', 'Floki'], ['TURBO', 'Turbo'], ['SLERF', 'Slerf'], ['BOME', 'Book of Meme'],
    ['MYRO', 'Myro'], ['GIGA', 'GigaChad'], ['MICHI', 'Michi'], ['BRETT', 'Brett'],
    ['TOSHI', 'Toshi'], ['DEGEN', 'Degen'], ['HIGHER', 'Higher'], ['NORMIE', 'Normie']
  ];
  const chains: Token['chain'][] = ['ETH', 'SOL', 'BSC', 'BASE', 'ARB'];
  const dexes = ['Uniswap', 'Raydium', 'PancakeSwap', 'Aerodrome', 'Camelot'];
  const ages = ['2m', '15m', '1h', '4h', '12h', '1d', '3d', '7d', '14d', '30d'];

  return names.map(([symbol, name], i) => {
    const basePrice = Math.random() * 0.01;
    const priceHistory = Array.from({ length: 24 }, () =>
      basePrice * (0.8 + Math.random() * 0.4)
    );

    return {
      id: `${symbol.toLowerCase()}-${i}`,
      name,
      symbol,
      price: basePrice,
      priceChange5m: (Math.random() - 0.5) * 20,
      priceChange1h: (Math.random() - 0.5) * 40,
      priceChange6h: (Math.random() - 0.5) * 80,
      priceChange24h: (Math.random() - 0.5) * 100,
      volume24h: Math.random() * 10000000,
      liquidity: Math.random() * 5000000,
      marketCap: Math.random() * 50000000,
      txns24h: Math.floor(Math.random() * 50000),
      buys24h: Math.floor(Math.random() * 25000),
      sells24h: Math.floor(Math.random() * 25000),
      makers: Math.floor(Math.random() * 5000),
      age: ages[Math.floor(Math.random() * ages.length)],
      chain: chains[i % chains.length],
      dex: dexes[i % dexes.length],
      priceHistory
    };
  });
};

function App() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChain, setSelectedChain] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('volume24h');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    setTokens(generateMockTokens());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTokens(prev => prev.map(token => ({
        ...token,
        price: token.price * (0.995 + Math.random() * 0.01),
        priceChange5m: token.priceChange5m + (Math.random() - 0.5) * 2,
        volume24h: token.volume24h * (0.99 + Math.random() * 0.02),
        txns24h: token.txns24h + Math.floor(Math.random() * 10),
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const filteredTokens = tokens
    .filter(t =>
      (selectedChain === 'all' || t.chain === selectedChain) &&
      (t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       t.symbol.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      const aVal = a[sortBy as keyof Token] as number;
      const bVal = b[sortBy as keyof Token] as number;
      return sortOrder === 'desc' ? bVal - aVal : aVal - bVal;
    });

  return (
    <div className="app">
      <div className="scanlines" />
      <div className="noise" />
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <TrendingBar tokens={tokens.slice(0, 8)} />
      <main className="main-content">
        <Sidebar
          selectedChain={selectedChain}
          setSelectedChain={setSelectedChain}
        />
        <div className="content-area">
          {selectedToken ? (
            <TokenChart
              token={selectedToken}
              onClose={() => setSelectedToken(null)}
            />
          ) : (
            <TokenTable
              tokens={filteredTokens}
              onSelectToken={setSelectedToken}
              sortBy={sortBy}
              setSortBy={setSortBy}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;