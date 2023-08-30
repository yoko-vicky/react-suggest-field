import styles from './Suggestions.module.scss';
import { ItemType } from '../../../types';

interface SuggestionsPropsType {
  filteredSuggestions: ItemType[];
  handleSuggestItemClick: (clickedItem: ItemType) => void;
}

export const Suggestions = ({
  filteredSuggestions,
  handleSuggestItemClick,
}: SuggestionsPropsType) => {
  return (
    <div className={styles.suggestions}>
      {filteredSuggestions.map((sug) => (
        <div
          key={sug.id}
          onClick={() => handleSuggestItemClick(sug)}
          className={styles.item}
        >
          {sug.label}
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
