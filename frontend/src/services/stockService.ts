// ========================================
// Stock Service
// 股票資料服務
// ========================================

import { api } from './api';
import type {
    Stock,
    DailyTradingData,
    InstitutionalInvestor,
    MarginTrading,
    StockCompleteData,
    StockQueryParams,
    DateRangeParams,
    DashboardSummary,
} from '../types';

// ==================== 股票管理 ====================

/**
 * 取得股票清單
 */
export const getStocks = async (params?: StockQueryParams) => {
    return api.get<Stock[]>('/stocks', { params });
};

/**
 * 取得特定股票資訊
 */
export const getStock = async (stockCode: string) => {
    return api.get<Stock>(`/stocks/${stockCode}`);
};

/**
 * 新增股票
 */
export const createStock = async (data: Omit<Stock, 'id' | 'createdAt' | 'updatedAt'>) => {
    return api.post<Stock>('/stocks', data);
};

/**
 * 更新股票資訊
 */
export const updateStock = async (
    stockCode: string,
    data: Partial<Omit<Stock, 'id' | 'stockCode' | 'createdAt' | 'updatedAt'>>
) => {
    return api.put<Stock>(`/stocks/${stockCode}`, data);
};

/**
 * 刪除股票
 */
export const deleteStock = async (stockCode: string) => {
    return api.delete<void>(`/stocks/${stockCode}`);
};

// ==================== 每日交易資料 ====================

/**
 * 取得股票交易資料
 */
export const getTradingData = async (stockCode: string, params?: DateRangeParams) => {
    return api.get<DailyTradingData[]>(`/stocks/${stockCode}/trading`, { params });
};

/**
 * 新增交易資料
 */
export const createTradingData = async (
    stockCode: string,
    data: Omit<DailyTradingData, 'id' | 'stockId' | 'createdAt'>
) => {
    return api.post<DailyTradingData>(`/stocks/${stockCode}/trading`, data);
};

/**
 * 取得特定日期所有股票交易資料
 */
export const getTradingDataByDate = async (date: string) => {
    return api.get<DailyTradingData[]>(`/trading/date/${date}`);
};

// ==================== 三大法人資料 ====================

/**
 * 取得股票法人資料
 */
export const getInstitutionalData = async (stockCode: string, params?: DateRangeParams) => {
    return api.get<InstitutionalInvestor[]>(`/stocks/${stockCode}/institutional`, { params });
};

/**
 * 新增法人資料
 */
export const createInstitutionalData = async (
    stockCode: string,
    data: Omit<InstitutionalInvestor, 'id' | 'stockId' | 'createdAt'>
) => {
    return api.post<InstitutionalInvestor>(`/stocks/${stockCode}/institutional`, data);
};

/**
 * 取得特定日期法人資料
 */
export const getInstitutionalDataByDate = async (date: string) => {
    return api.get<InstitutionalInvestor[]>(`/institutional/date/${date}`);
};

/**
 * 取得法人買賣超排行
 */
export const getInstitutionalSummary = async (params?: { date?: string; limit?: number }) => {
    return api.get<Array<{ stock: Stock; institutional: InstitutionalInvestor }>>(
        '/institutional/summary',
        { params }
    );
};

// ==================== 融資融券資料 ====================

/**
 * 取得股票融資融券資料
 */
export const getMarginData = async (stockCode: string, params?: DateRangeParams) => {
    return api.get<MarginTrading[]>(`/stocks/${stockCode}/margin`, { params });
};

/**
 * 新增融資融券資料
 */
export const createMarginData = async (
    stockCode: string,
    data: Omit<MarginTrading, 'id' | 'stockId' | 'createdAt'>
) => {
    return api.post<MarginTrading>(`/stocks/${stockCode}/margin`, data);
};

/**
 * 取得特定日期融資融券資料
 */
export const getMarginDataByDate = async (date: string) => {
    return api.get<MarginTrading[]>(`/margin/date/${date}`);
};

/**
 * 取得融資融券統計
 */
export const getMarginSummary = async (params?: { date?: string; limit?: number }) => {
    return api.get<Array<{ stock: Stock; margin: MarginTrading }>>('/margin/summary', { params });
};

// ==================== 綜合查詢 ====================

/**
 * 取得股票完整資料 (包含所有資料類型)
 */
export const getStockCompleteData = async (stockCode: string, date?: string) => {
    return api.get<StockCompleteData>(`/stocks/${stockCode}/complete`, {
        params: { date },
    });
};

/**
 * 取得儀表板摘要資料
 */
export const getDashboardSummary = async (date?: string) => {
    return api.get<DashboardSummary>('/dashboard/summary', {
        params: { date },
    });
};

// ==================== 搜尋功能 ====================

/**
 * 搜尋股票 (支援股票代碼和名稱)
 */
export const searchStocks = async (query: string) => {
    return api.get<Stock[]>('/stocks', {
        params: { search: query, pageSize: 10 },
    });
};

// ==================== 匯出功能 ====================

/**
 * 匯出股票資料
 */
export const exportStockData = async (
    stockCode: string,
    format: 'csv' | 'json',
    params?: DateRangeParams
) => {
    const response = await api.get<Blob>(`/stocks/${stockCode}/export`, {
        params: { ...params, format },
        responseType: 'blob',
    });

    // 建立下載連結
    const url = window.URL.createObjectURL(new Blob([response.data as any]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${stockCode}_${format}.${format}`);
    document.body.appendChild(link);
    link.click();
    link.remove();

    return response;
};

// ==================== 統計功能 ====================

/**
 * 取得股票統計資料
 */
export const getStockStatistics = async (
    stockCode: string,
    params?: DateRangeParams
) => {
    return api.get(`/stocks/${stockCode}/statistics`, { params });
};
