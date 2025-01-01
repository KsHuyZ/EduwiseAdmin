import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCategories, useMutateCategory } from './hooks';
import { Skeleton } from '@/components/ui/skeleton';
import DeleteModal from './components/DeleteModal';
import Button from '@/components/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { TCategoryPayload } from '@/types';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters long',
  }),
  image: z.any(),
});

const Category = () => {
  const { data, isLoading, refetch } = useCategories();
  const [open, setOpen] = useState(false);

  const { mutateAsync, isLoading: creating } = useMutateCategory();

  const form = useForm<TCategoryPayload>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: TCategoryPayload) {
    await mutateAsync(values);
    setOpen(false);
    refetch();
    form.reset();
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    const file = e.target.files[0];
    form.setValue('image', file);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create category</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Category name" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        placeholder="File name"
                        onChange={onChange}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button isLoading={creating} type="submit">
                  Save changes
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <div className="space-y-4">
        <Button onClick={() => setOpen(true)}>Create Category</Button>
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
                    <TableCell className="font-medium flex items-center space-x-5">
                      <img
                        src={tag.image || '/icon/home-category.png'}
                        className="w-10 rounded-md border"
                      />
                      <p>{tag.name}</p>
                    </TableCell>
                    <TableCell className="text-right">
                      <DeleteModal />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Category;
