jest.unmock('../src/fns');
const {
  replaceTagsSynonyms,
  formatAccessTag,
  formatDescription,
} = require('../src/fns');

describe('functions', () => {
  describe('replaceTagsSynonyms', () => {
    it('should replace tags synonyms', () => {
      // Given
      const input = [
        {
          tag: 'virtual',
        },
        {
          tag: 'param',
        },
      ];
      const output = [
        {
          tag: 'abstract',
        },
        {
          tag: 'param',
        },
      ];
      let resultOne = null;
      let resultTwo = null;
      // When
      resultOne = replaceTagsSynonyms(input);
      resultTwo = replaceTagsSynonyms()(input);
      // Then
      expect(resultOne).toEqual(output);
      expect(resultTwo).toEqual(output);
    });
  });

  describe('formatAccessTag', () => {
    it('should replace "@access public" with "@public"', () => {
      // Given
      const input = [
        {
          tag: 'access',
          name: 'public',
        },
        {
          tag: 'param',
        },
      ];
      const output = [
        {
          tag: 'public',
          name: '',
          description: '',
          type: '',
        },
        {
          tag: 'param',
        },
      ];
      let result = null;
      // When
      result = formatAccessTag(input, {
        jsdocAllowAccessTag: false,
      });
      // Then
      expect(result).toEqual(output);
    });

    it('should only keep one type of "access" tag', () => {
      // Given
      const input = [
        {
          tag: 'access',
          name: 'public',
        },
        {
          tag: 'protected',
        },
        {
          tag: 'param',
        },
      ];
      const output = [
        {
          tag: 'protected',
        },
        {
          tag: 'param',
        },
      ];
      let result = null;
      // When
      result = formatAccessTag(input, {
        jsdocAllowAccessTag: true,
      });
      // Then
      expect(result).toEqual(output);
    });

    it('should replace "@private" with "@access private"', () => {
      // Given
      const input = [
        {
          tag: 'private',
        },
        {
          tag: 'param',
        },
      ];
      const output = [
        {
          tag: 'access',
          name: 'private',
          type: '',
          description: '',
        },
        {
          tag: 'param',
        },
      ];
      let result = null;
      // When
      result = formatAccessTag(input, {
        jsdocAllowAccessTag: true,
        jsdocEnforceAccessTag: true,
      });
      // Then
      expect(result).toEqual(output);
    });

    it('should remove "@protected" if there\'s "@access protected"', () => {
      // Given
      const input = [
        {
          tag: 'protected',
        },
        {
          tag: 'access',
          name: 'protected',
        },
        {
          tag: 'param',
        },
      ];
      const output = [
        {
          tag: 'access',
          name: 'protected',
        },
        {
          tag: 'param',
        },
      ];
      let result = null;
      // When
      result = formatAccessTag(input, {
        jsdocAllowAccessTag: true,
        jsdocEnforceAccessTag: true,
      });
      // Then
      expect(result).toEqual(output);
    });

    it('should remove "@access public" if there\'s "@public"', () => {
      // Given
      const input = [
        {
          tag: 'public',
        },
        {
          tag: 'access',
          name: 'public',
        },
        {
          tag: 'param',
        },
      ];
      const output = [
        {
          tag: 'public',
        },
        {
          tag: 'param',
        },
      ];
      let result = null;
      // When
      result = formatAccessTag(input, {
        jsdocAllowAccessTag: false,
      });
      // Then
      expect(result).toEqual(output);
    });

    it('shouldn\'t do anything if there are no "access tags"', () => {
      // Given
      const input = [{
        tag: 'param',
      }];
      const output = [{
        tag: 'param',
      }];
      let result = null;
      // When
      result = formatAccessTag(input, {
        jsdocAllowAccessTag: false,
      });
      // Then
      expect(result).toEqual(output);
    });
  });

  describe('formatDescription', () => {
    it('should keep the description on the body of the block', () => {
      // Given
      const input = {
        description: 'Lorem ipsum description',
        tags: [{ tag: 'param' }],
      };
      const output = {
        description: 'Lorem ipsum description',
        tags: [{ tag: 'param' }],
      };
      let result = null;
      // When
      result = formatDescription(input, {
        jsdocAllowDescriptionTag: true,
        jsdocUseDescriptionTag: false,
      });
      // Then
      expect(result).toEqual(output);
    });

    it('should move the description on the body to a "@description" tag', () => {
      // Given
      const input = {
        description: 'Lorem ipsum description',
        tags: [],
      };
      const output = {
        description: '',
        tags: [{
          tag: 'description',
          name: '',
          description: 'Lorem ipsum description',
          type: '',
        }],
      };
      let result = null;
      // When
      result = formatDescription(input, {
        jsdocAllowDescriptionTag: true,
        jsdocUseDescriptionTag: true,
      });
      // Then
      expect(result).toEqual(output);
    });

    it('should move the description on a "@typedef" tag to a "@description" tag', () => {
      // Given
      const input = {
        description: '',
        tags: [{
          tag: 'typedef',
          type: 'Object',
          name: 'MyType',
          description: 'Lorem ipsum type description',
        }],
      };
      const output = {
        description: '',
        tags: [
          {
            tag: 'typedef',
            type: 'Object',
            name: 'MyType',
            description: '',
          },
          {
            tag: 'description',
            name: '',
            description: 'Lorem ipsum type description',
            type: '',
          },
        ],
      };
      let result = null;
      // When
      result = formatDescription(input, {
        jsdocAllowDescriptionTag: true,
        jsdocUseDescriptionTag: true,
      });
      // Then
      expect(result).toEqual(output);
    });

    it('should remove a duplicated description from a "@typedef" tag (first)', () => {
      // Given
      const input = {
        description: '',
        tags: [
          {
            tag: 'typedef',
            type: 'Object',
            name: 'MyType',
            description: 'Lorem ipsum type description',
          },
          {
            tag: 'description',
            name: 'Lorem',
            description: 'ipsum type description',
            type: '',
          },
        ],
      };
      const output = {
        description: '',
        tags: [
          {
            tag: 'typedef',
            type: 'Object',
            name: 'MyType',
            description: '',
          },
          {
            tag: 'description',
            name: '',
            description: 'Lorem ipsum type description',
            type: '',
          },
        ],
      };
      let result = null;
      // When
      result = formatDescription(input, {
        jsdocAllowDescriptionTag: true,
        jsdocUseDescriptionTag: true,
      });
      // Then
      expect(result).toEqual(output);
    });

    it('should remove a duplicated description from a "@typedef" tag (second)', () => {
      // Given
      const input = {
        description: '',
        tags: [
          {
            tag: 'description',
            name: 'Lorem',
            description: 'ipsum type description',
            type: '',
          },
          {
            tag: 'typedef',
            type: 'Object',
            name: 'MyType',
            description: 'Lorem ipsum type description',
          },
        ],
      };
      const output = {
        description: '',
        tags: [
          {
            tag: 'description',
            name: '',
            description: 'Lorem ipsum type description',
            type: '',
          },
          {
            tag: 'typedef',
            type: 'Object',
            name: 'MyType',
            description: '',
          },
        ],
      };
      let result = null;
      // When
      result = formatDescription(input, {
        jsdocAllowDescriptionTag: true,
        jsdocUseDescriptionTag: true,
      });
      // Then
      expect(result).toEqual(output);
    });

    it('should merge a description from the body and a "@description" tag', () => {
      // Given
      const input = {
        description: 'Body Lorem Ipsum',
        tags: [
          {
            tag: 'description',
            name: 'Lorem',
            description: 'ipsum type description',
            type: '',
          },
        ],
      };
      const output = {
        description: '',
        tags: [
          {
            tag: 'description',
            name: '',
            description: 'Body Lorem Ipsum\n\nLorem ipsum type description',
            type: '',
          },
        ],
      };
      let result = null;
      // When
      result = formatDescription(input, {
        jsdocAllowDescriptionTag: true,
        jsdocUseDescriptionTag: true,
      });
      // Then
      expect(result).toEqual(output);
    });

    it('should merge a description from the body and a "@typedef" tag', () => {
      // Given
      const input = {
        description: 'Body Lorem Ipsum',
        tags: [
          {
            tag: 'typedef',
            type: 'Object',
            name: 'MyType',
            description: 'Lorem ipsum typedef description',
          },
          { tag: 'param' },
        ],
      };
      const output = {
        description: '',
        tags: [
          {
            tag: 'typedef',
            type: 'Object',
            name: 'MyType',
            description: '',
          },
          {
            tag: 'description',
            name: '',
            description: 'Body Lorem Ipsum\n\nLorem ipsum typedef description',
            type: '',
          },
          { tag: 'param' },
        ],
      };
      let result = null;
      // When
      result = formatDescription(input, {
        jsdocAllowDescriptionTag: true,
        jsdocUseDescriptionTag: true,
      });
      // Then
      expect(result).toEqual(output);
    });

    it('should move the "@description" tag to the body', () => {
      // Given
      const input = {
        description: '',
        tags: [{
          tag: 'description',
          name: '',
          description: 'Lorem ipsum description',
          type: '',
        }],
      };
      const output = {
        description: 'Lorem ipsum description',
        tags: [],
      };
      let result = null;
      // When
      result = formatDescription(input, {
        jsdocAllowDescriptionTag: false,
        jsdocUseDescriptionTag: true,
      });
      // Then
      expect(result).toEqual(output);
    });

    it('should move the description from a "@typedef" tag to the body', () => {
      // Given
      const input = {
        description: '',
        tags: [{
          tag: 'typedef',
          name: 'Object',
          type: 'MyType',
          description: 'Lorem ipsum description',
        }],
      };
      const output = {
        description: 'Lorem ipsum description',
        tags: [{
          tag: 'typedef',
          name: 'Object',
          type: 'MyType',
          description: '',
        }],
      };
      let result = null;
      // When
      result = formatDescription(input, {
        jsdocAllowDescriptionTag: false,
        jsdocUseDescriptionTag: true,
      });
      // Then
      expect(result).toEqual(output);
    });
  });
});
