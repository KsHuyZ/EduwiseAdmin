import toast from 'react-hot-toast';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect } from 'react';
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
import { cn, htmlDecode } from '@/utils';
import { useChangeLesson } from '../hook';
import { Lesson } from '@/types';

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
  lesson?: Lesson;
  categoryId?: string;
}

const defaultValues = {
  title: '',
  description: '',
};

const ModalLesson = ({ lesson, categoryId, open, setOpen }: ModalProps) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });
  const { mutateAsync: changeLesson, isLoading } = useChangeLesson(lesson?.id);

  async function onSubmit(values: z.infer<typeof schema>) {
    if (categoryId) {
      await changeLesson({ ...lesson, ...values, categoryId });
      setOpen(false);
      form.reset();
      toast.success(cn(lesson ? 'Update' : 'Create', 'category success'));
    }
  }

  useEffect(() => {
    if (lesson) {
      form.reset({
        ...lesson,
        description: htmlDecode(lesson.description),
      });
    } else if (!open) {
      form.reset({ title: '', description: '' });
    }
  }, [lesson, open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{lesson ? 'Update' : 'Add'} Lesson</DialogTitle>
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
            <Button type="submit" isLoading={isLoading}>
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalLesson;
