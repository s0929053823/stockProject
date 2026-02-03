import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import './styles/global.css';

type Theme = 'light' | 'dark';

function App() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    // 從 localStorage 讀取主題設定
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <Router>
      <div className="app">
        <Header onThemeToggle={toggleTheme} theme={theme} />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/stocks" element={<StocksPlaceholder />} />
            <Route path="/stocks/:stockCode" element={<StockDetailPlaceholder />} />
            <Route path="/data-management" element={<DataManagementPlaceholder />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// Placeholder components for routes
const StocksPlaceholder = () => (
  <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
    <h1>股票搜尋</h1>
    <p className="text-secondary">此頁面正在開發中...</p>
  </div>
);

const StockDetailPlaceholder = () => (
  <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
    <h1>股票詳細資料</h1>
    <p className="text-secondary">此頁面正在開發中...</p>
  </div>
);

const DataManagementPlaceholder = () => (
  <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
    <h1>資料管理</h1>
    <p className="text-secondary">此頁面正在開發中...</p>
  </div>
);

export default App;
