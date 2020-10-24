module.exports = {
  jsdocLinesBetweenExampleTagAndCode: 0,
};

//# input

/**
 * @param {  String   }    param0 description
 */
function fun(param0) {}

/**
 * @type {React.FC<{   message:string}   >}
 */
const Component = memo(({ message }) => {
  return <p>{message}</p>;
});

/**
 @typedef {
  {
    "userId": {
    "profileImageLink": *,
    "isBusinessUser": "isResellerUser"|"isBoolean"|  "isSubUser" |    "isNot",
    "shareCode": number,
    "referredBy": any,
    },
    id:number
  }
 } User
 */

/**
 * @examples
 *   var one= 5
 *   var two=10
 *
 *   if(one > 2) { two += one }
 */

//# output

/**
 * @param {string} param0  description
 */
function fun(param0) {}

/**
 * @type {React.FC<{ message: string }>}
 */
const Component = memo(({ message }) => {
  return <p>{message}</p>;
});

/**
 * @typedef {{
 *   userId: {
 *     profileImageLink: any;
 *     isBusinessUser: 'isResellerUser' | 'isBoolean' | 'isSubUser' | 'isNot';
 *     shareCode: number;
 *     referredBy: any;
 *   };
 *   id: number;
 * }} User
 */

/**
 * @example
 *   var one = 5;
 *   var two = 10;
 *
 *   if (one > 2) {
 *     two += one;
 *   }
 */
