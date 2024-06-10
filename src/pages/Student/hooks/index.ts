import { changeStatusUser, getUsers } from '@/api';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useUsers = () =>
  useQuery({ queryKey: ['users'], queryFn: getUsers });

export const useUpdateUser = () =>
  useMutation({ mutationFn: (id: string) => changeStatusUser(id) });
