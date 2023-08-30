import styles from './Button.module.scss';

interface ButtonPropsType {
  onClick: () => void;
  label: string;
}

export const Button = ({ label, onClick }: ButtonPropsType) => {
  return (
    <div className={styles.button} onClick={onClick}>
      {label}
    </div>
  );
};

export default Button;
