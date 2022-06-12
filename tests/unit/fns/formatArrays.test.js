jest.unmock('../../../src/fns/formatArrays');

const { formatArrays } = require('../../../src/fns/formatArrays');

describe('formatArrays', () => {
  describe('shortForm', () => {
    it("should ignore a type that doesn't have an array", () => {
      // Given
      const input = 'string';
      const output = 'string';
      let result = null;
      // When
      result = formatArrays(input, {});
      // Then
      expect(result).toBe(output);
    });

    it("shouldn't transform an array if the option is disabled", () => {
      // Given
      const input = 'Array<string>';
      const output = 'Array<string>';
      let result = null;
      // When
      result = formatArrays(input, {
        jsdocUseShortArrays: false,
      });
      // Then
      expect(result).toBe(output);
    });

    it('should transform an array', () => {
      // Given
      const input = 'Array<string>';
      const output = 'string[]';
      let result = null;
      // When
      result = formatArrays(input, {
        jsdocUseShortArrays: true,
      });
      // Then
      expect(result).toBe(output);
    });

    it('should transform an array inside a generic', () => {
      // Given
      const input = 'Promise<Array<string>>';
      const output = 'Promise<string[]>';
      let result = null;
      // When
      result = formatArrays(input, {
        jsdocUseShortArrays: true,
      });
      // Then
      expect(result).toBe(output);
    });

    it("shouldn't transform an array inside another array", () => {
      // Given
      const input = 'Array<Array<string>>';
      const output = 'Array<string[]>';
      let result = null;
      // When
      result = formatArrays(input, {
        jsdocUseShortArrays: true,
      });
      // Then
      expect(result).toBe(output);
    });

    it("shouldn't transform an array inside another array, inside a generic", () => {
      // Given
      const input = 'Promise<Array<Array<string>>>';
      const output = 'Promise<Array<string[]>>';
      let result = null;
      // When
      result = formatArrays(input, {
        jsdocUseShortArrays: true,
      });
      // Then
      expect(result).toBe(output);
    });

    it('should transform multiple arrays inside a type', () => {
      // Given
      const input = 'Promise<Array<Array<string>>|string>|Array<number>';
      const output = 'Promise<Array<string[]>|string>|number[]';
      let result = null;
      // When
      result = formatArrays(input, {
        jsdocUseShortArrays: true,
      });
      // Then
      expect(result).toBe(output);
    });
  });

  describe('dot', () => {
    it("should add a dot before arrays' generics", () => {
      // Given
      const input = 'Array<Promise<Array<Array<string>>|string>|Array<number>>';
      const output = 'Array.<Promise<Array.<string[]>|string>|number[]>';
      let result = null;
      // When
      result = formatArrays(input, {
        jsdocUseShortArrays: true,
        jsdocFormatDotForArraysAndObjects: true,
        jsdocUseDotForArraysAndObjects: true,
      });
      // Then
      expect(result).toBe(output);
    });

    it("should remove the dot before arrays' generics", () => {
      // Given
      const input = 'Array.<Promise<Array.<Array.<string>>|string>|Array.<number>>';
      const output = 'Array<Promise<Array<string[]>|string>|number[]>';
      let result = null;
      // When
      result = formatArrays(input, {
        jsdocUseShortArrays: true,
        jsdocFormatDotForArraysAndObjects: true,
        jsdocUseDotForArraysAndObjects: false,
      });
      // Then
      expect(result).toBe(output);
    });
  });
});
