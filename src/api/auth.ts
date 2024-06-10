import { api } from '@/lib/api';
import { Token, TSignInResponse, TUserCredential } from '@/types';

export const refreshToken = (token: string): Promise<Token> =>
  api.post('/auth/refresh', `Bearer ${token}`);
export const login = (values: TUserCredential): Promise<TSignInResponse> =>
  api.post('/auth/login', values);
export const logout = () => api.get('/auth/logout');
