import { api } from '@/lib/api';
import { Category } from '@/types/category';
import { Lesson } from '@/types/lesson';
import { PaginateResponse } from '@/types/response';

export const getLessonCategory = (): Promise<PaginateResponse<Category[]>> =>
  api.get('/lesson-category');
export const createLessonCategory = (category: Category): Promise<Category> =>
  api.post('/lesson-category', category);
export const deleteLessonCategory = (id: string) =>
  api.delete(`/lesson-category/${id}`);
export const updateCategory = ({ id, description, title }: Category) =>
  api.patch(`/lesson-category/${id}`, { title, description });
export const getLessonByCategoryId = (
  id: string,
): Promise<PaginateResponse<Lesson[]>> => api.get(`/lesson/category/${id}`);

export const createLesson = (lesson: Lesson): Promise<Lesson> =>
  api.post('/lesson', lesson);
