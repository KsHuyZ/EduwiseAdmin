import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Button from '@/components/Button';
import { useCreateCategory } from '../hook';
import { useAuth } from '@/hooks';
import { Category } from '@/types/category';

const schema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  description: z.string().min(2, {
    message: 'Description must be at least 2 characters.',
  }),
});

interface ModalProps {
  open: boolean;
  setOpen: Dispatch<
    SetStateAction<{ show: boolean; form: Category | undefined }>
  >;
  formValue?: Category;
}

const defaultValues = {
  title: '',
  description: '',
};

const ModalCategory = ({ open, setOpen, formValue }: ModalProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const {
    isLoading,
    mutateAsync: createCategory,
    error,
    isError,
  } = useCreateCategory(formValue?.id);

  async function onSubmit(values: z.infer<typeof schema>) {
    await createCategory({ ...values, createdBy: user?.id });
    setOpen({ form: undefined, show: false });
    form.reset();
    toast.success(`${formValue ? 'Update' : 'Create'} category scucess`);
  }

  useEffect(() => {
    if (isError) {
      toast.error((error as { message: string }).message);
    }
  }, [isError]);

  useEffect(() => {
    if (formValue) {
      form.reset(formValue);
    }
  }, [formValue]);

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => setOpen((prev) => ({ ...prev, show: value }))}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {formValue ? 'Update' : 'Add'} Exercise Category
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" isLoading={isLoading || loading}>
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalCategory;
