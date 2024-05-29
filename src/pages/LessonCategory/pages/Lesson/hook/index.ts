import { createLesson, updateLesson } from '@/api';
import { Lesson, TErrorResponse } from '@/types';
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useChangeLesson = (
  lessonId?: string,
): UseMutationResult<Lesson, TErrorResponse, Lesson, unknown> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (lesson: Lesson) => {
      if (!lessonId) {
        return createLesson(lesson);
      }
      return updateLesson(lessonId, lesson);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['lesson']);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
