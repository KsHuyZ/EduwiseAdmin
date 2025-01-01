import { api } from '@/lib/api';
import { TCategoryPayload } from '@/types';

export const createTag = async (data: TCategoryPayload) => {
  const formData = new FormData();
  formData.append('name', data.name);
  if (data.image) {
    formData.append('image', data.image);
  }
  return api.post('/tags', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
