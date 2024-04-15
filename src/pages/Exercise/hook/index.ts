import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createExercise,
  createExerciseCategory,
  getExerciseByCategoryId,
  getExerciseCategory,
  updateCategory,
  updateExercise,
} from '../api';
import { Category } from '@/types/category';
import { queryClient } from '@/App';
import { Exercise } from '@/types';

export const useExerciseCategory = (name?: string) =>
  useQuery([`exercise-category${name}`], () => getExerciseCategory(name));

export const useCreateCategory = (id?: string) =>
  useMutation({
    mutationFn: (category: Category) =>
      id
        ? updateCategory({ ...category, id })
        : createExerciseCategory(category),
    onSuccess: () => {
      queryClient.prefetchQuery(['exercise-category']);
    },
  });

export const useExerciseCategoryId = (id: string, title: string) =>
  useQuery([`exercise-category${title}`, id], () =>
    getExerciseByCategoryId(id, title),
  );

export const useChangeExercise = (id: string, exerciseId?: string) =>
  useMutation({
    mutationFn: (exercise: Exercise) => {
      if (!exerciseId) {
        return createExercise(exercise);
      }
      return updateExercise(exerciseId, exercise);
    },
    onSuccess: () => {
      queryClient.prefetchQuery(['lesson-category', id]);
    },
  });
// export const useLesson = (id?: string) =>
//   useQuery(['lesson', id], () => getLessonById(id!), {
//     enabled: !!id,
//   });
