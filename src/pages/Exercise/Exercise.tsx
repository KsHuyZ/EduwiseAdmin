import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';
import Button from '@/components/Button';
import { MoreHorizontal, Pen, Plus, Search, Trash } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useExerciseCategoryId } from './hook';
import { useNavigate, useParams } from 'react-router-dom';
import PageTitle from '@/components/PageTitle';
// import { deleteLesson } from './api';
import { toast } from 'react-toastify';
import { useDebounce } from '@/hooks';
import { Input } from '@/components/ui/input';

export const Exercise = () => {
  const { categoryId } = useParams();
  const [title, setTitle] = useState('');
  const searchTitle = useDebounce(title, 500);
  const { data, isLoading, refetch } = useExerciseCategoryId(
    categoryId!,
    searchTitle,
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState<{
    show: boolean;
    id: string | undefined;
  }>({
    show: false,
    id: undefined,
  });

  const handleDelete = async () => {
    setLoading(true);
    try {
      if (confirmDelete.id) {
        // await deleteLesson(confirmDelete.id);
        refetch();
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <PageTitle title="Exercise" />
      <AlertDialog
        open={confirmDelete.show}
        onOpenChange={(value) =>
          setConfirmDelete((prev) => ({ ...prev, show: value }))
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button isLoading={loading} variant="error" onClick={handleDelete}>
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="py-4 flex justify-between items-center">
        <Button
          leftIcon={Plus}
          onClick={() => navigate(`/exercise-category/${categoryId}/add`)}
        >
          Add Exercise
        </Button>
        <div className="w-2/4">
          <Input
            rightIcon={Search}
            placeholder="Search..."
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {isLoading ? (
          Array.from({ length: 12 }).map(() => (
            <Card className="p-2">
              <div className="space-y-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-full" />
              </div>
            </Card>
          ))
        ) : !data || data.results.length === 0 ? (
          <p>No results</p>
        ) : (
          data.results.map(({ id, title, description }) => (
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between">
                  {title}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <MoreHorizontal className="cursor-pointer" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Action</DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        onClick={() =>
                          navigate(`/lesson-category/${categoryId}/${id}`)
                        }
                      >
                        <Pen className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => setConfirmDelete({ show: true, id })}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{description}</CardDescription>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
