import * as mock from '../../../mockData/mockData';

export const buttonCleaner = jest.fn().mockImplementation(() => {
  return mock.returnedButtonData;
});
