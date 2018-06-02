import React from 'react';
import App from './App';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
  test('renders correctly', () => {
    const wrapper = renderer.create(<App />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('should exist', () => {
    const wrapper = renderer.create(<App />).toJSON();
    expect(wrapper).toBeDefined();
  })
});
