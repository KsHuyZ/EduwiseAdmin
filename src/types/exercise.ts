import { Lesson, TChapter } from './lesson';

export type Exercise = Lesson;

export type TChapterExercise = {
  exerciseId: string;
} & TChapter;
