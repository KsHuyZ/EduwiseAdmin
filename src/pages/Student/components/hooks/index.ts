import { changeStatusUser } from '@/api';
import { useMutation } from '@tanstack/react-query';

export const useUserAction = () =>
  useMutation({
    mutationFn: changeStatusUser,
  });
