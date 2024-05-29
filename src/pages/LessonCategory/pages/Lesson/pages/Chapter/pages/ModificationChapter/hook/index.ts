import {
  createChapterLesson,
  getChapterLessonById,
  updateChapterLessonById,
} from '@/api';
import { TChapterLesson } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useChapterLesson = (id?: string) =>
  useQuery({
    queryKey: ['chapter-lesson', id],
    queryFn: () => getChapterLessonById(id),
    enabled: !!id,
  });

export const useModificationChapter = () =>
  useMutation({
    mutationFn: ({ id, chapter }: { id?: string; chapter: TChapterLesson }) =>
      id ? updateChapterLessonById(id, chapter) : createChapterLesson(chapter),
    onError(error) {
      const errorMessage = error as { message: string };
      toast.error(errorMessage.message);
    },
  });
