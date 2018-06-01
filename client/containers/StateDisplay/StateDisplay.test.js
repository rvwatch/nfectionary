import React from 'react';
import StateDisplay from './StateDisplay';
// import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

describe ('StateDisplay', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<StateDisplay />).toJSON();
    expect(tree).toMatchSnapshot();
  });
})
