import { getDiseaseNames } from '../getDiseaseNames';
import * as mock from '../../mockData/mockData';

describe('fetch disease info', () => {
  
  beforeEach(()=> {
    global.fetch = jest.fn().mockImplementation(() => {
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mock.diseaseArrayInfo)
      });
    });
  });

  it('should call fetch', () => {
    getDiseaseNames();
    expect(global.fetch).toHaveBeenCalled();
  });

  it('should return fetched data', () => {
    const expected = mock.diseaseArrayInfo;

    expect(getDiseaseNames()).resolves.toEqual('expected');
  });

  it('should throw an error if fetch failed', () => {
    const expected = Error('Error fetching disease names: Error');

    global.fetch = jest.fn().mockImplementation(() => {
      Promise.reject ({
        message: 'Error'
      });
    });
    expect(getDiseaseNames()).rejects.toEqual(expected);
  });
})

