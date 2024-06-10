import { Input } from '@/components/ui/input';
import PageMetadata from '@/components/PageMetadata';
import { Search } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
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

const Student = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading } = useUsers();

  const setQueryParamValue = (paramName: string, paramValue: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(paramName, paramValue);
    setSearchParams(params);
  };

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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>FullName</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Active</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
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
                    <TableCell className="text-right">
                      <Skeleton className="w-45 h-4" />
                    </TableCell>
                  </TableRow>
                ))
              : data &&
                data.items.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      {user.firstName} {user.lastName}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {Math.random() > 0.5 ? (
                        <Badge>Active</Badge>
                      ) : (
                        <Badge variant={'destructive'}>Inactive</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <ChangeStatus />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Student;
