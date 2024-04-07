import { EyeIcon, EyeOffIcon, LucideIcon } from 'lucide-react';
import { useState, type InputHTMLAttributes } from 'react';
import {
  type FieldErrors,
  type FieldValues,
  type Path,
  type UseFormRegister,
} from 'react-hook-form';
import { IconType } from 'react-icons';

export interface Props<
  T extends FieldValues = FieldValues,
  U extends FieldValues = FieldValues,
> extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  disabled?: boolean;
  leftIcon?: IconType | LucideIcon;
  rightIcon?: IconType | LucideIcon;
  register: UseFormRegister<T>;
  errors?: FieldErrors<U>;
}

const Input = <T extends FieldValues, U extends FieldValues>({
  disabled = false,
  placeholder,
  errors,
  label,
  name,
  value,
  register,
  type,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  ...rest
}: Props<T, U>) => {
  const [visible, setVisible] = useState(false);

  const changeVisible = () => {
    setVisible((prev) => !prev);
  };

  const commonClass =
    'text-gray-500 cursor-pointer z-auto w-5 h-5 absolute top-1/2 transform -translate-y-1/2 right-3';
  return (
    <div className="flex flex-col">
      <label className="flex" htmlFor={name}>
        {label ?? ''}
      </label>
      <div className="relative flex items-center focus:outline-none">
        {LeftIcon ? (
          <LeftIcon className="w-5 h-5 absolute top-1/2 transform -translate-y-1/2 left-3" />
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
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:outline-none focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          {...register(name as Path<T>)}
          {...rest}
        />
      </div>

      {errors && errors[name as keyof U] && (
        <span className="">{errors[name as keyof U]?.message as string}</span>
      )}
    </div>
  );
};

export default Input;
