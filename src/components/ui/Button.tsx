import { RefCallback, RefObject } from 'react';
import '../../styles/components/ui/button.scss';

interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: JSX.Element | React.ReactNode;
  className:
    | 'button button-basic-light'
    | 'button button-basic-dark'
    | 'button button-red-light'
    | 'button button-red-dark'
    | 'button button-add-edit-todo-light'
    | 'button button-add-edit-todo-dark'
    | 'button button-start-edit-todo-light'
    | 'button button-start-edit-todo-dark'
    | 'button button-delete-todo-light'
    | 'button button-delete-todo-dark';
  ref?: RefObject<HTMLButtonElement> | RefCallback<HTMLButtonElement>;
}

const Button = ({ onClick, children, className, ref }: ButtonProps) => {
  return (
    <button ref={ref} onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default Button;
