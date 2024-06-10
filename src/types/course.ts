import { EStatusAdmin, TCategory, TImageType, TTag, TUser } from '@/types';

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

export type TCourse = {
  id: string;
  name: string;
  price: number;
  description: string;
  file: TImageType;
  categories: TCategory[];
  status: EStatusAdmin;
  tags: TTag[];
  chapters?: TLesson[];
  userResponse: TUser;
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
