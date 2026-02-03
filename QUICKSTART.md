# 快速啟動指南

## 🚀 啟動應用程式

### 1. 啟動後端伺服器

開啟第一個終端機：

```bash
cd backend
npm run dev
```

後端將在 `http://localhost:3000` 啟動

### 2. 啟動前端應用

開啟第二個終端機：

```bash
cd frontend
npm run dev
```

前端將在 `http://localhost:5173` 啟動

### 3. 開啟瀏覽器

在瀏覽器中開啟: http://localhost:5173

## 📝 測試 API

### 健康檢查

```bash
curl http://localhost:3000/health
```

### 取得股票清單

```bash
curl http://localhost:3000/api/v1/stocks
```

### 搜尋股票

```bash
curl "http://localhost:3000/api/v1/stocks?search=台積電"
```

### 取得特定股票

```bash
curl http://localhost:3000/api/v1/stocks/2330
```

## 🎨 功能展示

### 已完成功能

✅ **前端**
- 現代化設計系統（支援深色/淺色模式）
- 響應式 Header 導航列
- Dashboard 儀表板頁面
- 市場概況統計卡片
- 股票排行榜（漲幅、跌幅、成交量、法人買超）
- 完整的 TypeScript 型別定義
- API 服務層整合
- 實用的格式化工具函數

✅ **後端**
- RESTful API 架構
- Express + TypeScript
- CORS 設定
- 錯誤處理中介軟體
- 股票 CRUD 操作
- 模擬資料（5 檔股票）
- 健康檢查端點

### 待開發功能

🔲 股票搜尋頁面（進階篩選）
🔲 股票詳細資料頁面（圖表視覺化）
🔲 資料管理頁面（批次匯入）
🔲 資料庫整合（PostgreSQL + Prisma）
🔲 真實台股資料來源整合
🔲 圖表元件（Chart.js / Recharts）
🔲 資料快取（Redis）
🔲 排程任務（定期更新資料）

## 🛠️ 開發工具

### 重新啟動伺服器

後端會自動重新載入（nodemon）
前端會自動熱更新（Vite HMR）

### 建置生產版本

**前端:**
```bash
cd frontend
npm run build
```

**後端:**
```bash
cd backend
npm run build
npm start
```

## 📦 專案結構

```
StockProject/
├── frontend/              # React 前端
│   ├── src/
│   │   ├── components/   # UI 元件
│   │   ├── pages/        # 頁面
│   │   ├── services/     # API 服務
│   │   ├── styles/       # 全域樣式
│   │   ├── types/        # TypeScript 型別
│   │   └── utils/        # 工具函數
│   └── package.json
│
├── backend/              # Express 後端
│   ├── src/
│   │   ├── controllers/  # 控制器
│   │   ├── routes/       # 路由
│   │   └── app.ts        # 主程式
│   └── package.json
│
└── README.md
```

## 🎯 下一步

1. 在瀏覽器開啟 http://localhost:5173
2. 查看 Dashboard 儀表板
3. 切換深色/淺色主題
4. 測試響應式設計（調整瀏覽器視窗大小）
5. 開啟開發者工具查看 API 請求

## 💡 提示

- 前端預設連接到 `http://localhost:3000/api/v1`
- 後端目前使用模擬資料（5 檔股票）
- 所有 API 回應都遵循統一的格式
- 支援分頁、搜尋、排序功能

## 🐛 常見問題

**Q: 前端無法連接到後端？**
A: 確認後端已啟動在 port 3000，並檢查 CORS 設定

**Q: 修改程式碼後沒有更新？**
A: 前端會自動熱更新，後端會自動重啟（nodemon）

**Q: 想要修改 API 端點？**
A: 編輯 `frontend/.env` 中的 `VITE_API_BASE_URL`

---

享受開發！🎉
