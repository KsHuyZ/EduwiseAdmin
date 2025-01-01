import { TImage } from './image';
import { ERoles } from './roles';
import { Token } from './token';

export type TUserCredential = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export enum EDisk {
  GB = 'gb',
  TB = 'tb',
}

export enum StatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BLOCK = 'BLOCK',
}

export type SignInResponse = {
  user: TUser;
  tokenExpires: number;
} & Token;

export type TUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: ERoles;
  photo?: TImage;
  x?: string;
  facebook?: string;
  github?: string;
  instagram?: string;
  description?: string;
  walletAddress?: string;
  unit: EDisk;
  totalStorage: number;
  status: StatusEnum;
};
