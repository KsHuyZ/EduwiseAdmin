import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createExercise,
  createExerciseCategory,
  getExerciseByCategoryId,
  getExerciseById,
  getExerciseCategory,
  updateCategory,
  updateExercise,
} from '../api';
import { Category } from '@/types/category';
import { Exercise } from '@/types';

export const useExerciseCategory = (name: string, page?: string | null) =>
  useQuery([`exercise-category`, name, page], () =>
    getExerciseCategory(name, page),
  );

export const useCreateCategory = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (category: Category) =>
      id
        ? updateCategory({ ...category, id })
        : createExerciseCategory(category),
    onSuccess: () => {
      queryClient.invalidateQueries(['exercise-category']);
    },
  });
};

export const useExerciseCategoryId = (
  id: string,
  title: string,
  page: string,
) =>
  useQuery([`exercise-category`, id, title, page], () =>
    getExerciseByCategoryId(id, title, page),
  );

export const useChangeExercise = (id: string, exerciseId?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (exercise: Exercise) => {
      if (!exerciseId) {
        return createExercise(exercise);
      }
      return updateExercise(exerciseId, exercise);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['lesson-category', id]);
    },
  });
};

export const useExercise = (id?: string) =>
  useQuery(['exercise', id], () => getExerciseById(id!), {
    enabled: !!id,
  });
