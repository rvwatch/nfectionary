import { getStates } from '../getStates';
import * as mock from '../../mockData/mockData';

describe('fetch disease info', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mock.stateArray)
      });
    });
  });

  it('should call fetch', async () => {
    getStates();
    await expect(global.fetch).toHaveBeenCalled();
  });

  it('should return fetched data', async () => {
    const expected = ['Alabama', 'Alaska', 'Arizona', 'Arkansas'];

    await expect(getStates()).resolves.toEqual(expected);
  });

  it('should throw an error if fetch failed', async () => {
    const expected = Error(`Error`);

    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject({
        message: 'Error'
      });
    });
    await expect(getStates()).rejects.toEqual(expected);
  });
});
