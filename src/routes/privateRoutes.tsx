import { lazy } from 'react';
import LessonCatgory from '@/pages/Lesson/LessonCatgory';
import DefaultLayout from '@/layout/DefaultLayout';
import Calendar from '@/pages/Calendar';
import ECommerce from '@/pages/Dashboard/ECommerce';
import Lesson from '@/pages/Lesson/Lesson';
import { Exercise, ExerciseCatgory } from '@/pages/Exercise';

const ChangeLesson = lazy(() => import('@/pages/Lesson/ChangeLesson'));

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
      {
        path: '/lesson-category',
        element: <LessonCatgory />,
      },
      {
        path: '/lesson-category/:categoryId',
        element: <Lesson />,
      },
      {
        path: '/lesson-category/:categoryId/add',
        element: <ChangeLesson />,
      },
      {
        path: '/lesson-category/:categoryId/:lessonId',
        element: <ChangeLesson />,
      },
      {
        path: '/exercise-category',
        element: <ExerciseCatgory />,
      },
      {
        path: '/exercise-category/:categoryId',
        element: <Exercise />,
      },
    ],
  },
];
