import React, { ReactNode } from 'react';
import styles from './CompContainer.module.scss';

export const CompContainer = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  return (
    <div className={styles.item}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.comp}>{children}</div>
    </div>
  );
};

export default CompContainer;
