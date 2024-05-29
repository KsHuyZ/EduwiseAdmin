import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createLesson,
  createLessonCategory,
  getLessonByCategoryId,
  getLessonById,
  getLessonCategory,
  updateLesson,
} from '@/api';
import { Category } from '@/types/category';
import { Lesson } from '@/types';
import toast from 'react-hot-toast';

export const useLessonCategory = (name?: string, page?: string) =>
  useQuery(['lesson-category', name, page], () =>
    getLessonCategory(name, page),
  );

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (category: Category) => createLessonCategory(category),
    onSuccess: () => {
      queryClient.invalidateQueries(['lesson-category']);
    },
  });
};

export const useLessonCategoryId = (id: string, title: string, page: string) =>
  useQuery(['lesson', id, title, page], () =>
    getLessonByCategoryId(id, title, page),
  );

export const useChangeLesson = (id: string, lessonId?: string) => {
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
  });
};

export const useLesson = (id?: string) =>
  useQuery(['lesson', id], () => getLessonById(id!), {
    enabled: !!id,
  });
