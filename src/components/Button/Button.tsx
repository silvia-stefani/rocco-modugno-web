import * as React from 'react';
import styles from './Button.module.scss'
import { MouseEventHandler } from 'react';

interface IButtonProps {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FunctionComponent<IButtonProps> = ({ label, onClick, icon, disabled }) => {

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    onClick()
  }

  return (
    <button disabled={disabled} className={styles.Button} onClick={handleClick}>
      {icon && <span>{icon}</span>}
      {label}
    </button>
  );
};

export default Button;
