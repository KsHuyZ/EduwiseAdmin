import { useEffect, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import Button from '@/components/Button';
import PageTitle from '@/components/PageTitle';
import Paginations from '@/components/Pagination';
import CardItem from '@/components/CardItem';
import { Skeleton } from '@/components/ui/skeleton';
import { useDebounce } from '@/hooks';
import { Input } from '@/components/ui/input';
import { useExerciseCategoryId } from './hooks';
import { deleteExercise } from '@/api';
import { Exercise as ExerciseType } from '@/types';
import ModalExercise from './components/ModalExercise';

export const Exercise = () => {
  const { categoryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const title = searchParams.get('title');
  const page = searchParams.get('page');
  const searchTitle = useDebounce(title!, 500);
  const { data, isLoading, refetch, isError, error } = useExerciseCategoryId(
    categoryId!,
    searchTitle,
    page!,
  );
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState<{
    show: boolean;
    exercise: ExerciseType | undefined;
  }>({
    show: false,
    exercise: undefined,
  });
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
        await deleteExercise(confirmDelete.id);
        refetch();
        toast.success('Delete exercise success!');
        setConfirmDelete({ show: false, id: undefined });
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error((error as { message: string }).message);
    }
  }, [isError]);

  const setQueryParamValue = (paramName: string, paramValue: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(paramName, paramValue);
    setSearchParams(params);
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (page && Number(page) !== 1) {
      searchParams.set('page', '1');
    }
    setQueryParamValue('title', e.target.value);
  };

  return (
    <div className="w-full">
      <ModalExercise
        open={open.show}
        exercise={open.exercise}
        setOpen={(value) => setOpen({ exercise: undefined, show: value })}
        categoryId={categoryId}
      />
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
          onClick={() => setOpen({ exercise: undefined, show: true })}
        >
          Add Exercise
        </Button>
        <div className="w-2/4">
          <Input
            rightIcon={Search}
            placeholder="Search..."
            value={title!}
            onChange={handleChangeTitle}
          />
        </div>
      </div>
      <div className="space-y-2">
        <div className="min-h-[60vh]">
          <div className="grid md:grid-cols-3 s:gap-3 sm:grid-cols-2 gap-2">
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
              data.results.map(({ id, title, description, categoryId }) => (
                <Link to={`/exercise-category/${categoryId}/${id}`}>
                  <CardItem
                    key={id}
                    title={title}
                    description={description}
                    onUpdate={() =>
                      setOpen({
                        show: true,
                        exercise: { id, title, description, categoryId },
                      })
                    }
                    onDelete={() => setConfirmDelete({ show: true, id })}
                  />
                </Link>
              ))
            )}
          </div>
        </div>
        {data && data.results.length > 0 && (
          <Paginations
            currentPage={data?.page}
            itemsPerPage={data.limit}
            totalItems={data.totalResults}
            setCurrentPage={(value) =>
              setQueryParamValue('page', value.toString())
            }
          />
        )}
      </div>
    </div>
  );
};