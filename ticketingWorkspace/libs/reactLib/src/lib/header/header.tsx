import React from 'react';
import { TEXT } from '@ticketing-workspace/shared-utilities';
import styles from './header.module.scss';
import {Logo} from '../../../../shared-utilities/src/lib/assets/logo';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <img src={Logo} alt="" style={{ width: '150px' }} />       
      <h1>{TEXT.appTitle}</h1>
      <span>{TEXT.headerLabel}</span>
      <button>{TEXT.buttonLabel}</button>
    </header>
  );
};
