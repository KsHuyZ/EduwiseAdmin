import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';

type OmittedInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size' | 'value'
>;

export type Tag = {
  id: string;
  text: string;
};

export interface TagInputProps
  extends OmittedInputProps,
    VariantProps<typeof tagVariants> {
  placeholder?: string;
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  enableAutocomplete?: boolean;
  autocompleteOptions?: Tag[];
  maxTags?: number;
  minTags?: number;
  readOnly?: boolean;
  disabled?: boolean;
  onTagAdd?: (tag: string) => void;
  onTagRemove?: (tag: string) => void;
  allowDuplicates?: boolean;
  validateTag?: (tag: string) => boolean;
  showCount?: boolean;
  placeholderWhenFull?: string;
  sortTags?: boolean;
  delimiterList?: string[];
  truncate?: number;
  minLength?: number;
  maxLength?: number;
  usePopoverForTags?: boolean;
  value?: string | number | readonly string[] | { id: string; text: string }[];
  autocompleteFilter?: (option: string) => boolean;
  direction?: 'row' | 'column';
  onInputChange?: (value: string) => void;
  customTagRenderer?: (tag: Tag) => React.ReactNode;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onTagClick?: (tag: Tag) => void;
  draggable?: boolean;
  inputFieldPostion?: 'bottom' | 'top' | 'inline';
  clearAll?: boolean;
  onClearAll?: () => void;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  restrictTagsToAutocompleteOptions?: boolean;
}

export const tagVariants = cva(
  'transition-all border inline-flex items-center text-sm pl-2 rounded-md',
  {
    variants: {
      variant: {
        default: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        primary:
          'bg-primary border-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive border-destructive text-destructive-foreground hover:bg-destructive/90',
      },
      size: {
        sm: 'text-xs h-7',
        md: 'text-sm h-8',
        lg: 'text-base h-9',
        xl: 'text-lg h-10',
      },
      shape: {
        default: 'rounded-sm',
        rounded: 'rounded-lg',
        square: 'rounded-none',
        pill: 'rounded-full',
      },
      borderStyle: {
        default: 'border-solid',
        none: 'border-none',
      },
      textCase: {
        uppercase: 'uppercase',
        lowercase: 'lowercase',
        capitalize: 'capitalize',
      },
      interaction: {
        clickable: 'cursor-pointer hover:shadow-md',
        nonClickable: 'cursor-default',
      },
      animation: {
        none: '',
        fadeIn: 'animate-fadeIn',
        slideIn: 'animate-slideIn',
        bounce: 'animate-bounce',
      },
      textStyle: {
        normal: 'font-normal',
        bold: 'font-bold',
        italic: 'italic',
        underline: 'underline',
        lineThrough: 'line-through',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      shape: 'default',
      borderStyle: 'default',
      textCase: 'capitalize',
      interaction: 'nonClickable',
      animation: 'fadeIn',
      textStyle: 'normal',
    },
  },
);

export type TagProps = {
  tagObj: Tag;
  variant: TagInputProps['variant'];
  size: TagInputProps['size'];
  shape: TagInputProps['shape'];
  borderStyle: TagInputProps['borderStyle'];
  textCase: TagInputProps['textCase'];
  interaction: TagInputProps['interaction'];
  animation: TagInputProps['animation'];
  textStyle: TagInputProps['textStyle'];
  onRemoveTag: (id: string) => void;
} & Pick<TagInputProps, 'direction' | 'onTagClick' | 'draggable'>;

export const Tag: React.FC<TagProps> = ({
  tagObj,
  direction,
  draggable,
  onTagClick,
  onRemoveTag,
  variant,
  size,
  shape,
  borderStyle,
  textCase,
  interaction,
  animation,
  textStyle,
}) => {
  return (
    <span
      key={tagObj.id}
      draggable={draggable}
      className={cn(
        tagVariants({
          variant,
          size,
          shape,
          borderStyle,
          textCase,
          interaction,
          animation,
          textStyle,
        }),
        {
          'justify-between': direction === 'column',
          'cursor-pointer': draggable,
        },
      )}
      onClick={() => onTagClick?.(tagObj)}
    >
      {tagObj.text}
      <Button
        type="button"
        variant="ghost"
        onClick={(e) => {
          e.stopPropagation(); // Prevent event from bubbling up to the tag span
          onRemoveTag(tagObj.id);
        }}
        className={cn('py-1 px-3 h-full hover:bg-transparent')}
      >
        <X size={14} />
      </Button>
    </span>
  );
};
