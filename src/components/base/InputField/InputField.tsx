import { ChangeEvent } from 'react';
import styles from './InputField.module.scss';

interface InputFieldPropsType {
  placeholder: string | undefined;
  userInput: string;
  handleUserInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleOnFocusInput: () => void;
  innerRef: React.RefObject<HTMLInputElement>;
}

export const InputField = ({
  placeholder,
  userInput,
  handleUserInputChange,
  handleOnFocusInput,
  innerRef,
}: InputFieldPropsType) => {
  return (
    <input
      type="text"
      className={styles.input}
      placeholder={placeholder}
      value={userInput}
      onChange={handleUserInputChange}
      onFocus={handleOnFocusInput}
      ref={innerRef}
    />
  );
};

export default InputField;
