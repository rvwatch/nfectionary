import * as mock from '../../mockData/mockData';

export const getDiseaseCount = jest.fn().mockImplementation(() => {
  return Promise.resolve(mock.diseaseCount);
});
