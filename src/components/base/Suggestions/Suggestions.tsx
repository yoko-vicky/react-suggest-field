import uuid from '../../../lib/uuid';
import { IdType, ItemType } from '../../../types';
import React from 'react';

interface SuggestionsPropsType {
  filteredSuggestions: ItemType[];
  handleSuggestItemClick: (clickedItemId: IdType) => void;
  onFocusItemIndex: number | null;
}

export const Suggestions = ({
  filteredSuggestions,
  handleSuggestItemClick,
  onFocusItemIndex,
}: SuggestionsPropsType) => {
  return (
    <div className={'suggestions'}>
      <div className="suggestions__inputs">
        {filteredSuggestions.map((sug) => (
          <input
            type="radio"
            id={`${sug.id}`}
            key={sug.id || uuid()}
            className="suggestions__input"
          />
        ))}
      </div>
      <div className="suggestions__labels">
        {filteredSuggestions.map((sug, index) => (
          <label
            htmlFor={`${sug.id}`}
            key={sug.id || uuid()}
            onClick={() => handleSuggestItemClick(sug.id)}
            className={`suggestions__item ${
              onFocusItemIndex === index ? 'focus' : ''
            }`}
          >
            {sug.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
