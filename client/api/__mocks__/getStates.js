import * as mock from '../../mockData/mockData';

export const getStates = jest.fn().mockImplementation(() => {
  return Promise.resolve(mock.stateNames);
});
