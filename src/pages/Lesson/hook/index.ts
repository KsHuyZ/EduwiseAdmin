import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createLesson,
  createLessonCategory,
  getLessonByCategoryId,
  getLessonById,
  getLessonCategory,
  updateLesson,
} from '../api';
import { Category } from '@/types/category';
import { queryClient } from '@/App';
import { PaginateResponse } from '@/types/response';
import { Lesson } from '@/types';

export const useLessonCategory = (name?: string) =>
  useQuery(['lesson-category', name], () => getLessonCategory(name));

export const useCreateCategory = () =>
  useMutation({
    mutationFn: (category: Category) => createLessonCategory(category),
    onSuccess: (newItem) => {
      queryClient.setQueryData(
        ['lesson-category'],
        (oldItems: PaginateResponse<Category[]> | undefined) => {
          return oldItems
            ? { ...oldItems, results: [...oldItems.results, newItem] }
            : {
                results: [],
                page: 1,
                limit: 10,
                totalPages: 1,
                totalResults: 0,
              };
        },
      );
    },
  });

export const useLessonCategoryId = (id: string, title: string) =>
  useQuery(['lesson-category', id, title], () => getLessonByCategoryId(id, title));

export const useChangeLesson = (id: string, lessonId?: string) =>
  useMutation({
    mutationFn: (lesson: Lesson) => {
      if (!lessonId) {
        return createLesson(lesson);
      }
      return updateLesson(lessonId, lesson);
    },
    onSuccess: (newItem) => {
      queryClient.setQueryData(
        ['lesson-category', id],
        (oldItems: PaginateResponse<Lesson[]> | undefined) => {
          if (!oldItems) {
            return {
              results: [newItem],
              page: 1,
              limit: 10,
              totalPages: 1,
              totalResults: 0,
            };
          }
          if (lessonId) {
            const newLessons = oldItems?.results.map((item) => {
              if (item.id === lessonId) {
                return { ...item, ...newItem };
              }
              return item;
            });
            return { ...oldItems, results: newLessons };
          }

          return { ...oldItems, results: [...oldItems.results, newItem] };
        },
      );
    },
  });
export const useLesson = (id?: string) =>
  useQuery(['lesson', id], () => getLessonById(id!), {
    enabled: !!id,
  });
