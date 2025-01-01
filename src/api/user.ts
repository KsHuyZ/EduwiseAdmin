import { api } from '@/lib/api';
import { StatusEnum, TUser, TableApiResponse } from '@/types';

export const getUsers = ({
  pageParam = 1,
}): Promise<TableApiResponse<TUser[]>> =>
  api.get('/users?page=' + pageParam + '&limit=20');

export const changeStatusUser = ({
  id,
  status,
}: {
  id: string;
  status: StatusEnum;
}) => api.put(`/users/${id}/status`, { status });
