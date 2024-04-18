import { api } from '@/lib/api';
import { Category, PaginateResponse, Exercise } from '@/types';
import { removeEmptyParams } from '@/utils';
export const getExerciseCategory = (
  title?: string,
  page?: string | null,
): Promise<PaginateResponse<Category[]>> => {
  return api.get(`/exercise-category`, {
    params: removeEmptyParams({ title, page }),
  });
};

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
  page: string,
): Promise<PaginateResponse<Exercise[]>> =>
  api.get(`/exercise/category/${id}`, {
    params: removeEmptyParams({ title, page }),
  });
export const createExercise = (exercise: Exercise): Promise<Exercise> =>
  api.post('/exercise', exercise);
export const updateExercise = (
  id: string,
  exercise: Exercise,
): Promise<Exercise> => api.patch(`/exercise/${id}`, exercise);

export const getExerciseById = (id: string): Promise<Exercise> =>
  api.get(`/exercise/${id}`);

export const deleteExercise = (id: string) => api.delete(`/exercise/${id}`);
