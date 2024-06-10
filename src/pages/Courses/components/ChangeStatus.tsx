import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Check, X } from 'lucide-react';
import { useState } from 'react';
import { EStatusAdmin } from '@/types';

interface IChangeStatus {
  status: EStatusAdmin;
}

const ChangeStatus = ({ status }: IChangeStatus) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
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
            <Button>Continue</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {status === EStatusAdmin.CHECKED ? (
        <Button variant={'ghost'} onClick={() => setOpen(true)}>
          <X size={20} className="text-red-600" />
        </Button>
      ) : (
        <Button variant={'ghost'} onClick={() => setOpen(true)}>
          <Check size={20} className="text-emerald-600" />
        </Button>
      )}
    </>
  );
};

export default ChangeStatus;
