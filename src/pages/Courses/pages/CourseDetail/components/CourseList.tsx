import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { TLesson } from '@/types';
import { cn } from '@/utils';
import {
  BookOpen,
  ChevronDown,
  Clock,
  PlayCircle,
  StickyNote,
} from 'lucide-react';
import { useState } from 'react';
import ReactPlayer from 'react-player';

interface TCourseListProps {
  isLoading: boolean;
  lessons?: TLesson[];
}

const CourseList = ({ isLoading, lessons }: TCourseListProps) => {
  const [currentLesson, setCurrentLesson] = useState<string[]>([]);
  return isLoading
    ? Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="shadow-md overflow-hidden">
          <div
            className={cn(
              'flex items-center gap-x-2 border-slate-200 border text-slate-700 p-4 text-sm mb-1 cursor-pointer',
              ' text-primary',
            )}
          >
            <span className="font-bold ">
              <Skeleton className="w-40 h-4" />
            </span>
            <div className="ml-auto pr-2 flex items-center gap-x-2">
              <div className="flex flex-col space-y-2"></div>
              <ChevronDown
                className={cn(
                  'w-4 h-4 cursor-pointer hover:opacity-75 transition',
                )}
              />
            </div>
          </div>
        </div>
      ))
    : lessons?.map((lesson) => (
        <div
          key={lesson.id}
          className={cn(
            'duration-150 hover:border-primary border rounded-md',
            currentLesson.includes(lesson.id) ? 'border-primary' : '',
          )}
        >
          <div
            className={cn(
              'flex items-center gap-x-2 text-slate-700 p-2 px-4 text-sm cursor-pointer',
            )}
            onClick={() =>
              setCurrentLesson((prev) => {
                if (prev.includes(lesson.id)) {
                  return prev.filter((item) => item !== lesson.id);
                }
                return [...prev, lesson.id];
              })
            }
          >
            <div className="flex flex-col cursor-pointer">
              <span
                className={cn(
                  currentLesson.includes(lesson.id) ? 'text-primary' : '',
                  'font-bold duration-700',
                )}
              >
                {lesson.title}
              </span>
              <div className="flex space-x-2 items-center">
                <Clock size={15} />
                <span
                  className={cn(
                    currentLesson.includes(lesson.id) ? 'text-primary' : '',
                    'text-sm duration-700 hover:text-primary',
                  )}
                >
                  20:20
                </span>
              </div>
            </div>

            <div className="ml-auto pr-2 flex items-center gap-x-2">
              <div className="flex flex-col items-end">
                <ChevronDown
                  className={cn(
                    'w-4 h-4 cursor-pointer hover:opacity-75 transition hover:text-primary',
                    currentLesson.includes(lesson.id)
                      ? 'rotate-180 text-primary'
                      : '',
                  )}
                />
                <div
                  className={cn(
                    currentLesson.includes(lesson.id) ? 'text-primary' : '',
                    'text-sm duration-700 hover:text-primary flex items-center space-x-2',
                  )}
                >
                  <BookOpen size={15} />
                  <span>
                    {lesson.units?.length} lesson
                    {Number(lesson.units?.length) > 0 ? 's' : ''}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className={cn(
              'no-scrollbar duration-700',
              currentLesson.includes(lesson.id)
                ? 'max-h-[200px] overflow-y-scroll'
                : 'max-h-0 overflow-hidden',
            )}
          >
            {lesson.units?.map((unit, index) => (
              <Dialog key={unit.id}>
                <DialogTrigger asChild>
                  <div
                    className={cn('flex items-center space-x-2 cursor-pointer')}
                  >
                    <div
                      key={`unit_${unit.id}`}
                      className="cursor-pointer w-full hover:bg-gray-200 m-2 p-2 rounded-sm transition"
                    >
                      <div className="flex items-center mx-3 justify-between">
                        <div className="flex flex-col">
                          <span className="text-primary">
                            {index + 1}.{' '}
                            {unit.type === 'quiz' ? 'Lesson' : 'Quiz'}: Title
                          </span>
                          <div className="flex items-center text-xs">
                            {unit.type === 'video' ? (
                              <PlayCircle size={15} />
                            ) : (
                              <StickyNote size={15} />
                            )}{' '}
                            <span className="ml-2">20:00</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="min-w-fit">
                  <DialogHeader>
                    <DialogTitle>Video</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you're
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="rounded-md overflow-hidden">
                    <ReactPlayer
                      url={unit.video.url}
                      playing={true}
                      light
                      pip
                      autoPlay
                      muted={false}
                      controls
                      style={{
                        borderRadius: 20,
                      }}
                    />
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      ));
};

export default CourseList;
