import * as mock from '../../mockData/mockData';

export const getGraphCounts = jest.fn().mockImplementation(() => {
  return Promise.resolve(mock.returnedGraphCounts);
});
