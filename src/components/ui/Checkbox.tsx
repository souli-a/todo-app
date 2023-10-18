import { useState } from 'react';
import '../../styles/components/ui/checkbox.scss';

interface CheckboxProps {
  onClick?: () => void;
  onChange?: () => void;
  checked?: boolean;
  className:
    | 'checkbox-basic checkbox-basic-light'
    | 'checkbox-basic checkbox-basic-dark';
  children?: JSX.Element;
  isChecboxChecked?: boolean;
}

const Checkbox = ({
  className,
  onClick,
  children,
  checked,
  isChecboxChecked,
}: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <input
        type="checkbox"
        onChange={handleCheckboxClick}
        onClick={onClick}
        className={className}
        checked={isChecboxChecked}
      />
      {children}
    </>
  );
};

export default Checkbox;
