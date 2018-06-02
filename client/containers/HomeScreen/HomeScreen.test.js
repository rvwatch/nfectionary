import React from 'react';
import HomeScreen from './HomeScreen';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });


describe('HomeScreen', () => {
  test('renders correctly', () => {
    const wrapper = renderer.create(<HomeScreen />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('should exist', () => {
    const wrapper = renderer.create(<HomeScreen />).toJSON();
    expect(wrapper).toBeDefined();
  });

  it('should have a state with the property of weatherResults set to null', () => {
    const wrapper = Enzyme.shallow(<HomeScreen />);
    expect(wrapper.state().error).toEqual(null);
  });
});