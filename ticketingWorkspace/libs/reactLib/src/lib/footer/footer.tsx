import React from 'react';
import { TEXT } from '@ticketing-workspace/shared-utilities';

export const Footer: React.FC = () => {
  return (
    <footer>
      <span>{TEXT.footerLabel}</span>
    </footer>
  );
};
