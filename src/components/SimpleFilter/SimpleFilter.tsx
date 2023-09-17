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
import useCursorSelect from '../../hooks/useCursorSelect';

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

  const handleSuggestItemClickByFocus = (targetItemIndex: number) => {
    const targetItem = filteredSuggestions[targetItemIndex];
    if (targetItem) {
      setSuggestions((prev) => prev.filter((sug) => sug.id !== targetItem.id));
      setUserInput('');
      setSelectedItem(targetItem);
      setUserInput(targetItem.label);
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

  useEffect(() => {
    // initial setup suggestions
    if (!originSuggestions) return;
    setSuggestions(originSuggestions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={clsx('simpleFilter', className ? className : '')}
      ref={containerRef}
      data-testid="simpleFilter"
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
