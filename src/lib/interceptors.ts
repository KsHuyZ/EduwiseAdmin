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
    config.headers.set('Authorization', `Bearer ${authToken.access.token}`);
  }
  return config;
};

export const successInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response.data;
};

export const errorInterceptor = async (error: AxiosError): Promise<void> => {
  console.log('err: ', error);
  const originalRequest = error.config;
  if (
    (error.status === 401 || error.status === 403) &&
    !originalRequest._retry
  ) {
    originalRequest._retry = true;
    const token = getItem('token') as AuthToken;
    const refresh = token.refresh.token;
    if (!refresh) {
      const result = await refreshToken(refresh);
      setItem('token', result);
      originalRequest.headers.Authorization = 'Bearer ' + result.access.token;
      return await api(originalRequest);
    }
  }
  return await Promise.reject(error.response?.data);
};
