import React from 'react';
import StateDisplay from './StateDisplay';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import { getDiseaseNames } from '../../api/getDiseaseNames';
import { getDiseaseCount } from '../../api/getDiseaseCount';
import { buttonCleaner } from '../../api/cleaners/buttonCleaner';
import * as mock from '../../mockData/mockData';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../api/getDiseaseNames');
jest.mock('../../api/getDiseaseCount');
jest.mock('../../api/cleaners/buttonCleaner');

describe ('StateDisplay', () => {
  let wrapper;
  let instance;
  let buttonData;
  let diseaseList;
  let id;
  let count;

  beforeEach(() => {
    wrapper = shallow(<StateDisplay navigation={{ getParam: jest.fn().mockImplementation(()=> {
      return mock.stateNames }) 
    }} />);
    instance = wrapper.instance();
    buttonData = mock.returnedButtonData;
    diseaseList = mock.diseaseNames;
    id = '1';
    count = mock.returnedDiseaseCount;
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call fetchAllData on componentDidMount', async () => {
    instance.fetchAllData = jest.fn();
    await instance.componentDidMount();
    expect(instance.fetchAllData).toHaveBeenCalled();
  });

  it('should call getDiseaseNames on fetchAllData', async () => {
    await instance.fetchAllData(id);
    expect(getDiseaseNames).toHaveBeenCalled();
  });

  it('should call getDiseaseCount on fetchAllData with correct params', async () => {
    const expected = 2;
    await instance.fetchAllData(id);
    expect(getDiseaseCount).toHaveBeenCalledWith(expected);
  });

  it('should call buttonCleaner on fetchAllData with correct params', async () => {
    await instance.fetchAllData(id);
    expect(buttonCleaner).toHaveBeenCalledWith(diseaseList, count);
  });

  it('should call setButtonData on fetchAllData with correct params', async () => {
    instance.setButtonData = jest.fn();
    await instance.fetchAllData(id);
    expect(instance.setButtonData).toHaveBeenCalledWith(buttonData, id, diseaseList);
  });

  it('should set state with buttonData on setButtonData', () => {
    instance.setButtonData(buttonData, id, diseaseList);
    expect(wrapper.state('buttonData')).toEqual(buttonData);
  });

  it('should set state with the state name on setButtonData', () => {
    const expected = 'Alaska';
    instance.setButtonData(buttonData, id, diseaseList);
    expect(wrapper.state('state')).toEqual(expected);
  });

  it('should set state with statesList on setButtonData', () => {
    const expected = mock.stateNames;
    instance.setButtonData(buttonData, id, diseaseList);
    expect(wrapper.state('statesList')).toEqual(expected);
  });

  it('should set state with diseaseList on setButtonData', () => {
    instance.setButtonData(buttonData, id, diseaseList);
    expect(wrapper.state('diseaseList')).toEqual(diseaseList);
  });
});
