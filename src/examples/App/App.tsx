import React from 'react';
import styles from './App.module.scss';
import { SimpleFilter } from '../../auto-suggest/SimpleFilter';
import { StoreSelectedItems } from '../../auto-suggest/StoreSelectedItems';
import { CompContainer } from '../../components/base/CompContainer';
import uuid from '../../lib/uuid';
import { ItemType } from '../../types';

const originSuggestions = [
  {
    id: uuid(),
    label: 'Red',
  },
  {
    id: uuid(),
    label: 'Blue',
  },
  {
    id: uuid(),
    label: 'Yellow',
  },
  {
    id: uuid(),
    label: 'Green',
  },
  {
    id: uuid(),
    label: 'Black',
  },
  {
    id: uuid(),
    label: 'White',
  },
];
const initialItemsInStore = [
  {
    id: uuid(),
    label: 'Rainbow',
  },
] as ItemType[];

export const App = () => {
  return (
    <div className={styles.app}>
      <h1 className={styles.title}>React Suggest Field Examples</h1>
      <div className={styles.container}>
        <CompContainer title={'StoreSelectedItems'}>
          <StoreSelectedItems
            initialItemsInStore={initialItemsInStore}
            originSuggestions={originSuggestions}
            maxItemLength={5}
            placeholder="Input something to add"
          />
        </CompContainer>
        <CompContainer title="SimpleFilter">
          <SimpleFilter
            originSuggestions={originSuggestions}
            placeholder="Input something to filter"
          />
        </CompContainer>
      </div>
    </div>
  );
};

export default App;
