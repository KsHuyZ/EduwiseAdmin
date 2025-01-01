import { changeStatusUser, getUsers } from '@/api';
import { StatusEnum } from '@/types';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';

export const useUsers = () =>
  useInfiniteQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });

export const useUpdateUser = () =>
  useMutation({
    mutationFn: ({ id, status }: { id: string; status: StatusEnum }) =>
      changeStatusUser({ id, status }),
  });
