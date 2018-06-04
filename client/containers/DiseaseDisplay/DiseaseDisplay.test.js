import React from 'react';
import DiseaseDisplay from './DiseaseDisplay';
import Enzyme, { shallow } from 'enzyme';
import { getDisease } from '../../api/getDisease';
import { getStates } from '../../api/getStates';
import { getGraphCounts } from '../../api/getGraphCounts';
import * as mock from '../../mockData/mockData';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../api/getDisease');
jest.mock('../../api/getStates');
jest.mock('../../api/getGraphCounts');

describe('DiseaseDisplay', () => {
  let wrapper;
  let instance;
  let id;

  beforeEach(() => {
    wrapper = shallow(<DiseaseDisplay navigation={{ getParam: jest.fn().mockImplementation(()=> {
      return mock.diseaseNames }) 
    }} />);
    instance = wrapper.instance();
    id = '1';
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a default state', () => {
    expect(wrapper.state()).toEqual({
      diseaseInfo: {},
      graphData: [],
      diseaseList: []
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

  it('should call getStates on fetchDiseaseData', async () => {
    await instance.fetchDiseaseData(id);
    expect(getStates).toHaveBeenCalled();
  });

  it('should call getGraphCounts on fetchDiseaseData', async () => {
    await instance.fetchDiseaseData(id);
    expect(getGraphCounts).toHaveBeenCalled();
  });

  
});
