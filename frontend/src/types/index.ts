// ========================================
// TypeScript Type Definitions
// 台股資料管理系統型別定義
// ========================================

// ==================== 股票基本資料 ====================

export interface Stock {
    id: string;
    stockCode: string;        // 股票代碼 (e.g., "2330")
    stockName: string;         // 股票名稱 (e.g., "台積電")
    industry?: string;         // 產業別
    marketType?: string;       // 市場別 (上市/上櫃)
    createdAt: string;
    updatedAt: string;
}

// ==================== 每日交易資料 ====================

export interface DailyTradingData {
    id: string;
    stockId: string;
    tradeDate: string;         // 交易日期 (ISO 8601 format)
    openingPrice: number;      // 開盤價
    closingPrice: number;      // 收盤價
    highestPrice: number;      // 最高價
    lowestPrice: number;       // 最低價
    tradingVolume: number;     // 成交量 (股)
    tradingValue: number;      // 成交金額 (元)
    transactionCount: number;  // 成交筆數
    change?: number;           // 漲跌
    changePercent?: number;    // 漲跌幅 (%)
    createdAt: string;
}

// ==================== 三大法人資料 ====================

export interface InstitutionalInvestor {
    id: string;
    stockId: string;
    tradeDate: string;
    foreignBuy: number;              // 外資買進 (股)
    foreignSell: number;             // 外資賣出 (股)
    foreignNet: number;              // 外資買賣超 (股)
    investmentTrustBuy: number;      // 投信買進 (股)
    investmentTrustSell: number;     // 投信賣出 (股)
    investmentTrustNet: number;      // 投信買賣超 (股)
    dealerBuy: number;               // 自營商買進 (股)
    dealerSell: number;              // 自營商賣出 (股)
    dealerNet: number;               // 自營商買賣超 (股)
    totalNet: number;                // 三大法人買賣超合計 (股)
    createdAt: string;
}

// ==================== 融資融券資料 ====================

export interface MarginTrading {
    id: string;
    stockId: string;
    tradeDate: string;
    marginBuy: number;         // 融資買進 (股)
    marginSell: number;        // 融資賣出 (股)
    marginBalance: number;     // 融資餘額 (股)
    marginChange: number;      // 融資餘額變化 (股)
    shortSell: number;         // 融券賣出 (股)
    shortCover: number;        // 融券買進 (股)
    shortBalance: number;      // 融券餘額 (股)
    shortChange: number;       // 融券餘額變化 (股)
    marginQuota?: number;      // 融資限額
    shortQuota?: number;       // 融券限額
    createdAt: string;
}

// ==================== 綜合股票資料 ====================

export interface StockCompleteData {
    stock: Stock;
    tradingData?: DailyTradingData;
    institutional?: InstitutionalInvestor;
    margin?: MarginTrading;
}

// ==================== API 回應格式 ====================

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    meta?: {
        timestamp: string;
        page?: number;
        pageSize?: number;
        totalCount?: number;
        totalPages?: number;
    };
}

export interface ApiError {
    success: false;
    error: {
        code: string;
        message: string;
        details?: Array<{
            field: string;
            message: string;
        }>;
    };
    meta?: {
        timestamp: string;
        requestId?: string;
    };
}

// ==================== 查詢參數 ====================

export interface StockQueryParams {
    page?: number;
    pageSize?: number;
    search?: string;           // 搜尋股票代碼或名稱
    industry?: string;         // 篩選產業
    marketType?: string;       // 篩選市場別
    sortBy?: string;           // 排序欄位
    sortOrder?: 'asc' | 'desc';
}

export interface DateRangeParams {
    startDate: string;         // 開始日期 (YYYY-MM-DD)
    endDate: string;           // 結束日期 (YYYY-MM-DD)
}

export interface TradingDataQueryParams extends DateRangeParams {
    stockCode: string;
}

// ==================== 圖表資料 ====================

export interface ChartDataPoint {
    date: string;
    value: number;
    label?: string;
}

export interface CandlestickDataPoint {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

export interface InstitutionalChartData {
    date: string;
    foreign: number;
    investmentTrust: number;
    dealer: number;
    total: number;
}

export interface MarginChartData {
    date: string;
    marginBalance: number;
    marginChange: number;
    shortBalance: number;
    shortChange: number;
}

// ==================== 儀表板資料 ====================

export interface DashboardSummary {
    marketOverview: {
        totalStocks: number;
        tradingVolume: number;
        tradingValue: number;
        advancers: number;        // 上漲家數
        decliners: number;        // 下跌家數
        unchanged: number;        // 平盤家數
    };
    topGainers: StockCompleteData[];
    topLosers: StockCompleteData[];
    topVolume: StockCompleteData[];
    institutionalTop: Array<{
        stock: Stock;
        netBuying: number;
    }>;
    marginTop: Array<{
        stock: Stock;
        marginChange: number;
        shortChange: number;
    }>;
}

// ==================== 篩選器選項 ====================

export interface FilterOptions {
    industries: string[];
    marketTypes: string[];
    dateRange: {
        min: string;
        max: string;
    };
}

// ==================== UI 狀態 ====================

export interface LoadingState {
    isLoading: boolean;
    error: string | null;
}

export interface PaginationState {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
}

export interface SortState {
    field: string;
    order: 'asc' | 'desc';
}

// ==================== 表單資料 ====================

export interface StockFormData {
    stockCode: string;
    stockName: string;
    industry: string;
    marketType: string;
}

export interface TradingDataFormData {
    tradeDate: string;
    openingPrice: number;
    closingPrice: number;
    highestPrice: number;
    lowestPrice: number;
    tradingVolume: number;
    tradingValue: number;
    transactionCount: number;
}

// ==================== 主題設定 ====================

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

// ==================== 使用者偏好設定 ====================

export interface UserPreferences {
    theme: Theme;
    defaultPageSize: number;
    favoriteStocks: string[];  // 股票代碼陣列
    chartType: 'line' | 'candlestick';
    defaultDateRange: number;  // 預設顯示天數
}

// ==================== 統計資料 ====================

export interface StockStatistics {
    stockCode: string;
    period: string;            // 統計期間
    avgVolume: number;         // 平均成交量
    avgPrice: number;          // 平均價格
    highestPrice: number;      // 最高價
    lowestPrice: number;       // 最低價
    priceChange: number;       // 價格變化
    priceChangePercent: number;
    totalInstitutionalNet: number;  // 法人買賣超總計
    totalMarginChange: number;      // 融資變化總計
    totalShortChange: number;       // 融券變化總計
}

// ==================== 匯出資料格式 ====================

export interface ExportOptions {
    format: 'csv' | 'json' | 'excel';
    dateRange?: DateRangeParams;
    fields?: string[];         // 要匯出的欄位
}

// ==================== 通知 ====================

export interface Notification {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    duration?: number;         // 顯示時間 (毫秒)
}

// ==================== 路由 ====================

export interface RouteParams {
    stockCode?: string;
    date?: string;
}
