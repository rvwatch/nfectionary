import * as mock from '../../../mockData/mockData';

export const graphCleaner = jest.fn().mockImplementation(() => {
  return mock.returnedGraphData;
});
