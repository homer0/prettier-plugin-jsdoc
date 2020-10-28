jest.unmock('../../src/index');
jest.mock('../../src/app');

const path = require('path');
const { loadProviders, get } = require('../../src/app');
const { getPlugin } = require('../../src/fns/getPlugin');

describe('plugin', () => {
  it('should load and export its settings', () => {
    // Given
    get.mockImplementationOnce((fn) => fn);
    // When
    // eslint-disable-next-line global-require
    require('../../src');
    // Then
    expect(loadProviders).toHaveBeenCalledTimes(1);
    expect(loadProviders).toHaveBeenCalledWith(
      path.join(__dirname, '..', '..', 'src', 'fns'),
      expect.any(Array),
    );
    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith(getPlugin);
    expect(getPlugin).toHaveBeenCalledTimes(1);
  });
});
