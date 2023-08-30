import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import styles from './StoreSelectedItems.module.scss';
import { Button } from '../../components/base/Button';
import { ErrorMsg } from '../../components/base/ErrorMsg';
import { Field } from '../../components/base/Field';
import { InputField } from '../../components/base/InputField';
import { ItemsInStore } from '../../components/base/ItemsInStore';
import { Suggestions } from '../../components/base/Suggestions';
import useCloseOutsideClick from '../../hooks/useCloseOutsideClick';
import { ItemType } from '../../types';
import { formatStrToFilter } from '../../utils/index';
import {
  formatStr,
  formatLabelToStore,
  DEFAULT_INPUT_REGEX,
} from '../../utils/index';

interface StoreSelectedItemsPropsType {
  initialItemsInStore: ItemType[];
  originSuggestions: ItemType[];
  inputRegexStr?: string;
  btnLabel?: string;
  className?: string;
  maxItemLength?: number;
  placeholder?: string;
}

export const StoreSelectedItems = ({
  initialItemsInStore,
  inputRegexStr,
  originSuggestions,
  btnLabel = 'Add',
  className,
  maxItemLength,
  placeholder,
}: StoreSelectedItemsPropsType) => {
  const [userInput, setUserInput] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showSuggest, setShowSuggest] = useState<boolean>(false);
  const [itemsToStore, setItemsToStore] = useState<ItemType[]>(
    initialItemsInStore || [],
  );
  const [suggestions, setSuggestions] = useState<ItemType[]>([]);
  const { containerRef, inputRef } = useCloseOutsideClick(() =>
    setShowSuggest(false),
  );
  const filteredSuggestions = useMemo(() => {
    const itemsToStoreIds = itemsToStore
      .filter((item) => !!item.id)
      .map((item) => item.id);
    return suggestions.filter((sug) => !itemsToStoreIds.includes(sug.id));
  }, [itemsToStore, suggestions]);

  const filteredSuggestionsToShow = useMemo(
    () =>
      userInput
        ? filteredSuggestions.filter((sug) =>
            formatStrToFilter(sug.label).includes(formatStrToFilter(userInput)),
          )
        : filteredSuggestions,
    [filteredSuggestions, userInput],
  );

  const handleUserInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError('');
    const newValue = e.target.value;
    const regex = inputRegexStr
      ? new RegExp(inputRegexStr)
      : DEFAULT_INPUT_REGEX;
    const isValidString = newValue
      .replaceAll(' ', '')
      .split('')
      .every((letter) => !!letter.match(regex));

    if (!isValidString) {
      setError('Sorry... Only letters, numbers are available.');
      return;
    }
    setUserInput(e.target.value);
  };

  const handleSuggestItemClick = (item: ItemType) => {
    console.log({ item });
    if (maxItemLength && itemsToStore.length === maxItemLength) {
      setError(
        `Unable to add a new item as it reached ${maxItemLength} items.`,
      );
      setShowSuggest(false);
      setUserInput('');
      return;
    }

    setItemsToStore((prev) => [...prev, item]);
    setShowSuggest(false);
    setSuggestions((prev) => prev.filter((sug) => sug.id !== item.id));
  };

  const handleRemoveItem = (item: ItemType) => {
    setItemsToStore((prev) => prev.filter((im) => im.label !== item.label));

    if (item.id && !suggestions.find((sug) => sug.id === item.id)) {
      setSuggestions((prev) => [...prev, item]);
    }
  };

  const handleAddBtnClick = () => {
    if (maxItemLength && itemsToStore.length === maxItemLength) {
      setError(
        `Unable to add a new item as it reached ${maxItemLength} items.`,
      );
      setUserInput('');
      return;
    }
    const formattedUserInput = formatStr(userInput);

    if (!formattedUserInput.length) {
      return;
    }

    const itemInStore = itemsToStore.find(
      (item) => item.label.toLowerCase() === formattedUserInput,
    );

    if (itemInStore) {
      setError(`'${userInput}' is already added.`);
      setUserInput('');
      return;
    }

    const itemInOriginData = originSuggestions.find(
      (sug) => sug.label.toLowerCase() === formattedUserInput,
    );

    if (itemInOriginData) {
      setItemsToStore((prev) => [...prev, itemInOriginData]);
      setUserInput('');
      return;
    }

    const newItem = {
      id: null,
      label: formatLabelToStore(userInput),
    };
    setItemsToStore((prev) => [...prev, newItem]);
    setUserInput('');
  };

  const handleOnFocusInput = () => {
    setError('');
    setShowSuggest((prev) => !prev);
  };

  useEffect(() => {
    // initial setup suggestions
    if (!originSuggestions) return;
    setSuggestions(originSuggestions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={clsx(styles.storeSelectedItems, className ? className : '')}
      ref={containerRef}
    >
      <Field>
        <InputField
          placeholder={placeholder}
          userInput={userInput}
          handleUserInputChange={handleUserInputChange}
          handleOnFocusInput={handleOnFocusInput}
          innerRef={inputRef}
        />
        {showSuggest && filteredSuggestionsToShow.length > 0 && (
          <Suggestions
            filteredSuggestions={filteredSuggestionsToShow}
            handleSuggestItemClick={handleSuggestItemClick}
          />
        )}
        <Button label={btnLabel} onClick={handleAddBtnClick} />
      </Field>
      {error && <ErrorMsg error={error} />}
      {itemsToStore && !!itemsToStore.length && (
        <ItemsInStore
          items={itemsToStore}
          handleRemoveItem={handleRemoveItem}
        />
      )}
    </div>
  );
};

export default StoreSelectedItems;
