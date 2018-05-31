import React from 'react';
import DiseaseDisplay from './DiseaseDisplay';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<DiseaseDisplay />).toJSON();
  expect(tree).toMatchSnapshot();
});
