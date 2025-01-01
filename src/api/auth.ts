import { api } from '@/lib/api';
import { SignInResponse, Token,  TUserCredential } from '@/types';

export const refreshToken = (token: string): Promise<Token> =>
  api.post('/auth/refresh', `Bearer ${token}`);
export const login = (values: TUserCredential): Promise<SignInResponse> =>
  api.post('/auth/email/login', values);
export const logout = () => api.get('/auth/logout');
