import React, { useEffect, useState } from 'react';
import { ItemType } from '../types';

const useCursorSelect = ({
  inputRef,
  filteredSuggestions,
  showSuggest,
  handleSuggestItemClickByFocus,
}: {
  inputRef: any;
  filteredSuggestions: ItemType[];
  showSuggest: boolean;
  handleSuggestItemClickByFocus: (targetItemIndex: number) => void;
}) => {
  const [onFocusItemIndex, setOnFocusItemIndex] = useState<number | null>(null);
  const [clickedEnter, setClickedEnter] = useState<boolean>(false);

  const handleCursorSelect = (e: KeyboardEvent) => {
    // console.log({ e: e.key, onFocusItemIndex });

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
      // console.log('Clicked Enter', onFocusItemIndex);
      setClickedEnter(true);
    }
  };

  useEffect(() => {
    if (!clickedEnter || !showSuggest || onFocusItemIndex == null) return;
    handleSuggestItemClickByFocus(onFocusItemIndex);
    setOnFocusItemIndex(null);
    setClickedEnter(false);
  }, [clickedEnter, showSuggest, onFocusItemIndex]);

  useEffect(() => {
    if (!showSuggest) return;

    document.addEventListener('keydown', handleCursorSelect);
    return () => document.removeEventListener('keydown', handleCursorSelect);
  }, [showSuggest]);

  return {
    onFocusItemIndex,
  };
};

export default useCursorSelect;
