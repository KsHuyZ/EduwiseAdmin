import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Category } from '@/types';
import {
  createExerciseCategory,
  getExerciseCategory,
  updateExerciseCategory,
} from '@/api';

export const useExerciseCategory = (name: string, page?: string | null) =>
  useQuery([`exercise-category`, name, page], () =>
    getExerciseCategory(name, page),
  );

export const useCreateCategory = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (category: Category) =>
      id
        ? updateExerciseCategory({ ...category, id })
        : createExerciseCategory(category),
    onSuccess: () => {
      queryClient.invalidateQueries(['exercise-category']);
    },
  });
};