export type PaginateResponse<T> = {
  limit: number;
  page: number;
  results: T;
  totalPages: number;
  totalResults: number;
};

export type TErrorResponse = {
  code: number;
  message: string;
  stack: string;
};
