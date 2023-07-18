# 𝍌 JSDoc plugin for Prettier

[![GitHub Workflow Status (main)](https://img.shields.io/github/actions/workflow/status/homer0/prettier-plugin-jsdoc/test.yml?branch=main&style=flat-square)](https://github.com/homer0/prettier-plugin-jsdoc/actions?query=workflow%3ATest)
[![Coveralls github](https://img.shields.io/coveralls/github/homer0/prettier-plugin-jsdoc.svg?style=flat-square)](https://coveralls.io/github/homer0/prettier-plugin-jsdoc?branch=main)
![Dependencies status](https://img.shields.io/librariesio/release/npm/%40homer0/prettier-plugin-jsdoc/latest)

A [Prettier](https://prettier.io) plugin to format [JSDoc](https://jsdoc.app) blocks.

## 🍿 Usage

> If you are wondering why I built this, go to the [Motivation](#motivation) section.

- ⚙️ [Options](#%EF%B8%8F-options)
- 🚫 [Ignoring blocks](#-ignoring-blocks)
- ⚡️ [Modifying the functionality](#%EF%B8%8F-modifying-the-functionality)
- 📖 [Troubleshooting](#-troubleshooting)
- 🤘 [Development](#-development)
- 🐞 [Validating bugs](#-validating-bugs)

### ⚙️ Options

- [`@description` tag](#description-tag)
  - [Allow the `@description` tag](#allow-the-description-tag)
  - [Use the `@description` tag](#use-the-description-tag)
- [`@example` tag](#example-tag)
  - [Format @example tags](#format-example-tags)
  - [Add lines around @example tags' content](#add-lines-around-example-tags-content)
  - [Manage indentation on formatted examples](#manage-indentation-on-formatted-examples)
  - [Manage indentation for pseudo code examples](#manage-indentation-for-pseudo-code-examples)
- [`@access` tag](#access-tag)
  - [Allow @access tag](#allow-access-tag)
  - [Enfore the use of the @access tag](#enfore-the-use-of-the-access-tag)
- [Types with string literals](#types-with-string-literals)
  - [Format types with string literals](#format-types-with-string-literals)
  - [Specify quotes types for string literals](#specify-quotes-types-for-string-literals)
  - [Specify space around string literals](#specify-space-around-string-literals)
- [TypeScript types](#typescript-types)
  - [Use TypeScript casing for basic types](#use-typescript-casing-for-basic-types)
  - [Format complex types with Prettier as TypeScript](#format-complex-types-with-prettier-as-typescript)
- [Arrays and objects](#arrays-and-objects)
  - [Transform arrays into their shorter form](#transform-arrays-into-their-shorter-form)
  - [Modify the dot used for the generics of arrays and objects](#modify-the-dot-used-for-the-generics-of-arrays-and-objects)
  - [Ensure the use or not of the dot for the generics of arrays and objects](#ensure-the-use-or-not-of-the-dot-for-the-generics-of-arrays-and-objects)
- [Tags](#tags)
  - [Replace tags synonyms](#replace-tags-synonyms)
  - [Sort tags](#sort-tags)
  - [Tags order](#tags-order)
- [Rendering](#rendering)
  - [Use columns](#use-columns)
  - [Group columns](#group-columns)
  - [Consistent columns](#consistent-columns)
  - [Avoid small columns for descriptions](#avoid-small-columns-for-descriptions)
  - [Tag spacing: Between tag and type](#tag-spacing-between-tag-and-type)
  - [Tag spacing: Between type and name](#tag-spacing-between-type-and-name)
  - [Tag spacing: Between name and description](#tag-spacing-between-name-and-description)
  - [Space between description body and tags](#space-between-description-body-and-tags)
  - [Make sure descriptions are valid sentences](#make-sure-descriptions-are-valid-sentences)
  - [Allow descriptions to be on different lines](#allow-descriptions-to-be-on-different-lines)
  - [Ignore tags for consistent columns](#ignore-tags-for-consistent-columns)
  - [Use an inline block for a single tag](#use-an-inline-block-for-a-single-tag)
- [Extras](#extras)
  - [Custom width](#custom-width)
  - [Turn the plugin on and off](#turn-the-plugin-on-and-off)
  - [Let the plugin know that it's being extended](#let-the-plugin-know-that-its-being-extended)
- [⚠️ Experimental](#%EF%B8%8F-experimental)
  - [Parse comments without tags](#parse-comments-without-tags)

#### @description tag

##### Allow the @description tag

| Option                     | Type    | Default |
| -------------------------- | ------- | ------- |
| `jsdocAllowDescriptionTag` | boolean | `false` |

Whether or not the `@description` tag can be used on JSDoc blocks. When disabled, if a `@description` tag is found, its contents will be moved to the block body:

```js
// jsdocAllowDescriptionTag: false

/**
 * @typedef {Object} MyType
 * @description Lorem ipsum description.
 */

// ->

/**
 * Lorem ipsum description.
 *
 * @typedef {Object} MyType
 */
```

##### Use the @description tag

| Option                   | Type    | Default |
| ------------------------ | ------- | ------- |
| `jsdocUseDescriptionTag` | boolean | `false` |

Whether or not to use the `@description` tag when a description is found on the block body or following a type/callback definition.

```js
// jsdocUseDescriptionTag: true

/**
 * Lorem ipsum description.
 *
 * @typedef {Object} MyType
 */

// ->

/**
 * @typedef {Object} MyType
 * @description Lorem ipsum description.
 */
```

#### @example tag

##### Format @example tags

| Option                | Type    | Default |
| --------------------- | ------- | ------- |
| `jsdocFormatExamples` | boolean | `true`  |

Whether or not to attempt to format the `@example` tags using Prettier itself.

```js
// jsdocFormatExamples: true

/**
 * @example
 * ensureArray([
 * 'x', 'y',
 * ])
 */

// ->

/**
 * @example
 *
 *   ensureArray(['x', 'y'])
 */
```

##### Add lines around @example tags' content

| Option                               | Type | Default |
| ------------------------------------ | ---- | ------- |
| `jsdocLinesBetweenExampleTagAndCode` | int  | `1`     |

How many lines should there be between an `@example` tag and its code.

```js
// jsdocLinesBetweenExampleTagAndCode: 0

/**
 * @example
 * ensureArray([
 * 'x', 'y',
 * ])
 */

// ->

/**
 * @example
 *   ensureArray(['x', 'y'])
 */
```

##### Manage indentation on formatted examples

| Option                         | Type    | Default |
| ------------------------------ | ------- | ------- |
| `jsdocIndentFormattedExamples` | boolean | `true`  |

Whether or not to add an indentation level to the code snippets of `@example` tags. The indentation space will be taken from the `tabWidth` option.

```js
// jsdocIndentFormattedExamples: false

/**
 * @example
 * ensureArray([
 * 'x', 'y',
 * ])
 */

// ->

/**
 * @example
 *
 * ensureArray(['x', 'y'])
 */
```

##### Manage indentation for pseudo code examples

| Option                           | Type    | Default |
| -------------------------------- | ------- | ------- |
| `jsdocIndentUnformattedExamples` | boolean | `false` |

Whether or not to add an indentation level to the code snippets of `@example` tags that couldn't be formatted with Prettier. This is only valid if `jsdocFormatExamples` is `true`.

```js
// jsdocIndentUnformattedExamples: true

/**
 * @example
 * instance -> handler -> middlewares
 */

// ->

/**
 * @example
 *
 *   instance -> handler -> middlewares
 */
```

#### @access tag

##### Allow @access tag

| Option                | Type    | Default |
| --------------------- | ------- | ------- |
| `jsdocAllowAccessTag` | boolean | `true`  |

Whether or not the `@access` tag can be used; if `false`, when a tag is found, it will replaced with a tag of its value:

```js
// jsdocAllowAccessTag: false

/**
 * @access public
 */

// ->

/**
 * @public
 */
```

##### Enfore the use of the @access tag

| Option                  | Type    | Default |
| ----------------------- | ------- | ------- |
| `jsdocEnforceAccessTag` | boolean | `true`  |

Whether or not to transform the tags `@private`, `@public` and `@protected` into `@access [type]` tags:

```js
// jsdocEnforceAccessTag: true

/**
 * @private
 */

// ->

/**
 * @access private
 */
```

#### Types with string literals

##### Format types with string literals

| Option                      | Type    | Default |
| --------------------------- | ------- | ------- |
| `jsdocFormatStringLiterals` | boolean | `true`  |

Whether or not to apply transformations to string literal types.

```js
// jsdocFormatStringLiterals: true

/**
 * @type {'a'| "b"  |  'c'} MyType
 */

// ->

/**
 * @type {'a' | 'b' | 'c'} MyType
 */
```

##### Specify quotes types for string literals

| Option                                  | Type    | Default |
| --------------------------------------- | ------- | ------- |
| `jsdocUseSingleQuotesForStringLiterals` | boolean | `true`  |

Whether or not to use single quotes for string literals' types.

```js
// jsdocUseSingleQuotesForStringLiterals: false

/**
 * @type {'a'| "b"  |  'c'} MyType
 */

// ->

/**
 * @type {"a" | "b" | "c"} MyType
 */
```

##### Specify space around string literals

| Option                             | Type | Default |
| ---------------------------------- | ---- | ------- |
| `jsdocSpacesBetweenStringLiterals` | int  | `1`     |

How many spaces should there be between string literals on a type.

```js
// jsdocSpacesBetweenStringLiterals: 0

/**
 * @type {'a'| "b"  |  'c'} MyType
 */

// ->

/**
 * @type {'a'|'b'|'c'} MyType
 */
```

#### TypeScript types

##### Use TypeScript casing for basic types

| Option                          | Type    | Default |
| ------------------------------- | ------- | ------- |
| `jsdocUseTypeScriptTypesCasing` | boolean | `true`  |

Whether or not to transform the casing of the basic types to make them compatible with TypeScript. This applies to `string`, `number`, `boolean`, `Object` and `Array`.

```js
// jsdocUseTypeScriptTypesCasing: true

/**
 * @typedef {object} Person
 * @property {String}        name    ...
 * @property {Number}        age     ...
 * @property {Boolean}       single  ...
 * @property {array<String>} pets    ...
 */

// ->

/**
 * @typedef {Object} Person
 * @property {string}        name    ...
 * @property {number}        age     ...
 * @property {boolean}       single  ...
 * @property {Array<string>} pets    ...
 */
```

##### Format complex types with Prettier as TypeScript

| Option                                | Type    | Default |
| ------------------------------------- | ------- | ------- |
| `jsdocFormatComplexTypesWithPrettier` | boolean | `true`  |

Whether or not to format complex type definitions (compatibles with TypeScript) using Prettier.

```js
// jsdocFormatComplexTypesWithPrettier: true

/**
 * @typedef {{ name:string,age:number,pets:Array<string>}} Person
 */

// ->

/**
 * @typedef {{
 *   name: string,
 *   age: number,
 *   pets: string[],
 * }} Person
 */
```

#### Arrays and objects

##### Transform arrays into their shorter form

| Option                | Type    | Default |
| --------------------- | ------- | ------- |
| `jsdocUseShortArrays` | boolean | `true`  |

Whether or not to transform the type `Array<type>` into `type[]` when possible. If inside the symbols there's more than a type, the transformation won't happen:

```js
// jsdocUseShortArrays: true

/**
 * @typedef {Array<Array<string>>} ListOfLists
 * @typedef {Array<ListOfLists>} ListOfListsOfLists
 */

// ->

/**
 * @typedef {Array<string[]>} ListOfLists
 * @typedef {ListOfLists[]} ListOfListsOfLists
 */
```

##### Modify the dot used for the generics of arrays and objects

| Option                              | Type    | Default |
| ----------------------------------- | ------- | ------- |
| `jsdocFormatDotForArraysAndObjects` | boolean | `true`  |

Whether or not to apply transformations regarding the dot `Array` and `Object` types can have before their generics (`Array.<...`):

```js
// jsdocFormatDotForArraysAndObjects: true

/**
 * @typedef {Array<Array<string>>} ListOfLists
 */

// ->

/**
 * @typedef {Array.<string[]>} ListOfLists
 */
```

##### Ensure the use or not of the dot for the generics of arrays and objects

| Option                           | Type    | Default |
| -------------------------------- | ------- | ------- |
| `jsdocUseDotForArraysAndObjects` | boolean | `true`  |

If the formatting for dots is enabled, this options will specify whether the dot is added or removed.

```js
// jsdocUseDotForArraysAndObjects: false

/**
 * @typedef {Array.<Array.<string>>} ListOfLists
 */

// ->

/**
 * @typedef {Array<string[]>} ListOfLists
 */
```

#### Tags

##### Replace tags synonyms

| Option                     | Type    | Default |
| -------------------------- | ------- | ------- |
| `jsdocReplaceTagsSynonyms` | boolean | `true`  |

Whether or not to replace tags synonyms with their _official_ tag.

```js
// jsdocReplaceTagsSynonyms: true

/**
 * @extends Something
 * @arg {string} name  ...
 * @virtual
 * ...
 */

// ->

/**
 * @augments Something
 * @param {string} name  ...
 * @abstract
 * ...
 */
```

##### Sort tags

| Option          | Type    | Default |
| --------------- | ------- | ------- |
| `jsdocSortTags` | boolean | `true`  |

Whether or not to sort the tags of a JSDoc block.

```js
// jsdocSortTags: true

/**
 * @param {string} name  ...
 * @throws {Error} if ...
 * @callback CreatePerson
 * @returns {Person}
 */

// ->

/**
 * @callback CreatePerson
 * @param {string} name  ...
 * @returns {Person}
 * @throws {Error} if ...
 */
```

##### Tags order

| Option           | Type  | Default                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `jsdocTagsOrder` | array | <ul><li>`type`</li><li>`typedef`</li><li>`callback`</li><li>`function`</li><li>`method`</li><li>`class`</li><li>`file`</li><li>`constant`</li><li>`description`</li><li>`classdesc`</li><li>`example`</li><li>`param`</li><li>`property`</li><li>`returns`</li><li>`template`</li><li>`augments`</li><li>`extends`</li><li>`throws`</li><li>`yields`</li><li>`fires`</li><li>`listens`</li><li>`async`</li><li>`abstract`</li><li>`override`</li><li>`private`</li><li>`protected`</li><li>`public`</li><li>`access`</li><li>`desprecated`</li><li>`author`</li><li>`version`</li><li>`since`</li><li>`member`</li><li>`memberof`</li><li>`category`</li><li>`external`</li><li>`see`</li><li>`other`</li><li>`todo`</li></ul> |

A list specifing the order in which the the tags of a JSDoc block should be sorted. It supports an `other` item to place tags that are not on the list.

#### Rendering

##### Use columns

| Option            | Type    | Default |
| ----------------- | ------- | ------- |
| `jsdocUseColumns` | boolean | `true`  |

Whether or not to try to use columns for type, name and description when possible; if `false`, the descriptions will be moved to a new line.

```js
// jsdocUseColumns: true

/**
 * @callback CreatePerson
 * @param {string} name The name of the person.
 * @param {number} age The age of the person.
 * @param {string[]} pets A list of the person's pets.
 * @returns {Person}
 * @throws {Error} if something goes wrong
 * @throws {AnotherTypeOfError} If something else goes wrong.
 */

// ->

/**
 * @callback CreatePerson
 * @param {string}   name  The name of the person.
 * @param {number}   age   The age of the person.
 * @param {string[]} pets  A list of the person's pets.
 * @returns {Person}
 * @throws {Error}              if something goes wrong
 * @throws {AnotherTypeOfError} If something else goes wrong.
 */
```

The alternative:

```js
// jsdocUseColumns: false

/**
 * @callback CreatePerson
 * @param {string} name The name of the person.
 * @param {number} age The age of the person.
 * @param {string[]} pets A list of the person's pets.
 * @returns {Person}
 * @throws {Error} if something goes wrong
 * @throws {AnotherTypeOfError} If something else goes wrong.
 */

// ->

/**
 * @callback CreatePerson
 * @param {string} name
 * The name of the person.
 * @param {number} age
 * The age of the person.
 * @param {string[]} pets
 * A list of the person's pets.
 * @returns {Person}
 * @throws {Error}
 * if something goes wrong
 * @throws {AnotherTypeOfError}
 * If something else goes wrong.
 */
```

##### Group columns

| Option                   | Type    | Default |
| ------------------------ | ------- | ------- |
| `jsdocGroupColumnsByTag` | boolean | `true`  |

Whether to respect column alignment within the same tag. For example: all `@param` tags are agligned with eachother, but not with all the `@throws` tags.

```js
// jsdocGroupColumnsByTag: false

/**
 * @callback CreatePerson
 * @param {string} name The name of the person.
 * @param {number} age The age of the person.
 * @param {string[]} pets A list of the person's pets.
 * @returns {Person}
 * @throws {Error} if something goes wrong
 * @throws {AnotherTypeOfError} If something else goes wrong.
 */

// ->

/**
 * @callback CreatePerson
 * @param   {string}             name  The name of the person.
 * @param   {number}             age   The age of the person.
 * @param   {string[]}           pets  A list of the person's pets.
 * @returns {Person}
 * @throws  {Error}              if something goes wrong
 * @throws  {AnotherTypeOfError} If something else goes wrong.
 */
```

##### Consistent columns

| Option                   | Type    | Default |
| ------------------------ | ------- | ------- |
| `jsdocConsistentColumns` | boolean | `true`  |

This is for when the columns are algined by tags; if `true` and one tag can't use columns, no other tag will use them either.

```js
// jsdocConsistentColumns: true

/**
 * @callback CreatePerson
 * @param {string} name The name of the person.
 * @param {number} extraLongTypeThatWillTakeTheMinSpaceForADescription The age of the person.
 * @param {string[]} pets A list of the person's pets.
 * @returns {Person}
 * @throws {Error} if something goes wrong
 * @throws {AnotherTypeOfError} If something else goes wrong.
 */

// ->

/**
 * @callback CreatePerson
 * @param {string} name
 * The name of the person.
 * @param {number} extraLongTypeThatWillTakeTheMinSpaceForADescription
 * The age of the person.
 * @param {string[]} pets
 * A list of the person's pets.
 * @returns {Person}
 * @throws {Error}              if something goes wrong
 * @throws {AnotherTypeOfError} If something else goes wrong.
 */
```

##### Avoid small columns for descriptions

| Option                            | Type | Default |
| --------------------------------- | ---- | ------- |
| `jsdocDescriptionColumnMinLength` | int  | `35`    |

When using columns, this is the minimum available space the description column must have; if it's less, the description will be moved to a new line and columns will be disabled for the tag, and if consistent columns are enabled, for the entire block.

##### Tag spacing: Between tag and type

| Option                            | Type | Default |
| --------------------------------- | ---- | ------- |
| `jsdocMinSpacesBetweenTagAndType` | int  | `1`     |

How many spaces should there be between a tag and a type:

```
 * @[tag][<--this-->]{[type]} [name] [description]
```

##### Tag spacing: Between type and name

| Option                             | Type | Default |
| ---------------------------------- | ---- | ------- |
| `jsdocMinSpacesBetweenTypeAndName` | int  | `1`     |

How many spaces should there be between a type and a name:

```
 * @[tag] {[type]}[<--this-->][name] [description]
```

##### Tag spacing: Between name and description

| Option                                    | Type | Default |
| ----------------------------------------- | ---- | ------- |
| `jsdocMinSpacesBetweenNameAndDescription` | int  | `2`     |

How many spaces should there be between a name and a description column.

```
 * @[tag] {[type]} [name][<--this-->][description]
```

##### Space between description body and tags

| Option                                | Type | Default |
| ------------------------------------- | ---- | ------- |
| `jsdocLinesBetweenDescriptionAndTags` | int  | `1`     |

How many lines should there be between a description body and the tags.

```js
// jsdocLinesBetweenDescriptionAndTags: 1

/**
 * My type description.
 * @typedef {Object} MyType
 */

// ->

/**
 * My type description.
 *
 * @typedef {Object} MyType
 */
```

##### Make sure descriptions are valid sentences

| Option                                | Type    | Default |
| ------------------------------------- | ------- | ------- |
| `jsdocEnsureDescriptionsAreSentences` | boolean | `true`  |

If enabled, it will make sure descriptions start with an upper case letter and end with a period.

```js
// jsdocEnsureDescriptionsAreSentences: true

/**
 * my type description
 *
 * @typedef {Object} MyType
 */

// ->

/**
 * My type description.
 *
 * @typedef {Object} MyType
 */
```

##### Allow descriptions to be on different lines

| Option                                   | Type  | Default                                                                                                                                                         |
| ---------------------------------------- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `jsdocAllowDescriptionOnNewLinesForTags` | array | <ul><li>`classdesc`</li><li>`license`</li><li>`desc`</li><li>`description`</li><li>`file`</li><li>`fileoverview`</li><li>`overview`</li><li>`summary`</li></ul> |

A list of tags that are allowed to have their description on a new line.

```js
// jsdocUseColumns: true

/**
 * @callback CreatePerson
 * @param {string} name The name of the person.
 * @param {number} age The age of the person.
 * @param {string[]} pets A list of the person's pets.
 * @returns {Person}
 * @license
 * Some license.
 */

// ->

/**
 * @callback CreatePerson
 * @param {string}   name  The name of the person.
 * @param {number}   age   The age of the person.
 * @param {string[]} pets  A list of the person's pets.
 * @returns {Person}
 * @license
 * Some license.
 */
```

##### Ignore tags for consistent columns

| Option                                               | Type    | Default |
| ---------------------------------------------------- | ------- | ------- |
| `jsdocIgnoreNewLineDescriptionsForConsistentColumns` | boolean | `true`  |

If enabled, when evaluating the rule for consistent columns, tags with description on a new line, allowed by `jsdocAllowDescriptionOnNewLinesForTags`, will be ignored.

##### Use an inline block for a single tag

| Option                                    | Type    | Default |
| ----------------------------------------- | ------- | ------- |
| `jsdocUseInlineCommentForASingleTagBlock` | boolean | `false` |

Whether or not to use a single line JSDoc block when there\'s only one tag.

```js
// jsdocUseInlineCommentForASingleTagBlock: true

/**
 * @type {string}
 */

// ->

/** @type {string} */
```

#### Extras

##### Custom width

| Option            | Type | Default                 |
| ----------------- | ---- | ----------------------- |
| `jsdocPrintWidth` | int  | `0` (uses `printWidth`) |

This is an override for the `printWidth` option, in case the length of the documentation lines needs to be different.

##### Turn the plugin on and off

| Option               | Type    | Default |
| -------------------- | ------- | ------- |
| `jsdocPluginEnabled` | boolean | `true`  |

Whether or not the plugin will parse and transform JSDoc blocks.

##### Let the plugin know that it's being extended

| Option                | Type    | Default |
| --------------------- | ------- | ------- |
| `jsdocPluginExtended` | boolean | `false` |

This will prevent the plugin from running from the original package. The idea is for it to be enabled when the plugin is being extended on the implementation.

#### ⚠️ Experimental

##### Parse comments without tags

| Option                                       | Type    | Default |
| -------------------------------------------- | ------- | ------- |
| `jsdocExperimentalFormatCommentsWithoutTags` | boolean | `false` |

By default, the plugin will only parse comments with tags. Use this option, at your own risk, if you want to format blocks without tags.

### 🚫 Ignoring blocks

If you have some blocks where you don't the plugin to make any modification, you can add the `@prettierignore` tag and it/they will be skipped:

```js
/**
 * @type {Array<Something>}
 * @prettierignore
 */
```

### ⚡️ Modifying the functionality

While the plugin has enough options to cover most of the common cases, if you find that it doesn't handle some edge case and you don't think it would be a good idea to send a PR, you can easily modify the plugin functionality without having to fork/clone the original repository.

The entire plugin is (mostly) built around tiny functions inside a dependency injection container, so you could take the container and replace the function you want to modify.

First, we have to enable the option `jsdocPluginExtended`, as it will prevent it from running from the original package, and create a JS file to work:

`.prettierrc`:

```json
{
  "jsdocPluginExtended": true,
  "plugins": ["./my-jsdoc-plugin.js"]
}
```

Now, on our JS file, we'll add the following snippet:

```js
const { get, override } = require('@homer0/prettier-plugin-jsdoc/src/fns/app');
const { loadFns } = require('@homer0/prettier-plugin-jsdoc/src/loader');
const { getPlugin } = require('@homer0/prettier-plugin-jsdoc/src/fns/getPlugin');

loadFns();

module.exports = get(getPlugin)();
```

That's all that's needed in order to setup the plugin:

1. `get` is the access to the dependency injection container, you pass the reference of an original function and it will return either the function or an override.
2. `loadFns` is a utility function that `require`s all the functions of the plugin and loads them on the dependency injection container.
3. `getPlugin` basically connects all the functions and returns the plugin definition.

Now, in order to modify a function we need to import the original and use `override` before the call to `getPlugin`.

Let's say you want to add the synonym `params` to `param` (if the plugin finds `@params` it will be converted to `@param`):

```js
const { get, override } = require('@homer0/prettier-plugin-jsdoc/src/fns/app');
const { loadFns } = require('@homer0/prettier-plugin-jsdoc/src/loader');
const { getPlugin } = require('@homer0/prettier-plugin-jsdoc/src/fns/getPlugin');
// + We add the `require` for the original function.
const { getTagsSynonyms } = require('@homer0/prettier-plugin-jsdoc/src/fns/constants');

loadFns();

// + We create a custom `getTagsSynonyms`.
const customGetTagsSynonyms = () => ({
  ...getTagsSynonyms(),
  params: 'param',
});

// + We override the function on the container.
override(getTagsSynonyms, customGetTagsSynonyms);

module.exports = get(getPlugin)();
```

That's all, the plugin was successfully extended 🎉!

### 📖 Troubleshooting

#### Forcing new lines in paragraphs and lists

When writing multiple paragraphs or markdown lists, you might want to force new lines to be respected, for example:

```js
/**
 * First paragraph
 * Second paragraph
 *
 * @type {Something}
 */

/**
 * A list:
 *
 * - First item
 * - Second item
 *
 * @type {Something}
 */
```

The problem is that the plugin will end up putting those lines together, as it will assume that they are all part of the same paragraph:

```js
/**
 * First paragraph Second paragraph
 *
 * @type {Something}
 */

/**
 * A list:
 *
 * - First item - Second item
 *
 * @type {Something}
 */
```

It may look like a bug, but this is actually the functionality that formats the the descriptions in order to respect the [`printWidth`/`jsodcPrintWidth`](#custom-width) option.

The way you can solve this is by adding a period at the end of the line, which will tell the plugin that you ended the sentence and that it should respect the line break

```js
/**
 * First paragraph.
 * Second paragraph.
 *
 * @type {Something}
 */

/**
 * A list:
 *
 * - First item.
 * - Second item.
 *
 * @type {Something}
 */
```

### 🤘 Development

As this project is part of the `packages` monorepo, some of the tooling, like ESLint and Husky, are installed on the root's `package.json`.

#### Tasks

| Task        | Description                |
| ----------- | -------------------------- |
| `test:unit` | Runs the unit tests.       |
| `test:e2e`  | Runs the functional tests. |
| `test`      | Runs all tests.            |

#### Testing

I use [Jest](https://jestjs.io) to test the project, both with unit tests and functional tests.

The configurations files are `.jestrc-e2e` and `.jestrc-unit`, and the test files are located on `/tests`.

In the case of the functional tests, there's a special environment on `./tests/utils` that loads and parses a list of fixture files in order to save them on the global object. In reality, there's only one test file for the functional tests, the one that reads the global object and dynamically generates the `it(...)`: `index.e2e.js`.

### 🐞 Validating bugs

> Yes, since this is in a monorepo (for now), I can't put this on the issue template.

You can use the functional tests to validate a scenario in which the plugin is not behaving as you would expect.

Create a file `issue.fixture.js` in `./tests/e2e/fixtures` and add the following code:

```js
module.exports = { only: true, jsdocPrintWidth: 70 };

//# input

/**
 * @template{Something} [something]
 */

//# output

/**
 * @template {Something} [something]
 */
```

- The `module.exports` specifiy the plugin options for that specific case.
- `only: true` is not a plugin option, but will make the test runner ignore all the other tests, and only run the one you specify.
- Below `//# input` you can put any number of comment blocks, in the state you would expect the plugin to pick them.
- Below `//# output` you have to put the expected output after formatting the input with the plugin.
- The "input" and "output" are handled as if they were different files, so you can even put functions and real code, it won't be executed though, just formatted.

## Motivation

Let's start with the fact that I really like the functionality of Prettier, but I really dislike their philosophy. I understand what they are trying to achieve and it makes sense, but "just use it the way I tell you" doesn't seem like a valid solution to me.

Ok, there won't accept options requests? that's perfect, it doesn't make sense to just add _"one more"_... but it would be great if it could be open to be extended. The only way to do it is with a plugin, which means an extra parsing.

Enough rant; I started using Prettier a couple of weeks ago and being a huge fan of JSDoc, I wanted to use it to format JSDoc blocks too, something I've doing, for sometime now, using a Node script that I was trying to make into a VSCode plugin :P.

I found [prettier-plugin-jsdoc](https://github.com/hosseinmd/prettier-plugin-jsdoc/) by [@hosseinmd](https://github.com/hosseinmd), but it (currently) doesn't cover most of the cases I wanted (like columns creations), it's written in TypeScript (which I don't like very much) and if I were to fork and send PRs, it could've taken forever (you can see the commits for this package), and it seemed like the perfect oportunity to try [Ramda](https://ramdajs.com) and functional programming... so I started a new one.
