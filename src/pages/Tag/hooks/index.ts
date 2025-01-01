import { createTag, getTags } from '@/api';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useTag = () => useQuery({ queryKey: ['tags'], queryFn: getTags });

export const useMutateTag = () => useMutation({ mutationFn: createTag });
