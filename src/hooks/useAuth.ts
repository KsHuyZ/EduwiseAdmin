import { create } from 'zustand';
import { getItem, removeItem, setItem } from '../utils/storage';
import { type User } from '../types/user';

interface AuthState {
  user: User | null;
}

export interface AuthStore extends AuthState {
  setUser: (args: AuthState['user']) => void;
  logOut: () => void;
}

const initialState: Pick<AuthStore, keyof AuthState> = {
  user: getItem('user') as User,
};

const useAuth = create<AuthStore>()((set) => ({
  ...initialState,
  setUser: (user) => {
    set(() => {
      setItem('user', user);
      return { user };
    });
  },
  logOut: () => {
    set(() => {
      removeItem('token');
      removeItem('user');
      return { user: null };
    });
  },
}));

export default useAuth;
