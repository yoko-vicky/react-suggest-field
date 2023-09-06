import uuid from '../lib/uuid';
import { ItemType } from '../types';

export const originSuggestions = [
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
export const initialItemsInStore = [
  {
    id: uuid(),
    label: 'Rainbow',
  },
] as ItemType[];
