// ========================================
// Utility Functions - Formatters
// 格式化工具函數
// ========================================

/**
 * 格式化數字為千分位格式
 * @example formatNumber(1234567) => "1,234,567"
 */
export const formatNumber = (num: number | null | undefined): string => {
    if (num === null || num === undefined || isNaN(num)) {
        return '-';
    }
    return num.toLocaleString('zh-TW');
};

/**
 * 格式化金額 (加上貨幣符號)
 * @example formatCurrency(1234567) => "NT$ 1,234,567"
 */
export const formatCurrency = (amount: number | null | undefined, currency = 'NT$'): string => {
    if (amount === null || amount === undefined || isNaN(amount)) {
        return '-';
    }
    return `${currency} ${formatNumber(amount)}`;
};

/**
 * 格式化百分比
 * @example formatPercent(0.1234) => "12.34%"
 */
export const formatPercent = (
    value: number | null | undefined,
    decimals = 2
): string => {
    if (value === null || value === undefined || isNaN(value)) {
        return '-';
    }
    return `${(value * 100).toFixed(decimals)}%`;
};

/**
 * 格式化漲跌幅 (帶正負號和顏色類別)
 * @example formatChange(5.5) => { text: "+5.50", className: "text-success" }
 */
export const formatChange = (
    value: number | null | undefined,
    decimals = 2
): { text: string; className: string } => {
    if (value === null || value === undefined || isNaN(value)) {
        return { text: '-', className: '' };
    }

    const sign = value > 0 ? '+' : '';
    const text = `${sign}${value.toFixed(decimals)}`;
    const className = value > 0 ? 'text-success' : value < 0 ? 'text-danger' : 'text-muted';

    return { text, className };
};

/**
 * 格式化漲跌幅百分比 (帶正負號和顏色類別)
 * @example formatChangePercent(0.055) => { text: "+5.50%", className: "text-success" }
 */
export const formatChangePercent = (
    value: number | null | undefined,
    decimals = 2
): { text: string; className: string } => {
    if (value === null || value === undefined || isNaN(value)) {
        return { text: '-', className: '' };
    }

    const percentValue = value * 100;
    const sign = percentValue > 0 ? '+' : '';
    const text = `${sign}${percentValue.toFixed(decimals)}%`;
    const className = percentValue > 0 ? 'text-success' : percentValue < 0 ? 'text-danger' : 'text-muted';

    return { text, className };
};

/**
 * 格式化日期
 * @example formatDate('2026-02-03') => "2026/02/03"
 */
export const formatDate = (dateString: string | null | undefined, format = 'YYYY/MM/DD'): string => {
    if (!dateString) {
        return '-';
    }

    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return '-';
        }

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        switch (format) {
            case 'YYYY/MM/DD':
                return `${year}/${month}/${day}`;
            case 'YYYY-MM-DD':
                return `${year}-${month}-${day}`;
            case 'MM/DD':
                return `${month}/${day}`;
            case 'YYYY年MM月DD日':
                return `${year}年${month}月${day}日`;
            default:
                return `${year}/${month}/${day}`;
        }
    } catch (error) {
        return '-';
    }
};

/**
 * 格式化日期時間
 * @example formatDateTime('2026-02-03T10:30:00') => "2026/02/03 10:30"
 */
export const formatDateTime = (dateTimeString: string | null | undefined): string => {
    if (!dateTimeString) {
        return '-';
    }

    try {
        const date = new Date(dateTimeString);
        if (isNaN(date.getTime())) {
            return '-';
        }

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}/${month}/${day} ${hours}:${minutes}`;
    } catch (error) {
        return '-';
    }
};

/**
 * 格式化相對時間
 * @example formatRelativeTime('2026-02-02T10:00:00') => "1 天前"
 */
export const formatRelativeTime = (dateTimeString: string | null | undefined): string => {
    if (!dateTimeString) {
        return '-';
    }

    try {
        const date = new Date(dateTimeString);
        if (isNaN(date.getTime())) {
            return '-';
        }

        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHour = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHour / 24);

        if (diffSec < 60) {
            return '剛剛';
        } else if (diffMin < 60) {
            return `${diffMin} 分鐘前`;
        } else if (diffHour < 24) {
            return `${diffHour} 小時前`;
        } else if (diffDay < 7) {
            return `${diffDay} 天前`;
        } else {
            return formatDate(dateTimeString);
        }
    } catch (error) {
        return '-';
    }
};

/**
 * 格式化大數字 (K, M, B)
 * @example formatLargeNumber(1234567) => "1.23M"
 */
export const formatLargeNumber = (num: number | null | undefined, decimals = 2): string => {
    if (num === null || num === undefined || isNaN(num)) {
        return '-';
    }

    const absNum = Math.abs(num);
    const sign = num < 0 ? '-' : '';

    if (absNum >= 1e9) {
        return `${sign}${(absNum / 1e9).toFixed(decimals)}B`;
    } else if (absNum >= 1e6) {
        return `${sign}${(absNum / 1e6).toFixed(decimals)}M`;
    } else if (absNum >= 1e3) {
        return `${sign}${(absNum / 1e3).toFixed(decimals)}K`;
    } else {
        return `${sign}${absNum.toFixed(decimals)}`;
    }
};

/**
 * 格式化股票代碼 (確保格式一致)
 * @example formatStockCode('2330') => "2330"
 */
export const formatStockCode = (code: string | null | undefined): string => {
    if (!code) {
        return '-';
    }
    return code.trim().toUpperCase();
};

/**
 * 縮短文字 (超過長度則加上省略號)
 * @example truncateText('這是一段很長的文字', 10) => "這是一段很長..."
 */
export const truncateText = (text: string | null | undefined, maxLength: number): string => {
    if (!text) {
        return '-';
    }
    if (text.length <= maxLength) {
        return text;
    }
    return `${text.substring(0, maxLength)}...`;
};

/**
 * 計算漲跌幅
 * @example calculateChangePercent(100, 110) => 0.1 (10%)
 */
export const calculateChangePercent = (
    previousValue: number,
    currentValue: number
): number | null => {
    if (!previousValue || previousValue === 0) {
        return null;
    }
    return (currentValue - previousValue) / previousValue;
};

/**
 * 格式化成交量 (轉換為張數)
 * @example formatVolume(1000000) => "1,000 張"
 */
export const formatVolume = (shares: number | null | undefined): string => {
    if (shares === null || shares === undefined || isNaN(shares)) {
        return '-';
    }
    const lots = shares / 1000; // 1張 = 1000股
    return `${formatNumber(Math.floor(lots))} 張`;
};

/**
 * 格式化成交金額 (轉換為萬元或億元)
 * @example formatTradingValue(123456789) => "1.23 億"
 */
export const formatTradingValue = (value: number | null | undefined): string => {
    if (value === null || value === undefined || isNaN(value)) {
        return '-';
    }

    if (value >= 1e8) {
        return `${(value / 1e8).toFixed(2)} 億`;
    } else if (value >= 1e4) {
        return `${(value / 1e4).toFixed(2)} 萬`;
    } else {
        return formatNumber(value);
    }
};
