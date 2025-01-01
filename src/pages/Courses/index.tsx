import { Input } from '@/components/ui/input';
import PageMetadata from '@/components/PageMetadata';
import { Eye, Search } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useCourses } from './hooks';
import { Skeleton } from '@/components/ui/skeleton';
import ChangeStatus from './components/ChangeStatus';
import { Label } from '@/components/ui/label';
import { formatPrice } from '@/utils';
import { ECourseStatus, EStatusAdmin } from '@/types';
import { useEffect, useMemo, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

const Courses = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    data,
    isLoading,
    hasNextPage,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
  } = useCourses();

  const setQueryParamValue = (paramName: string, paramValue: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(paramName, paramValue);
    setSearchParams(params);
  };

  const parentRef = useRef<HTMLTableSectionElement>(null);

  const flatData = useMemo(
    () => data?.pages.flatMap((page) => page.data) || [],
    [data],
  );

  const virtualizer = useVirtualizer({
    count: flatData.length + (hasNextPage ? 1 : 0),
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    overscan: 20,
  });

  const virtualRows = virtualizer.getVirtualItems();

  useEffect(() => {
    const lastItem = virtualRows[virtualRows.length - 1];
    if (lastItem?.index >= flatData.length - 1 && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [virtualRows, flatData.length, fetchNextPage, hasNextPage, isFetching]);

  return (
    <>
      <PageMetadata title="Student" />
      <div className="flex flex-col space-y-8">
        <div className="py-4 flex justify-between items-center">
          <div className="w-2/4">
            <Input
              rightIcon={Search}
              placeholder="Search..."
              onChange={(e) => setQueryParamValue('title', e.target.value)}
            />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody ref={parentRef} className="max-h-dvh overflow-y-auto">
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <Skeleton className="w-45 h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-45 h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-8 h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-8 h-4" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="w-45 h-4" />
                    </TableCell>
                  </TableRow>
                ))
              : virtualRows.map((virtualRow) => {
                  const course = flatData[virtualRow.index];
                  return (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-10">
                          <img
                            src={course.image.url}
                            className="w-40 rounded-md"
                          />
                          <Label>{course.name}</Label>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        <Label>{formatPrice(course.price)}</Label>
                      </TableCell>
                      <TableCell className="font-medium">
                        <Label>
                          {course.createdBy.firstName}{' '}
                          {course.createdBy.lastName}
                        </Label>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            course.status === ECourseStatus.Block
                              ? 'destructive'
                              : course.status === ECourseStatus.Draft
                              ? 'secondary'
                              : 'default'
                          }
                        >
                          {course.status === ECourseStatus.Block
                            ? 'Inactive'
                            : course.status === ECourseStatus.Draft
                            ? 'Draft'
                            : 'Active'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center">
                          <ChangeStatus status={course.status} />
                          <Link to={`/courses/${course.id}`}>
                            <Eye size={15} className="text-gray-500" />
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            {(isFetchingNextPage || isFetching) &&
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <Skeleton className="w-45 h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-45 h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-8 h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-8 h-4" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="w-45 h-4" />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Courses;
