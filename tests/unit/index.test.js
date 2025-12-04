import path from 'node:path';
import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('plugin', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('should load and export its settings', async () => {
    // Given
    vi.mock('../../src/fns/app');
    vi.mock('../../src/fns/getPlugin');
    const { loadProviders, get } = await import('../../src/fns/app.js');
    const { getPlugin } = await import('../../src/fns/getPlugin.js');
    get.mockImplementationOnce((fn) => fn);

    // When
    await import('../../src/index.js');
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
