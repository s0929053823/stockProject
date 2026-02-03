import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';
import { getDashboardSummary } from '../services/stockService';
import { formatNumber, formatChangePercent, formatCurrency } from '../utils/formatters';
import type { DashboardSummary } from '../types';

const Dashboard: React.FC = () => {
    const [data, setData] = useState<DashboardSummary | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            setError(null);

            // TODO: 實際從 API 取得資料
            // const response = await getDashboardSummary();
            // setData(response.data);

            // 暫時使用模擬資料
            const mockData: DashboardSummary = {
                marketOverview: {
                    totalStocks: 1850,
                    tradingVolume: 4567890000,
                    tradingValue: 234567890000,
                    advancers: 850,
                    decliners: 720,
                    unchanged: 280,
                },
                topGainers: [],
                topLosers: [],
                topVolume: [],
                institutionalTop: [],
                marginTop: [],
            };

            setData(mockData);
        } catch (err) {
            setError('載入資料失敗，請稍後再試');
            console.error('Error loading dashboard data:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className={styles.dashboard}>
                <div className="container">
                    <div className={styles.loading}>
                        <div className="spinner"></div>
                        <span style={{ marginLeft: '12px' }}>載入中...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.dashboard}>
                <div className="container">
                    <div className={styles.error}>
                        <p>{error}</p>
                        <button className="btn btn-primary mt-4" onClick={loadDashboardData}>
                            重新載入
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className={styles.dashboard}>
                <div className="container">
                    <div className={styles.empty}>
                        <p>暫無資料</p>
                    </div>
                </div>
            </div>
        );
    }

    const { marketOverview } = data;
    const advanceDeclineRatio = marketOverview.decliners > 0
        ? (marketOverview.advancers / marketOverview.decliners).toFixed(2)
        : '-';

    return (
        <div className={styles.dashboard}>
            <div className="container">
                {/* Header */}
                <div className={styles['dashboard-header']}>
                    <h1 className={styles['dashboard-title']}>市場概況</h1>
                    <p className={styles['dashboard-subtitle']}>
                        即時掌握台股市場動態與重要指標
                    </p>
                </div>

                {/* Stats Grid */}
                <div className={styles['stats-grid']}>
                    <div className={styles['stat-card']}>
                        <div className={styles['stat-card-header']}>
                            <span className={styles['stat-card-title']}>上市股票數</span>
                            <span className={styles['stat-card-icon']}>📊</span>
                        </div>
                        <div className={styles['stat-card-value']}>
                            {formatNumber(marketOverview.totalStocks)}
                        </div>
                        <div className={styles['stat-card-change']}>
                            <span className="text-muted">總計上市櫃股票</span>
                        </div>
                    </div>

                    <div className={styles['stat-card']}>
                        <div className={styles['stat-card-header']}>
                            <span className={styles['stat-card-title']}>成交量</span>
                            <span className={styles['stat-card-icon']}>📈</span>
                        </div>
                        <div className={styles['stat-card-value']}>
                            {(marketOverview.tradingVolume / 1000000).toFixed(0)}M
                        </div>
                        <div className={styles['stat-card-change']}>
                            <span className="text-muted">股</span>
                        </div>
                    </div>

                    <div className={styles['stat-card']}>
                        <div className={styles['stat-card-header']}>
                            <span className={styles['stat-card-title']}>成交金額</span>
                            <span className={styles['stat-card-icon']}>💰</span>
                        </div>
                        <div className={styles['stat-card-value']}>
                            {(marketOverview.tradingValue / 100000000).toFixed(0)}億
                        </div>
                        <div className={styles['stat-card-change']}>
                            <span className="text-muted">新台幣</span>
                        </div>
                    </div>

                    <div className={styles['stat-card']}>
                        <div className={styles['stat-card-header']}>
                            <span className={styles['stat-card-title']}>漲跌比</span>
                            <span className={styles['stat-card-icon']}>⚖️</span>
                        </div>
                        <div className={styles['stat-card-value']}>
                            {advanceDeclineRatio}
                        </div>
                        <div className={styles['stat-card-change']}>
                            <span className="text-success">↑ {marketOverview.advancers}</span>
                            <span className="text-muted">/</span>
                            <span className="text-danger">↓ {marketOverview.decliners}</span>
                            <span className="text-muted">/</span>
                            <span className="text-muted">- {marketOverview.unchanged}</span>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className={styles['content-grid']}>
                    {/* Top Gainers */}
                    <div className={styles['section-card']}>
                        <div className={styles['section-header']}>
                            <h2 className={styles['section-title']}>
                                <span className={styles['section-title-icon']}>🚀</span>
                                漲幅排行
                            </h2>
                            <Link to="/stocks?sort=gainers" className={styles['section-link']}>
                                查看更多 →
                            </Link>
                        </div>
                        <div className={styles['stock-list']}>
                            {data.topGainers.length > 0 ? (
                                data.topGainers.slice(0, 5).map((item, index) => (
                                    <div key={item.stock.id} className={styles['stock-item']}>
                                        <div className={styles['stock-info']}>
                                            <span className={styles['stock-rank']}>{index + 1}</span>
                                            <div className={styles['stock-details']}>
                                                <span className={styles['stock-code']}>{item.stock.stockCode}</span>
                                                <span className={styles['stock-name']}>{item.stock.stockName}</span>
                                            </div>
                                        </div>
                                        <div className={styles['stock-value']}>
                                            <div className={styles['stock-price']}>
                                                {item.tradingData?.closingPrice.toFixed(2) || '-'}
                                            </div>
                                            <div className={`${styles['stock-change']} text-success`}>
                                                {item.tradingData?.changePercent
                                                    ? formatChangePercent(item.tradingData.changePercent).text
                                                    : '-'}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className={styles.empty}>暫無資料</div>
                            )}
                        </div>
                    </div>

                    {/* Top Losers */}
                    <div className={styles['section-card']}>
                        <div className={styles['section-header']}>
                            <h2 className={styles['section-title']}>
                                <span className={styles['section-title-icon']}>📉</span>
                                跌幅排行
                            </h2>
                            <Link to="/stocks?sort=losers" className={styles['section-link']}>
                                查看更多 →
                            </Link>
                        </div>
                        <div className={styles['stock-list']}>
                            {data.topLosers.length > 0 ? (
                                data.topLosers.slice(0, 5).map((item, index) => (
                                    <div key={item.stock.id} className={styles['stock-item']}>
                                        <div className={styles['stock-info']}>
                                            <span className={styles['stock-rank']}>{index + 1}</span>
                                            <div className={styles['stock-details']}>
                                                <span className={styles['stock-code']}>{item.stock.stockCode}</span>
                                                <span className={styles['stock-name']}>{item.stock.stockName}</span>
                                            </div>
                                        </div>
                                        <div className={styles['stock-value']}>
                                            <div className={styles['stock-price']}>
                                                {item.tradingData?.closingPrice.toFixed(2) || '-'}
                                            </div>
                                            <div className={`${styles['stock-change']} text-danger`}>
                                                {item.tradingData?.changePercent
                                                    ? formatChangePercent(item.tradingData.changePercent).text
                                                    : '-'}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className={styles.empty}>暫無資料</div>
                            )}
                        </div>
                    </div>

                    {/* Top Volume */}
                    <div className={styles['section-card']}>
                        <div className={styles['section-header']}>
                            <h2 className={styles['section-title']}>
                                <span className={styles['section-title-icon']}>🔥</span>
                                成交量排行
                            </h2>
                            <Link to="/stocks?sort=volume" className={styles['section-link']}>
                                查看更多 →
                            </Link>
                        </div>
                        <div className={styles['stock-list']}>
                            {data.topVolume.length > 0 ? (
                                data.topVolume.slice(0, 5).map((item, index) => (
                                    <div key={item.stock.id} className={styles['stock-item']}>
                                        <div className={styles['stock-info']}>
                                            <span className={styles['stock-rank']}>{index + 1}</span>
                                            <div className={styles['stock-details']}>
                                                <span className={styles['stock-code']}>{item.stock.stockCode}</span>
                                                <span className={styles['stock-name']}>{item.stock.stockName}</span>
                                            </div>
                                        </div>
                                        <div className={styles['stock-value']}>
                                            <div className={styles['stock-price']}>
                                                {item.tradingData?.tradingVolume
                                                    ? formatNumber(Math.floor(item.tradingData.tradingVolume / 1000))
                                                    : '-'}
                                            </div>
                                            <div className={`${styles['stock-change']} text-muted`}>張</div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className={styles.empty}>暫無資料</div>
                            )}
                        </div>
                    </div>

                    {/* Institutional Investors */}
                    <div className={styles['section-card']}>
                        <div className={styles['section-header']}>
                            <h2 className={styles['section-title']}>
                                <span className={styles['section-title-icon']}>🏦</span>
                                法人買超排行
                            </h2>
                            <Link to="/stocks?sort=institutional" className={styles['section-link']}>
                                查看更多 →
                            </Link>
                        </div>
                        <div className={styles['stock-list']}>
                            {data.institutionalTop.length > 0 ? (
                                data.institutionalTop.slice(0, 5).map((item, index) => (
                                    <div key={item.stock.id} className={styles['stock-item']}>
                                        <div className={styles['stock-info']}>
                                            <span className={styles['stock-rank']}>{index + 1}</span>
                                            <div className={styles['stock-details']}>
                                                <span className={styles['stock-code']}>{item.stock.stockCode}</span>
                                                <span className={styles['stock-name']}>{item.stock.stockName}</span>
                                            </div>
                                        </div>
                                        <div className={styles['stock-value']}>
                                            <div className={`${styles['stock-price']} text-success`}>
                                                {formatNumber(Math.floor(item.netBuying / 1000))}
                                            </div>
                                            <div className={`${styles['stock-change']} text-muted`}>張</div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className={styles.empty}>暫無資料</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
