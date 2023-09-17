import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { Button } from '../../components/base/Button';
import { ErrorMsg } from '../../components/base/ErrorMsg';
import { Field } from '../../components/base/Field';
import { InputField } from '../../components/base/InputField';
import { ItemsInStore } from '../../components/base/ItemsInStore';
import { Suggestions } from '../../components/base/Suggestions';
import useCloseOutsideClick from '../../hooks/useCloseOutsideClick';
import { IdType, ItemType } from '../../types';
import { formatStrToFilter } from '../../utils/index';
import {
  formatStr,
  formatLabelToStore,
  DEFAULT_INPUT_REGEX,
} from '../../utils/index';
import useCursorSelect from '../../hooks/useCursorSelect';

export interface StoreSelectedItemsPropsType {
  items: ItemType[];
  setItems: any;
  originSuggestions: ItemType[];
  inputRegexStr?: string;
  btnLabel?: string;
  className?: string;
  maxItemLength?: number;
  placeholder?: string;
}

export const StoreSelectedItems = ({
  items = [],
  setItems,
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
      setError(
        `Unable to add a new item as it reached ${maxItemLength} items.`,
      );
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

  const handleSuggestItemClick = (selectedItemId: IdType) => {
    if (maxItemLength && items.length === maxItemLength) {
      setError(
        `Unable to add a new item as it reached ${maxItemLength} items.`,
      );
      setShowSuggest(false);
      setUserInput('');
      return;
    }

    const targetItem = filteredSuggestions.find(
      (sug) => sug.id?.toString() === selectedItemId,
    );
    if (targetItem) {
      setItems((prev:ItemType[]) => [...prev, targetItem]);
      setShowSuggest(false);
      setSuggestions((prev) => prev.filter((sug) => sug.id !== targetItem.id));
      setUserInput('');
    }
  };

  const handleRemoveItem = (item: ItemType) => {
    setItems((prev: ItemType[]) => prev.filter((im) => im.label !== item.label));
    setError('');

    if (item.id && !suggestions.find((sug) => sug.id === item.id)) {
      setSuggestions((prev) => [...prev, item]);
    }

    setShowSuggest(false);
  };

  const handleAddBtnClick = () => {
    if (maxItemLength && items.length === maxItemLength) {
      setError(
        `Unable to add a new item as it reached ${maxItemLength} items.`,
      );
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
      setError(`'${userInput}' is already added.`);
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
    setError('');
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
      {error && <ErrorMsg error={error} />}
      {items && !!items.length && (
        <ItemsInStore
          items={items}
          handleRemoveItem={handleRemoveItem}
        />
      )}
    </div>
  );
};

export default StoreSelectedItems;
