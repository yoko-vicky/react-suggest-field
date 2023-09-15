import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { Button } from '../../components/base/Button';
import { ErrorMsg } from '../../components/base/ErrorMsg';
import { Field } from '../../components/base/Field';
import { InputField } from '../../components/base/InputField';
import { Suggestions } from '../../components/base/Suggestions';
import useCloseOutsideClick from '../../hooks/useCloseOutsideClick';
import { IdType, ItemType } from '../../types';
import { formatStrToFilter } from '../../utils/index';
import { formatStr } from '../../utils/index';

export interface SimpleFilterPropsType {
  originSuggestions: ItemType[];
  btnLabel?: string;
  className?: string;
  placeholder?: string;
}

export const SimpleFilter = ({
  originSuggestions,
  btnLabel = 'Search',
  className,
  placeholder,
}: SimpleFilterPropsType) => {
  const [userInput, setUserInput] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showSuggest, setShowSuggest] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
  const [suggestions, setSuggestions] = useState<ItemType[]>([]);
  const [onFocusItemIndex, setOnFocusItemIndex] = useState<number | null>(null);
  const [clickedEnter, setClickedEnter] = useState<boolean>(false);

  const { containerRef, inputRef } = useCloseOutsideClick(() =>
    setShowSuggest(false),
  );
  const filteredSuggestions = useMemo(
    () =>
      userInput
        ? suggestions.filter((sug) =>
            formatStrToFilter(sug.label).includes(formatStrToFilter(userInput)),
          )
        : suggestions,
    [suggestions, userInput],
  );

  const handleUserInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError('');
    setUserInput(e.target.value);
  };

  const handleSuggestItemClick = (itemId: IdType) => {
    // console.log({ item });
    // TODO: update method with itemId
    const item = filteredSuggestions.find((sug) => `${sug.id}` === `${itemId}`);
    if (item) {
      setSelectedItem(item);
      setShowSuggest(false);
      //  console.log('Do Something', item.label);
      setUserInput(item.label);
      setSuggestions(originSuggestions.filter((sug) => sug.id !== item.id));
    }
  };

  const handleSearchBtnClick = () => {
    const formattedUserInput = formatStr(userInput);

    if (!formattedUserInput.length) {
      return;
    }

    if (selectedItem) {
      // DO Search here
      console.log('Do Search!', formattedUserInput);
      return;
    }

    // setUserInput('');
  };

  const handleOnFocusInput = () => {
    setError('');
    setShowSuggest((prev) => !prev);
  };

  const handleCursorSelect = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      inputRef.current?.blur();
      setOnFocusItemIndex((prev) =>
        prev === null
          ? 0
          : prev === 0
          ? prev + 1
          : prev + 1 === filteredSuggestions.length
          ? 0
          : prev + 1,
      );
    }

    if (e.key === 'ArrowUp') {
      inputRef.current?.blur();
      setOnFocusItemIndex((prev) =>
        prev === null || prev === 0 ? filteredSuggestions.length : prev - 1,
      );
    }

    if (e.key === 'Enter') {
      inputRef.current?.blur();
      console.log('Clicked Enter', onFocusItemIndex);
      setClickedEnter(true);
    }
  };

  const handleSuggestItemClickByFocus = (targetItemIndex: number) => {
    const targetItem = filteredSuggestions[targetItemIndex];
    if (targetItem) {
      setSuggestions((prev) => prev.filter((sug) => sug.id !== targetItem.id));
      setUserInput('');
      setSelectedItem(targetItem);
      setUserInput(targetItem.label);
    }
    setShowSuggest(false);
    setOnFocusItemIndex(null);
  };

  useEffect(() => {
    if (!showSuggest) return;

    document.addEventListener('keydown', handleCursorSelect);
    return () => document.removeEventListener('keydown', handleCursorSelect);
  }, [showSuggest]);

  useEffect(() => {
    if (!clickedEnter || !showSuggest || onFocusItemIndex == null) return;
    handleSuggestItemClickByFocus(onFocusItemIndex);
    setClickedEnter(false);
  }, [clickedEnter, showSuggest, onFocusItemIndex]);

  useEffect(() => {
    // initial setup suggestions
    if (!originSuggestions) return;
    setSuggestions(originSuggestions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log({ onFocusItemIndex, clickedEnter: clickedEnter });

  return (
    <div
      className={clsx('simpleFilter', className ? className : '')}
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
        {showSuggest && filteredSuggestions.length > 0 && (
          <Suggestions
            filteredSuggestions={filteredSuggestions}
            handleSuggestItemClick={handleSuggestItemClick}
            onFocusItemIndex={onFocusItemIndex}
          />
        )}
        <Button label={btnLabel} onClick={handleSearchBtnClick} />
      </Field>
      {error && <ErrorMsg error={error} />}
      <div className={'simpleFilter__selectedItem'}>
        SelectedItem: {selectedItem?.label || 'No item selected'}
      </div>
    </div>
  );
};

export default SimpleFilter;
