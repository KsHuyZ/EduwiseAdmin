import { TCategory, TImage, TTag, TUser } from '@/types';
import { ELevel } from './level';

export type CourseCredentials = {
  id?: string;
  name: string;
  description: string;
  level: string;
  discount: number;
  price: number | string;
  tags: TTag[];
  categories: TCategory[];
  file?: any;
  status?: string;
};

export type TCourseVideo = {
  id: string;
  video: TVideo;
};

export enum ECourseStatus {
  Publish = 'publish',
  Draft = 'draft',
  Block = 'block',
}

export type TCourse = {
  id: string;
  image: TImage;
  name: string;
  video?: TVideo;
  description: string;
  shortDescription: string;
  createdBy: TUser;
  level: ELevel;
  status: ECourseStatus;
  tags: TTag[];
  categories: TCategory[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  rate?: number;
  lessons: number;
  deletedAt?: string;
  price: number;
  duration: number;
  courseVideo?: TCourseVideo;
  related?: TCourse[];
  ethPrice?: string;
};

export type Video = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  preview: boolean;
  type: 'video' | 'quiz';
};

export type LessonCredentials = {
  id?: string;
  title: string;
  content?: string;
  idCourse?: string;
};

export type TLesson = {
  id: string;
  ordinalNumber?: number;
  isPublish?: boolean;
  units: TUnits[];
} & LessonCredentials;

export type TVideoCredentials = {
  title: string;
  file?: File;
  idLesson: string;
  description: string;
};

export type TVideo = {
  id: string;
  idUnit: string;
  url: string;
};

export type TUnits = {
  id: string;
  idLesson: string;
  ordinalNumber: number;
  type: 'quiz' | 'video';
  video: TVideo;
};
