import { IoPlayCircleOutline } from 'react-icons/io5';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import ReactPlayer from 'react-player/youtube';
import { TImageType } from '@/types';

interface IModalPreviewProps {
  img: TImageType;
  name: string;
}

const ModalPreview = ({ img, name }: IModalPreviewProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative">
          <div className="absolute bg-gradient-to-t w-full h-full from-[#2d2f31e6] cursor-pointer rounded-md">
            <div className="flex h-full items-center justify-center">
              <IoPlayCircleOutline className="w-10 h-10 text-white" />
            </div>
          </div>
          <img
            src={img.url}
            className="rounded-md w-[500px]"
            alt="Course preview"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="min-w-fit duration-200">
        <DialogHeader>
          <DialogDescription>Course Preview</DialogDescription>
          <DialogTitle>{name}</DialogTitle>
        </DialogHeader>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=2NPIYnY3ilo&pp=ygUIcmVhY3QgMTk%3D"
          playing={true}
          light
          pip
          autoPlay
          muted={false}
          controls
          style={{
            borderRadius: 20,
          }}
        >
          <source
            autoFocus
            src="https://www.youtube.com/watch?v=2NPIYnY3ilo&pp=ygUIcmVhY3QgMTk%3D"
            type="video/mp4"
          />
        </ReactPlayer>
      </DialogContent>
    </Dialog>
  );
};

export default ModalPreview;
