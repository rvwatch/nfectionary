import { getDiseaseCount } from '../getDiseaseCount';
import * as mock from '../../mockData/mockData';

describe('fetch case count info', () => {

  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mock.diseaseCount)
      });
    });
  });

  it('should call fetch', async () => {
    getDiseaseCount();
    await expect(global.fetch).toHaveBeenCalled();
  });

  it('should return fetched data', async () => {
    const expected = [
      {
        id: 1,
        count: 40
      },
      {
        id: 2,
        count: 20
      }
    ]

    await expect(getDiseaseCount()).resolves.toEqual(expected);
  });

  it('should throw an error if fetch failed', async () => {
    const expected = Error(`Error fetching disease case count: Error`);

    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject ({
        message: 'Error'
      });
    });
    await expect(getDiseaseCount()).rejects.toEqual(expected);
  });
});
