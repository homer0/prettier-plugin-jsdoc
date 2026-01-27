module.exports = {
  printWidth: 75,
  semi: false,
  trailingComma: "all",
  singleQuote: false
};

//# input

/**
 * Get an Array of `Payload` (Promise-based) for the storage entry with a
 * subset of `Args`.
 *
 * @param args  Subset of keys needed for the storage entry.
 *              At the end, optionally set which block to target (latest
 *              known finalized is the default) and an AbortSignal.
 * @example
 *
 *   // this is a query with 3 keys
 *   typedApi.query.Pallet.Query.getEntries({ at: "best" }) // no keys
 *   typedApi.query.Pallet.Query.getEntries(arg1, { at: "finalized" }) // 1/3 keys
 *   typedApi.query.Pallet.Query.getEntries(arg1, arg2, { at: "0x12345678" }) // 2/3 keys
 *
 */

//# output

/**
 * Get an Array of `Payload` (Promise-based) for the storage entry with a
 * subset of `Args`.
 *
 * @param args  Subset of keys needed for the storage entry.
 *              At the end, optionally set which block to target (latest
 *              known finalized is the default) and an AbortSignal.
 * @example
 *
 *   // this is a query with 3 keys
 *   typedApi.query.Pallet.Query.getEntries({ at: "best" }) // no keys
 *   typedApi.query.Pallet.Query.getEntries(arg1, { at: "finalized" }) // 1/3 keys
 *   typedApi.query.Pallet.Query.getEntries(arg1, arg2, {
 *     at: "0x12345678",
 *   }) // 2/3 keys
 *
 */
