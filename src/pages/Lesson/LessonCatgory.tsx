import { useEffect, useState } from 'react';
import { MoreHorizontal, Pen, Plus, Trash } from 'lucide-react';
import { toast } from 'react-toastify';
import Button from '@/components/Button';
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
import { useLessonCategory } from './hook';
import ModalCategory from './components/ModalCategory';
import { Skeleton } from '@/components/ui/skeleton';
import { deleteLessonCategory } from './api';
import { Category } from '@/types/category';
import { Link } from 'react-router-dom';

const LessonCatgory = () => {
  const [open, setOpen] = useState<{
    show: boolean;
    form: Category | undefined;
  }>({
    show: false,
    form: undefined,
  });
  const { data, isError, isLoading, refetch } = useLessonCategory();
  const [loading, setLoading] = useState(false);
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
        await deleteLessonCategory(confirmDelete.id);
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
      <div className="flex items-center py-4">
        <ModalCategory
          open={open.show}
          setOpen={(value) => setOpen((prev) => ({ ...prev, show: value }))}
          formValue={open.form}
          refetch={refetch}
        />
        <Button
          leftIcon={Plus}
          onClick={() => setOpen({ show: true, form: undefined })}
        >
          Add Category
        </Button>
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
            <Link to={'/lesson-category/' + id}>
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
                            setOpen({
                              show: true,
                              form: { id, title, description },
                            })
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
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default LessonCatgory;
