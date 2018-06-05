import { getDisease } from '../getDisease';
import * as mock from '../../mockData/mockData';

describe('fetch disease info', () => {

  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mock.diseaseArrayInfo)
      });
    });
  });

  it('should call fetch', async () => {
    getDisease();
    await expect(global.fetch).toHaveBeenCalled();
  });

  it('should return fetched data', async () => {
    const expected = mock.diseaseArrayInfo;

    await expect(getDisease()).resolves.toEqual(expected);
  });

  it('should throw an error if fetch failed', async () => {
    const expected = Error(`Error fetching disease information: Error`);

    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject({
        message: 'Error'
      });
    });
    await expect(getDisease()).rejects.toEqual(expected);
  });
});
