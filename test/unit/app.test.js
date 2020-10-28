jest.unmock('../../src/app');
jest.mock('../../src/fns/sortTags', () => ({
  provider: jest.fn(),
}));
jest.mock('../../src/fns/splitText', () => ({
  provider: jest.fn(),
}));

const path = require('path');
const {
  addFn,
  setFn,
  getFn,
  container,
  registerModule,
  provider,
  loadProviders,
} = require('../../src/app');

const { provider: sortTagsProvider } = require('../../src/fns/sortTags');
const { provider: splitTextProvider } = require('../../src/fns/splitText');

describe('app', () => {
  beforeEach(() => {
    sortTagsProvider.mockReset();
    splitTextProvider.mockReset();
  });

  afterEach(() => {
    container.clear();
  });

  it('should register a function on the container', () => {
    // Given
    const originalValue = 'original!';
    const originalFn = jest.fn(() => originalValue);
    let sut = null;
    let result = null;
    // When
    addFn(originalFn);
    sut = getFn(originalFn);
    result = sut();
    // Then
    expect(result).toBe(originalValue);
  });

  it('should return the same function when is not registered on the container', () => {
    // Given
    const originalValue = 'original!';
    const originalFn = jest.fn(() => originalValue);
    let sut = null;
    let result = null;
    // When
    sut = getFn(originalFn);
    result = sut();
    // Then
    expect(result).toBe(originalValue);
  });

  it('should register an override for a function', () => {
    // Given
    const originalValue = 'original!';
    const originalFn = jest.fn(() => originalValue);
    const customValue = 'custom!';
    const customFn = jest.fn(() => customValue);
    let result = null;
    let resultAfterOverride = null;
    // When
    addFn(originalFn);
    result = getFn(originalFn)();
    setFn(originalFn, customFn);
    resultAfterOverride = getFn(originalFn)();
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
    sut = provider(id, fns);
    sut();
    result = [...container.keys()];
    // Then
    expect(result).toEqual(fns);
    expect(fn1.moduleId).toBe(id);
    expect(fn2.moduleId).toBe(id);
  });

  it('should load and execute the providers of a list of modules', () => {
    // Given
    const directory = path.join(__dirname, '..', '..', 'src', 'fns');
    const mods = ['sortTags', 'splitText'];
    // When
    loadProviders(directory, mods);
    // Then
    expect(sortTagsProvider).toHaveBeenCalledTimes(1);
    expect(splitTextProvider).toHaveBeenCalledTimes(1);
  });
});
