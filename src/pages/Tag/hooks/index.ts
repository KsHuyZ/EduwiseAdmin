import { getTags } from '@/api';
import { useQuery } from '@tanstack/react-query';

export const useTag = () => useQuery({ queryKey: ['tags'], queryFn: getTags });
