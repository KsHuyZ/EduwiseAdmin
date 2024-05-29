import toast from 'react-hot-toast';
import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
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
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { useDebounce } from '@/hooks';
import { Input } from '@/components/ui/input';
import { useLessonCategoryId } from '../../hook';
import { deleteLesson } from '@/api';
import ModalLesson from './components/ModalLesson';
import { Lesson as LessonType } from '@/types';

const Lesson = () => {
  const { categoryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const title = searchParams.get('title');
  const page = searchParams.get('page');
  const searchTitle = useDebounce(title!, 500);
  const { data, isLoading, refetch } = useLessonCategoryId(
    categoryId!,
    searchTitle,
    page!,
  );
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState<{
    show: boolean;
    lesson: LessonType | undefined;
  }>({
    show: false,
    lesson: undefined,
  });
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

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (page && Number(page) !== 1) {
      searchParams.set('page', '1');
    }
    setQueryParamValue('title', e.target.value);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      if (confirmDelete.id) {
        await deleteLesson(confirmDelete.id);
        refetch();
        setConfirmDelete((prev) => ({ id: undefined, show: false }));
        toast.success('Delete success');
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <PageTitle title="Lesson" />
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
      <ModalLesson
        categoryId={categoryId}
        setOpen={(value) =>
          setOpen((prev) => ({ lesson: undefined, show: value }))
        }
        open={open.show}
        lesson={open.lesson}
      />
      <div className="py-4 flex justify-between items-center">
        <Button
          leftIcon={Plus}
          onClick={() => setOpen({ lesson: undefined, show: true })}
        >
          Add Lesson
        </Button>
        <div className="w-2/4">
          <Input
            rightIcon={Search}
            value={title!}
            placeholder="Search..."
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
                <Link to={`/lesson-category/${categoryId}/${id}`}>
                  <CardItem
                    key={id}
                    title={title}
                    description={description}
                    onUpdate={() =>
                      setOpen({
                        show: true,
                        lesson: { id, title, description, categoryId },
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

export default Lesson;