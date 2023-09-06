import React from 'react';

interface ButtonPropsType {
  onClick: () => void;
  label: string;
}

export const Button = ({ label, onClick }: ButtonPropsType) => {
  return (
    <div className={'button'} onClick={onClick}>
      {label}
    </div>
  );
};

export default Button;
