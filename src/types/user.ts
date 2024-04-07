export interface UserCredential {
  email: string;
  password: string;
}
export type User = {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'teacher' | 'admin';
};
