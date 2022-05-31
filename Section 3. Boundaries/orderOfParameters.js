/**
 *
 * 매개변수의 순서가 경계이다.
 *
 * 호출하는 함수의 네이밍과 인자의 순서의 연관성을 고려한다
 */

const someFunc = (someArg1, someArg2, someArg3, someArg4, someArg5) => {
  // logic..
};
const someFunc2nd = ({ someArg1, someArg2, someArg3, someArg4, someArg5 }) => {
  // logic..
};

const wrapperFunc = (Arg1, Arg3) => {
  someFunc(Arg1, undefined, Arg3);
};
