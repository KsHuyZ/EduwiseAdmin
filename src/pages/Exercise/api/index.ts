import { api } from '@/lib/api';
import { Category, PaginateResponse, Exercise } from '@/types';

export const getExerciseCategory = (
  title?: string,
): Promise<PaginateResponse<Category[]>> =>
  api.get(
    `/exercise-category${title && title !== '' ? '?title=' + title : ''}`,
  );
export const createExerciseCategory = (category: Category): Promise<Category> =>
  api.post('/exercise-category', category);
export const deleteExerciseCategory = (id: string) =>
  api.delete(`/exercise-category/${id}`);
export const updateCategory = ({
  id,
  description,
  title,
}: Category): Promise<Category> =>
  api.patch(`/exercise-category/${id}`, { title, description });
export const getExerciseByCategoryId = (
  id: string,
  title: string,
): Promise<PaginateResponse<Exercise[]>> =>
  api.get(
    `/exercise/category/${id}${title && title !== '' ? '?title=' + title : ''}`,
  );
export const createExercise = (exercise: Exercise): Promise<Exercise> =>
  api.post('/exercise', exercise);
export const updateExercise = (
  id: string,
  exercise: Exercise,
): Promise<Exercise> => api.patch(`/exercise/${id}`, exercise);
export const getExerciseById = (id: string): Promise<Exercise> =>
  api.get(`/exercise/${id}`);

export const deleteExercise = (id: string) => api.delete(`/exercise/${id}`);
