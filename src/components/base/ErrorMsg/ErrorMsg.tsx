import { IoMdCloseCircle } from 'react-icons/io';
import styles from './ErrorMsg.module.scss';

export const ErrorMsg = ({ error }: { error: string }) => {
  return (
    <div className={styles.error}>
      <IoMdCloseCircle />
      <span>{error}</span>
    </div>
  );
};

export default ErrorMsg;
