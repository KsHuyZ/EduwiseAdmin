import Login from '../pages/Login';

export const publicRoutes = [
  {
    element: <Login />,
    path: '/login',
  },
  {
    element: <h1>Not found</h1>,
    path: '*',
  },
];
