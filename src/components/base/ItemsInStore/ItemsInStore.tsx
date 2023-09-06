import { GrFormClose } from 'react-icons/gr';
import { ItemType } from '../../../types';
import React from 'react';

interface ItemsInStorePropsType {
  items: ItemType[];
  handleRemoveItem: (item: ItemType) => void;
}

export const ItemsInStore = ({
  items,
  handleRemoveItem,
}: ItemsInStorePropsType) => {
  return (
    <div className={'itemsInStore'}>
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => handleRemoveItem(item)}
          className={'itemsInStore__item'}
        >
          <span className={'itemsInStore__item__label'}>{item.label}</span>
          <GrFormClose />
        </div>
      ))}
    </div>
  );
};

export default ItemsInStore;
