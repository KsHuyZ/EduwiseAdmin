import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import DeleteModal from './components/DeleteModal';
import { useTag } from './hooks';

const Tag = () => {
  const { data, isLoading } = useTag();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tag Name</TableHead>
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
                <TableCell className="text-right">
                  <Skeleton className="w-45 h-4" />
                </TableCell>
              </TableRow>
            ))
          : data &&
            data.map((tag) => (
              <TableRow key={tag.id}>
                <TableCell className="font-medium">{tag.name}</TableCell>
                <TableCell className="text-right">
                  <DeleteModal />
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
};

export default Tag;
