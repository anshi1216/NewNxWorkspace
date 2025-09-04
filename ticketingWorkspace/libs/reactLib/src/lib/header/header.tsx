import React from 'react';
import { TEXT } from '@ticketing-workspace/shared-utilities';

export const Header: React.FC = () => {
  return (
    <header>
      <h1>{TEXT.appTitle}</h1>
      <span>{TEXT.headerLabel}</span>
      <button>{TEXT.buttonLabel}</button>
    </header>
  );
};
