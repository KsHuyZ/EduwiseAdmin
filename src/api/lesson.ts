import { api } from '@/lib/api';
import { Category } from '@/types/category';
import { Lesson, TChapterLesson } from '@/types/lesson';
import { PaginateResponse } from '@/types/response';
import { removeEmptyParams } from '@/utils';

export const getLessonCategory = (
  title?: string,
  page?: string,
): Promise<PaginateResponse<Category[]>> =>
  api.get(`/lesson-category`, {
    params: removeEmptyParams({ title, page }),
  });
export const createLessonCategory = (category: Category): Promise<Category> =>
  api.post('/lesson-category', category);
export const deleteLessonCategory = (id: string) =>
  api.delete(`/lesson-category/${id}`);
export const updateCategory = ({ id, description, title }: Category) =>
  api.patch(`/lesson-category/${id}`, { title, description });
export const getLessonByCategoryId = (
  id: string,
  title: string,
  page: string,
): Promise<PaginateResponse<Lesson[]>> =>
  api.get(`/lesson/category/${id}`, {
    params: removeEmptyParams({ title, page }),
  });

export const createLesson = (lesson: Lesson): Promise<Lesson> =>
  api.post('/lesson', lesson);
export const updateLesson = (id: string, lesson: Lesson): Promise<Lesson> =>
  api.patch(`/lesson/${id}`, { ...lesson, id: undefined });
export const getLessonById = (id: string): Promise<Lesson> =>
  api.get(`/lesson/${id}`);

export const deleteLesson = (id: string) => api.delete(`/lesson/${id}`);

export const getChapterLessonByLessonId = (
  id?: string,
): Promise<TChapterLesson[]> => api.get(`/chapter-lesson/lesson/${id}`);

export const getChapterLessonById = (id?: string): Promise<TChapterLesson> =>
  api.get(`/chapter-lesson/${id}`);

export const updateChapterLessonById = (
  id: string,
  lesson: TChapterLesson,
): Promise<TChapterLesson> => api.patch(`/chapter-lesson/${id}`, lesson);

export const createChapterLesson = (
  chapter: TChapterLesson,
): Promise<TChapterLesson> => api.post('/chapter-lesson', chapter);

export const deleteChapterLesson = (id: string) =>
  api.delete(`/chapter-lesson/${id}`);
