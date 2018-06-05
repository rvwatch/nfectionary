/* eslint-disable max-len */
import React from 'react';
import DiseaseDisplay from './DiseaseDisplay';
import Enzyme, { shallow } from 'enzyme';
import { getDisease } from '../../api/getDisease';
import { getGraphCounts } from '../../api/getGraphCounts';
import { shortNames } from '../../api/cleaners/shortNames';
import { graphCleaner } from '../../api/cleaners/graphCleaner';
import * as mock from '../../mockData/mockData';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../api/getDisease');
jest.mock('../../api/getGraphCounts');
jest.mock('../../api/cleaners/graphCleaner');

describe('DiseaseDisplay', () => {
  let wrapper;
  let instance;
  let id;
  let disease;
  let diseaseList;
  let graphData;

  beforeEach(() => {
    wrapper = shallow(<DiseaseDisplay navigation={{ getParam: jest.fn().mockImplementation(()=> {
      return mock.diseaseNames; 
    }) 
    }} />);
    instance = wrapper.instance();
    id = '1';
    disease = mock.diseaseObject;
    diseaseList = mock.diseases;
    graphData = mock.returnedGraphData;
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a default state', () => {
    expect(wrapper.state()).toEqual({
      diseaseInfo: {},
      graphData: [],
      diseaseList: [],
      activeSection: false,
      collapsed: true
    });
  });

  it('should call fetchDiseaseData on componentDidMount', async () => {
    instance.fetchDiseaseData = jest.fn();
    await instance.componentDidMount();
    expect(instance.fetchDiseaseData).toHaveBeenCalled();
  });

  it('should call getDisease on fetchDiseaseData with correct params', async () => {
    const expected = 2;
    await instance.fetchDiseaseData(id);
    expect(getDisease).toHaveBeenCalledWith(expected);
  });

  it('should call getGraphCounts on fetchDiseaseData with correct params', async () => {
    const expected = 2;
    await instance.fetchDiseaseData(id);
    expect(getGraphCounts).toHaveBeenCalledWith(expected);
  });

  it('should call graphCleaner on fetchAllData with correct params', async () => {
    const rawData = mock.returnedGraphCounts;
    await instance.fetchDiseaseData(id);
    expect(graphCleaner).toHaveBeenCalledWith(rawData, shortNames);
  });

  it('should call setDiseaseInfo on fetchAllData with correct params', async () => {
    instance.setDiseaseInfo = jest.fn();
    await instance.fetchDiseaseData(id);
    expect(instance.setDiseaseInfo).toHaveBeenCalledWith(disease, graphData, diseaseList);
  });

  it('should set state with diseaseInfo on setDiseaseInfo', () => {
    instance.setDiseaseInfo(disease, graphData, diseaseList);
    expect(wrapper.state('diseaseInfo')).toEqual(disease);
  });

  it('should set state with graphData on setDiseaseInfo', () => {
    instance.setDiseaseInfo(disease, graphData, diseaseList);
    expect(wrapper.state('graphData')).toEqual(graphData);
  });

  it('should set state with diseaseList on setDiseaseInfo', () => {
    instance.setDiseaseInfo(disease, graphData, diseaseList);
    expect(wrapper.state('diseaseList')).toEqual(diseaseList);
  });
});
