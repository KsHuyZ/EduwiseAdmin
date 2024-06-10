import { getCourseById, getCoursesLesson } from '@/api';
import { useQueries, useQuery } from '@tanstack/react-query';

export const useCourse = (id: string) =>
  useQueries({
    queries: [
      {
        queryKey: ['course', id],
        queryFn: () => getCourseById(id),
      },
      {
        queryKey: ['lesson-course', id],
        queryFn: () => getCoursesLesson(id),
      },
    ],
  });
export const useCourseDetail = (id: string) =>
  useQuery({
    queryKey: ['course', id],
    queryFn: () => getCourseById(id),
    enabled: !!id,
  });
