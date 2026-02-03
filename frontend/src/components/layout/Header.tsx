import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

interface HeaderProps {
    onThemeToggle?: () => void;
    theme?: 'light' | 'dark';
}

const Header: React.FC<HeaderProps> = ({ onThemeToggle, theme = 'light' }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles['header-container']}>
                    {/* Logo */}
                    <Link to="/" className={styles['header-logo']}>
                        <span className={styles['header-logo-icon']}>📈</span>
                        <span>台股資料管理</span>
                    </Link>

                    {/* Navigation */}
                    <nav className={`${styles['header-nav']} ${mobileMenuOpen ? styles['mobile-open'] : ''}`}>
                        <Link
                            to="/"
                            className={`${styles['header-nav-link']} ${isActive('/') ? styles.active : ''}`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            儀表板
                        </Link>
                        <Link
                            to="/stocks"
                            className={`${styles['header-nav-link']} ${isActive('/stocks') ? styles.active : ''}`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            股票搜尋
                        </Link>
                        <Link
                            to="/data-management"
                            className={`${styles['header-nav-link']} ${isActive('/data-management') ? styles.active : ''}`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            資料管理
                        </Link>
                    </nav>

                    {/* Actions */}
                    <div className={styles['header-actions']}>
                        {/* Theme Toggle */}
                        <button
                            className={styles['theme-toggle']}
                            onClick={onThemeToggle}
                            aria-label="切換主題"
                        >
                            {theme === 'light' ? '🌙' : '☀️'}
                            <span className="text-sm">{theme === 'light' ? '深色' : '淺色'}</span>
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            className={styles['mobile-menu-button']}
                            onClick={toggleMobileMenu}
                            aria-label="選單"
                        >
                            {mobileMenuOpen ? '✕' : '☰'}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
