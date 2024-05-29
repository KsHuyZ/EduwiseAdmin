import {
  deleteChapterExercise,
  getChapterExerciseByExerciseId,
  getExerciseById,
} from '@/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useExercise = (id?: string) =>
  useQuery(['exercise', id], () => getExerciseById(id!), {
    enabled: !!id,
  });

export const useChapterExercise = (id?: string) =>
  useQuery(
    [`chapter-exercise`, id],
    () => getChapterExerciseByExerciseId(id!),
    {
      enabled: !!id,
    },
  );

export const useDeleteChapterExercise = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteChapterExercise(id),
    onSuccess() {
      queryClient.invalidateQueries(['chapter-exercise']);
    },
    onError(error) {
      const errorMessage = error as { message: string };
      toast.error(errorMessage.message);
    },
  });
};
