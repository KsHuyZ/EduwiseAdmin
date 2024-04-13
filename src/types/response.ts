export type PaginateResponse<T> = {
  limit: number;
  page: number;
  results: T;
  totalPages: number;
  totalResults: number;
};
