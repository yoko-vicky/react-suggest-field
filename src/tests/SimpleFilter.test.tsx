import React from 'react';
import { render } from '@testing-library/react';
import {
  SimpleFilter,
  SimpleFilterPropsType,
} from '../components/SimpleFilter';
import { originSuggestions } from '../data/examples';

describe('Test Component', () => {
  let props: SimpleFilterPropsType;

  beforeEach(() => {
    props = {
      originSuggestions: originSuggestions,
      btnLabel: 'Go!',
      placeholder: 'Input something to filter',
    };
  });

  const renderComponent = () => render(<SimpleFilter {...props} />);

  it('should have primary className with default props', () => {
    const { getByTestId } = renderComponent();
    const component = getByTestId('simpleFilter');
    expect(component.getAttribute('class')).toMatch('simpleFilter');
  });

  it('should have secondary className with theme set as secondary', () => {
    props.className = 'wonderfulClassName';
    const { getByTestId } = renderComponent();
    const component = getByTestId('simpleFilter');
    expect(component.getAttribute('class')).toMatch('wonderfulClassName');
  });
});
