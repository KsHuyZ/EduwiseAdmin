import { User } from './user';

export type Category = {
  id?: string;
  title: string;
  description: string;
  createdBy?: string | User;
  available?: boolean;
};
