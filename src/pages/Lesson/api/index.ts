import { api } from '@/lib/api';
import { Category } from '@/types/category';
import { Lesson } from '@/types/lesson';
import { PaginateResponse } from '@/types/response';

export const getLessonCategory = (
  title?: string,
): Promise<PaginateResponse<Category[]>> =>
  api.get(`/lesson-category${title && title !== '' ? '?title=' + title : ''}`);
export const createLessonCategory = (category: Category): Promise<Category> =>
  api.post('/lesson-category', category);
export const deleteLessonCategory = (id: string) =>
  api.delete(`/lesson-category/${id}`);
export const updateCategory = ({ id, description, title }: Category) =>
  api.patch(`/lesson-category/${id}`, { title, description });
export const getLessonByCategoryId = (
  id: string,
  title: string,
): Promise<PaginateResponse<Lesson[]>> =>
  api.get(
    `/lesson/category/${id}${title && title !== '' ? '?title=' + title : ''}`,
  );

export const createLesson = (lesson: Lesson): Promise<Lesson> =>
  api.post('/lesson', lesson);
export const updateLesson = (id: string, lesson: Lesson): Promise<Lesson> =>
  api.patch(`/lesson/${id}`, lesson);
export const getLessonById = (id: string): Promise<Lesson> =>
  api.get(`/lesson/${id}`);

export const deleteLesson = (id: string) => api.delete(`/lesson/${id}`);
