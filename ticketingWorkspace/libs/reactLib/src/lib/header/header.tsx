import React from 'react';
import { TEXT } from '@ticketing-workspace/shared-utilities';
import styles from './header.module.scss';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>       
      <h1>{TEXT.appTitle}</h1>
      <span>{TEXT.headerLabel}</span>
      <button>{TEXT.buttonLabel}</button>
    </header>
  );
};
