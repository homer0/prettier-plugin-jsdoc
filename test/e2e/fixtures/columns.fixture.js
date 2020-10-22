//# input

/**
 * @typedef {Object} JimpexConfigurationOptions
 * @property {?Object} default The app default configuration. Default `null`.
 * @property {string}  name The name of the app, used for the configuration files. Default `'app'`.
 * @property {string}  path The path to the configuration files directory, relative to the project root directory. Default `'config/'`.
 * @property {boolean} hasFolder  Whether the configurations are inside a sub directory or not. If `true`, a configuration path would be `config/[app-name]/[file]`. Default `true`.
 * @property {string}  environmentVariable The name of the environment variable that will be used to set the active configuration. Default `'CONFIG'`.
 * @property {boolean} loadFromEnvironment Whether or not to check for the environment variable and load a configuration based on its value. Default `true`.
 * @property {boolean} loadVersionFromConfiguration If `true`, the app `version` will be taken from the loaded configuration, otherwise, when a configuration is loaded, the app will copy the version it has into the configuration. Default `true`.
 * @property {string}  filenameFormat The name format the configuration files have. Default: `[app-name].[configuration-name].config.js`.
 */

/**
 * @typedef {Object} ErrorCaseDefinition The required properties to create a new {@link ErrorCase}.
 * @property {string} name The name of the case.
 * @property {ErrorCaseDefinition|string} message The formatted message or the `function` that generates one.
 * @property {RegExp|string} condition A `string` or a expression to match against an error that could be parsed.
 * @property {?Object.<string,ParserLike>} parsers A map of reusable parsers. Each parser can be an `object` map, a `function` or an instance
 * of {@link CaseParser}.
 * @property {?InstructionListLikeAndSomeLongNameToForceInLinesMode} parse A list of parsers the case should use on extracted parameters. Each item of the list can be either the name of a parser defined on `parsers`, the name of a parser on the scope, a `function` to parse a value, or an `array` of all the thing previously mentioned.
 * @property {?boolean} useOriginal Whether or not the case should use the original message when matched.
 */

//# output

/**
 * @typedef {Object} JimpexConfigurationOptions
 * @property {?Object} default                       The app default configuration. Default `null`.
 * @property {string}  name                          The name of the app, used for the configuration
 *                                                   files. Default `'app'`.
 * @property {string}  path                          The path to the configuration files directory,
 *                                                   relative to the project root directory. Default
 *                                                   `'config/'`.
 * @property {boolean} hasFolder                     Whether the configurations are inside a sub
 *                                                   directory or not. If `true`, a configuration
 *                                                   path would be `config/[app-name]/[file]`.
 *                                                   Default `true`.
 * @property {string}  environmentVariable           The name of the environment variable that will
 *                                                   be used to set the active configuration.
 *                                                   Default `'CONFIG'`.
 * @property {boolean} loadFromEnvironment           Whether or not to check for the environment
 *                                                   variable and load a configuration based on its
 *                                                   value. Default `true`.
 * @property {boolean} loadVersionFromConfiguration  If `true`, the app `version` will be taken from
 *                                                   the loaded configuration, otherwise, when a
 *                                                   configuration is loaded, the app will copy the
 *                                                   version it has into the configuration. Default
 *                                                   `true`.
 * @property {string}  filenameFormat                The name format the configuration files have.
 *                                                   Default:
 *                                                   `[app-name].[configuration-name].config.js`.
 */

/**
 * The required properties to create a new {@link ErrorCase}.
 *
 * @typedef {Object} ErrorCaseDefinition
 * @property {string} name
 * The name of the case.
 * @property {ErrorCaseDefinition | string} message
 * The formatted message or the `function` that generates one.
 * @property {RegExp | string} condition
 * A `string` or a expression to match against an error that could be parsed.
 * @property {?Object<string, ParserLike>} parsers
 * A map of reusable parsers. Each parser can be an `object` map, a `function` or an instance of
 * {@link CaseParser}.
 * @property {?InstructionListLikeAndSomeLongNameToForceInLinesMode} parse
 * A list of parsers the case should use on extracted parameters. Each item of the list can be
 * either the name of a parser defined on `parsers`, the name of a parser on the scope, a `function`
 * to parse a value, or an `array` of all the thing previously mentioned.
 * @property {?boolean} useOriginal
 * Whether or not the case should use the original message when matched.
 */
