import { getDiseaseNames } from '../getDiseaseNames';
import * as mock from '../../mockData/mockData';

describe('fetch disease names', () => {
  
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mock.diseaseNames)
      });
    });
  });

  it('should call fetch', async () => {
    getDiseaseNames();
    await expect(global.fetch).toHaveBeenCalled();
  });

  it('should return fetched data', async () => {
    const expected = mock.diseaseNames;

    await expect(getDiseaseNames()).resolves.toEqual(expected);
  });

  it('should throw an error if fetch failed', async () => {
    const expected = Error('Error fetching disease names: Error');

    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject({
        message: 'Error'
      });
    });
    await expect(getDiseaseNames()).rejects.toEqual(expected);
  });
});

