import { api } from '@/lib/api';
import { TCourse, TableApiResponse, TLesson, TCategory, TTag } from '@/types';

export const getCourses = (): Promise<TableApiResponse<TCourse[]>> =>
  api.get('/course/get-all');

export const getCourseById = (id: string): Promise<TCourse> =>
  api.get(`/course/get-by-id?id=${id}`);
export const getCoursesLesson = (id: string): Promise<TLesson[]> =>
  api.get(`/lesson/get-lessons?id=${id}`);

export const getCategory = (): Promise<TCategory[]> =>
  api.get('/course/categories/get-all');

export const getTags = (): Promise<TTag[]> => api.get('/course/tags/get-all');
