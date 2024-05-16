import * as React from 'react';
import styles from './Button.module.scss'
import { MouseEventHandler } from 'react';

interface IButtonProps {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode | string;
  disabled?: boolean;
  isTouchable?: boolean;
}

const Button: React.FunctionComponent<IButtonProps> = ({ label, onClick, icon, disabled, isTouchable }) => {

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    onClick()
  }

  return (
    <button disabled={disabled} className={`${styles.Button} ${isTouchable ? styles.mobile : ''}`} onClick={handleClick}>
      {label}
      {icon && <span>{icon}</span>}
    </button>
  );
};

export default Button;
