import * as mock from '../../mockData/mockData';

export const getDiseaseNames = jest.fn().mockImplementation(()=> {
  return Promise.resolve(mock.diseaseArrayInfo)
})