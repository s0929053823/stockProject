// ========================================
// Stock Routes
// 股票相關路由
// ========================================

import { Router } from 'express';
import * as stockController from '../controllers/stock.controller';

const router = Router();

// ==================== 股票管理 ====================

// 取得股票清單
router.get('/', stockController.getStocks);

// 取得特定股票資訊
router.get('/:stockCode', stockController.getStock);

// 新增股票
router.post('/', stockController.createStock);

// 更新股票資訊
router.put('/:stockCode', stockController.updateStock);

// 刪除股票
router.delete('/:stockCode', stockController.deleteStock);

// ==================== 每日交易資料 ====================

// 取得股票交易資料
router.get('/:stockCode/trading', stockController.getTradingData);

// 新增交易資料
router.post('/:stockCode/trading', stockController.createTradingData);

// ==================== 三大法人資料 ====================

// 取得股票法人資料
router.get('/:stockCode/institutional', stockController.getInstitutionalData);

// 新增法人資料
router.post('/:stockCode/institutional', stockController.createInstitutionalData);

// ==================== 融資融券資料 ====================

// 取得股票融資融券資料
router.get('/:stockCode/margin', stockController.getMarginData);

// 新增融資融券資料
router.post('/:stockCode/margin', stockController.createMarginData);

// ==================== 綜合查詢 ====================

// 取得股票完整資料
router.get('/:stockCode/complete', stockController.getStockCompleteData);

export default router;
