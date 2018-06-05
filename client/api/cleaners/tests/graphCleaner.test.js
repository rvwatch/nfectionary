import { graphCleaner } from '../graphCleaner';
import * as mock from '../../../mockData/mockData';

describe('graphCleaner', () => {
  it('should return an array of cleaned graph data objects', () => {
    const shortNames = mock.shortNames;
    const rawData = mock.rawData;
    const expected = mock.graphData;
    const received = graphCleaner(rawData, shortNames);

    expect(received).toEqual(expected);
  });
});
