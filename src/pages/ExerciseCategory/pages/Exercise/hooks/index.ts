import { createExercise, getExerciseByCategoryId, updateExercise } from '@/api';
import { Exercise } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useExerciseCategoryId = (
  id: string,
  title: string,
  page: string,
) =>
  useQuery([`exercise-category`, id, title, page], () =>
    getExerciseByCategoryId(id, title, page),
  );

export const useModificationExercise = (exerciseId?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (exercise: Exercise) => {
      if (!exerciseId) {
        return createExercise(exercise);
      }
      return updateExercise(exerciseId, exercise);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['exercise-category']);
    },
  });
};
