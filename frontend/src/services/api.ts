// ========================================
// API Service
// 台股資料管理系統 API 服務層
// ========================================

import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import type { ApiResponse, ApiError } from '../types';

// API 基礎 URL (可透過環境變數設定)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

// 建立 Axios 實例
const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 請求攔截器
apiClient.interceptors.request.use(
    (config) => {
        // 可以在這裡加入 token 或其他 headers
        // const token = localStorage.getItem('token');
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 回應攔截器
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: AxiosError<ApiError>) => {
        // 統一錯誤處理
        if (error.response) {
            // 伺服器回應錯誤
            const apiError = error.response.data;
            console.error('API Error:', apiError);

            // 可以在這裡處理特定的錯誤狀態碼
            switch (error.response.status) {
                case 401:
                    // 未授權 - 可以導向登入頁
                    console.error('Unauthorized access');
                    break;
                case 403:
                    // 禁止存取
                    console.error('Forbidden access');
                    break;
                case 404:
                    // 資源不存在
                    console.error('Resource not found');
                    break;
                case 500:
                    // 伺服器錯誤
                    console.error('Internal server error');
                    break;
            }
        } else if (error.request) {
            // 請求已發送但沒有收到回應
            console.error('No response received:', error.request);
        } else {
            // 其他錯誤
            console.error('Error:', error.message);
        }

        return Promise.reject(error);
    }
);

// ==================== 通用 API 方法 ====================

export const api = {
    /**
     * GET 請求
     */
    async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await apiClient.get<ApiResponse<T>>(url, config);
        return response.data;
    },

    /**
     * POST 請求
     */
    async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await apiClient.post<ApiResponse<T>>(url, data, config);
        return response.data;
    },

    /**
     * PUT 請求
     */
    async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await apiClient.put<ApiResponse<T>>(url, data, config);
        return response.data;
    },

    /**
     * PATCH 請求
     */
    async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await apiClient.patch<ApiResponse<T>>(url, data, config);
        return response.data;
    },

    /**
     * DELETE 請求
     */
    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await apiClient.delete<ApiResponse<T>>(url, config);
        return response.data;
    },
};

// ==================== 錯誤處理輔助函數 ====================

/**
 * 從 Axios 錯誤中提取錯誤訊息
 */
export const getErrorMessage = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        const apiError = error.response?.data as ApiError;
        return apiError?.error?.message || error.message || '發生未知錯誤';
    }

    if (error instanceof Error) {
        return error.message;
    }

    return '發生未知錯誤';
};

/**
 * 檢查是否為 API 錯誤
 */
export const isApiError = (error: unknown): error is AxiosError<ApiError> => {
    return axios.isAxiosError(error);
};

export default apiClient;
