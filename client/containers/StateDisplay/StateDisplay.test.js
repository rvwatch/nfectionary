import React from 'react';
import StateDisplay from './StateDisplay';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<StateDisplay state={'Colorado'} id={6}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
