import { getDiseaseCount } from '../getDiseaseCount';
import * as mock from '../../mockData/mockData';

describe('fetch case count info', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() => {
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mock.diseaseCount)
      });
    });
  });

  it('should call fetch', () => {
    getDiseaseCount();
    expect(global.fetch).toHaveBeenCalled();
  });
});
