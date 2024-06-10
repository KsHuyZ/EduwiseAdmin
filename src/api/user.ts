import { api } from '@/lib/api';
import { TUser, TableApiResponse } from '@/types';

export const getUsers = async (): Promise<TableApiResponse<TUser[]>> =>
  api.get('/admin/users');

export const changeStatusUser = (id: string) => api.patch(`/admin/users/${id}`);
