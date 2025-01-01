import Button from '@/components/Button';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { EllipsisVertical } from 'lucide-react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { StatusEnum } from '@/types';
import { useUserAction } from './hooks';
import toast from 'react-hot-toast';

interface Props {
  status: StatusEnum;
  id: string;
  refetch: () => void;
}

const ChangeStatus: React.FC<Props> = ({ status, id, refetch }) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isLoading } = useUserAction();

  const onSubmit = async () => {
    await mutateAsync({
      id,
      status:
        status === StatusEnum.BLOCK ? StatusEnum.ACTIVE : StatusEnum.BLOCK,
    });
    refetch();
    setOpen(false);
    toast.success('User status has been changed');
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will{' '}
              {status === StatusEnum.BLOCK ? 'active' : 'block'} user
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button isLoading={isLoading} onClick={onSubmit}>
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'} onClick={() => setOpen(true)}>
            <EllipsisVertical className="w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Action</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setOpen(true)}>
              {status === StatusEnum.BLOCK ? 'Active' : 'Block'}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ChangeStatus;
