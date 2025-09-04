import React from 'react';
import { TEXT } from '@ticketing-workspace/shared-utilities';
import styles from './footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className= {styles.footer}>
      <span>{TEXT.footerLabel}</span>
    </footer>
  );
};
