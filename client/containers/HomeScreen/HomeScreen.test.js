import React from 'react';
import HomeScreen from './HomeScreen';
// import { configure, } from 'enzyme';
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

  // it('should have a default state', () => {
  //   const wrapper = Enzyme.shallow(<App />);
  //   console.log('wrapper', wrapper.instance);

  //   expect(wrapper.instance.state).toEqual({
  //     response: '',
  //     latitude: null,
  //     longitude: null,
  //     states: [],
  //     error: null
  //   });
  // })
});