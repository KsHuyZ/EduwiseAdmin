import toast from 'react-hot-toast';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect, useState } from 'react';
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
import { updateCategory } from '@/api/lesson';
import { htmlDecode } from '@/utils';

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
  setOpen: (open: boolean) => void;
  formValue?: Category;
  refetch: () => void;
}

const defaultValues = {
  title: '',
  description: '',
};

const ModalCategory = ({ open, setOpen, formValue, refetch }: ModalProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const {
    isLoading,
    mutateAsync: createCategory,
    // error,
    isError,
  } = useCreateCategory();

  async function onSubmit(values: z.infer<typeof schema>) {
    await createCategory({ ...values, createdBy: user?.id });
    setOpen(false);
    form.reset();
    toast.success('Create category success');
  }

  async function onSubmitUpdate(values: z.infer<typeof schema>) {
    try {
      setLoading(true);
      console.log(values);
      await updateCategory({
        ...values,
        description: values.description,
        id: formValue?.id,
      });
      refetch();
      toast.success('Update category success');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  useEffect(() => {
    if (isError) {
      toast.error('Error');
    }
  }, [isError]);

  useEffect(() => {
    if (formValue) {
      form.reset({
        ...formValue,
        description: htmlDecode(formValue.description),
      });
    } else {
      form.reset({ title: '', description: '' });
    }
  }, [formValue]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {formValue ? 'Update' : 'Add'} Lesson Category
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(formValue ? onSubmitUpdate : onSubmit)}
            className="space-y-8"
          >
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
                    <div className="w-96 h-30">
                      <CKEditor
                        editor={ClassicEditor}
                        data={field.value}
                        onReady={(editor) => {
                          // You can store the "editor" and use when it is needed.
                          console.log('Editor is ready to use!', editor);
                          editor.editing.view.change((writer) => {
                            writer.setStyle(
                              'height',
                              '100px',
                              editor.editing.view.document.getRoot()!,
                            );
                          });
                        }}
                        onChange={(_, editor) => {
                          form.setValue('description', editor.getData());
                        }}
                        onBlur={(_, editor) => {
                          console.log('Blur.', editor);
                        }}
                        onFocus={(_, editor) => {
                          console.log('Focus.', editor);
                        }}
                      />
                    </div>
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