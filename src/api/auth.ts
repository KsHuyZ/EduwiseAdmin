import { api } from '../lib/api';
import { AuthToken } from '../types/token';
import { User, UserCredential } from '../types/user';

type AuthResponse = {
  user: User;
  tokens: AuthToken;
};

export const refreshToken = (token: string): Promise<AuthToken> =>
  api.post('/auth/refresh-tokens', { refreshToken: token });
export const login = (values: UserCredential): Promise<AuthResponse> =>
  api.post('/auth/login-admin', values);
export const logout = (refreshToken: string) =>
  api.post('/auth/logout', { refreshToken });
