import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import PageTitle from '@/components/PageTitle';
import Button from '@/components/Button';
import Paginations from '@/components/Pagination';
import CardItem from '@/components/CardItem';
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
import { Skeleton } from '@/components/ui/skeleton';
import { Category } from '@/types/category';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks';
import ModalCategory from './components/ModalCategory';
import { useLessonCategory } from './hook';
import { deleteLessonCategory } from './api';

const LessonCatgory = () => {
  const [open, setOpen] = useState<{
    show: boolean;
    form: Category | undefined;
  }>({
    show: false,
    form: undefined,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const title = searchParams.get('title');
  const page = searchParams.get('page');
  const searchTitle = useDebounce(title!, 500);
  const { data, isError, isLoading, refetch } = useLessonCategory(
    searchTitle,
    page!,
  );
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<{
    show: boolean;
    id: string | undefined;
  }>({
    show: false,
    id: undefined,
  });

  const setQueryParamValue = (paramName: string, paramValue: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(paramName, paramValue);
    setSearchParams(params);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      if (confirmDelete.id) {
        await deleteLessonCategory(confirmDelete.id);
        refetch();
        setConfirmDelete({ id: undefined, show: false });
        toast.success('Delete success');
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error('Error');
    }
  }, [isError]);

  return (
    <div className="w-full">
      <PageTitle title="Lesson Category" />
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
      <ModalCategory
        open={open.show}
        setOpen={(value) => setOpen((prev) => ({ ...prev, show: value }))}
        formValue={open.form}
        refetch={refetch}
      />
      <div className="py-4 flex justify-between items-center">
        <Button
          leftIcon={Plus}
          onClick={() => setOpen({ show: true, form: undefined })}
        >
          Add Category
        </Button>
        <div className="w-2/4">
          <Input
            rightIcon={Search}
            placeholder="Search..."
            onChange={(e) => setQueryParamValue('title', e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <div className="min-h-[60vh]">
          <div className="grid md:grid-cols-3 s:gap-3 sm:grid-cols-2 gap-2 flex-1">
            {isLoading ? (
              Array.from({ length: 12 }).map(() => (
                <Card className="p-2" key={Math.random()}>
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
                <Link to={'/lesson-category/' + id} key={id}>
                  <CardItem
                    title={title}
                    description={description}
                    onUpdate={() =>
                      setOpen({
                        show: true,
                        form: { id, title, description },
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

export default LessonCatgory;
