import { ReactNode } from 'react';
import styles from './Field.module.scss';

export const Field = ({ children }: { children: ReactNode }) => {
  return <div className={styles.field}>{children}</div>;
};

export default Field;
