import Notfound from '@/pages/Notfound';
import Login from '@/pages/Login';

export const publicRoutes = [
  {
    element: <Login />,
    path: '/login',
  },
  {
    element: <h1>Hihi</h1>,
    path: '/'
  },
  {
    element: <Notfound />,
    path: '*',
  },
];
