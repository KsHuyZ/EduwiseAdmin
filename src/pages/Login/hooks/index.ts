import { useMutation } from '@tanstack/react-query';
import { TUserCredential } from '../../../types/user';
import { login } from '../../../api/auth';
import toast from 'react-hot-toast';
import { validateError } from '@/utils';

export const useLogin = () => {
  return useMutation({
    mutationFn: (body: TUserCredential) => login(body),
    onSuccess() {
      toast.success('Sign in success!');
    },
    onError(error) {
      toast.error(validateError(error));
    },
  });
};
