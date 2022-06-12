module.exports = {
  jsdocPrintWidth: 110,
  semi: false,
};

//# input

/**
 * @typedef {{
 * 	type?: string
 * 	value?: any
 * 	theme?: string
 * 	mapping?: {[key: string]: string}
 * 	wide?: boolean
 * 	lazy?: boolean
 * 	hide?: 'narrow' | 'other'
 * 	overlap?: 'next' | 'previous'
 * }} SectionValueProps
 * @template{InputProps<Value>} [Props=React.ComponentProps<Input>]
 */

//# output

/**
 * @typedef {{
 *   type?: string
 *   value?: any
 *   theme?: string
 *   mapping?: { [key: string]: string }
 *   wide?: boolean
 *   lazy?: boolean
 *   hide?: 'narrow' | 'other'
 *   overlap?: 'next' | 'previous'
 * }} SectionValueProps
 * @template {InputProps<Value>} [Props=React.ComponentProps<Input>]
 */
