import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';
import {
  StoreSelectedItems,
  StoreSelectedItemsPropsType,
} from '../components/StoreSelectedItems';
import { initialItemsInStore, originSuggestions } from '../data/examples';
import { CompContainer } from '../components/CompContainer';
import { ItemType } from '../types';

export default {
  title: 'StoreSelectedItems',
  component: StoreSelectedItems,
};

const Template: StoryFn<StoreSelectedItemsPropsType> = (args) => {
  const [items, setItems] = useState<ItemType[]>(initialItemsInStore || []);
  const [error, setError] = useState<string>('');

  return (
    <CompContainer title={'Store Selected Items'}>
      <StoreSelectedItems
        {...args}
        items={items}
        setItems={setItems}
        error={error}
        setError={setError}
      />
    </CompContainer>
  );
};

export const Default = Template.bind({});
const args = {
  originSuggestions: originSuggestions,
  maxItemLength: 3,
  placeholder: 'Input something to add',
};
Default.args = args;
