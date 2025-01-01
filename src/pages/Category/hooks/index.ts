import { createCategory, getCategory } from '@/api';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useCategories = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: getCategory,
  });

export const useMutateCategory = () =>
  useMutation({
    mutationFn: createCategory,
  });
