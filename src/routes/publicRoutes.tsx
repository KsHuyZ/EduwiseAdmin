import Notfound from '@/pages/Notfound';
import Login from '../pages/Login';

export const publicRoutes = [
  {
    element: <Login />,
    path: '/login',
  },
  {
    element: <Notfound />,
    path: '*',
  },
];
