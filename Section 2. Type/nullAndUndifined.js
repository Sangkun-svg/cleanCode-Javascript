console.log(null == undefined);
// true : null은 어떤 값이 의도적으로 비어있음을 표현하며 불리언 연산에서 false 로 취급된다.
//        null 을 false 로 취급하여 JS 엔진에서 undefined 를 Boolean 타입으로 형 변환하여
//        true 라는 결과가 나온거 같다.( 추측 )

console.log(!!null);
console.log(!!undefined);

console.log(null === undefined);
// false : null 과 undefined 는 타입임과 동시에 값이다.
//         따라서 타입까지 비교하는 일치 연산자로 비교할 땐 false 이다.
