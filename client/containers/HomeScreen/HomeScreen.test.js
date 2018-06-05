import React from 'react';
import HomeScreen from './HomeScreen';
import Enzyme, { shallow } from 'enzyme';
import { getStates } from '../../api/getStates';
import * as mock from '../../mockData/mockData';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../api/getStates');

describe('HomeScreen', () => {
  let wrapper;
  let instance;

  beforeEach(() => {
    wrapper = shallow(<HomeScreen />);
    instance = wrapper.instance();
  });
  
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a default state', () => {
    expect(wrapper.state()).toEqual({
      response: '',
      latitude: null,
      longitude: null,
      states: [],
      error: null,
      modalVisible: false,
      fontLoaded: false
    });
  });

  it('should call getStates on componentDidMount', () => {
    expect(getStates).toHaveBeenCalled();
  });

  it('should call setStatesData on componentDidMount', async () => {
    const spy = jest.spyOn(instance, 'setStatesData');
    await instance.componentDidMount();
    expect(spy).toHaveBeenCalled();
  });

  it('should set state with states on setStatesData', () => {
    const states = mock.stateArray;
    instance.setStatesData(states);
    expect(wrapper.state('states')).toEqual(states);
  });
});