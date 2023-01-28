# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 6.0.1 (2023-01-28)

### Bug Fixes

- **monorepo:** update all dependencies ([7618870](https://github.com/homer0/packages/commit/7618870e6ec4d6f281a79b15f139124875c760b2))
- **prettier-plugin-jsdoc:** include 'return' as tag with name as desc ([cf3a81c](https://github.com/homer0/packages/commit/cf3a81c09ecb21bce58595626a3b99bad698a211))

# [6.0.0](https://github.com/homer0/packages/compare/@homer0/prettier-plugin-jsdoc@5.1.6...@homer0/prettier-plugin-jsdoc@6.0.0) (2022-12-27)

### Bug Fixes

- drop Yarn ([e41698c](https://github.com/homer0/packages/commit/e41698c310996d1ca520bd6a9a2220017e1a3d49))
- **monorepo:** drop Node 14 support ([4df5a23](https://github.com/homer0/packages/commit/4df5a23c1c3e5d1632679f4902c0c73113252bc0))
- **monorepo:** update all dependencies ([0ba6a5a](https://github.com/homer0/packages/commit/0ba6a5a68413ab557cce5a5afbd6314e42d86671))

### BREAKING CHANGES

- **monorepo:** Node 14 is not longer supported. Node 16 is the minimum required version now.

## 5.1.6 (2022-12-23)

### Bug Fixes

- avoid handling keys as str literals ([62d89f8](https://github.com/homer0/packages/commit/62d89f8a1a862f6ba820765dcc98f4081b2878ea))
- detect tags' names on a different line ([051bea0](https://github.com/homer0/packages/commit/051bea01d73c168827af0f03533823b03822a908))

## 5.1.5 (2022-10-22)

### Bug Fixes

- update dependencies ([abcf502](https://github.com/homer0/packages/commit/abcf5027fce4cb7d37d9e4cf9aafc1846c7bceb0))

## 5.1.4 (2022-07-12)

### Bug Fixes

- **monorepo:** force publish unpublished tags ([ce339bc](https://github.com/homer0/packages/commit/ce339bcbffb697e7127ecc213242feb54822f775))

## [5.1.3](https://github.com/homer0/packages/compare/@homer0/prettier-plugin-jsdoc@5.1.2...@homer0/prettier-plugin-jsdoc@5.1.3) (2022-07-12)

### Bug Fixes

- **monorepo:** update all dependencies ([fc95b09](https://github.com/homer0/packages/commit/fc95b096bc4c2976ba5cd9c7354890137b66a3bd))

## [5.1.2](https://github.com/homer0/packages/compare/@homer0/prettier-plugin-jsdoc@5.1.1...@homer0/prettier-plugin-jsdoc@5.1.2) (2022-06-26)

### Bug Fixes

- **prettier-plugin-jsdoc:** properly detect when to use columns ([8fbb3e9](https://github.com/homer0/packages/commit/8fbb3e987e7d21e4edeb1bb8b1dba5ce75c9cacf))

## [5.1.1](https://github.com/homer0/packages/compare/@homer0/prettier-plugin-jsdoc@5.1.0...@homer0/prettier-plugin-jsdoc@5.1.1) (2022-04-25)

**Note:** Version bump only for package @homer0/prettier-plugin-jsdoc

# [5.1.0](https://github.com/homer0/packages/compare/@homer0/prettier-plugin-jsdoc@5.0.0...@homer0/prettier-plugin-jsdoc@5.1.0) (2022-04-25)

### Bug Fixes

- **prettier-plugin-jsdoc:** force space between tag name and type ([c2560da](https://github.com/homer0/packages/commit/c2560da61503345b39bdb384f91f727ffbe33cc4))

### Features

- **prettier-plugin-jsdoc:** add exp support for blocks without tags ([c1646e3](https://github.com/homer0/packages/commit/c1646e303b1c775f130b2eaaab788c78b5012224))

# [5.0.0](https://github.com/homer0/packages/compare/@homer0/prettier-plugin-jsdoc@4.0.6...@homer0/prettier-plugin-jsdoc@5.0.0) (2022-03-17)

### Bug Fixes

- **monorepo:** drop Node 12 support ([7966821](https://github.com/homer0/packages/commit/79668213b982a93d5b91f1177cf404df0cd4fb3a))
- **prettier-plugin-jsdoc:** update dependencies ([947f728](https://github.com/homer0/packages/commit/947f728a87702b9f67226bba7377f73ff9588e9f))

### BREAKING CHANGES

- **monorepo:** Node 12 is not longer supported. Node 14 is the minimum required version now.

## [4.0.6](https://github.com/homer0/packages/compare/@homer0/prettier-plugin-jsdoc@4.0.5...@homer0/prettier-plugin-jsdoc@4.0.6) (2021-10-17)

### Bug Fixes

- update dependencies ([7a56417](https://github.com/homer0/packages/commit/7a5641707d66264a6cfefcad3eb819aae6a2cee3))

## [4.0.5](https://github.com/homer0/packages/compare/@homer0/prettier-plugin-jsdoc@4.0.4...@homer0/prettier-plugin-jsdoc@4.0.5) (2021-08-19)

### Bug Fixes

- **prettier-plugin-jsdoc:** update comment-parser ([6789cd0](https://github.com/homer0/packages/commit/6789cd01533cc8676f127ff77a745fb7659de95e))

## [4.0.4](https://github.com/homer0/packages/compare/@homer0/prettier-plugin-jsdoc@4.0.3...@homer0/prettier-plugin-jsdoc@4.0.4) (2021-08-07)

**Note:** Version bump only for package @homer0/prettier-plugin-jsdoc

## [4.0.3](https://github.com/homer0/packages/compare/@homer0/prettier-plugin-jsdoc@4.0.2...@homer0/prettier-plugin-jsdoc@4.0.3) (2021-08-02)

### Reverts

- comment-parser doesn't include cjs export, so pinning for now ([3ad1536](https://github.com/homer0/packages/commit/3ad153693e854aeadc5ae285169ad589006283fb))

## [4.0.2](https://github.com/homer0/packages/compare/@homer0/prettier-plugin-jsdoc@4.0.1...@homer0/prettier-plugin-jsdoc@4.0.2) (2021-08-02)

### Bug Fixes

- **prettier-plugin-jsdoc:** use comment-parser cjs file ([3c0626c](https://github.com/homer0/packages/commit/3c0626ca099b8e86ca1c6e20cb7fd83bbf46658b))

## [4.0.1](https://github.com/homer0/packages/compare/@homer0/prettier-plugin-jsdoc@4.0.0...@homer0/prettier-plugin-jsdoc@4.0.1) (2021-07-25)

### Bug Fixes

- **prettier-plugin-jsdoc:** prevent formatting issues with string literals ([e3846b8](https://github.com/homer0/packages/commit/e3846b8ab5e7207a3fe22d2fcb92861d4156d2fa))

# [4.0.0](https://github.com/homer0/packages/compare/@homer0/prettier-plugin-jsdoc@3.0.1...@homer0/prettier-plugin-jsdoc@4.0.0) (2021-04-11)

### Bug Fixes

- **monorepo:** drop support for Node 10 ([7098299](https://github.com/homer0/packages/commit/7098299172dfa94bdfb131a2dc877c0f2250b7b3))

### BREAKING CHANGES

- **monorepo:** The monorepo and the packages no longer support Node 10.

## [3.0.1](https://github.com/homer0/packages/compare/@homer0/prettier-plugin-jsdoc@3.0.0...@homer0/prettier-plugin-jsdoc@3.0.1) (2021-03-21)

### Bug Fixes

- **prettier-plugin-jsdoc:** add support for the remarks tag ([4c5815a](https://github.com/homer0/packages/commit/4c5815aa25b7f0b58c03bba400ddf28f99688b2f))
- **prettier-plugin-jsdoc:** only add period when is not URL and ends with a letter ([7d862db](https://github.com/homer0/packages/commit/7d862dbe6bcb6340effe25345ecfe44ff6a12213))
- **prettier-plugin-jsdoc:** prevent formatting issues with Markdown tables ([0d1e573](https://github.com/homer0/packages/commit/0d1e57383ff6e6a712037ad14c1d7d71b26d018d))

# [3.0.0](https://github.com/homer0/packages/compare/@homer0/prettier-plugin-jsdoc@1.1.2...@homer0/prettier-plugin-jsdoc@3.0.0) (2021-03-07)

### Bug Fixes

- update dependencies ([7437e8c](https://github.com/homer0/packages/commit/7437e8c12e1d46d11f8dd8cfe793307391dbfa5f))
- **prettier-plugin-jsdoc:** guard against missing options on createParser ([c377ebb](https://github.com/homer0/packages/commit/c377ebb05d6d22b8120d912e00151a0caafc52eb))
- **prettier-plugin-jsdoc:** move the example tag order to the end ([f1e9cda](https://github.com/homer0/packages/commit/f1e9cdaab8080da1bf3410e4dc99a1486eaf351f))
- **prettier-plugin-jsdoc:** update syntax for comment parser ([b50fa7f](https://github.com/homer0/packages/commit/b50fa7f5032f48d9e1e3c4ef397266be6422b008))

### BREAKING CHANGES

- **prettier-plugin-jsdoc:** The example tag order has been changed to a lower position.
  This change was made in order to fix a bug in which TypeScript would detect
  'any' if the tag was before param, property and template. This is breaking
  because saving a file with this change would cause possible unrelated blocks
  to change.

# [2.0.0](https://github.com/homer0/packages/compare/@homer0/prettier-plugin-jsdoc@1.1.2...@homer0/prettier-plugin-jsdoc@2.0.0) (2021-01-25)

### Bug Fixes

- **prettier-plugin-jsdoc:** move the example tag order to the end ([f1e9cda](https://github.com/homer0/packages/commit/f1e9cdaab8080da1bf3410e4dc99a1486eaf351f))
- update dependencies ([7437e8c](https://github.com/homer0/packages/commit/7437e8c12e1d46d11f8dd8cfe793307391dbfa5f))
- **prettier-plugin-jsdoc:** update syntax for comment parser ([b50fa7f](https://github.com/homer0/packages/commit/b50fa7f5032f48d9e1e3c4ef397266be6422b008))

### BREAKING CHANGES

- **prettier-plugin-jsdoc:** The example tag order has been changed to a lower position.
  This change was made in order to fix a bug in which TypeScript would detect
  'any' if the tag was before param, property and template. This is breaking
  because saving a file with this change would cause possible unrelated blocks
  to change.

## [1.1.2](https://github.com/homer0/packages/compare/@homer0/prettier-plugin-jsdoc@1.1.1...@homer0/prettier-plugin-jsdoc@1.1.2) (2020-11-28)

### Bug Fixes

- **prettier-plugin-jsdoc:** add .npmignore ([a857aae](https://github.com/homer0/packages/commit/a857aae8cdf1736180a8c60ebca92d25d41cdfd7))
- include publishConfig and fix the format of the repository property ([4c25780](https://github.com/homer0/packages/commit/4c25780099bd60443a3625f5ab2c62a41a5c1314))

## [1.1.1](https://github.com/homer0/packages/compare/@homer0/prettier-plugin-jsdoc@1.1.0...@homer0/prettier-plugin-jsdoc@1.1.1) (2020-11-05)

### Bug Fixes

- **prettier-plugin-jsdoc:** add .npmignore ([a857aae](https://github.com/homer0/packages/commit/a857aae8cdf1736180a8c60ebca92d25d41cdfd7))

# 1.1.0 (2020-11-05)

### Bug Fixes

- **monorepo:** set the initial version to 0.0.1 ([cd33912](https://github.com/homer0/packages/commit/cd33912de0dead750bcb3b891f630f4392ee227e))
- **monorepo:** update dependencies ([cd892a8](https://github.com/homer0/packages/commit/cd892a865d8251cab3f80913a2c219c118d67e19))
- **prettier-plugin-jsdoc:** add a function to replace adjacent regexps ([8962180](https://github.com/homer0/packages/commit/8962180016f8be294bce0834f39e9433a6f920b8))
- **prettier-plugin-jsdoc:** add an extra case when joining props ([723c4a5](https://github.com/homer0/packages/commit/723c4a501b09a131767c7eaa3730ed0f72ea599b))
- **prettier-plugin-jsdoc:** add missing alias ([9ea7e2a](https://github.com/homer0/packages/commit/9ea7e2abac1d4e35d44c40c78623031f9f5a391c))
- **prettier-plugin-jsdoc:** add missing function to validate tags ([c3e4456](https://github.com/homer0/packages/commit/c3e4456152d9e2daca3f40da1d0c80d208d70c1f))
- **prettier-plugin-jsdoc:** add support for empty example tags ([c29b06c](https://github.com/homer0/packages/commit/c29b06ccab17a551bf580276f87aa35875035e03))
- **prettier-plugin-jsdoc:** add synonym for the [@example](https://github.com/example) tag ([4c7598c](https://github.com/homer0/packages/commit/4c7598c8e9c6dd22765686198b5a1be04f429d85))
- **prettier-plugin-jsdoc:** avoid formatting examples into sentences ([ca208ae](https://github.com/homer0/packages/commit/ca208ae25c30c228f4e4a53ae742ed98f060b7af))
- **prettier-plugin-jsdoc:** avoid transforming URLs into sentences ([3ef8a05](https://github.com/homer0/packages/commit/3ef8a0560c6f7ef18b480c62d6ce0b6150f75b26))
- **prettier-plugin-jsdoc:** calculate printWidth on sub formatters ([234c41f](https://github.com/homer0/packages/commit/234c41f717d5bd3cbebe4e725fe581cb1550697d))
- **prettier-plugin-jsdoc:** consider objects complex types ([4843933](https://github.com/homer0/packages/commit/4843933918a28c1755a61ea2b2ef23de808c97f4))
- **prettier-plugin-jsdoc:** correct typos on the options ([d810b46](https://github.com/homer0/packages/commit/d810b466065c4503c7068d58cf5318e4b0b2aaa1))
- **prettier-plugin-jsdoc:** don\'t allow more than one empty line ([62cdcc6](https://github.com/homer0/packages/commit/62cdcc690be5e9416836053e6c1f40dc2f8ff1e3))
- **prettier-plugin-jsdoc:** format access tag from the main formatter ([f46762c](https://github.com/homer0/packages/commit/f46762ca4a91e0e76f3119ddbd7e233dc867154f))
- **prettier-plugin-jsdoc:** format type with Prettier on format step ([69a26ba](https://github.com/homer0/packages/commit/69a26bad8993057cebd031a8480183fd3f2269a8))
- **prettier-plugin-jsdoc:** get the supported languages from Prettier ([8efca5b](https://github.com/homer0/packages/commit/8efca5b00b224a22a7cce024de70a90260721e47))
- **prettier-plugin-jsdoc:** make formatDescription a curried fn ([acd9d12](https://github.com/homer0/packages/commit/acd9d123180f20ffe6757ea8f50398992094929f))
- **prettier-plugin-jsdoc:** make the constants into fns ([199e4ff](https://github.com/homer0/packages/commit/199e4ff1e487cf18b74b0fe67c2574093d14850b))
- **prettier-plugin-jsdoc:** make the function to prepare types work with tags ([808fb2f](https://github.com/homer0/packages/commit/808fb2f1524f63faa58b1b306fe501ff6d40cd79))
- **prettier-plugin-jsdoc:** move app into fns ([5cc87b7](https://github.com/homer0/packages/commit/5cc87b7da8a438947e1cfebb37e8a80b5c1bf4ae))
- **prettier-plugin-jsdoc:** move each function to its own file ([a8786a5](https://github.com/homer0/packages/commit/a8786a51546169911f876fd1140ad67528b7dd0a))
- **prettier-plugin-jsdoc:** move names to a new line when the type is too long ([f2bbc70](https://github.com/homer0/packages/commit/f2bbc70250ebb105b9fd23f5491a471c49e27fd9))
- **prettier-plugin-jsdoc:** move providers load to another fn ([3e8767e](https://github.com/homer0/packages/commit/3e8767ec3621c491a3cb12750ccf50f4e53e597b))
- **prettier-plugin-jsdoc:** move the dots function to utils ([536a703](https://github.com/homer0/packages/commit/536a7037682d215d29ab82c87a44071eef532058))
- **prettier-plugin-jsdoc:** preserve case when adding/removing dot ([9b29618](https://github.com/homer0/packages/commit/9b29618a1d0e0af83578bfbce21f7df446e8df10))
- **prettier-plugin-jsdoc:** properly handle one word descriptions ([43fc425](https://github.com/homer0/packages/commit/43fc4258e01f7a7b3b22943072143211ae430bb9))
- **prettier-plugin-jsdoc:** properly render example tags ([b3410ce](https://github.com/homer0/packages/commit/b3410ceab513165253d0bbdd5b5ffd181adfa088))
- **prettier-plugin-jsdoc:** remove ifElse ([f23d300](https://github.com/homer0/packages/commit/f23d300465862c2c2fae4b5e76d5dd13438a4693))
- **prettier-plugin-jsdoc:** rename the container functions ([a94fc39](https://github.com/homer0/packages/commit/a94fc39644c71ef16111fed026bd36244c8715fb))
- **prettier-plugin-jsdoc:** render unformatted examples ([7cda2ef](https://github.com/homer0/packages/commit/7cda2ef3aa305055bd9732c8b6ef731194b7e6a5))
- **prettier-plugin-jsdoc:** stop assuming there's a trailing star ([5c8e1a3](https://github.com/homer0/packages/commit/5c8e1a349e0132d8e77c17062fe429e13b25ca62))
- **prettier-plugin-jsdoc:** support multiline types ([be26632](https://github.com/homer0/packages/commit/be266320696c2e6120a84a3a7c643427878dfc43))
- **prettier-plugin-jsdoc:** transform sentences on tags that use name ([72ea4fa](https://github.com/homer0/packages/commit/72ea4fab0058f636812c06e23b4bc3e8488a2720))
- **prettier-plugin-jsdoc:** use name and description columns for special tags ([8403495](https://github.com/homer0/packages/commit/8403495e7a46210f92b458cfc9851d8383e830e0))

### Features

- **prettier-plugin-jsdoc:** add fn to format access tag ([e367468](https://github.com/homer0/packages/commit/e36746869b8df6d889b2d6996d5b28094287c2d7))
- **prettier-plugin-jsdoc:** add function that applies the tags formatters ([1efd58b](https://github.com/homer0/packages/commit/1efd58b23e11fc9d18205cd61c2c26d76af1b782))
- **prettier-plugin-jsdoc:** add function that applies the types formatters ([45a865d](https://github.com/homer0/packages/commit/45a865d12123428183175b1c37c3c66aae973678))
- **prettier-plugin-jsdoc:** add function that fixes descriptions ([9145309](https://github.com/homer0/packages/commit/9145309b0885988cdeef2a13b6e9faaa3f89610f))
- **prettier-plugin-jsdoc:** add function to create language definitions ([4ef2c87](https://github.com/homer0/packages/commit/4ef2c8727b9c245466f6a13477bd0bbb92fe9352))
- **prettier-plugin-jsdoc:** add function to create the Prettier parser ([75202cf](https://github.com/homer0/packages/commit/75202cf854ceec34090c43ba4fa4e1abe16d5884))
- **prettier-plugin-jsdoc:** add function to format arrays ([ef4eb22](https://github.com/homer0/packages/commit/ef4eb229d439d005a5529cebe49160b7180758c0))
- **prettier-plugin-jsdoc:** add function to format descriptions ([510116c](https://github.com/homer0/packages/commit/510116cb2cdf93b3d50c6e1de81548f06c87f5e9))
- **prettier-plugin-jsdoc:** add function to format examples ([8ebc8ad](https://github.com/homer0/packages/commit/8ebc8ad93aded9a4941e1e331e1a31b12eab223f))
- **prettier-plugin-jsdoc:** add function to format objects ([9334f97](https://github.com/homer0/packages/commit/9334f9733550f04e00a26cd70cbfc66a5f3e218b))
- **prettier-plugin-jsdoc:** add function to format string literals ([e76fdc1](https://github.com/homer0/packages/commit/e76fdc1daf52a4a5716a3d15ac7c0f6360fe7b45))
- **prettier-plugin-jsdoc:** add function to format TS types ([1edbc58](https://github.com/homer0/packages/commit/1edbc58412fec5590a1b3b4197b11520c3cbce02))
- **prettier-plugin-jsdoc:** add function to prepare all tags ([54366b2](https://github.com/homer0/packages/commit/54366b220be4d9f5c31617a26d45a020edbe4b60))
- **prettier-plugin-jsdoc:** add function to prepare complex types ([a77f463](https://github.com/homer0/packages/commit/a77f463cb3309982330a86ba39d7b398ac1ca24f))
- **prettier-plugin-jsdoc:** add function to prepare tag names ([b11b540](https://github.com/homer0/packages/commit/b11b540094a46dc4cdea6795746556f6d282636c))
- **prettier-plugin-jsdoc:** add function to render comment lines ([87bd7e9](https://github.com/homer0/packages/commit/87bd7e9efa0075b1d3b864879c00a5cf91750cf0))
- **prettier-plugin-jsdoc:** add function to render example tags ([411c481](https://github.com/homer0/packages/commit/411c481a040453003b475c0dd13663c7a4829e56))
- **prettier-plugin-jsdoc:** add function to render tag in columns ([1c55fb3](https://github.com/homer0/packages/commit/1c55fb3b7e775b65f18cc795fe4a62d213027c4c))
- **prettier-plugin-jsdoc:** add function to render tag in one line ([8161523](https://github.com/homer0/packages/commit/81615233ef9c7a76f5559985a95de9edf538ed9e))
- **prettier-plugin-jsdoc:** add function to sort tags ([bb31bd0](https://github.com/homer0/packages/commit/bb31bd02834044ab171ed074eb811d79a6e6a075))
- **prettier-plugin-jsdoc:** add function to split text lines ([d265a1b](https://github.com/homer0/packages/commit/d265a1b6161cd6b00330e9192c8717e938b84e02))
- **prettier-plugin-jsdoc:** add function to trim tags properties ([355b6d5](https://github.com/homer0/packages/commit/355b6d52eed855b56e8c2a8298bfd68f94f063bb))
- **prettier-plugin-jsdoc:** add languages' definitions ([6f10b0b](https://github.com/homer0/packages/commit/6f10b0b834801151391f52d4b90c31558840b9a5))
- **prettier-plugin-jsdoc:** add option to add a separator line on [@example](https://github.com/example) ([fc53cd7](https://github.com/homer0/packages/commit/fc53cd779fa0c7e28a1511c99b91b2128a2e54c0))
- **prettier-plugin-jsdoc:** add option to disable the plugin ([322c683](https://github.com/homer0/packages/commit/322c6837cbaacde8b38f44658c6fdc171555edaf))
- **prettier-plugin-jsdoc:** add option to disable the plugin when extended ([055fdc4](https://github.com/homer0/packages/commit/055fdc49aea20c52539d6a51707bfb165bbbe7bc))
- **prettier-plugin-jsdoc:** add plugin main file ([2405562](https://github.com/homer0/packages/commit/2405562f482a4e262d7f74c2f39dd6fc20d4a7d4))
- **prettier-plugin-jsdoc:** add rule to ignore consistent columns ([ed76434](https://github.com/homer0/packages/commit/ed7643492ade3036cd798233e622bc9cd513d15b))
- **prettier-plugin-jsdoc:** add support for multiline names ([5aaa014](https://github.com/homer0/packages/commit/5aaa014b6bab4de020b4a6189b7845c76f4c6180))
- **prettier-plugin-jsdoc:** allow inline comments ([7fb86b2](https://github.com/homer0/packages/commit/7fb86b2af930ebc7fedab337b3e28a43cedf2aac))
- **prettier-plugin-jsdoc:** define the plugin options ([0535ab5](https://github.com/homer0/packages/commit/0535ab589cd19bf7c62f23e161c6f6c3767264b2))
- **prettier-plugin-jsdoc:** detect examples' captions ([08ce98b](https://github.com/homer0/packages/commit/08ce98b42ebbdbca6c3ce4084c118c5e5aaae86a))
- **prettier-plugin-jsdoc:** expose the container ([fb931ab](https://github.com/homer0/packages/commit/fb931abd41cf5f2c3d1e3be8728cf1bdcf4f549f))
- **prettier-plugin-jsdoc:** function to format arrays ramdification ([94a1c5c](https://github.com/homer0/packages/commit/94a1c5c1433f2bd86a2522674b18f4343f925db8))
- **prettier-plugin-jsdoc:** function to format descriptions ramdification ([7382978](https://github.com/homer0/packages/commit/738297801c2df5457a77e3c07065d1e753f049aa))
- **prettier-plugin-jsdoc:** function to format string literals ramdification ([439b512](https://github.com/homer0/packages/commit/439b512060d92110036158eeb34809edcab4fe47))
- **prettier-plugin-jsdoc:** function to split text lines ramdification ([f5e30b4](https://github.com/homer0/packages/commit/f5e30b42d51f98acdf0537258c329f4bdb7dde01))
- **prettier-plugin-jsdoc:** implement multiline types on the render ([ef4185b](https://github.com/homer0/packages/commit/ef4185b2a3225d1f014e4b1e1df6681fd484fdc6))
- **prettier-plugin-jsdoc:** respect new lines ([ba96d56](https://github.com/homer0/packages/commit/ba96d56ddc934544fdab25fd2d2fbdf3d7071afa))
- **prettier-plugin-jsdoc:** setup package ([2e5954c](https://github.com/homer0/packages/commit/2e5954c506fec70ce7b99fec1285f221c7522f4a))
- **prettier-plugin-jsdoc:** transform descriptions into sentences ([5ddb503](https://github.com/homer0/packages/commit/5ddb5032b4f8d7571e186165e5ce38dccebaa618))
- **prettier-plugin-jsdoc:** use a dependency injection container ([f9dddf4](https://github.com/homer0/packages/commit/f9dddf44f2fbd8220fb960bbce9635393e342613))
