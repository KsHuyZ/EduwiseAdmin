import { htmlDecode } from '@/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { MoreHorizontal, Pen, Trash } from 'lucide-react';

interface CardItemProps {
  title: string;
  description: string;
  onUpdate: () => void;
  onDelete: () => void;
}

const CardItem = ({
  title,
  description,
  onUpdate,
  onDelete,
}: CardItemProps) => {
  return (
    <Card className="h-full space-y-0">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span className="line-clamp-1">{title}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MoreHorizontal className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Action</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdate();
                }}
              >
                <Pen className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
              >
                <Trash className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          <div
            className="line-clamp-3"
            dangerouslySetInnerHTML={{ __html: htmlDecode(description) }}
          />
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default CardItem;
