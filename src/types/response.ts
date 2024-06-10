import { Token } from '@/types/token';
import { TUser } from '@/types/user';

export type TRefreshTokenResponse = {
  token: string;
  refreshToken: string;
  expires: { token: number; refreshToken: number };
};
export type TSignInResponse = {
  expiresIn: {
    token: number;
    refreshToken: number;
  };
  userResponse: TUser;
} & Token;

export type TableApiResponse<T> = {
  page: number;
  pages: number;
  size: number;
  total: number;
  items: T;
};
