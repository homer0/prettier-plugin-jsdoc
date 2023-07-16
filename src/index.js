const { get } = require('./fns/app');
const { getPlugin } = require('./fns/getPlugin');
const { loadFns } = require('./loader');

loadFns();

module.exports = get(getPlugin)(true);
