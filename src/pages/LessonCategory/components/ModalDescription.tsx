import { Dispatch, SetStateAction, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '@/components/Button';
import { Input } from '@/components/ui/input';
import { MoveHistory } from '@/types';
import { htmlDecode } from '@/utils';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
interface ModalProps {
  index: number | undefined;
  setIndex: Dispatch<SetStateAction<number | undefined>>;
  movesHistory: MoveHistory[];
  setMovesHistory: Dispatch<SetStateAction<MoveHistory[]>>;
}

const schema = z.object({
  description: z.string().min(2, {
    message: 'Description must be at least 2 characters.',
  }),
});

const ModalDescription = ({
  index,
  setIndex,
  movesHistory,
  setMovesHistory,
}: ModalProps) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: '',
    },
  });
  const onSubmit = (index?: number) => {
    const description = form.getValues('description');
    setMovesHistory((prev) =>
      prev.map((move, i) => {
        if (index === i) {
          return { ...move, description };
        }
        return move;
      }),
    );
    setIndex(undefined);
  };

  useEffect(() => {
    if (typeof index === 'number') {
      form.reset({ description: htmlDecode(movesHistory[index].description) });
    } else {
      form.reset({ description: '' });
    }
  }, [index]);

  return (
    <Dialog
      open={typeof index === 'number'}
      onOpenChange={() => setIndex(undefined)}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Step Description</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(() => onSubmit(index!))}
            className="space-y-8"
          >
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDescription;
