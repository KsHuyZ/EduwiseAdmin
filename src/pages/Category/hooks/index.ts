import { getCategory } from '@/api';
import { useQuery } from '@tanstack/react-query';

export const useCategories = () =>
  useQuery({ queryKey: ['categories'], queryFn: getCategory });
