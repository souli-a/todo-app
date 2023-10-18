import { RefObject, RefCallback } from 'react';
import '../../styles/components/ui/input.scss';

interface InputProps {
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder: string;
  className: 'input input-add-edit-todo-light' | 'input input-add-edit-todo-dark';
  inputRef?: RefObject<HTMLInputElement> | RefCallback<HTMLInputElement>;
}

const Input = ({
  type,
  onChange,
  value,
  placeholder,
  className,
  inputRef,
}: InputProps) => {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
      type={type}
      ref={inputRef}
    />
  );
};

export default Input;
