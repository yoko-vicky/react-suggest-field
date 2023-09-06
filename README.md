# React Suggest Field

## Getting Started

1. Run `npm install react-suggest-field`
2. Import components you want to use

```
import { SimpleFilter } from 'react-suggest-field';
import { StoreSelectedItems } from 'react-suggest-field';
```

3. You can also import default css if you want to apply default css style

```
import 'react-suggest-field/dist/bundle.css';
```

## Example

### App.tsx

```
import React from 'react';
import styles from './App.module.css';
import { SimpleFilter } from 'react-suggest-field';
import { StoreSelectedItems } from 'react-suggest-field';
import { ItemType } from 'react-suggest-field/dist/types';
import 'react-suggest-field/dist/bundle.css';

const originSuggestions = [
  {
    id: 1,
    label: 'Red',
  },
  {
    id: 2,
    label: 'Blue',
  },
  {
    id: 3,
    label: 'Yellow',
  },
  {
    id: 4,
    label: 'Green',
  },
  {
    id: 5,
    label: 'Black',
  },
  {
    id: 6,
    label: 'White',
  },
];
const initialItemsInStore = [
  {
    id: 7,
    label: 'Rainbow',
  },
] as ItemType[];

export const App = () => {
  return (
          <StoreSelectedItems
            initialItemsInStore={initialItemsInStore}
            originSuggestions={originSuggestions}
            maxItemLength={5}
            placeholder="Input something to add"
          />
          <SimpleFilter
            originSuggestions={originSuggestions}
            placeholder="Input something to filter"
          />
  );
};

```

### App.module.css

```
.app {
  width: 90%;
  max-width: 60rem;
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  gap: 4rem;
}
```
