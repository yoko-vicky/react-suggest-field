import { IoMdCloseCircle } from 'react-icons/io';
import React from 'react';

export const ErrorMsg = ({ error }: { error: string }) => {
  return (
    <div className={'errorMsg'}>
      <IoMdCloseCircle />
      <span>{error}</span>
    </div>
  );
};

export default ErrorMsg;
