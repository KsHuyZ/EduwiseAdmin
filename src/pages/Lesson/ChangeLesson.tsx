import { zodResolver } from '@hookform/resolvers/zod';
import { Chess } from 'chess.js';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { ArrowLeft } from 'lucide-react';
import Button from '@/components/Button';
import ChessTable from '@/components/Chess/ChessTable';
import PageTitle from '@/components/PageTitle';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MoveHistory } from '@/types';
import { fenRegex } from '@/constant';
import { useAuth } from '@/hooks';
import ModalDescription from './components/ModalDescription';
import { useChangeLesson, useLesson } from './hook';
import toast from 'react-hot-toast';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { htmlDecode } from '@/utils';

const schema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  description: z.string().min(2, {
    message: 'Description must be at least 2 characters.',
  }),
});

const defaultValues = {
  title: '',
  description: '',
};

const initialFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

const ChangeLesson = () => {
  const { pathname } = useLocation();
  const { categoryId, lessonId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [movesHistory, setMovesHistory] = useState<MoveHistory[]>([]);
  const [index, setIndex] = useState<number | undefined>(undefined);
  const [fen, setFen] = useState('');
  const [fenError, setFenError] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [game, setGame] = useState<Chess | undefined>();
  const {
    mutateAsync: changeLesson,
    isLoading,
    isError,
    error,
  } = useChangeLesson(categoryId!, lessonId);
  const { data: lesson } = useLesson(lessonId);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const backMove = () => {
    let array = [...movesHistory];
    array.pop();
    setMovesHistory(array);
    if (array.length === 0) {
      setGame(new Chess(fen));
      return;
    }
    setGame(new Chess(array[array.length - 1].after));
  };

  useEffect(() => {
    if (lesson) {
      form.reset({ ...lesson, description: htmlDecode(lesson.description) });
      setFen(lesson.question);
      if (
        !lesson.question ||
        lesson.question === '' ||
        !lesson.steps[lesson.steps.length - 1]?.after
      )
        return;
      setGame(new Chess(lesson.steps[lesson.steps.length - 1].after));
      setMovesHistory(lesson.steps);
    }
  }, [lesson]);

  useEffect(() => {
    if (isError) {
      toast.error((error as { message: string }).message);
    }
  }, [isError]);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    if (categoryId) {
      await changeLesson({
        ...values,
        question: fen,
        steps: movesHistory,
        categoryId,
        createdBy: user?.id,
      });
      navigate(-1);

      toast.success(`${lessonId ? 'Update' : 'Create'} lesson success!`);
    }
  };
  const onSubmitFen = () => {
    if (fen === '' || fen === undefined) {
      setFen(initialFen);
      setGame(new Chess(initialFen));
      setIsSubmit(false);
      return;
    }
    if (!new RegExp(fenRegex).test(fen)) {
      setFenError('Invalid chess fen');
      setIsSubmit(true);
      return;
    }
    setGame(new Chess(fen));
    setIsSubmit(false);
  };

  const resetFen = () => {
    setGame(undefined);
    setIsSubmit(false);
    setFen('');
    setMovesHistory([]);
  };

  const isAdd = pathname.includes('/add');

  return (
    <>
      {isAdd ? (
        <PageTitle title="Add Lesson" />
      ) : (
        <PageTitle title="Update Lesson" />
      )}
      <ModalDescription
        index={index}
        setIndex={setIndex}
        movesHistory={movesHistory}
        setMovesHistory={setMovesHistory}
      />
      <div className="mb-5">
        <ArrowLeft className="cursor-pointer" onClick={() => navigate(-1)} />
      </div>
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
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
                  <div className="w-full">
                    <CKEditor
                      editor={ClassicEditor}
                      data={field.value}
                      onReady={(editor) => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor);
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

          {!game ? (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <Input
                placeholder="Eg: rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
                onChange={(e) => setFen(e.target.value)}
              />
              {isSubmit ? <p className="text-red-600">{fenError}</p> : null}
              <Button onClick={onSubmitFen} variant="outline">
                Submit
              </Button>
            </FormItem>
          ) : (
            <>
              <Button variant="outline" onClick={resetFen}>
                Reset
              </Button>
              <Button className="ml-4" onClick={backMove}>
                Go back
              </Button>
              <div className="flex justify-between">
                <div className="w-2/3 mr-10">
                  <ChessTable
                    fen={fen}
                    movesHistory={movesHistory}
                    setMovesHistory={setMovesHistory}
                    game={game}
                    setGame={setGame}
                  />
                </div>
                <div className="w-1/3 border bg-slate-200 rounded ">
                  {movesHistory.length === 0 ? (
                    <div className="w-full h-full flex justify-center items-center">
                      <p className="text-center">Empty</p>
                    </div>
                  ) : (
                    <div className="container mx-auto grid grid-cols-2 overflow-auto">
                      {movesHistory.map((move, row) => (
                        <div
                          key={row}
                          className="m-1 bg-slate-600 hover:bg-slate-900 rounded flex justify-center h-fit cursor-pointer duration-200"
                          onClick={() => setIndex(row)}
                        >
                          <span className="text-white text-center font-bold">
                            {move.san}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          <Button type="submit" isLoading={isLoading}>
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ChangeLesson;
