import { ERole } from "./roles";

export type TUserCredential = {
  email: string;
  password: string;
  rememberMe: boolean;
};
export type TUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: ERole[];
  avatar?: string;
};
