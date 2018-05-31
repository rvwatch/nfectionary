import React from 'react';
import DiseaseDisplay from './DiseaseDisplay';
// import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

describe('DiseaseDisplay', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<diseaseDisplay />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
