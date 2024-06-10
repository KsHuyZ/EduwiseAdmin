import { ArrowLeft, Award, Clock, GraduationCap, Signal } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Ratings } from '@/components/ui/rating';
import { Separator } from '@/components/ui/separator';
import CourseList from './components/CourseList';
import { formatPrice } from '@/utils';
import { useCourse } from './hooks';
import { Skeleton } from '@/components/ui/skeleton';
import ModalPreview from './components/ModalPreview';
import { Button } from '@/components/ui/button';

const CourseIdPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, lesson] = useCourse(courseId!);
  const navigate = useNavigate();
  return (
    <div className="w-full h-full flex flex-col space-y-4">
      <div>
        <Button variant={'ghost'} onClick={() => navigate('/courses')}>
          {' '}
          <ArrowLeft />{' '}
        </Button>
      </div>
      <div className="flex flex-col space-y-8">
        <div className="bg-primary px-10 py-5 rounded-md">
          <div className="grid grid-cols-3 gap-2 items-center">
            <div className="col-span-2">
              <div className="flex flex-col space-y-4">
                {course.isLoading ? (
                  <Skeleton className="w-40 h-4" />
                ) : (
                  <h3 className="text-white text-2xl font-bold">
                    {course && course.data?.name}
                  </h3>
                )}
                <div className="flex items-center space-x-4">
                  {course.isLoading ? (
                    <Skeleton className="w-40 h-4" />
                  ) : (
                    <Ratings rating={4.5} totalStars={5} variant="yellow" />
                  )}
                  <span className="underline text-white">(400 ratings)</span>
                  <span className="text-white">3000 students</span>
                </div>
                <div>
                  <p className="text-white">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Odit corrupti delectus dignissimos, nihil repudiandae
                    excepturi soluta totam quas impedit in architecto dicta
                    explicabo ullam hic quam unde expedita quis illum!
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {course.isLoading ? (
                    <Skeleton className="w-14 h-2" />
                  ) : (
                    course.data?.tags.map((tag) => (
                      <Badge
                        key={tag.id}
                        className="text-white"
                        variant="outline"
                      >
                        {tag?.name}
                      </Badge>
                    ))
                  )}
                </div>
              </div>
            </div>
            {course.isLoading ? (
              <Skeleton className="w-[500px]" />
            ) : (
              course.data && (
                <ModalPreview img={course.data.file} name={course.data.name} />
              )
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 items-start">
          <div className="flex flex-col space-y-8 col-span-2">
            <div className="flex flex-col space-y-4">
              <h3>Course content</h3>
              <CourseList lessons={lesson.data} isLoading={lesson.isLoading} />
            </div>
            <div className="flex flex-col space-y-4">
              <h3>Description</h3>
              {course.isLoading ? (
                <Skeleton className="w-80 h-40" />
              ) : (
                course && (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: course.data?.description ?? '',
                    }}
                  />
                )
              )}
            </div>
          </div>

          <Card className="sticky top-0">
            <CardHeader>
              <CardTitle>
                {course.isLoading ? (
                  <Skeleton className="w-14 h-4" />
                ) : !course.data?.price ? (
                  'Free'
                ) : (
                  `${formatPrice(course.data?.price)}`
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-12">
                <div className="flex flex-col space-y-8">
                  <div className="flex flex-col space-y-4">
                    <Label>This course includes:</Label>
                    <div className="flex flex-col space-y-2 text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Signal className="w-4 h-4" />
                        <span>Intermediate</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="w-4 h-4" />
                        <span>10 Total Enrolled</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>12 hours Duration</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Award className="w-4 h-4" />
                        <span>Certificate of completion</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-4">
                  <Separator />
                  <div className="flex flex-col space-y-4">
                    <Label>Author:</Label>
                    <div className="flex items-center space-x-4">
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-full text-white cursor-pointer"
                        style={{
                          background: 'green',
                        }}
                      >
                        H
                      </div>
                      <span>Huy Phân Tiến</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
