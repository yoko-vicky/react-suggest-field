import { ReactNode } from 'react';
import React from 'react';

export const Field = ({ children }: { children: ReactNode }) => {
  return <div className={'field'}>{children}</div>;
};

export default Field;
