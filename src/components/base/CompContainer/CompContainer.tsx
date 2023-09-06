import React, { ReactNode } from 'react';

export const CompContainer = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  return (
    <div className="comp">
      <div className="comp__item">
        <h2 className="comp__title">{title}</h2>
        <div className="comp__content">{children}</div>
      </div>
    </div>
  );
};

export default CompContainer;
