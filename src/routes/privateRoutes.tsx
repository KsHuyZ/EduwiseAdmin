import { lazy } from 'react';
import LessonCategory from '@/pages/LessonCategory';
import DefaultLayout from '@/layout/DefaultLayout';
import Calendar from '@/pages/Calendar';
import ECommerce from '@/pages/Dashboard/ECommerce';
import Lesson from '@/pages/LessonCategory/pages/Lesson';
import { ExerciseCategory } from '@/pages/ExerciseCategory';
import ChapterExercise from '@/pages/ExerciseCategory/pages/Exercise/pages/Chapter';
import ChapterLesson from '@/pages/LessonCategory/pages/Lesson/pages/Chapter';
import { Exercise } from '@/pages/ExerciseCategory/pages/Exercise';
import ChangeExercise from '@/pages/ExerciseCategory/pages/Exercise/pages/Chapter/pages/Modification';

const ChangeLesson = lazy(
  () =>
    import(
      '@/pages/LessonCategory/pages/Lesson/pages/Chapter/pages/ModificationChapter'
    ),
);

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
        element: <LessonCategory />,
      },
      {
        path: '/lesson-category/:categoryId',
        element: <Lesson />,
      },
      {
        path: '/lesson-category/:categoryId/:lessonId',
        element: <ChapterLesson />,
      },
      {
        path: '/lesson-category/:categoryId/:lessonId/create',
        element: <ChangeLesson />,
      },
      {
        path: '/lesson-category/:categoryId/:lessonId/:id/edit',
        element: <ChangeLesson />,
      },
      {
        path: '/exercise-category',
        element: <ExerciseCategory />,
      },
      {
        path: '/exercise-category/:categoryId',
        element: <Exercise />,
      },
      {
        path: '/exercise-category/:categoryId/:exerciseId',
        element: <ChapterExercise />,
      },
      {
        path: '/exercise-category/:categoryId/:exerciseId/create',
        element: <ChangeExercise />,
      },
      {
        path: '/exercise-category/:categoryId/:exerciseId/:id/edit',
        element: <ChangeExercise />,
      },
    ],
  },
];
