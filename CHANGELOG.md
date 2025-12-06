## [11.0.1](https://github.com/homer0/prettier-plugin-jsdoc/compare/11.0.0...11.0.1) (2025-12-06)


### Bug Fixes

* add publishConfig ([7c45e3d](https://github.com/homer0/prettier-plugin-jsdoc/commit/7c45e3d4947179c53846543e8fc7d0807d25519d))
* update dependencies ([df69741](https://github.com/homer0/prettier-plugin-jsdoc/commit/df69741b2e7518cd20d418c9eb99c5f233c187f3))

# [11.0.0](https://github.com/homer0/prettier-plugin-jsdoc/compare/10.0.1...11.0.0) (2025-12-05)


### Bug Fixes

* add export for src ([13bb020](https://github.com/homer0/prettier-plugin-jsdoc/commit/13bb0203f7bc3c7dc718b73fb2cae1a9871bb863))
* add exports to the package.json ([ed40962](https://github.com/homer0/prettier-plugin-jsdoc/commit/ed40962159603ccccc4bbc95c48bcf239af4310b))
* add missing extensions ([e9b5e62](https://github.com/homer0/prettier-plugin-jsdoc/commit/e9b5e62ccf5f49503988386055f56c0050d6921d))
* add module export ([64da4e9](https://github.com/homer0/prettier-plugin-jsdoc/commit/64da4e96d9cfea36144f39eebf9f726a30f35422))
* avoid destructuring parsers imports ([791b868](https://github.com/homer0/prettier-plugin-jsdoc/commit/791b868ba30a9568c2900d00d32e75d2a9d58a7f))
* drop Node v18 ([206743f](https://github.com/homer0/prettier-plugin-jsdoc/commit/206743f871ca56dc15859e49530ae9d41d335925))
* migrate package to ESM ([c4d8b1e](https://github.com/homer0/prettier-plugin-jsdoc/commit/c4d8b1eb01e9bc09283bcb314b70262c607e1649))
* update all dependencies ([d80ccce](https://github.com/homer0/prettier-plugin-jsdoc/commit/d80ccce86514110ad9a19e71fbf9aa5014bff06b))
* update to eslint v9 and solve all reported issues ([b22a929](https://github.com/homer0/prettier-plugin-jsdoc/commit/b22a9297ab9c9922f494add4e919a701e2c85ba0))
* use fileURLToPath instead of __dirname ([cccf688](https://github.com/homer0/prettier-plugin-jsdoc/commit/cccf688e92d19a88031664bda6da30ada76214b1))


### BREAKING CHANGES

* This package is now ESM only.
* Node v18 is not longer supported. Node v20.19 is the minimum
required version now.

## [10.0.1](https://github.com/homer0/prettier-plugin-jsdoc/compare/10.0.0...10.0.1) (2025-12-03)


### Bug Fixes

* remove node version upper limit ([0aa7f4d](https://github.com/homer0/prettier-plugin-jsdoc/commit/0aa7f4d70238bd4eb11278828692d61586a78fe2))
* update prod dependencies ([540a09f](https://github.com/homer0/prettier-plugin-jsdoc/commit/540a09f80dcc7d85834577effb9662b084dd718d))

# [10.0.0](https://github.com/homer0/prettier-plugin-jsdoc/compare/9.1.0...10.0.0) (2025-03-23)


### Bug Fixes

* add support for the notes tag ([7494a63](https://github.com/homer0/prettier-plugin-jsdoc/commit/7494a63ce2ee1398cdb51ff0beabf1046dfa229e))
* correct typo in `descriptionParagraph` property ([64b22ec](https://github.com/homer0/prettier-plugin-jsdoc/commit/64b22ec356a7f71c9d1190dce1a6614ec60d4d77))
* correct typo in `getFormatter` method ([ae86690](https://github.com/homer0/prettier-plugin-jsdoc/commit/ae866902ab60b32472eb19913864a9b701254f0a))
* correct typo in render methods' names ([32a519b](https://github.com/homer0/prettier-plugin-jsdoc/commit/32a519be41820f9f553ce2cc8cedf16667c1f59a))
* move notes to the tags with desc as name ([7e6d23e](https://github.com/homer0/prettier-plugin-jsdoc/commit/7e6d23e260cf8a6a669e0f08aa9eba11487c923a))
* typo on deprecated tag ([1e43b30](https://github.com/homer0/prettier-plugin-jsdoc/commit/1e43b30cd57f56f7cf20df53d9abd887b520d9bf))
* update all the dependencies ([8aa9ac0](https://github.com/homer0/prettier-plugin-jsdoc/commit/8aa9ac02d60bb71cfb4cdd3b3dd402f5d45d3554))


### BREAKING CHANGES

* prettier has been moved from prod dependency to peer
dependency, so you'll have to add it to your own package.json, if
if you didn't have it already.
* If the plugin is being extended, the utility methods
`renderTagsInlines` and `tryToRenderTagsInColums` have been fixed
and they are now `renderTagsInLines` and `tryToRenderTagsInColumns`.
* If the plugin is being extended, the utility function
for TS types `getFormater` has been fixed and it's now `getFormatter`.
* If the plugin is being extended, the tag property
`descriptionParagrah` has been fixed and it's now
`descriptionParagraph`.

# [9.1.0](https://github.com/homer0/prettier-plugin-jsdoc/compare/9.0.2...9.1.0) (2024-11-09)


### Bug Fixes

* add support for node version 22 ([9943109](https://github.com/homer0/prettier-plugin-jsdoc/commit/9943109cb7f1355f603b5924196b6f4ad66415c4))
* update dependencies ([5294125](https://github.com/homer0/prettier-plugin-jsdoc/commit/5294125c874b1c1ee9bd68a2c2e065fad169838b))


### Features

* add option to ignore inline blocks when there are not tags ([0090712](https://github.com/homer0/prettier-plugin-jsdoc/commit/0090712cb6a9a0ee51fa289c67e554d9e237f8cf))

## [9.0.2](https://github.com/homer0/prettier-plugin-jsdoc/compare/9.0.1...9.0.2) (2024-05-28)


### Bug Fixes

* support links with custom labels ([cf8844e](https://github.com/homer0/prettier-plugin-jsdoc/commit/cf8844e0c1ad8b9bdacdd0ede05404879c15e21f))

## [9.0.1](https://github.com/homer0/prettier-plugin-jsdoc/compare/9.0.0...9.0.1) (2024-05-27)


### Bug Fixes

* access getRenderer from the container ([c1d6ef7](https://github.com/homer0/prettier-plugin-jsdoc/commit/c1d6ef7010b1b6fe9d9028ff9f6d46a7a547f536))
* add support for the privateRemarks tag ([1ec37b9](https://github.com/homer0/prettier-plugin-jsdoc/commit/1ec37b90142d223da2b0dfa20b6ec02bfe0771b7))
* update dependencies ([86ce9e7](https://github.com/homer0/prettier-plugin-jsdoc/commit/86ce9e79568ec14ba2e1cac0636846a507b6df10))

# [9.0.0](https://github.com/homer0/prettier-plugin-jsdoc/compare/8.0.0...9.0.0) (2024-04-09)


### Bug Fixes

* consider jsdocIgnoreTags when calculating lengths ([515e3a5](https://github.com/homer0/prettier-plugin-jsdoc/commit/515e3a5b5dcf40733be87275a5cec8e7e1ba51a1))
* update dependencies ([0623001](https://github.com/homer0/prettier-plugin-jsdoc/commit/0623001231b63594385b01bab90d0fb271a816ad))


### Features

* implement jsdocIgnoreTags ([55b96db](https://github.com/homer0/prettier-plugin-jsdoc/commit/55b96db6d5ecb48436c3bb5bad768dde3c7d04df))


### BREAKING CHANGES

* For those extending the plugin, getLengthsData now requires
the plugin options to be sent as a second parameter.

# [8.0.0](https://github.com/homer0/prettier-plugin-jsdoc/compare/7.0.3...8.0.0) (2023-10-02)


### Bug Fixes

* drop Node 16 support ([d9cdda2](https://github.com/homer0/prettier-plugin-jsdoc/commit/d9cdda2cb8c7cab2d71964ec008f5975446feb85))
* update dependencies ([770b83c](https://github.com/homer0/prettier-plugin-jsdoc/commit/770b83ccf46041742f8df950aa8905c4b0adc49e))


### BREAKING CHANGES

* Node 16 is not longer supported. Node 18.17 is the minimum required version now.

## [7.0.3](https://github.com/homer0/prettier-plugin-jsdoc/compare/7.0.2...7.0.3) (2023-07-22)


### Bug Fixes

* move return tag to tags with desc as name ([1dc8632](https://github.com/homer0/prettier-plugin-jsdoc/commit/1dc8632a0f3d434cf3a60805f05a848124c0c509))
* move todo to the tags without desc ([6805ba0](https://github.com/homer0/prettier-plugin-jsdoc/commit/6805ba093994e614e8ad587ada2053ed2b899da1))
* track tags that cannot be converted into sentences ([1d4167b](https://github.com/homer0/prettier-plugin-jsdoc/commit/1d4167b8ff48b8166e05b63004d199c77b55d43e))

## [7.0.2](https://github.com/homer0/prettier-plugin-jsdoc/compare/7.0.1...7.0.2) (2023-07-19)


### Bug Fixes

* reduce package size ([5eccf97](https://github.com/homer0/prettier-plugin-jsdoc/commit/5eccf978ca7f3904aa85e604c4f0b7fbb5dd5c0a))

## [7.0.1](https://github.com/homer0/prettier-plugin-jsdoc/compare/7.0.0...7.0.1) (2023-07-18)


### Bug Fixes

* trigger standalone deploy ([61c0e74](https://github.com/homer0/prettier-plugin-jsdoc/commit/61c0e7420ce209972b261e3c501752196bec8b83))

# [7.0.0](https://github.com/homer0/prettier-plugin-jsdoc/compare/6.0.5...7.0.0) (2023-07-16)

### Bug Fixes

- hardcode languages ([aeaceec](https://github.com/homer0/prettier-plugin-jsdoc/commit/aeaceec6f59fdc0774a080a12cef3f9cd891da34))
- add support for Prettier v3 ([e70f6ed](https://github.com/homer0/prettier-plugin-jsdoc/commit/e70f6edbe011f885b6a3e8e8fed98695309e8e93))
- update Prettier version ([427c270](https://github.com/homer0/prettier-plugin-jsdoc/commit/427c270b00599af305d42eae2f4546adb809d547))

### BREAKING CHANGES

- This plugin now uses Prettier v3

## [6.0.5](https://github.com/homer0/prettier-plugin-jsdoc/compare/6.0.4...6.0.5) (2023-06-18)

**Note:** Version bump only for package @homer0/prettier-plugin-jsdoc

## [6.0.4](https://github.com/homer0/prettier-plugin-jsdoc/compare/6.0.2...6.0.4) (2023-06-18)

Nothing changed in this version, I just messed up the commits.

## 6.0.3 (2023-06-18)

### Bug Fixes

- update ramda .of syntax ([0f97cd4](https://github.com/homer0/prettier-plugin-jsdoc/commit/0f97cd49ce101d50b66f0573fbbaa3474e2f53d7))

## [6.0.2](https://github.com/homer0/prettier-plugin-jsdoc/compare/6.0.1...6.0.2) (2023-03-05)

### Bug Fixes

- **monorepo:** update all dependencies ([032fdf1](https://github.com/homer0/prettier-plugin-jsdoc/commit/032fdf10ec164518f33294f9cce84d4745be2068))

## 6.0.1 (2023-01-28)

### Bug Fixes

- include 'return' as tag with name as desc ([eab45ee](https://github.com/homer0/prettier-plugin-jsdoc/commit/eab45ee7b2e12bb9c99307bd5168e849e53677e5))

# [6.0.0](https://github.com/homer0/prettier-plugin-jsdoc/compare/5.1.6...6.0.0) (2022-12-27)

### Bug Fixes

- **monorepo:** drop Yarn ([1023bd3](https://github.com/homer0/prettier-plugin-jsdoc/commit/1023bd3e7b8b914da7076283c48f1b4bfa333332))
- **monorepo:** drop Node 14 support ([05683de](https://github.com/homer0/prettier-plugin-jsdoc/commit/05683de6ab4fec8bf5a137ea6b51b40f3a9a3ef0))
- **monorepo:** update all dependencies ([cb9731c](https://github.com/homer0/prettier-plugin-jsdoc/commit/cb9731ca13b65918133f2e10a75afc4b31b85d93))

### BREAKING CHANGES

- **monorepo:** Node 14 is not longer supported. Node 16 is the minimum required version now.

## 5.1.6 (2022-12-23)

### Bug Fixes

- avoid handling keys as str literals ([63ca69d](https://github.com/homer0/prettier-plugin-jsdoc/commit/63ca69d2c137de7204c55ad06e10456e6d5ca4ca))
- detect tags' names on a different line ([53d15f3](https://github.com/homer0/prettier-plugin-jsdoc/commit/53d15f3a9fde57bf7fa65e449d22373c52048aa5))

## 5.1.5 (2022-10-22)

### Bug Fixes

- update dependencies ([fff45a0](https://github.com/homer0/prettier-plugin-jsdoc/commit/fff45a040151862d9df26ed54e33a51bf961578a))

## 5.1.4 (2022-07-12)

### Bug Fixes

- **monorepo:** force publish unpublished tags ([30fafee](https://github.com/homer0/prettier-plugin-jsdoc/commit/30fafeed08955ae3030f3455a79a835460670bd1))

## [5.1.3](https://github.com/homer0/prettier-plugin-jsdoc/compare/5.1.2...5.1.3) (2022-07-12)

### Bug Fixes

- **monorepo:** update all dependencies ([032fdf1](https://github.com/homer0/prettier-plugin-jsdoc/commit/032fdf10ec164518f33294f9cce84d4745be2068))

## [5.1.2](https://github.com/homer0/prettier-plugin-jsdoc/compare/5.1.1...5.1.2) (2022-06-26)

### Bug Fixes

- properly detect when to use columns ([502ca4b](https://github.com/homer0/prettier-plugin-jsdoc/commit/502ca4be09f43a6b3832e02734cffa9f04577594))

## [5.1.1](https://github.com/homer0/prettier-plugin-jsdoc/compare/5.1.0...5.1.1) (2022-04-25)

**Note:** Version bump only for package @homer0/prettier-plugin-jsdoc

# [5.1.0](https://github.com/homer0/prettier-plugin-jsdoc/compare/5.0.0...5.1.0) (2022-04-25)

### Bug Fixes

- force space between tag name and type ([3d94fff](https://github.com/homer0/prettier-plugin-jsdoc/commit/3d94ffff6b002332aa5562a38a02a99534f49fda))

### Features

- add exp support for blocks without tags ([32810ed](https://github.com/homer0/prettier-plugin-jsdoc/commit/32810ed9b8c2e996df08b6fb2ba46d578a0f84c9))

# [5.0.0](https://github.com/homer0/prettier-plugin-jsdoc/compare/4.0.6...5.0.0) (2022-03-17)

### Bug Fixes

- **monorepo:** drop Node 12 support ([99e878e](https://github.com/homer0/prettier-plugin-jsdoc/commit/99e878e43e433bc05f4577a2722cc9f7f6aadf34))
- update dependencies ([e56b749](https://github.com/homer0/prettier-plugin-jsdoc/commit/e56b749200b9840ad2a8733da4ebcbefaf05035f))

### BREAKING CHANGES

- **monorepo:** Node 12 is not longer supported. Node 14 is the minimum required version now.

## [4.0.6](https://github.com/homer0/prettier-plugin-jsdoc/compare/4.0.5...4.0.6) (2021-10-17)

### Bug Fixes

- update dependencies ([fff45a0](https://github.com/homer0/prettier-plugin-jsdoc/commit/fff45a040151862d9df26ed54e33a51bf961578a))

## [4.0.5](https://github.com/homer0/prettier-plugin-jsdoc/compare/4.0.4...4.0.5) (2021-08-19)

### Bug Fixes

- update comment-parser ([cb7e88a](https://github.com/homer0/prettier-plugin-jsdoc/commit/cb7e88aef82372e704e6e6ae6e3836c50f39e5ba))

## [4.0.4](https://github.com/homer0/prettier-plugin-jsdoc/compare/4.0.3...4.0.4) (2021-08-07)

**Note:** Version bump only for package @homer0/prettier-plugin-jsdoc

## [4.0.3](https://github.com/homer0/prettier-plugin-jsdoc/compare/4.0.2...4.0.3) (2021-08-02)

### Reverts

- comment-parser doesn't include cjs export, so pinning for now ([f5d44a3](https://github.com/homer0/prettier-plugin-jsdoc/commit/f5d44a358fb0922a5347cdc02118408cdb7cf506))

## [4.0.2](https://github.com/homer0/prettier-plugin-jsdoc/compare/4.0.1...4.0.2) (2021-08-02)

### Bug Fixes

- use comment-parser cjs file ([9097e23](https://github.com/homer0/prettier-plugin-jsdoc/commit/9097e23e7e530dbaf40299a43da4ab93e0b52326))

## [4.0.1](https://github.com/homer0/prettier-plugin-jsdoc/compare/4.0.0...4.0.1) (2021-07-25)

### Bug Fixes

- prevent formatting issues with string literals ([f28beff](https://github.com/homer0/prettier-plugin-jsdoc/commit/f28beff5d5ccac3140750ddd2b3c48dbb9c63614))

# [4.0.0](https://github.com/homer0/prettier-plugin-jsdoc/compare/3.0.1...4.0.0) (2021-04-11)

### Bug Fixes

- **monorepo:** drop support for Node 10 ([d038b63](https://github.com/homer0/packages/commit/d038b6319f91f248613eddb7daff9b3d82a19b1e))

### BREAKING CHANGES

- **monorepo:** The monorepo and the packages no longer support Node 10.

## [3.0.1](https://github.com/homer0/prettier-plugin-jsdoc/compare/3.0.0...3.0.1) (2021-03-21)

### Bug Fixes

- add support for the remarks tag ([fb2835f](https://github.com/homer0/prettier-plugin-jsdoc/commit/fb2835f00ab02eaa8d2920ac184e13c5c9afc23f))
- only add period when is not URL and ends with a letter ([d97d458](https://github.com/homer0/prettier-plugin-jsdoc/commit/d97d458c071e2f924b9e0bd6de36ab2badd44edb))
- prevent formatting issues with Markdown tables ([0e3df30](https://github.com/homer0/prettier-plugin-jsdoc/commit/0e3df30345718e8b00f17ee2b09e3d543ea49b0f))

# [3.0.0](https://github.com/homer0/prettier-plugin-jsdoc/compare/1.1.2...3.0.0) (2021-03-07)

### Bug Fixes

- update dependencies ([3ffd22e](https://github.com/homer0/prettier-plugin-jsdoc/commit/3ffd22ef6929ecc386e9fb23172edda2a4ff34d6))
- guard against missing options on createParser ([1d56fa2](https://github.com/homer0/prettier-plugin-jsdoc/commit/1d56fa21243a040a35a2c73401275e704c767bba))
- move the example tag order to the end ([f8a3c97](https://github.com/homer0/prettier-plugin-jsdoc/commit/f8a3c9775621d4584848328a0f66bcb65021daf2))
- update syntax for comment parser ([735d2ed](https://github.com/homer0/prettier-plugin-jsdoc/commit/735d2ed0b5ebd8130e5b3a6a3dafd0b40d8f17e5))

### BREAKING CHANGES

- The example tag order has been changed to a lower position.
  This change was made in order to fix a bug in which TypeScript would detect
  'any' if the tag was before param, property and template. This is breaking
  because saving a file with this change would cause possible unrelated blocks
  to change.

# [2.0.0](https://github.com/homer0/prettier-plugin-jsdoc/compare/1.1.2...2.0.0) (2021-01-25)

### Bug Fixes

- move the example tag order to the end ([f8a3c97](https://github.com/homer0/prettier-plugin-jsdoc/commit/f8a3c9775621d4584848328a0f66bcb65021daf2))
- update dependencies ([3ffd22e](https://github.com/homer0/prettier-plugin-jsdoc/commit/3ffd22ef6929ecc386e9fb23172edda2a4ff34d6))
- update syntax for comment parser ([735d2ed](https://github.com/homer0/prettier-plugin-jsdoc/commit/735d2ed0b5ebd8130e5b3a6a3dafd0b40d8f17e5))

### BREAKING CHANGES

- The example tag order has been changed to a lower position.
  This change was made in order to fix a bug in which TypeScript would detect
  'any' if the tag was before param, property and template. This is breaking
  because saving a file with this change would cause possible unrelated blocks
  to change.

## [1.1.2](https://github.com/homer0/prettier-plugin-jsdoc/compare/1.1.1...1.1.2) (2020-11-28)

### Bug Fixes

- include publishConfig and fix the format of the repository property ([6b1856b](https://github.com/homer0/prettier-plugin-jsdoc/commit/6b1856bded6407c2608923492f259372f652be45))

## [1.1.1](https://github.com/homer0/prettier-plugin-jsdoc/compare/1.1.0...1.1.1) (2020-11-05)

### Bug Fixes

- add .npmignore ([e2ef67f](https://github.com/homer0/prettier-plugin-jsdoc/commit/e2ef67f3a6a64dfe0ab6e592b96fa71a48e660c8))

# [1.1.0](https://github.com/homer0/prettier-plugin-jsdoc/releases/tag/1.1.0) (2020-11-05)

### Bug Fixes

- add a function to replace adjacent regexps ([4c6069f](https://github.com/homer0/prettier-plugin-jsdoc/commit/4c6069f2f84f3789885d039a3a8ca2d52f57db57))
- add an extra case when joining props ([9489967](https://github.com/homer0/prettier-plugin-jsdoc/commit/9489967d65aa8dc8ac7ca7f1f10fec13739bf0ed))
- add missing alias ([7b6ded3](https://github.com/homer0/prettier-plugin-jsdoc/commit/7b6ded3a251252ec07f7f4087187d00326d22b1f))
- add missing function to validate tags ([8a8bc18](https://github.com/homer0/prettier-plugin-jsdoc/commit/8a8bc1822914114d96083a338a9afa5a4d5e8008))
- add support for empty example tags ([0f58b54](https://github.com/homer0/prettier-plugin-jsdoc/commit/0f58b54ab3b1060fd77a2aa099ceea196d72d6fe))
- add synonym for the @example tag ([fd75310](https://github.com/homer0/prettier-plugin-jsdoc/commit/fd7531090cc7fea224857eb1c532eb911acde7fc))
- avoid formatting examples into sentences ([4f3d162](https://github.com/homer0/prettier-plugin-jsdoc/commit/4f3d1628a323501eb1f059d45b48fd23870d83b7))
- avoid transforming URLs into sentences ([93a5da1](https://github.com/homer0/prettier-plugin-jsdoc/commit/93a5da1933928d28e230df3a8fef1ecdb06efe0e))
- calculate printWidth on sub formatters ([b38a14a](https://github.com/homer0/prettier-plugin-jsdoc/commit/b38a14adf082a7f08127fd067de5bb256991c006))
- consider objects complex types ([40ee872](https://github.com/homer0/prettier-plugin-jsdoc/commit/40ee872851847682b7b403c2d2884ac27b86d5be))
- correct typos on the options ([e662134](https://github.com/homer0/prettier-plugin-jsdoc/commit/e6621343689c4b99f269603f6f55327b1ebdbd8c))
- don\'t allow more than one empty line ([d032687](https://github.com/homer0/prettier-plugin-jsdoc/commit/d0326878f5890205e48aad8a804d1c474c8eac1b))
- format access tag from the main formatter ([419518b](https://github.com/homer0/prettier-plugin-jsdoc/commit/419518b1057e971bd7660b190040de3a8bbd71f2))
- format type with Prettier on format step ([778d366](https://github.com/homer0/prettier-plugin-jsdoc/commit/778d3660617947a36f9335fa9cd944e2c3364677))
- get the supported languages from Prettier ([88e8ab0](https://github.com/homer0/prettier-plugin-jsdoc/commit/88e8ab09c3b03062828c7c8f2e3ba2416b937487))
- make formatDescription a curried fn ([69cfac5](https://github.com/homer0/prettier-plugin-jsdoc/commit/69cfac5ea58f431fffd871d96d4859b5a1ed5aba))
- make the constants into fns ([d5c7e85](https://github.com/homer0/prettier-plugin-jsdoc/commit/d5c7e8567f53008c00b9885b79921a40704bd1b9))
- make the function to prepare types work with tags ([2c4b0cd](https://github.com/homer0/prettier-plugin-jsdoc/commit/2c4b0cd8ba56aca9c52b7778a78e5515fa65786d))
- move app into fns ([86e8ba8](https://github.com/homer0/prettier-plugin-jsdoc/commit/86e8ba8f45434f36c65cb297c363039505149ffc))
- move each function to its own file ([53822a3](https://github.com/homer0/prettier-plugin-jsdoc/commit/53822a3df8c592f93ed4a58ea247e11fa836f562))
- move names to a new line when the type is too long ([791e5e4](https://github.com/homer0/prettier-plugin-jsdoc/commit/791e5e42568fd342372f4b8a664e71b480e9a1f1))
- move providers load to another fn ([36025fa](https://github.com/homer0/prettier-plugin-jsdoc/commit/36025fa67f75cc777917f9c756fb95aedb841b65))
- move the dots function to utils ([c111d54](https://github.com/homer0/prettier-plugin-jsdoc/commit/c111d54b48bee65263f8658103461188ed2b739c))
- preserve case when adding/removing dot ([8b71413](https://github.com/homer0/prettier-plugin-jsdoc/commit/8b71413cc49c51f564e237368bd71951fb4c7f02))
- properly handle one word descriptions ([c873f63](https://github.com/homer0/prettier-plugin-jsdoc/commit/c873f63489d197cfb8990aab8046a83eda2785ca))
- properly render example tags ([7c736a4](https://github.com/homer0/prettier-plugin-jsdoc/commit/7c736a45829e9bf472777b2ace1ccca007150f43))
- remove ifElse ([404061d](https://github.com/homer0/prettier-plugin-jsdoc/commit/404061d55f97c57df984563c65228e01e8f413bf))
- rename the container functions ([e554338](https://github.com/homer0/prettier-plugin-jsdoc/commit/e554338b3da8bcee36e421f23f4761c4b40fa9e9))
- render unformatted examples ([192afb8](https://github.com/homer0/prettier-plugin-jsdoc/commit/192afb850eaebd085125099ebc29029559f7adee))
- stop assuming there's a trailing star ([d56e1f9](https://github.com/homer0/prettier-plugin-jsdoc/commit/d56e1f974543b0e0f5ff4c0e2972dbbf797f1254))
- support multiline types ([2efd010](https://github.com/homer0/prettier-plugin-jsdoc/commit/2efd010a21209c6ddebbc42baf1fdc872426230e))
- transform sentences on tags that use name ([410cc6f](https://github.com/homer0/prettier-plugin-jsdoc/commit/410cc6f7c9b8cd2c240cc22d9871a32e8fdeaf45))
- use name and description columns for special tags ([53819ce](https://github.com/homer0/prettier-plugin-jsdoc/commit/53819ce894b0a216f2c81e70c145d1e846aa0b7a))

### Features

- add fn to format access tag ([85d60b7](https://github.com/homer0/prettier-plugin-jsdoc/commit/85d60b74641a54b4a007e6ac289bc4e2cce996d1))
- add function that applies the tags formatters ([20d8811](https://github.com/homer0/prettier-plugin-jsdoc/commit/20d88119a419d37ef49951b81b5717d8838c6455))
- add function that applies the types formatters ([7828864](https://github.com/homer0/prettier-plugin-jsdoc/commit/7828864c8e456ff24693a5de46f308c5acd43efb))
- add function that fixes descriptions ([41952ab](https://github.com/homer0/prettier-plugin-jsdoc/commit/41952ab08a3ba3a5b8323473338ffbc77eb048d5))
- add function to create language definitions ([1e93e0f](https://github.com/homer0/prettier-plugin-jsdoc/commit/1e93e0fb2a664532b48e78847e92575726a8fc6a))
- add function to create the Prettier parser ([aabf2cb](https://github.com/homer0/prettier-plugin-jsdoc/commit/aabf2cbf9e19a7f85809162f30123ecbbd37f2d7))
- add function to format arrays ([4719eef](https://github.com/homer0/prettier-plugin-jsdoc/commit/4719eef2788a4f827896403470957f0b5456e71f))
- add function to format descriptions ([b6e8017](https://github.com/homer0/prettier-plugin-jsdoc/commit/b6e8017a7ff178301275213500b2f966eb4b5f0e))
- add function to format examples ([d005cd0](https://github.com/homer0/prettier-plugin-jsdoc/commit/d005cd0b51f51de134aa5a5278fa6063ef439c29))
- add function to format objects ([c6a5d3b](https://github.com/homer0/prettier-plugin-jsdoc/commit/c6a5d3b57ca6af2faa0bfa3867819801174a74eb))
- add function to format string literals ([587d0f1](https://github.com/homer0/prettier-plugin-jsdoc/commit/587d0f166a5d41d2e53d08cce0746ccca40e74f7))
- add function to format TS types ([e4766a2](https://github.com/homer0/prettier-plugin-jsdoc/commit/e4766a22ac700848d687b256c5e3a452392520c8))
- add function to prepare all tags ([5812fd6](https://github.com/homer0/prettier-plugin-jsdoc/commit/5812fd6d7c3f732b8b468ffa71e2ae8452246a90))
- add function to prepare complex types ([2a14e24](https://github.com/homer0/prettier-plugin-jsdoc/commit/2a14e24bd188102b0235b02555cca664e8c4144e))
- add function to prepare tag names ([4011836](https://github.com/homer0/prettier-plugin-jsdoc/commit/4011836fb87e58f434b80805495f7817f064c0c9))
- add function to render comment lines ([a1e4206](https://github.com/homer0/prettier-plugin-jsdoc/commit/a1e420677b682d7ee70b0d680a716f895d54b472))
- add function to render example tags ([3e9cd9d](https://github.com/homer0/prettier-plugin-jsdoc/commit/3e9cd9d0a530d06138db560b6ce0b20f2b3096d1))
- add function to render tag in columns ([6db0bf0](https://github.com/homer0/prettier-plugin-jsdoc/commit/6db0bf0f037eae1352dbfb57233bd59ead95bb85))
- add function to render tag in one line ([51724b0](https://github.com/homer0/prettier-plugin-jsdoc/commit/51724b07a58d889bce93bb4961612b0cdb45fb63))
- add function to sort tags ([3d26343](https://github.com/homer0/prettier-plugin-jsdoc/commit/3d2634319fac89b342b219570dca9406ef497a74))
- add function to split text lines ([ad81486](https://github.com/homer0/prettier-plugin-jsdoc/commit/ad814868a4cb4e142508ef0e86267b2dce71c681))
- add function to trim tags properties ([f36904e](https://github.com/homer0/prettier-plugin-jsdoc/commit/f36904ed03880daabe2d2900a309e3d5530481f8))
- add languages' definitions ([61d0941](https://github.com/homer0/prettier-plugin-jsdoc/commit/61d0941db067b73e51a4ff4ab90ccf95be5b32e6))
- add option to add a separator line on @example ([99ac641](https://github.com/homer0/prettier-plugin-jsdoc/commit/99ac6411ebaa308cdb20785641c7e6978bbbe8a6))
- add option to disable the plugin ([406b28d](https://github.com/homer0/prettier-plugin-jsdoc/commit/406b28d542de537d6fedb4d3c1503f386280d98f))
- add option to disable the plugin when extended ([2dcb2db](https://github.com/homer0/prettier-plugin-jsdoc/commit/2dcb2db16fdd1fa84a7f964462697b7c84fa8c87))
- add plugin main file ([6f4a66b](https://github.com/homer0/prettier-plugin-jsdoc/commit/6f4a66b55634a5992f4e795a1039f0d1e7c27758))
- add rule to ignore consistent columns ([1573db8](https://github.com/homer0/prettier-plugin-jsdoc/commit/1573db853f7f6ce03dfc9186cd3a238918d4dd69))
- add support for multiline names ([31563c6](https://github.com/homer0/prettier-plugin-jsdoc/commit/31563c6106c1b58019d60395417a980548527af5))
- allow inline comments ([f386566](https://github.com/homer0/prettier-plugin-jsdoc/commit/f386566dd2de950a17db70a88dd347095daa4594))
- define the plugin options ([eadcc0e](https://github.com/homer0/prettier-plugin-jsdoc/commit/eadcc0ec0b62b5bcc0d00ecd44784b3907e9f1b4))
- detect examples' captions ([b7a29b1](https://github.com/homer0/prettier-plugin-jsdoc/commit/b7a29b18a94b350dbc80acd5f6aca2f5526d1baf))
- expose the container ([d7dc8ef](https://github.com/homer0/prettier-plugin-jsdoc/commit/d7dc8efff30923af9a2c9fb37613fd63a1506dd3))
- function to format arrays ramdification ([b4ea963](https://github.com/homer0/prettier-plugin-jsdoc/commit/b4ea963a79cfef828c08a3531ef676a281f57190))
- function to format descriptions ramdification ([cb38bb1](https://github.com/homer0/prettier-plugin-jsdoc/commit/cb38bb1158e5d01b27c2d556c64e167b9675f858))
- function to format string literals ramdification ([a692445](https://github.com/homer0/prettier-plugin-jsdoc/commit/a6924454c798fa956f06eabeed6fa9b7dadb7b45))
- function to split text lines ramdification ([20b8111](https://github.com/homer0/prettier-plugin-jsdoc/commit/20b81114e0b8c7f7984fb045f5a5e588871765ea))
- implement multiline types on the render ([d525a48](https://github.com/homer0/prettier-plugin-jsdoc/commit/d525a48dc0a8dfa12c4463eefcc23422ce9011bc))
- respect new lines ([11e3d5c](https://github.com/homer0/prettier-plugin-jsdoc/commit/11e3d5c9e150f6f809fd7290359974f18becd700))
- setup package ([866a7e9](https://github.com/homer0/prettier-plugin-jsdoc/commit/866a7e93729c2dcb8925a0c556ef4bcde77935e0))
- transform descriptions into sentences ([f067ce7](https://github.com/homer0/prettier-plugin-jsdoc/commit/f067ce7cc227f400f135c642e8930bc481b282a6))
- use a dependency injection container ([633f6de](https://github.com/homer0/prettier-plugin-jsdoc/commit/633f6de2d628ef78598240bc880c8681ba1f1396))
