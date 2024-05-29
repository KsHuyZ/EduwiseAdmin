import { MoveHistory } from './chess';

export type LessonCategory = {
  title: string;
  description: string;
};
export type Lesson = {
  id?: string;
  categoryId: string;
  title: string;
  description: string;
};

export type TChapter = {
  id?: string;
  title: string;
  description: string;
  question: string;
  steps: MoveHistory[];
  available?: boolean;
  createdBy?: string;
};

export type TChapterLesson = {
  lessonId: string;
} & TChapter;
