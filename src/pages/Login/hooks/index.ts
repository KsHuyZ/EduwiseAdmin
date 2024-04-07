import { useMutation } from '@tanstack/react-query';
import { UserCredential } from '../../../types/user';
import { login } from '../../../api/auth';

export const useLogin = () =>
  useMutation(['login'], (body: UserCredential) => login(body));
