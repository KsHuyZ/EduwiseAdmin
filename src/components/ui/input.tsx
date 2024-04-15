import React, { useState } from 'react';

import { cn } from '@/utils';
import { IconType } from 'react-icons';
import { EyeIcon, EyeOffIcon, LucideIcon } from 'lucide-react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: IconType | LucideIcon;
  rightIcon?: IconType | LucideIcon;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, leftIcon: LeftIcon, rightIcon: RightIcon, ...props },
    ref,
  ) => {
    const [visible, setVisible] = useState(false);
    const commonClass =
      'text-gray-500 cursor-pointer z-auto w-5 h-5 absolute top-1/2 transform -translate-y-1/2 right-3';

    const changeVisible = () => {
      setVisible((prev) => !prev);
    };

    return (
      <div className={"relative flex items-center w-full"}>
        {LeftIcon ? (
          <LeftIcon className="text-gray-500 w-4 h-4 absolute top-1/2 transform -translate-y-1/2 left-3" />
        ) : null}
        {type !== 'password' ? (
          RightIcon ? (
            <RightIcon className={commonClass} />
          ) : null
        ) : !visible ? (
          <EyeIcon className={commonClass} onClick={changeVisible} />
        ) : (
          <EyeOffIcon className={commonClass} onClick={changeVisible} />
        )}
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:ring-primary focus:border-primary  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors',
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
