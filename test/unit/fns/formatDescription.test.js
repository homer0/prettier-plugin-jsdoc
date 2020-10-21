jest.unmock('../../../src/fns/formatDescription');
jest.unmock('../../../src/fns/utils');

const { formatDescription } = require('../../../src/fns/formatDescription');

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
