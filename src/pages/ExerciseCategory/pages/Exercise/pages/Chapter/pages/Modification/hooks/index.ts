import {
  createChapterExercise,
  getChapterExerciseById,
  updateChapterExercise,
} from '@/api';
import { TChapterExercise } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useChapterExercise = (id?: string) =>
  useQuery(['chapter-exercise', id], () => getChapterExerciseById(id!), {
    enabled: !!id,
  });

export const useModificationChapterExercise = (id?: string) =>
  useMutation({
    mutationFn: (chapter: TChapterExercise) => {
      if (id) {
        return updateChapterExercise(chapter);
      }
      return createChapterExercise(chapter);
    },
    onSuccess: () => {
      toast.success(`${id ? 'Update' : 'Create'} chapter success`);
    },
    onError(error) {
      const errorMessage = error as { message: string };
      toast.error(errorMessage.message);
    },
  });
