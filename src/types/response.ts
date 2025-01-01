export type TRefreshTokenResponse = {
  token: string;
  refreshToken: string;
  expires: { token: number; refreshToken: number };
};

export type TableApiResponse<T> = {
  page: number;
  pages: number;
  size: number;
  total: number;
  data: T;
};
