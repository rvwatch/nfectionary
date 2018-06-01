import { getDisease } from '../getDisease';
import * as mock from '../../mockData/mockData';

describe('fetch disease info', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() => {
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mock.diseasesObject)
      });
    });
  });

  it('should call fetch', () => {
    getDisease();
    expect(global.fetch).toHaveBeenCalled();
  });
});
