import { get } from './fns/app.js';
import { getPlugin } from './fns/getPlugin.js';
import { loadFns } from './loader.js';

loadFns();

const plugin = get(getPlugin)(true);
export default plugin;
