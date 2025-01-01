import { api } from '@/lib/api';
import { TCourse, TableApiResponse, TLesson, TCategory, TTag } from '@/types';

export const getCourses = ({
  pageParam = 1,
}): Promise<TableApiResponse<TCourse[]>> =>
  api.get('/courses/admin?page=' + pageParam + '&limit=20');

export const getCourseById = (id: string): Promise<TCourse> =>
  api.get(`/course/get-by-id?id=${id}`);
export const getCoursesLesson = (id: string): Promise<TLesson[]> =>
  api.get(`/lesson/get-lessons?id=${id}`);

export const getCategory = (): Promise<TCategory[]> => api.get('/categories');

export const getTags = (): Promise<TTag[]> => api.get('/tags');
