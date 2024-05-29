import PageTitle from '@/components/PageTitle';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import React, { useMemo, useState } from 'react';
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import Button from '@/components/Button';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import CardItem from '@/components/CardItem';
import toast from 'react-hot-toast';
import { useChapterExercise, useDeleteChapterExercise } from './hooks';

const Chapter = () => {
  const [confirmDelete, setConfirmDelete] = useState<{
    show: boolean;
    id: string | undefined;
  }>({
    show: false,
    id: undefined,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { exerciseId, categoryId } = useParams();
  const chapterExerciseQuery = useChapterExercise(exerciseId);
  const { mutateAsync: deleteChapterExercise, isLoading } =
    useDeleteChapterExercise();
  const title = useMemo(() => searchParams.get('title'), [searchParams]);
  const page = useMemo(() => searchParams.get('page'), [searchParams]);

  const setQueryParamValue = (paramName: string, paramValue: string) => {
    const params = new URLSearchParams(searchParams);
    if (!paramValue) {
      params.delete(paramName);
    } else {
      params.set(paramName, paramValue);
    }
    setSearchParams(params);
  };
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (page && Number(page) !== 1) {
      searchParams.set('page', '1');
    }
    setQueryParamValue('title', e.target.value);
  };

  const handleDeleteChapter = async (id?: string) => {
    if (id) {
      await deleteChapterExercise(id);
      toast.success('Delete project success!');
      setConfirmDelete({
        show: false,
        id: undefined,
      });
    }
  };

  return (
    <div className="w-full">
      <PageTitle title="Exercise Chapter" />
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
            <Button
              variant="error"
              isLoading={isLoading}
              onClick={() => handleDeleteChapter(confirmDelete.id)}
            >
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="py-4 flex justify-between items-center">
        <Link to={`/exercise-category/${categoryId}/${exerciseId}/create`}>
          <Button leftIcon={Plus}>Add Chapter</Button>
        </Link>
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
            {chapterExerciseQuery.isLoading ? (
              Array.from({ length: 12 }).map(() => (
                <Card className="p-2" key={Math.random()}>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </Card>
              ))
            ) : !chapterExerciseQuery.data ||
              chapterExerciseQuery.data.length === 0 ? (
              <p>No results</p>
            ) : (
              chapterExerciseQuery.data.map(
                ({ id, title, description, exerciseId }) => (
                  <CardItem
                    key={id}
                    title={title}
                    description={description}
                    onUpdate={() =>
                      navigate(
                        `/exercise-category/${categoryId}/${exerciseId}/${id}/edit`,
                      )
                    }
                    onDelete={() => setConfirmDelete({ show: true, id })}
                  />
                ),
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chapter;
