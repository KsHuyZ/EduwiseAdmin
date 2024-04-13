import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createLesson,
  createLessonCategory,
  getLessonByCategoryId,
  getLessonCategory,
} from '../api';
import { Category } from '@/types/category';
import { queryClient } from '@/App';
import { PaginateResponse } from '@/types/response';
import { Lesson } from '@/types';

export const useLessonCategory = () =>
  useQuery(['lesson-category'], getLessonCategory);

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

export const useLessonCategoryId = (id: string) =>
  useQuery(['lesson-category', id], () => getLessonByCategoryId(id));

export const useCreateLesson = (id: string) =>
  useMutation({
    mutationFn: (lesson: Lesson) => createLesson(lesson),
    onSuccess: (newItem) => {
      queryClient.setQueryData(
        ['lesson-category', id],
        (oldItems: PaginateResponse<Lesson[]> | undefined) => {
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
