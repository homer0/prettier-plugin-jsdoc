jest.unmock('../../src/index');
jest.mock('../../src/app');

const path = require('path');
const { loadProviders, getFn } = require('../../src/app');
const { getPlugin } = require('../../src/fns/getPlugin');

describe('plugin', () => {
  it('should load and export its settings', () => {
    // Given
    getFn.mockImplementationOnce((fn) => fn);
    // When
    // eslint-disable-next-line global-require
    require('../../src');
    // Then
    expect(loadProviders).toHaveBeenCalledTimes(1);
    expect(loadProviders).toHaveBeenCalledWith(
      path.join(__dirname, '..', '..', 'src', 'fns'),
      expect.any(Array),
    );
    expect(getFn).toHaveBeenCalledTimes(1);
    expect(getFn).toHaveBeenCalledWith(getPlugin);
    expect(getPlugin).toHaveBeenCalledTimes(1);
  });
});
