import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { Button } from '../../components/base/Button';
import { ErrorMsg } from '../../components/base/ErrorMsg';
import { Field } from '../../components/base/Field';
import { InputField } from '../../components/base/InputField';
import { ItemsInStore } from '../../components/base/ItemsInStore';
import { Suggestions } from '../../components/base/Suggestions';
import useCloseOutsideClick from '../../hooks/useCloseOutsideClick';
import { ErrorMessagesType, IdType, ItemType } from '../../types';
import { formatStrToFilter } from '../../utils/index';
import {
  formatStr,
  formatLabelToStore,
  DEFAULT_INPUT_REGEX,
} from '../../utils/index';
import useCursorSelect from '../../hooks/useCursorSelect';

export interface StoreSelectedItemsPropsType {
  items: ItemType[];
  setItems: React.Dispatch<React.SetStateAction<ItemType[]>>;
  originSuggestions: ItemType[];
  inputRegexStr?: string;
  btnLabel?: string;
  className?: string;
  maxItemLength?: number;
  placeholder?: string;
  error?: string;
  setError?: React.Dispatch<React.SetStateAction<string>>;
  errorMessages?: ErrorMessagesType;
  showErrorMessage?: boolean;
}

const defaultErrorMessages = {
  maximumReached: 'Unable to add a new item as it reached 3 items.',
  alreadyAdded: 'This item is already added.',
  unavailableCharacters: 'Sorry... Only letters, numbers are available.',
};

export const StoreSelectedItems = ({
  items = [],
  setItems,
  inputRegexStr,
  originSuggestions,
  btnLabel = 'Add',
  className,
  maxItemLength,
  placeholder,
  error,
  setError,
  errorMessages = defaultErrorMessages,
  showErrorMessage = true,
}: StoreSelectedItemsPropsType) => {
  const [userInput, setUserInput] = useState<string>('');
  const [showSuggest, setShowSuggest] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<ItemType[]>([]);
  const { containerRef, inputRef } = useCloseOutsideClick(() =>
    setShowSuggest(false),
  );

  const filteredSuggestions = useMemo(() => {
    const itemsToStoreIds = items
      .filter((item) => !!item.id)
      .map((item) => item.id);
    return suggestions.filter((sug) => !itemsToStoreIds.includes(sug.id));
  }, [items, suggestions]);

  const filteredSuggestionsToShow = useMemo(
    () =>
      userInput
        ? filteredSuggestions.filter((sug) =>
            formatStrToFilter(sug.label).includes(formatStrToFilter(userInput)),
          )
        : filteredSuggestions,
    [filteredSuggestions, userInput],
  );

  const handleSuggestItemClickByFocus = (targetItemIndex: number) => {
    if (maxItemLength && items.length === maxItemLength) {
      if (setError && errorMessages?.maximumReached) {
        setError(errorMessages?.maximumReached);
      }
      setShowSuggest(false);
      setUserInput('');
      return;
    }

    const targetItem = filteredSuggestions[targetItemIndex];
    if (targetItem) {
      setItems((prev: ItemType[]) => [...prev, targetItem]);
      setSuggestions((prev) => prev.filter((sug) => sug.id !== targetItem.id));
      setUserInput('');
    }
    setShowSuggest(false);
  };

  const { onFocusItemIndex } = useCursorSelect({
    inputRef,
    filteredSuggestions,
    showSuggest,
    handleSuggestItemClickByFocus,
  });

  const handleUserInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError && setError('');
    const newValue = e.target.value;
    const regex = inputRegexStr
      ? new RegExp(inputRegexStr)
      : DEFAULT_INPUT_REGEX;
    const isValidString = newValue
      .replaceAll(' ', '')
      .split('')
      .every((letter) => !!letter.match(regex));

    if (!isValidString && setError && errorMessages?.unavailableCharacters) {
      setError(errorMessages?.unavailableCharacters);
      return;
    }
    setUserInput(e.target.value);
  };

  const handleSuggestItemClick = (selectedItemId: IdType) => {
    if (maxItemLength && items.length === maxItemLength) {
      if (setError && errorMessages?.maximumReached) {
        setError(errorMessages.maximumReached);
      }
      setShowSuggest(false);
      setUserInput('');
      return;
    }

    const targetItem = filteredSuggestions.find(
      (sug) => sug.id === selectedItemId,
    );

    if (targetItem) {
      setItems((prev: ItemType[]) => [...prev, targetItem]);
      setSuggestions((prev) => prev.filter((sug) => sug.id !== targetItem.id));
    }

    setShowSuggest(false);
    setUserInput('');
  };

  const handleRemoveItem = (item: ItemType) => {
    setItems((prev: ItemType[]) =>
      prev.filter((im) => im.label !== item.label),
    );
    setError && setError('');

    if (item.id && !suggestions.find((sug) => sug.id === item.id)) {
      setSuggestions((prev) => [...prev, item]);
    }

    setShowSuggest(false);
  };

  const handleAddBtnClick = () => {
    if (maxItemLength && items.length === maxItemLength) {
      setError &&
        errorMessages?.maximumReached &&
        setError(errorMessages.maximumReached);
      setUserInput('');
      setShowSuggest(false);
      return;
    }
    const formattedUserInput = formatStr(userInput);

    if (!formattedUserInput.length) {
      return;
    }

    const itemInStore = items.find(
      (item) => item.label.toLowerCase() === formattedUserInput,
    );

    if (itemInStore) {
      setError &&
        errorMessages?.alreadyAdded &&
        setError(errorMessages.alreadyAdded);
      setUserInput('');
      return;
    }

    const itemInOriginData = originSuggestions.find(
      (sug) => sug.label.toLowerCase() === formattedUserInput,
    );

    if (itemInOriginData) {
      setItems((prev: ItemType[]) => [...prev, itemInOriginData]);
      setUserInput('');
      return;
    }

    const newItem = {
      id: null,
      label: formatLabelToStore(userInput),
    };
    setItems((prev: ItemType[]) => [...prev, newItem]);
    setUserInput('');
    setShowSuggest(false);
  };

  const handleOnFocusInput = () => {
    setError && setError('');
    setShowSuggest(true);
  };

  useEffect(() => {
    // initial setup suggestions
    if (!originSuggestions) return;
    setSuggestions(originSuggestions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={clsx('storeSelectedItems', className ? className : '')}
      ref={containerRef}
      data-testid="storeSelectedItems"
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
            onFocusItemIndex={onFocusItemIndex}
          />
        )}
        <Button label={btnLabel} onClick={handleAddBtnClick} />
      </Field>
      {error && showErrorMessage && <ErrorMsg error={error} />}
      {items && !!items.length && (
        <ItemsInStore items={items} handleRemoveItem={handleRemoveItem} />
      )}
    </div>
  );
};

export default StoreSelectedItems;
