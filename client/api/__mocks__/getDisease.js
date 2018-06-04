import * as mock from '../../mockData/mockData';

export const getDisease = jest.fn().mockImplementation(() => {
  return Promise.resolve(mock.diseaseObject);
});
