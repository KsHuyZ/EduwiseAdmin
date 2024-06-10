import DefaultLayout from '@/layout/DefaultLayout';
import Calendar from '@/pages/Calendar';
import Category from '@/pages/Category';
import Courses from '@/pages/Courses';
import CourseIdPage from '@/pages/Courses/pages/CourseDetail';
import Dashboard from '@/pages/Dashboard';
import Student from '@/pages/Student';
import Tag from '@/pages/Tag';

export const protectedRoutes = [
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/calendar',
        element: <Calendar />,
      },
      {
        path: '/student',
        element: <Student />,
      },
      {
        path: '/courses',
        element: <Courses />,
      },
      {
        path: '/courses/:courseId',
        element: <CourseIdPage />,
      },
      {
        path: '/categories',
        element: <Category />,
      },
      {
        path: '/tags',
        element: <Tag />,
      },
    ],
  },
];
