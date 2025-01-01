import { Input } from '@/components/ui/input';
import PageMetadata from '@/components/PageMetadata';
import { Search } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useUsers } from './hooks';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ChangeStatus from './components/ChangeStatus';
import { StatusEnum } from '@/types';
import { useEffect, useMemo, useRef } from 'react';

const Student = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
    isLoading,
  } = useUsers();
  const parentRef = useRef<HTMLTableSectionElement>(null);
  const setQueryParamValue = (paramName: string, paramValue: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(paramName, paramValue);
    setSearchParams(params);
  };

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
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Role</SelectLabel>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="teacher">Teacher</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>FullName</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Role</TableHead>
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
                    const user = flatData[virtualRow.index];
                    return (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          {user.firstName} {user.lastName}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          {
                            <Badge
                              variant={
                                user.status === StatusEnum.BLOCK
                                  ? 'destructive'
                                  : user.status === StatusEnum.ACTIVE
                                  ? 'default'
                                  : 'outline'
                              }
                            >
                              {user.status}
                            </Badge>
                          }
                        </TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell className="text-right">
                          <ChangeStatus
                            status={user.status}
                            id={user.id}
                            refetch={refetch}
                          />
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
      </div>
    </>
  );
};

export default Student;
