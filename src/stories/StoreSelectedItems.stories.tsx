import React from 'react';
import { StoryFn } from '@storybook/react';
import {
  StoreSelectedItems,
  StoreSelectedItemsPropsType,
} from '../components/StoreSelectedItems';
import { initialItemsInStore, originSuggestions } from '../data/examples';
import { CompContainer } from '../components/base/CompContainer';

export default {
  title: 'StoreSelectedItems',
  component: StoreSelectedItems,
};

const Template: StoryFn<StoreSelectedItemsPropsType> = (args) => (
  <CompContainer title={'Store Selected Items'}>
    <StoreSelectedItems {...args} />
  </CompContainer>
);

export const Default = Template.bind({});
Default.args = {
  initialItemsInStore: initialItemsInStore,
  originSuggestions: originSuggestions,
  maxItemLength: 5,
  placeholder: 'Input something to add',
};
