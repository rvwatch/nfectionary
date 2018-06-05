import { getGraphCounts } from '../getGraphCounts';
import * as mock from '../../mockData/mockData';

describe('fetch graph count info', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mock.diseaseCount)
      });
    });
  });

  it('should call fetch', async () => {
    getGraphCounts();
    await expect(global.fetch).toHaveBeenCalled();
  });

  it('should return fetched data', async () => {
    const expected = [
      { count: 40, id: 1, state: 1 }, 
      { count: 20, id: 2, state: 1 }
    ];

    await expect(getGraphCounts()).resolves.toEqual(expected);
  });

  it('should throw an error if fetch failed', async () => {
    const expected = Error(`Error fetching graph counts: Error`);

    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject({
        message: 'Error'
      });
    });
    await expect(getGraphCounts()).rejects.toEqual(expected);
  });
});
