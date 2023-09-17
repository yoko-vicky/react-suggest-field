import React, { ReactNode } from 'react';

export interface CompContainerPropsType {
  children: ReactNode;
  title?: string;
}

export const CompContainer = ({
  children,
  title = '',
}: CompContainerPropsType) => {
  return (
    <div className="comp">
      <div className="comp__item">
        {title && <h2 className="comp__title">{title}</h2>}
        <div className="comp__content">{children}</div>
      </div>
    </div>
  );
};

export default CompContainer;
