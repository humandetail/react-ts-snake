import React, { FC } from 'react';
import { IButtonProps } from '../../types';
import styles from './index.module.scss';

const Button: FC<IButtonProps> = ({ type, onClick, children }) => {
  return (
    <button
      className={ `${styles.btn} ${type ? styles['btn-' + type] : styles['btn-default']}` }
      onClick={ (e) => (onClick && onClick(e)) }
    >
      { children }
    </button>
  );
}

export default Button;
