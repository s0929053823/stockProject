// ========================================
// Backend Application Entry Point
// 台股資料管理系統後端 API
// ========================================

import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import stockRoutes from './routes/stock.routes';

// 載入環境變數
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// ==================== 中介軟體 ====================

// CORS 設定
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
}));

// JSON 解析
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 請求日誌
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

// ==================== 路由 ====================

// 健康檢查
app.get('/health', (req: Request, res: Response) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
    });
});

// API 路由
app.use('/api/v1/stocks', stockRoutes);

// 404 處理
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        error: {
            code: 'NOT_FOUND',
            message: 'Route not found',
        },
    });
});

// ==================== 錯誤處理 ====================

interface ApiError extends Error {
    statusCode?: number;
    code?: string;
}

app.use((err: ApiError, req: Request, res: Response) => {
    console.error('Error:', err);

    const statusCode = err.statusCode || 500;
    const errorCode = err.code || 'INTERNAL_ERROR';
    const message = err.message || 'An error occurred';

    res.status(statusCode).json({
        success: false,
        error: {
            code: errorCode,
            message: process.env.NODE_ENV === 'production' ? 'An error occurred' : message,
        },
        meta: {
            timestamp: new Date().toISOString(),
        },
    });
});

// ==================== 啟動伺服器 ====================

app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🚀 台股資料管理系統 API Server                      ║
║                                                       ║
║   Server running on: http://localhost:${PORT}        ║
║   Environment: ${process.env.NODE_ENV || 'development'}                     ║
║   Time: ${new Date().toLocaleString('zh-TW')}         ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
  `);
});

export default app;
