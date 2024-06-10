import { getCourses } from '@/api';
import { useQuery } from '@tanstack/react-query';

export const useCourses = () =>
  useQuery({ queryKey: ['courses'], queryFn: getCourses });
