jest.unmock('../../src/index');
jest.unmock('../../src/loader');
jest.mock('../../src/fns/app');

const path = require('path');
const { loadProviders, get } = require('../../src/fns/app');
const { getPlugin } = require('../../src/fns/getPlugin');
const plugin = require('../../src');

describe('plugin', () => {
  it('should load and export its settings', async () => {
    // Given
    get.mockImplementationOnce((fn) => fn);
    // When
    await plugin();
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
