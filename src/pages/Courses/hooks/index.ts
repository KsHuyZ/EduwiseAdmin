import { getCourses } from '@/api';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useCourses = () =>
  useInfiniteQuery({
    queryKey: ['courses'],
    queryFn: getCourses,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });
