import { MoveHistory } from './chess';

export type LessonCategory = {
  title: string;
  description: string;
};
export type Lesson = {
  id?: string;
  categoryId: string;
  title: string;
  question: string;
  description: string;
  steps: MoveHistory[];
  available?: boolean;
  createdBy?: string;
};
