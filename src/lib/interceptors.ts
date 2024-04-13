import {
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { refreshToken } from '../api/auth';
import { AuthToken } from '../types/token';
import { api } from './api';
import { getItem, setItem } from '../utils/storage';

export interface ConsoleError {
  status: number;
  data: unknown;
}

export const requestInterceptor = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const authToken = getItem('token') as AuthToken | null;

  if (authToken?.access) {
    config.headers.Authorization = `Bearer ${authToken.access.token}`;
  }
  return config;
};

export const successInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response.data;
};

export const errorInterceptor = async (error: AxiosError): Promise<void> => {
  const errorResponse = error.response;
  const originalRequest = errorResponse?.config;
  console.log(errorResponse?.status);
  if (errorResponse?.status === 401 || errorResponse?.status === 403) {
    const token = getItem('token') as AuthToken;
    const refresh = token.refresh.token;
    if (refresh) {
      const result = await refreshToken(refresh);
      setItem('token', result);
      originalRequest!.headers.Authorization = 'Bearer ' + result.access.token;
      return api(originalRequest!);
    }
  }
  return await Promise.reject(error.response?.data);
};
