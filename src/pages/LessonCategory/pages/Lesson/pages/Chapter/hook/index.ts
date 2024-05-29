import { deleteChapterLesson, getChapterLessonByLessonId } from '@/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useChapterLesson = (id?: string) =>
  useQuery([`chapter-lesson`, id], () => getChapterLessonByLessonId(id), {
    enabled: !!id,
  });

export const useDeleteChapterLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteChapterLesson(id),
    onSuccess() {
      queryClient.invalidateQueries(['chapter-lesson']);
    },
    onError(error) {
      const errorMessage = error as { message: string };
      toast.error(errorMessage.message);
    },
  });
};
