vi.mock('node:module', () => {
  const actualModule = vi.importActual('node:module');
  return {
    ...actualModule,
    createRequire: vi.fn(),
  };
});
import { vi, describe, it, expect, afterEach } from 'vitest';
import path from 'node:path';
import { createRequire } from 'node:module';
import {
  register,
  override,
  get,
  container,
  registerModule,
  createProvider,
  loadProviders,
} from '../../../src/fns/app';

describe('app', () => {
  afterEach(() => {
    container.clear();
  });

  it('should register a function on the container', () => {
    // Given
    const originalValue = 'original!';
    const originalFn = vi.fn(() => originalValue);
    let sut = null;
    let result = null;
    // When
    register(originalFn);
    sut = get(originalFn);
    result = sut();
    // Then
    expect(result).toBe(originalValue);
  });

  it('should return the same function when is not registered on the container', () => {
    // Given
    const originalValue = 'original!';
    const originalFn = vi.fn(() => originalValue);
    let sut = null;
    let result = null;
    // When
    sut = get(originalFn);
    result = sut();
    // Then
    expect(result).toBe(originalValue);
  });

  it('should register an override for a function', () => {
    // Given
    const originalValue = 'original!';
    const originalFn = vi.fn(() => originalValue);
    const customValue = 'custom!';
    const customFn = vi.fn(() => customValue);
    let result = null;
    let resultAfterOverride = null;
    // When
    register(originalFn);
    result = get(originalFn)();
    override(originalFn, customFn);
    resultAfterOverride = get(originalFn)();
    // Then
    expect(result).toBe(originalValue);
    expect(resultAfterOverride).toBe(customValue);
  });

  it('should register a list of module functions', () => {
    // Given
    const fn1 = () => {};
    const fn2 = () => {};
    const fns = [fn1, fn2];
    const id = 'myMod';
    let result = null;
    // When
    registerModule(id, fns);
    result = [...container.keys()];
    // Then
    expect(result).toEqual(fns);
    expect(fn1.moduleId).toBe(id);
    expect(fn2.moduleId).toBe(id);
  });

  it('should register a dictionary of module functions', () => {
    // Given
    const fn1 = () => {};
    const fn2 = () => {};
    const fns = { fn1, fn2 };
    const id = 'myMod';
    let result = null;
    // When
    registerModule(id, fns);
    result = [...container.keys()];
    // Then
    expect(result).toEqual(Object.values(fns));
    expect(fn1.moduleId).toBe(id);
    expect(fn2.moduleId).toBe(id);
  });

  it('should generate a module provider function', () => {
    // Given
    const fn1 = () => {};
    const fn2 = () => {};
    const fns = [fn1, fn2];
    const id = 'myMod';
    let sut = null;
    let result = null;
    // When
    sut = createProvider(id, fns);
    sut();
    result = [...container.keys()];
    // Then
    expect(result).toEqual(fns);
    expect(fn1.moduleId).toBe(id);
    expect(fn2.moduleId).toBe(id);
  });

  it('should load and execute the providers of a list of modules', () => {
    // Given
    const directory = path.join(__dirname, '..', '..', '..', 'src', 'fns');
    const mods = { sortTags: vi.fn(), splitText: vi.fn() };
    const modsNames = Object.keys(mods);
    const requireMock = vi.fn((filepath) => {
      const modName = path.basename(filepath, '.js');
      return { provider: mods[modName] || undefined };
    });
    createRequire.mockReturnValue(requireMock);
    // When
    loadProviders(directory, modsNames);
    // Then
    expect(requireMock).toHaveBeenCalledTimes(2);
    modsNames.forEach((modName, index) => {
      expect(requireMock).toHaveBeenNthCalledWith(
        index + 1,
        path.join(directory, `${modName}.js`),
      );
    });
    expect(mods.sortTags).toHaveBeenCalledTimes(1);
    expect(mods.splitText).toHaveBeenCalledTimes(1);
  });
});
