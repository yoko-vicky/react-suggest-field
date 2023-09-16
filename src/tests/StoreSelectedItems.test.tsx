import React from 'react';
import { render } from '@testing-library/react';
import {
  StoreSelectedItems,
  StoreSelectedItemsPropsType,
} from '../components/StoreSelectedItems';
import { initialItemsInStore, originSuggestions } from '../data/examples';

describe('StoreSelectedItems', () => {
  let props: StoreSelectedItemsPropsType;

  beforeEach(() => {
    props = {
      initialItemsInStore: initialItemsInStore,
      originSuggestions: originSuggestions,
      maxItemLength: 5,
      placeholder: 'Input something to add',
    };
  });

  const renderComponent = () => render(<StoreSelectedItems {...props} />);

  it('should have primary className with default props', () => {
    const { getByTestId } = renderComponent();
    const component = getByTestId('storeSelectedItems');
    expect(component.getAttribute('class')).toMatch('storeSelectedItems');
  });

  it('should have secondary className with theme set as secondary', () => {
    props.className = 'wonderfulClassName';
    const { getByTestId } = renderComponent();
    const component = getByTestId('storeSelectedItems');
    expect(component.getAttribute('class')).toMatch('wonderfulClassName');
  });
});
