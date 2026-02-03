// ========================================
// Stock Controller
// 股票控制器 (使用模擬資料)
// ========================================

import { Request, Response, NextFunction } from 'express';

// ==================== 模擬資料 ====================

const mockStocks = [
    { id: '1', stockCode: '2330', stockName: '台積電', industry: '半導體', marketType: '上市', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '2', stockCode: '2317', stockName: '鴻海', industry: '電子', marketType: '上市', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '3', stockCode: '2454', stockName: '聯發科', industry: '半導體', marketType: '上市', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '4', stockCode: '2881', stockName: '富邦金', industry: '金融', marketType: '上市', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '5', stockCode: '2882', stockName: '國泰金', industry: '金融', marketType: '上市', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

// ==================== 股票管理 ====================

/**
 * 取得股票清單
 */
export const getStocks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { search, page = 1, pageSize = 20 } = req.query;

        let filteredStocks = [...mockStocks];

        // 搜尋功能
        if (search) {
            const searchTerm = (search as string).toLowerCase();
            filteredStocks = filteredStocks.filter(
                stock =>
                    stock.stockCode.toLowerCase().includes(searchTerm) ||
                    stock.stockName.toLowerCase().includes(searchTerm)
            );
        }

        // 分頁
        const startIndex = (Number(page) - 1) * Number(pageSize);
        const endIndex = startIndex + Number(pageSize);
        const paginatedStocks = filteredStocks.slice(startIndex, endIndex);

        res.json({
            success: true,
            data: paginatedStocks,
            meta: {
                timestamp: new Date().toISOString(),
                page: Number(page),
                pageSize: Number(pageSize),
                totalCount: filteredStocks.length,
                totalPages: Math.ceil(filteredStocks.length / Number(pageSize)),
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * 取得特定股票資訊
 */
export const getStock = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { stockCode } = req.params;
        const stock = mockStocks.find(s => s.stockCode === stockCode);

        if (!stock) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 'NOT_FOUND',
                    message: `Stock ${stockCode} not found`,
                },
            });
        }

        res.json({
            success: true,
            data: stock,
            meta: {
                timestamp: new Date().toISOString(),
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * 新增股票
 */
export const createStock = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { stockCode, stockName, industry, marketType } = req.body;

        // 驗證
        if (!stockCode || !stockName) {
            return res.status(400).json({
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Stock code and name are required',
                },
            });
        }

        // 檢查是否已存在
        const existingStock = mockStocks.find(s => s.stockCode === stockCode);
        if (existingStock) {
            return res.status(409).json({
                success: false,
                error: {
                    code: 'CONFLICT',
                    message: `Stock ${stockCode} already exists`,
                },
            });
        }

        const newStock = {
            id: String(mockStocks.length + 1),
            stockCode,
            stockName,
            industry: industry || '',
            marketType: marketType || '上市',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        mockStocks.push(newStock);

        res.status(201).json({
            success: true,
            data: newStock,
            meta: {
                timestamp: new Date().toISOString(),
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * 更新股票資訊
 */
export const updateStock = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { stockCode } = req.params;
        const updates = req.body;

        const stockIndex = mockStocks.findIndex(s => s.stockCode === stockCode);

        if (stockIndex === -1) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 'NOT_FOUND',
                    message: `Stock ${stockCode} not found`,
                },
            });
        }

        mockStocks[stockIndex] = {
            ...mockStocks[stockIndex],
            ...updates,
            updatedAt: new Date().toISOString(),
        };

        res.json({
            success: true,
            data: mockStocks[stockIndex],
            meta: {
                timestamp: new Date().toISOString(),
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * 刪除股票
 */
export const deleteStock = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { stockCode } = req.params;
        const stockIndex = mockStocks.findIndex(s => s.stockCode === stockCode);

        if (stockIndex === -1) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 'NOT_FOUND',
                    message: `Stock ${stockCode} not found`,
                },
            });
        }

        mockStocks.splice(stockIndex, 1);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

// ==================== 每日交易資料 ====================

export const getTradingData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json({
            success: true,
            data: [],
            meta: { timestamp: new Date().toISOString() },
        });
    } catch (error) {
        next(error);
    }
};

export const createTradingData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(201).json({
            success: true,
            data: req.body,
            meta: { timestamp: new Date().toISOString() },
        });
    } catch (error) {
        next(error);
    }
};

// ==================== 三大法人資料 ====================

export const getInstitutionalData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json({
            success: true,
            data: [],
            meta: { timestamp: new Date().toISOString() },
        });
    } catch (error) {
        next(error);
    }
};

export const createInstitutionalData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(201).json({
            success: true,
            data: req.body,
            meta: { timestamp: new Date().toISOString() },
        });
    } catch (error) {
        next(error);
    }
};

// ==================== 融資融券資料 ====================

export const getMarginData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json({
            success: true,
            data: [],
            meta: { timestamp: new Date().toISOString() },
        });
    } catch (error) {
        next(error);
    }
};

export const createMarginData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(201).json({
            success: true,
            data: req.body,
            meta: { timestamp: new Date().toISOString() },
        });
    } catch (error) {
        next(error);
    }
};

// ==================== 綜合查詢 ====================

export const getStockCompleteData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { stockCode } = req.params;
        const stock = mockStocks.find(s => s.stockCode === stockCode);

        if (!stock) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 'NOT_FOUND',
                    message: `Stock ${stockCode} not found`,
                },
            });
        }

        res.json({
            success: true,
            data: {
                stock,
                tradingData: null,
                institutional: null,
                margin: null,
            },
            meta: { timestamp: new Date().toISOString() },
        });
    } catch (error) {
        next(error);
    }
};
