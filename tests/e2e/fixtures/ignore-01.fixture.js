module.exports = {
  jsdocIgnoreTags: ['property'],
};

//# input

/**
 * @typedef {Object} JimpexConfigurationOptions
 * @property {?Object} default The app default configuration. Default `null`.
 * @property {string}  name The name of the app, used for the configuration files. Default `'app'`.
 * @property {string}  path The path to the configuration files directory, relative to the project root directory. Default `'config/'`.
 * @property {boolean} hasFolder  Whether the configurations are inside a sub directory or not. If `true`, a configuration path would be `config/[app-name]/[file]`. Default `true`.
 * This another line for the same property.
 * @property {string}  environmentVariable The name of the environment variable that will be used to set the active configuration. Default `'CONFIG'`.
 * @property {boolean} loadFromEnvironment Whether or not to check for the environment variable and load a configuration based on its value. Default `true`.
 * @property {boolean} loadVersionFromConfiguration If `true`, the app `version` will be taken from the loaded configuration, otherwise, when a configuration is loaded, the app will copy the version it has into the configuration. Default `true`.
 * @property {string}  filenameFormat The name format the configuration files have. Default: `[app-name].[configuration-name].config.js`.
 */

/**
 * @callback IsAvailable
 * @param {"blue"|"red"|"purple"|"orange"} color Something.
 * @param {number} [count] Another thing.
 * @returns {boolean} Some flag property.
 */

//# output

/**
 * @typedef {Object} JimpexConfigurationOptions
 * @property {?Object} default The app default configuration. Default `null`.
 * @property {string}  name The name of the app, used for the configuration files. Default `'app'`.
 * @property {string}  path The path to the configuration files directory, relative to the project root directory. Default `'config/'`.
 * @property {boolean} hasFolder  Whether the configurations are inside a sub directory or not. If `true`, a configuration path would be `config/[app-name]/[file]`. Default `true`.
 * This another line for the same property.
 * @property {string}  environmentVariable The name of the environment variable that will be used to set the active configuration. Default `'CONFIG'`.
 * @property {boolean} loadFromEnvironment Whether or not to check for the environment variable and load a configuration based on its value. Default `true`.
 * @property {boolean} loadVersionFromConfiguration If `true`, the app `version` will be taken from the loaded configuration, otherwise, when a configuration is loaded, the app will copy the version it has into the configuration. Default `true`.
 * @property {string}  filenameFormat The name format the configuration files have. Default: `[app-name].[configuration-name].config.js`.
 */

/**
 * @callback IsAvailable
 * @param {'blue' | 'red' | 'purple' | 'orange'} color    Something.
 * @param {number}                               [count]  Another thing.
 * @returns {boolean} Some flag property.
 */
