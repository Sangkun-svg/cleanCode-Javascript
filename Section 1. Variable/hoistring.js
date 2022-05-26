/* Hoistirng 이 일어나는 경우 */

console.log(test());
// result : 3
//          undefined

function test() {
  return console.log(3);
}

/* Hoistirng 을 방지하는 경우 */
console.log(test());

const test = () => {
  return console.log(3);
};
