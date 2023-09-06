import { ItemType } from '../../../types';
import React from 'react';

interface SuggestionsPropsType {
  filteredSuggestions: ItemType[];
  handleSuggestItemClick: (clickedItem: ItemType) => void;
}

export const Suggestions = ({
  filteredSuggestions,
  handleSuggestItemClick,
}: SuggestionsPropsType) => {
  return (
    <div className={'suggestions'}>
      {filteredSuggestions.map((sug) => (
        <div
          key={sug.id}
          onClick={() => handleSuggestItemClick(sug)}
          className={'suggestions__item'}
        >
          {sug.label}
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
