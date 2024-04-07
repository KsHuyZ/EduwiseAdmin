import DefaultLayout from '../layout/DefaultLayout';
import Calendar from '../pages/Calendar';
import ECommerce from '../pages/Dashboard/ECommerce';

export const protectedRoutes = [
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/dashboard',
        element: <ECommerce />,
      },
      {
        path: '/calendar',
        element: <Calendar />,
      },
    ],
  },
];
