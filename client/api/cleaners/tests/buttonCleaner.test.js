import { buttonCleaner } from '../buttonCleaner';
import * as mock from '../../../mockData/mockData';

describe('buttonCleaner', () => {
  it('should return an array of cleaned button data objects', () => {
    const name = mock.diseaseList;
    const count = mock.count;
    const expected = mock.buttonData;
    const data = buttonCleaner(name, count);
    expect(data).toEqual(expected);
  });
});



