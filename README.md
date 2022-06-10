# cleanCode-Javascript

## Udemy 의 클린코드 자바스크립트 강의를 토대로 공부하고 기록하고 공부하는 repo 입니다.

<br />
Lecture : https://www.udemy.com/course/clean-code-js/

<br />

[더 자세한 설명이 있는 Notion](https://root-dugout-9ef.notion.site/CleanCode-Javascript-7f2e1a0a443d4e719e05aeefb7ba244f)

<br /><br />

# Section 1. About Variable

**Summary**

- `var를 지양하자`
- `전역 공간에 관하여`
- `임시변수 제거하기`
- `호이스팅(Hoisting) 주의하기`

**`var를 지양하자`**

**Scope 란?**

- 변수에 접근할 수 있는 범위

Scope 는 크게 2가지로 분류할 수 있다.

- `전역스코프(global scope)` : 어디에서든 해당 변수에 접근 가능하다.
- `지역스코프(local scope)` : 한정적인 범위 내에서 해당 변수에 접근 가능하다.

  지역 스코프 에는 **_함수 스코프_** 와 **_블록 스코프_** 가 있다.

  - `함수 스코프(Function Scope)`
    - 함수가 선언되면 하나의 스코프가 생성되는데 이를 함수 스코프라고 한다.
    - 함수 스코프는 함수에서 선언한 변수는 해당 함수 내부에서만 접근 가능하다는 걸 의미한다.
    - `변수타입 var` 는 함수 스코프 방식을 따르므로 함수 내부에서만 지역변수로 설정된다.
      즉 블록 내부 (if , if/else , while , do-while …) 에서는 전역변수로 설정된다.
      ⇒ var 를 지양해야 하는 이유
  - `블록 스코프(Block Scope)`
    - 블록이 선언되면 하나의 스코프가 생성되며 , 이를 블록 스코프라고 한다
    - 블록 스코프는 블록 `{}` 내부에서 선언된 변수는 해당 블록 내부에서만 접근이 가능하다는걸 의미한다.
    - `변수타입 let & const` 는 블록 스코프를 가진다.
      let & const 를 사용하면 함수가 아닌 블록 단위의 지역변수로 선언된다.
    - `TDZ`
      - TDZ 란 Temporal Dead Zone 의 약자이다.
      - TDZ 란 `스코프의 시작지점 ~ 번수의 "초기화" 시작 지점까지의 구간`을 말한다.
      - let , const , class 의 유효성을 관리한다. = 영향을 받는다
      - var , function , import 는 TDZ의 영향을 받지 않는다.

`실행 컨텍스트란(Execution context)?`

- 실행 컨텍스트는 JS code가 실행되는 환경을 의미한다.

  JS에서는 대표적으로 두가지 타입의 실행 컨텍스트가 존재한다.

  - `전역 실행 컨텍스트(global Execution context)`
    - JS 엔진이 처음 코드를 실행할 때 전역 실행 컨텍스트를 생성한다.
    - 생성과정에서 전역 객체인 window 을 생성하고 this 가 window 객체를 가리키도록 한다.
    - 아무런 코드가 없더라도 JS 엔진이 파일을 실행시키는 시점에서 전역 실행 컨텍스트를 생성한다.
    - 애플리케이션이 종료될 때 까지 유지된다
  - `함수 실행 컨텍스트(Execution context)`
    - JS 엔진은 함수가 호출될 때 마다 호출된 함수를 위한 실행 컨텍스트를 생성한다.
    - 즉 , 모든 함수는 호출되는 시점에서 자기 자신만을 위한 실행 컨텍스트를 가진다.
  - `콜스택과 실행 컨텍스트`

    - CallStack 은 코드가 실행되면서 실행 컨텍스트를 저장하는 자료구조이다.
    - 엔진이 처음 script 를 실행할 때 전역 실행 컨텍스트를 생성하여 CallStack 에 push 한다.
    - 이후 JS 엔진이 함수를 호출할 때 마다 실행 컨텍스트를 생성하고 CallStack 에 push 한다.
    - 모든 코드의 실행이 끝난 뒤 JS 엔진은 CallStack 에서 전역 실행 컨텍스트를 제거(pop)한다.

    더 자세한 내용은 아래 블로그에서 확인. ⇒ 이전에 정리해둔 내용과 통합할 때 참고하기

    [Call Stack과 Execution Context 를 알아보자](https://medium.com/sjk5766/call-stack%EA%B3%BC-execution-context-%EB%A5%BC-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90-3c877072db79)

<br />

`Execution Context 와 scope chain?`

- 실행 컨텍스트는 LIFO 구조의 스택으로 , 코드 실행 중 생성된 모든 실행 컨텍스트를 저장하는데 사용된다. 실행 컨텍스트가 실행되면 엔진이 스코프 체인을 통해 렉시컬 스코프를 먼저 파악한다.
  그러고 나서 함수가 중첩상태일 때 하위 함수 내에서 상위 함수의 스코프와 전역 스코프까지 ㅊ마조할 수 있는 이것을 스코프 체인을 통해 탐색하는 것 이다.
- 스코프 체인이란?

  - 예시를 통해 쉽게 이해해보자.

  ```jsx
  var v = "global";

  function a() {
    var v = "local";

    function b() {
      console.log(v);
    }

    b();
  }

  a();
  ```

  위의 코드들이 실행되면 b() 함수 스코프 안에서 변수 v 를 찾기 시작하는데 ,
  만약 b() 스코프 내에 v 가 없으면 b() 를 감싸고 있는 a() 를 탐색하기 시작한다.
  이때 a() 안에 변수 v 가 존재하면 v 를 참조하게 되고 , 만약 없다면 전역 객체를 탐색하여 v 를 찾는다.
  결국 찾지 못한다면 `ReferenceError` 를 만나게 된다.
  위의 참조값 v 를 찾는 과정을 `scope chain` 이라고 부른다.
  즉 , 스코프 체인은 자기 자신의 스코프를 제외한 자신과 가장 가까운 변수 객체의 모든 스코프들을 스코프 체인이라고 할 수 있다.
  혹은 식별자 를 찾는 일련의 과정이라고도 할 수 있다.

  <br />

  `아래 블로그 참조`
  [자바스크립트 - 스코프 체인(scope chain)란?](https://ljtaek2.tistory.com/140)

<br />

`각 변수 타입들의 특성`

- var
  - 변수 중복 선언이 가능하며 , 재할당도 가능하다 ⇒ 예기치 못한 값을 반환할 수 있다.
  - 함수 스코프가 적용되어 있어 함수 외부에서 선언한 변수는 모두 전역 변수로 설정된다.
  - 변수 선언문 이전에 변수를 참조하면 언제나 undefined 가 반환된다.
- let
  - 중복 선언은 불가능 하지만 , 재할당은 가능하다
- const
  - 중복 선언이 불가능하며 , 재할당 역시 불가능하다.
  - 상수 배열 , 객체 내부 값은 조작할 수 있지만 , 이를 지양하고 있다.

<br />

**`전역 공간에 관하여`**

전역 공간(객체) 이란?

- 전역 공간(객체)은 최상위 공간을 말한다. 브라우저 에선 window obj , NodeJS 에선 global obj 가 전역공간 이다.
- 전역 공간(객체)는 전역 범위에 항상 존재하는 객체를 말한다.

var 와 함수 선언문을 지양해야 하는 이유

```jsx
var foo = "foo";
foo === window.foo; // return true

function greeting() {
  console.log("hi");
}
window.greeting(); // greeting() 을 호출한 것과 동일하게 작동한다.

var setTimeout = "overwirte";

setTimeout(() => {
  console.log("h1");
}, 1000); // Error : setTimeOut is not a function
```

전역 공간(객체) 사용을 최대한 지양 해야 하는 이유

- 어디서나 접근이 가능하기 때문이다. 파일을 나누면 스코프가 나누어진다고 생각할 수 있지만 , 나위어지지 않는다. 따라서 전역 공간에 오염이 생길 수 있다.

어떻게 전역공간 사용을 최소화할 수 있는가?

- 전역 공간(객체) 사용 지양하기
- IIFE (즉시 실행 함수) 사용하기
  [IIFE - 용어 사전 | MDN](https://developer.mozilla.org/ko/docs/Glossary/IIFE)
- let & const 사용 지향하기
- 전역변수 사용 지양하기
- module을 사용하여 각 파일마다 module scope 를 지니게 하기

  [일반스크립트와 모듈스크립트(전역스코프와 모듈스코프)](https://velog.io/@sae1013/%EC%9D%BC%EB%B0%98%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%99%80-%EB%AA%A8%EB%93%88%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%A0%84%EC%97%AD%EC%8A%A4%EC%BD%94%ED%94%84%EC%99%80-%EB%AA%A8%EB%93%88%EC%8A%A4%EC%BD%94%ED%94%84#%EB%AA%A8%EB%93%88%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8)

- Closure

  - **어휘적 범위 지정 (**Lexical scoping**)**

    - 각 함수는 서로의 스코프에 접근할 수 없다는 개념
      아래의 코드를 보면 b()에서 a() 를 호출할 때 b() 내부의 있는 `지역변수 name` 을 참조할 거 같지만 `전역변수 name` 을 참조하였다. 이처럼 각 함수는 서로의 스코프에 접근할 수 없다는 것이 렉시컬 스코핑의 개념이다.

    ```jsx
    var name = "Sangkun";

    function a() {
      console.log(name);
    }

    function b() {
      var name = "han";
      a();
    }

    b(); // return Sangkun
    ```

  - 클로저 (Closure) 란?
    - 외부 함수에 접근할 수 있는 내부 함수 혹은 이러한 원리를 일컫는 용어이다.

**`임시변수 제거하기`**

임시변수란 ?

- 임시적으로 사용되는 변수 혹은 어느 특정 공간에 Scope 안에서 전역변수 처럼 사용되는 변수

임시변수를 지양해야하는 이유는 ?

- 명령형 코드(절차 지향적 코드)가 추가될 수 있다.
  - 명령형 코드를 지양해야 하는 이유는 ?
    - 절차 지향 코드는 개체를 순차적으로 처리하여 프로그램 전체가 유기적으로 연결되어야한다
    - 따라서 어느 한 부분이 고장나면 , 시스템 전체가 고장이난다.
    - 엄격하게 순서가 정해져있어 코드의 순서가 바뀌면 결과가 달라질 확률이 높다.
    - 이러한 이유로 유지보수가 어렵고 , 비효율적이라 판단되어 지양해야 한다.
    - Tip. 절차 지향 코드의 구조는 컴퓨터의 구조와 유사하여 속도가 빠르다는 장점도 있다.

임시변수를 지양 하는 방법 !

- DIY 규칙을 준수한다.
- early return 을 지향한다
- 고차함수를 사용한다
- 선언형 코드(객체 지향적 코드)를 지향한다.

**`호이스팅(Hoisting) 주의하기`**

함수 선언식

- 함수 선언식은 호이스팅의 영향을 받는다.
- 반드시 함수명이 선언되어야 한다.

```jsx
function funcDeclarations(){
	logic...
}
```

함수 표현식

- 다른 변수에 함수를 값으로써 할당하는 것을 함수 표현식 이라고 한다.
- 함수 표현식은 인터프리터가 해당 코드 줄에 도달할때만 로드된다.
- 호이스팅은 되지만 영향을 받지 않는다.
- 함수명을 선언하지 않아도 된다.

```jsx
const funcExpression = function(){
	logic...
}

// or

const funcExpression = (){
	logic...
}
```

호이스팅이란 ?

- 런타임 시 선언과 할당을 분리하여 선언을 최상단으로 끌어 올리는것.

let 과 const 도 호이스팅이 일어나는데 왜 undefined 가 아닌 Error 가 일어나는가 ?

- let 과 const 는 TDZ의 영향을 받기 때문이다.

호이스팅을 지양 하는 방법

- let 과 const 사용을 지향한다.
- 함수 표현식을 지향한다.

<br /><br /><br />

# Section 2. Type Handling

Summary

- Type of Javascript & Type checking
- undefined & null
- unused `Loosely Equality Operator` & use `Strict Equality Operator`
- beware of `Type Casting`
- about `isNaN` function

<br />

## `JS의 타입과 타입 검사`

JavaScript 에서의 타입

- Javascript 는 느슨한 타입의 동적인 언어이다.
- Javascript 의 변수는 어떤 특정 타입과 연결되지 않으며 , 모든 타입의 값으로 할당 및 재할당이 가능하다.
- 변수에 값을 할당하면 JS 엔진은 해당 값이 원시값인지 참조값인지 판단한다.

<br />

`타입 종류`

- JS 언어의 타입은 `원시값`과 `객체(참조값)` 으로 나뉩니다.

  - `원시값`

    - 언어의 **최고 로우레벨**에서 직접 표현되는 **불변** 데이터이다.
    - 객체를 제외한 모든 타입을 불변값(원시값)으로 정의합니다.
    - 예시로는 `Boolean` , `Null` , `Undefined` , `Number` , `BigInt` , `String` , `Symbol` 등 의 타입들이 존재한다.

  <br/>

  - `객체(참조값)`
    - 참조값은 여러 값으로 구성되는 메모리에 저장된 객체이다.
      JS는 메모리 위치에 직접 접근하는것을 허용하지 않아 객체의 메모리 공간을 직접 조작하는것은 불가능하다.
      객체를 조작할 때는 사실 객체 자체가 아니라 해당 객체에 대한 참조를 조작하는 것이다.
      이런 이유로 객체를 가리키는 값은 **_“참조로 접근한다"_** 라고 말한다.

<br />

`타입 검사`

- `typeof operator`

  - typeof 연산자는 피연산자를 평가해서 문자열로 자료형을 반환한다.

<br />

- `instanceof operator`
  - instanceof 연산자는 객체(생성자)의 prototype 속성이 객체의 prototype chain 어딘가에 존재하는지 판별합니다.
  - prototype 의 최상위 객체는 Object 이다. 따라서 어떤 객체를 연산하든 prototype chain 을 타고 올라가보면 최상위 객체는 항상 Object 이기 때문에 타입 검사에 어려움이 생긴다.

<br/><br/><br/>

## `undefined & null`

<br/>

`undefined 와 null`

- `undefeind`
  - undefined 와 null 두 타입 모두 값이 없음을 나타낸다.
  - 기본적으로 값이 할당되지 않은 변수는 undefined 타입이며 , undefined 타입은 변수 자체의 값 또한 undefined 이다.
  - 즉 undefined 는 데이터 타입임과 동시에 값이라는 뜻이다.

<br/>

- `null`

  - null 은 명시적으로 값이 비어있음을 나타내는데 사용한다.
  - **아무것도 참조하고 있지 않다** 라는 의미를 내포하고 있으며 , 주로 변수를 초기화 할 때 많이 사용한다.
  - null 은 데이터 타입임과 동시에 값이다.

    - `typeof Null`

      - null 은 undefined 와 유사하게 타입임과 동시에 값이다. 하지만 null 의 타입검사를 결과는 Object 이다. 이건 JS 에서 인정한 버그이다.

        ```jsx
        typeof null; // result : Object
        ```

      - 그렇다면 null 타입 체크는 어떻게 해야하는가?

        - null 은 타입과 값이 null 이니 타입을 비교하는게 아닌 변수 그 자체와 비교하면 될 것 같다.

        ```jsx
        const operand = null;

        console.log(operand === null); // result : true
        ```

- `Convention`

  - undefined 와 null 은 혼잡한 개념이 많기 때문에 팀 혹은 개인 별 convention 을 정의해놓고 사용하면 혼란을 방지할 수 있다.

<br/><br/><br/>

## `엄격한 동등 연산자(일치 연산자) 사용하기`

JS 에서 동등 연산자는 2가지가 존재한다

`동등 연산자`와 `엄격한 동등 연산자(일치 연산자)` 이다.

- Equality Operator ( == )

  - 동등 연산자는 두개의 피연산자의 값이 동일한지 확인하며 , 결과값을 Boolean 타입으로 반환합니다.
  - 엄격한 동등 연산자(일치 연산자) 와는 다르게 다른 타입의 피연산자들 끼리 비교가 가능하며 , 비교과정에서 형 변환(type casting) 이 일어날 수 있습니다.

    - 타입캐스팅이 일어나면서 예상하지 못한 결과가 나올 수 있다.

      ```jsx
      Ex.console.log(0 == false); // result : true

      console.log("" == false); // result : true
      ```

  - 특징
    - 두 피연산자가 모두 객체일 땐 , 두 피연산자가 동일한 객체를 참조할 때만 true 를 반환합니다.
    - 하나의 피연산자가 null 이고 , 다른 하나의 피연산자가 undefined 일 때 true 를 반환합니다.

- Strict Equality Operator ( === )

  - 일치 연산자는 두개의 피연산자의 타입 & 값이 동일한지 확인하며 , 결과값으로 Boolean 타입으로 반환합니다.
  - 동등 연산자와 다르게 형변환이 일어나지 않습니다.

- 결론
  - 동등 연산자를 사용하게 되면 JS 엔진이 암묵적으로 형 변환을 실행시켜 원하지 않는 결과를 초래할 수 있습니다. 따라서 엄격한 동등 연산자(일치 연산자)를 사용하고 필요 시 명시적으로 형 변환을 해주는 것을 추천드립니다.

<br /><br /><br />

# Section 3. Handling of boundaries

Summary

- min - max
- begin - end
- first - end
- prefix - suffix
- order of parameters

## `들어가기 전에 이 Section에 대한 고찰`

…

## `Min & Max`

- min & max 의 대한 정의가 확실하지 않으면 혼란을 야기할 수 있다.

  - Ex. 만약 팀원중 누군가는 최솟값을 n 이하로 코드를 작성하고 , 다른 누군가는 최솟값을 n 미만으로 작성한다면 동일한 서비스내에 값은 액션을 취해도 다른 결과값이 나오는 결과가 있을수 도 있다.

- min & max 의 대한 컨벤션
  - 정해야하는 컨벤션(규칙)은 초과/미만 & 이상/이하 를 나누는것이다
  - 강의내에선 변수를 선언할 때 네이밍을 다르게 하는것을 추천
    - 초과 , 미만 : MIN_NUMBER_LIMiT , MAX_NUMBER_LIMiT
    - 이상 , 이하 : MIN_IN_NUMBER , MAX_IN_NUMBER
- 순차적으로 처리하는 함수가 있다면 min & max 가 명시적으로 유효성이 있다.

## `Begin & End`

- 고정된 초기값과 유동적인 마지막값인 파라미터들이 있다면 `min & max` 보단
  `begin & end` 를 사용하는 걸 추천한다.

- 비슷하다면 비슷한 개념인데 왜 다른 네이밍을 지향할까?
  - 단순한 네이밍 변경만으로도 코드의 가독성을 올라가기 때문이다.
  - 이미 많은 개발자들이 관습처럼 사용하고 있는 네이밍을 사용하여 가독성을 올릴수 있기 때문이다.

## `First & Last`

- 연속성(규칙성)이 없는 데이터를 처리하는 함수가 있다면 first-last 의 사용을 고려할 수 있다.

## `Prefix & Suffix`

- 함수 혹은 변수의 네이밍을 할 땐 접두사(prefix) 와 접미사(suffix) 를 고려한다.
  어떤 개발자들은 코드를 치는시간보다 네이밍에 시간을 더 쓴다고도 한다.
- prefix 와 suffix 를 왜 고려해야 하는가?

  - 대부분 코드를 볼때 보는것은 변수 or 함수의 이름이고 그 이름들을 가지고 어떤 역할을 하는지 추측한다. 그래서 변수와 함수의 네이밍이 굉장히 중요하다고 느낀다.
    그리고 필자는 네이밍에 영향을 가장 많이 끼치는 부분이 접두사와 접미사라고 생각한다.

- Prefix & Suffix 활용법
  - 변수 : 명사 , 명사구 로 작성한다.
  - 함수 : 동사 , 동사구 ,동사-목적어 패턴으로 작성한다.
  - Prefix
    - 같은 의미의 다른 접두사를 사용하는 것을 지양한다.
    - 표준 접두사(standard Prefix)를 사용하다.
    - Ex. `addUser - createUser` , `deleteUser - removeUser`
  - Suffix
    - 아직 생각나는 개념이 없다. 더 공부하고 채울것

## `Order of parameters is boundaries`

- 파라미터를 생성할 때 순서와 연관성을 고려해야 한다.

- 어떻게 파라미터의 순서의 연관성을 고려하는가?

  - 매개변수가 2개가 넘지 않게 만든다.
    - 함수의 파라미터는 무항인게 가장 좋고 만약 생성해야 한다면 2개 이하로만 생성하는 것을 지향해야 한다.
  - 이미 다수의 파라미터가 생성된 함수가 있다면?
    - 파라미터가 많아지는 등의 상황이 발생하면 함수 이름에 인수를 포함해서 순서 등을 명시해주는 것도 좋다. → 이 내용에 대한 공부 필요 , `cleanCode chapter 3`
    - 파라미터를 객체로 변경하여 넘기는것
    - 랩핑 함수를 만드는것
  - 규칙적이지 않는 매개변수가 들어온다면 `argument` 객체 나 `rest parameter`를 고려한다.

    - argument
      - `arguments` 객체는 모든 함수 내에서 이용 가능한 지역 변수입니다. 
        `arguments` 객체를 사용하여 함수 내에서 모든 인수를 참조할 수 있으며,
        호출할 때 제공한 인수 각각에 대한 항목을 갖고 있습니다. 항목의 인덱스는 0부터 시작합니다.
        `jsx const func = (arg1 , arg2 ,arg3) => { coonsole.log(arguments[0]); coonsole.log(arguments[1]); coonsole.log(arguments[2]); } func(1,2,3) // result : 1,2,3 `
    - rest parameter(나머지 매개변수 , three dot operator)

      - **나머지 매개변수** : 구문을 사용하면 함수가 정해지지 않은 수의 매개변수를 배열로 받을 수 있습니다.

      ```jsx
      const sum = (...restParamter) => {
        return restParamter.reduce((previous, current) => {
          return previous + current;
        });
      };

      sum(1, 2, 3); // result : 6
      sum(1, 2, 3, 4, 5); // result : 15
      ```

# Section 4. Forked Handling

Summary

- Value Expression Statement
- Ternary Condition Operator
- Truthy & Falsy
- Short-circut evoluation
- Beware of using else & else-if statement
- Early Return & condition of negate
- Consider default case
- Using explicit operators
- De Morgan's Law in Javascript

## `Value Expression Statement(값식문)`

- 추후 고차함수 파트에서 한꺼번에 내용을 다룰 예정.
  [값식문에 대해 잘 정리된 velog](https://velog.io/@leebonggu12/JS%EB%B6%84%EA%B8%B0%EB%8B%A4%EB%A3%A8%EA%B8%B0%EA%B0%92%EC%8B%9D%EB%AC%B8)

## `Ternary Condition Operator(삼항 조건 연산자)`

[필자가 참조한 삼항 연산자에 대한 벨로그](https://velog.io/@jangws/7.-%EC%82%BC%ED%95%AD%EC%97%B0%EC%82%B0%EC%9E%90-%EB%8B%A4%EB%A3%A8%EA%B8%B0)

- 삼항연산자란?

  - JS에서 유일하게 3개의 피연산자를 취할 수 있는 연산자이다.

    맨 앞에 조건문이 들어가고 , 그 뒤로 물음표화 조건이 참이라면 실행할 식 , 바로 뒤에 콜론( : ) 이 들어가며 조건이 거짓이라면 실행할 식이 들어간다.

  - 보통 if 명령문의 단축 형태로 사용된다.

  - 사용 예시

    ```jsx
    const getFee = (isMember) => {
      return isMember ? "$2.00" : "$10.00";
    };
    ```

- 삼항연산자를 사용할 땐 명확한 기준에 의한 일관성이 있어야한다.
  - 삼항연산자를 중첩해서 여러번 사용할 경우 가독성이 떨어진다. 분기처리가 많다면 switch 문을 고려하라
  - 삼항연산자를 중첩해서 사용한다면 우선순위를 명확히 알릴 수 있도록 소괄호() 로 감싸라
  - 삼항연산자에 의해 값이 반환되지 않는 함수를 사용하는것은 억지 숏코딩에 불과할 수 있다. 차라리 if 문을 사용하라 -> 조금더 공부 필요(operator 의 본질에 대해 알아보면 되지 않을까?)
  - 삼항연산자는 삼항연산자를 통해 값을 만들고 그 값을 변수로 담아낼 때 사용하는 것이 적절하다.

## `Truthy & Falsy`

- Truthy & Falsy 를 이용하면 if 문 내에 조건을 간단하게 변경할
  수 있다.

- JS는 Boolean 문맥에서 형 변환을 사용한다.

- [about Truthy](https://developer.mozilla.org/ko/docs/Glossary/Truthy)

- [about Falsy](https://developer.mozilla.org/ko/docs/Glossary/Falsy)

## `단축평가 (short-circut evoluation)`

- 단축평가란?

  - 논리 연산의 결과를 결정하는 피연산자를 **타입 변환하지 않고 그대로 반환한다.**
    이를 단축 평가라 한다.
    단축 평가는 표현식을 평가하는 도중에 평가 결과가 확정된 경우 나머지 평가 과정을 생략하는 것을 말한다.

  <br />

- 단축평가 살펴보기

  - 논리 연산자를 사용한 단축 평가

    - `논리합( || )` 혹은 `논리합( && )` 연산자 표현식은 언제나 2개 (혹은 그 이상의) 피연산자 중 어느 한쪽으로 평가된다.
      - 논리곱(&&) 연산자는 두 개의 피연산자가 모두 true 로 평가될 때 true 를 반환하며 , 좌항에서 우항으로 진행된다.
      ```jsx
      console.log(true && false); // result : false
      ```
      - 논리합 연산자는 두개의 피연산자 중 하나만 true 로 평가되어도 true 를 반환하며 , 좌항에서 우항으로 진행된다.

    <br />

  - 옵셔널 체이닝(Optional chaining) 연산자

    - 옵셔널 체이닝 연산자란?
      - ?. 을 사용하여 옵셔널 체이닝 연산자를 선언한다.
      - 옵셔널 체이닝 연산자는 좌항의 피연선자가 null or undefined 인 경우 undefined 를 반환하고 , 그렇지 않으면 우항으 프로퍼티 참조를 이어간다.

  - Null 병합 연산자 (Nullish coalescing operator)
    - null 병합 연산자란?
      - ?? 을 사용 null 병합 연산자를 선언한다.
      - 왼쪽 피연산자가 null 혹은 undefined 일 때 오른쪽 피연산자를 반환하고 ,
        그렇지 않다면 왼쪽 피연산자를 반환한다.
      - 주의점 : falsy 와 nullish 중 어떠한것을 사용하용해야할 지 고민하지 않고 nullish operator 만 사용하는 것을 지양해야 한다.

## `else / else if 피하기`

- else , else-if 의 사용을 지양해야 하는 이유

  - 변경, 확장이 될수록 코드가 복잡해져서 수정할 위치를 찾기가 어렵다.
  - 실수로 추가하지 않고 누락하는 경우가 생긴다. 즉, 유지보수가 점점 어려워진다.
  - 하나의 함수가 2가지의 기능을 할 때 else 문을 사용하면 원하지 않는 결과가 도출될 수 있다.

<br />

- else , else-if 를 지양하는 방법
  - **while , switch** 으로 변경하여 사용하라
  - if 문으로 작게 쪼개서 else-if 문을 피하라
  - early return 을 사용하라

<br />

## `Early Return 과 부정 조건문`

- early return이란?

  - early return 는 함수를 작성하는 방식으로, 예상되는 긍정 결과가 함수의 끝에서 리턴되게 하고
    조건이 맞지 않는 경우 나머지 코드는 (예외를 return 하거나 throw해서) 실행을 종료한다.

  - early return 을 사용하면 장점
    - 들여쓰기의 깊이가 줄어들어 코드를 더욱 읽기 쉽게 만든다.
    - 코드를 읽을 때 return 을 발견하면 더 아래쪽 코드를 확인하지 않아도 된다.
    - 코드의 더 아래쪽에서 의도하지 않는 값의 변화를 방지할 수 있다.

- 부정 조건문

  - 부정조건문이란?
  - 말 그대로 조건문 내의 값의 (boolean 타입) 반대값을 의미한다.
  - 부정조건문을 지양해야 하는 이유 - 부정 조건문을 사용하면 생각을 거꾸로 해야되는 경우가 있어서 코드를 읽는데 혼란을 야기하기 쉽다.
  - ```jsx
    <예시>

    !isNaN;
    isNotNaN;
    !isEmpty;
    isNotEmpty;
    ```

  - 부정조건문을 사용하는 경우
    - early return 을 사용하는 경우
    - 보안 혹은 검사 로직을 구현하는 경우

  <br />

## `Default Case 고려하기`

- 사용자의 실수를 예방하기 위해 Default Case를 고려하는 의식적인 노력이 필요하다.

  함수에서 들어와야 할 인수가 전달되지 않을 경우 OR 연산자 혹은 기본값 매개변수(default function parameter)를 사용하여 안전하게 Default 값을 미리 설정해두는 방법이 권장된다.

  예시

  ```jsx
  // OR 연산자를 사용하여 기본값을 설정하는 경우
  function multiply(a, b) {
    a = 3;
    return a * b || 10; // result : 30
  }

  // 기본값 매개변수를 사용하여 기본값을 설정하는 경우
  function multiply(a, b = 10) {
    a = 3;
    return a * b; // result : 30
  }
  ```

<br />

## `명시적인 연산자 사용 지향하기`

- 연산자를 사용할 땐 명시적으로 사용하는 것을 지향해야 한다.

  - 여기서 명시적이란 누가봐도 결과를 예측하기 쉽고 디버깅하기 쉬운 코드를 의미한다.

  - 명시적으로 표현을 하면 분기처리하기 쉬워지고 가독성이 올라간다.

  - 다중으로 연산자를 사용하였을 때 소괄호() 로 표기해주면 명시적으로 보여진다.

    ```jsx
    x + y * 3 - z(x + y) * (3 - z);
    ```

  - 전위연산자나 후위연산자를 지양하는것이 코드의 가독성을 올려준다.

<br />

## `드모르간의 법칙`

- 드모르간 법칙이란?

  - 논리학과 수학의 법칙 중 하나이다. 논리 연산에서 논리합은 논리곱과 부정기호로, 논리곱은 논리합과 부정기호로 표현할 수 있음을 가리키는 법칙이다.

  - 수학적인 표현식

    ```jsx
    not (A or B)=(not A) and (not B)
    not (A and B)=(not A) or (not B)
    ```

  - JS에서의 표현식

    ```jsx
    !(A || B) = !A && !B
    !(A and B) = !A || !B
    ```

  - 드모르간의 법칙은 논리연산자를 사용할 때 적용된다.

    만약 논리연사자를 사용할 때 논리연산자를 감싸여 부정연산자를 넣는 경우 아래와 같은 로직이 나온다.

    이때 조건문에 더 많은 조건이 추가되면 가독성이 떨어지고 유지보수가 어려워지게 된다.

    따라서 이와같은 상황에선 드로므간 법칙을 사용하는 것을 추천한다.

    ```jsx
      // 드모르간 법칙 적용 전
        if( !(isValid && isRegister) ){
        something..
      }


      // 드모르간 법칙 적용 후
      if( !isValid || !isRegister) {
        something..
      }
    ```

<br /><br /><br />

# Section 5. Array Handling

Summary

- Array is object in javascript
- Array.length
- Accessing Array Elements
- Similar Array Objects
- Immutability
- Refactoring `for loop statement` to high-order function

  → [Github](https://github.com/Sangkun-svg/cleanCode-Javascript/blob/master/Section%205.%20Array%20Handling/usingHighOrderFunction.js) Section 5. usingHighOrderFunction file 참고

- Using method chaining in array

  → [Github](https://github.com/Sangkun-svg/cleanCode-Javascript/blob/master/Section%205.%20Array%20Handling/usingHighOrderFunction.js) Section 5. usingHighOrderFunction file 참고

- Map vs for-each

<br />

## `Array is object in javascript`

- Javascript 에서는 배열도 객체이다.

  조금 특별한 형태의 객체라고 할 수 있다.

  다른 프로그래밍 언어에서의 배열과 비슷하게 동작한다.

- 배열을 확인하는 방법

  - Array.isArray() : 자바스크립트 객체가 배열인지 정확히 판별하는 방법

<br />

## `Array.length`

- `Array.length` 는 배열의 길이를 반환한다.

  아무 때나 `length` 속성에 값을 설정해 배열을 절단할 수 있다.

  `length` 속성으로 배열의 길이를 늘리면 실제 원소의 수가 증가하고 , 추가된 요소에는 `undefined` 가 할당된다.

  따라서 함부로 배열의 길이를 수정하는 것은 주의해야 한다.

  ```jsx
  const arr = [1,2,3]
  console.log(arr.length) // result : 3

  arr.length = 10
  console.log(arr.length) // result : 10
                          // arr [1,2,3, , , , , , , ]

  -- another --

  const arr = [1,2,3]
  arr[3] = 4 // arr : [1,2,3,4]

  arr[9] = 10 // arr : [1,2,3,4, , , , , ,10]
  console.log(arr.length) // result : 10
  ```

  <br />

## `Accessing Array Elements`

- `구조 분해 할당` 이란?

  - `배열[]`이나 `객체{}`의 속성을 해체하여 그 값을 개별 변수에 담을 수 있게 하는 JavaScript 표현식이다

- 배열 요소에 접근할 때는 `arr[index]` 의 형식으로 접근해야한다.

  하지만 이렇게 요소에 접근하면 해당 인덱스가 무엇을 의미하는지 파악하기 어려워 가독성이 떨어진다.

  배열을 구조분해 할당하여 해당 배열 요소의 역할을 명시적으로 표현하면 가독성을 높일 수 있다.

  이 방식은 함수의 매개변수로 받을 때도 가능하다 .

  ```jsx
  const arr = [ 1, 2, 3]
  const [firstIndex, SecondIndex] = arr
  console.log(firstIndex , SecondIndex) // result : 1 ,2

      // 함수의 매개변수로 배열을 받을 때
      const testFunc = ([firstIndex , secondIndex] , name) => {
      	console.log(firstIndex., secondIndex, name);
      };

      testFunc(arr , "sangkun"); // result : 1, 2, "sangkun"
  ```

- 혹은 util 라이브러리를 사용하는 방법도 있다. Ex. lodash

<br />

## `Similar Array Objects`

- 유사 배열 객체란?

  - 유사배열객체는 배열처럼 length 프로퍼티를 갖고 있지만 배열이 아닌 객체이다.

  - argument 는 Js 함수 내부에서 가지고 있는 유사 배열 객체 중 대표 사례이다.

    <br />

## `Immutability`

- immutable vs mutable

  - Js 에서는 불변성을 유지하는 값들과 그렇지 않은 값들이 나누어져 있다.

    `Boolean`, `Number`, `String`, `null`, `undefined`, `Symbol` 과 같은 타입들은 불변성을 유지하는 타입들이고 `Object`타입들은 변경가능한 값이다.

    즉 , 객체는 객체 내부의 값을 변경하면 객체를 참조하고 있는 다른 값들도 다 같이 변경된다는 의미이다.

- 불변성이란?

  - Js 에서는 불변성이란 객체가 생성된 이후 그 `상태`를 변경할 수 없는 것을 의미한다.

    여기서 `상태`를 변경할 수 있는 것과 `값을 재할당하는 것`은 **_다르다_** 는 것을 알아야한다.

- 배열의 불변성을 지키는 방법

  - 스프레드 연산자(three dot operator)를 활용한다.
  - 새로운 배열을 반환하는 함수를 활용한다. - filter , map , slice , 등등..
  - `immer` 라이브러리를 사용한다
    - `immer` 란? : 편리한 방법으로 불변의 상태로 일할 수 있게 해주는 패키지이다.

  [Reference](https://velog.io/@co_mong/JS-%EB%B6%88%EB%B3%80%EC%84%B1Immutability)

    <br />

## `Map vs for-each statement`

- map 과 for-each 의차이점

  - return 의 유무
    - `for-each` 의 반환값은 undefined 이다.
      따라서 요소에 따라 함수만을 실행시켜야 할 때 사용하는 것을 추천한다.
    - `map` 의 반환값은 새로운 배열이다.
      따라서 요소에 따라 원본 객체를 수정하지 않고 새로운 객체를 반환해야할 때 사용하는 것을 추천한다.

<br /><br /><br />

# Section 6. Object Handling

Summary

- Shorthand Properties
- Computed Property name
- Lookup table
- Object desrtucturing
- Object.freeze
- beware of handling of Prototype
- Has own property
- ~~Optional chaining~~ **Creating..**
- ~~Extends & Mixin~~ **Creating..**

<br />

## `Shorthand Properties`

[단축 속성 - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/ko/docs/Web/CSS/Shorthand_properties)

- Shorthand Properties(단축 속성) 란?

  - **단축 속성**은 서로 다른 여러 가지 CSS 속성의 값을 지정할 수 있는 CSS 속성이다.
    단축 속성을 사용하면 간결하고 가독성이 높은 코드를 작성할 수 있다.
  - JS에서의 shorthand properties 사용하기

    - 키나 메서드(concise method)를 축약하여 사용할 수 있다.
    - 예시

      ```jsx
      CSS

      background-color: red;
      background-url : images/bg.gif
      background-repeat : no-repeat
      background-position : top right

      refactor...

      background-color: red;
      background: url(images/bg.gif) no-repeat top right;

      /--------------/

      JS

      const firstName = 'popo'
      const lastName = 'coco'

      const person = {
      	firstName : 'popo',
      	lastName : 'coco',
      	getFullName : function(){
      		return this.firstName + ' ' + this.lastName
      	}
      }

      refactor..

      const person = {
      	firstName,
      	lastName,
      	getFullName (){
      		return this.firstName + ' ' + this.lastName
      	}
      }
      ```

<br />

## `Computed Property name`

- computed property name은 표현식을 이용해 객체의 key 값을 정의하는 문법이다.

- 예시

  ```jsx
  const [state, setState] = useState({
    id: "",
    password: "",
  });

  const handleChange = (e) => {
    const {
      target: { value, name },
    } = e;
    setState({
      [name]: value,
    });
  };

  return (
    <>
      <input value={state.id} name="name" onChange={handleChange} />
      <input value={state.password} name="password" onChange={handleChange} />
    </>
  );
  ```

<br />

## `Object Lookup table`

배열 데이터 구조에서 키와 값으로 관리된 배열이 나열된 형태를 뜻한다.

js 의 computed properties name 을 활용해 분기문을 줄일수 있음.

switch 문이 길어질때 사용해보면 좋음

- 예시

  ```jsx
  const getUserType = (type) => {
    if (type === "Admin") {
      return "관리자";
    } else if (type === "Instructor") {
      return "강사";
    } else if (type === "Student") {
      return "학생";
    } else {
      return "none";
    }
  };

  // Refactor..

  const getUserType2 = (type) => {
    const USER_TYPE = {
      Admin: "관리자",
      Instructor: "강사",
      Student: "학생",
      None: "정보없음",
    };
    return USER_TYPE[type] ?? USER_TYPE.None;
  };
  ```

<br />

## `Object desrtucturing`

객체 구조분해할당

필수값에 대한 옵션처리

배열을 객체로 구조분해할당하기

```jsx
const orders = ['first' , 'second' , 'third'];

const start = orders[0]
const end = orders[2]

/--/

const {0: start , 2: end} = orders
start // result : 'first'
end // result : 'third'
```

<br />

## `Object.freeze`

- object.freeze란 ?
  : 사용하면 인자 안에 객체를 동결한다.
- object.isFrozen이란?
  : 동결이 잘되었는지 확인
- Shallow copy vs deep copy
  - freeze도 깊은 영역에 대해선 관여를 못한다.
  - 중접된 freezing 을 해줘야한다.
    - how ?
      - 대중적인 라이브러리 → lodash
      - 직접 유틸함수 생성 → 1. 객체 순회 2. 순회하며 객체인지 확인 3. 객체이면 재귀 4. 그렇지 않으면 Obj.freeze
      - typescript 에서 readonly 사용

<br />

## `beware of handling Prototype`

prototype 조작을 지양한다.

이미 JS는 많이 발전햇다.

JS 빌트인 객체는 건들지 말자.

<br />

## `Has own property`

프로퍼티를 가졌는지를 확인하는 빌트인 함수

```jsx
const person = {
  name: "Sangkun",
  age: 23,
};

person.hasOwnProperty("name"); // true
person.hasOwnProperty("age"); // true
person.hasOwnProperty("job"); // false
```

hasOwnProperty 를 사용햇을 때 다른 키워드와 겹쳐져 사용될 수 있어서 객체의 prototype 의 call 메서드를 활용한 다음에 사용을 해야 안전하게 사용할 수 있음

```jsx
const foo = {
  hasOwnProperty() {
    return "hasOwnProperty";
  },
  bar: "bar",
};

foo.hasOwnProperty(bar); // result : hasOwnProperty
Object.prototype.hasOwnProperty.call(foo, "bar"); // result : true
```

<br />

## `beware of 직접 접근`

추상화에 대한 내용

<br /><br /><br />

# Section 7. Function Handling

Summary

- Function , Method , Constructor
- Argument & parameter
- management complex parameter 복잡한 인자 관리
- Default Value
- Rest parameter
- void & return
- arrow function
- Callback function
- pure function
- Closure

<br />

## `Function , Method , Constructor`

- 함수
  - 1급 객체로 작동하기 때문에 변수나 데이터에 담을 수 있다.
  - 매개변수로 전달이 가능하다. (콜백함수)
  - 함수가 함수를 반환한다.(고차함수)
- 메서드
  - 메서드란?
    - 객체의 프로퍼티에 할당된 함수 혹은 객체의 의존성이 있는 함수이다.
  - OOP 행동을 의미한다.
- 생성자 함수
  - 생성자 함수는 일반 함수와 기술적인 차이는 없지만 생성자 함수는 아래 두 관례를 따른다.
    - 함수 이름의 첫 글자는 대문자로 시작합니다.
    - 반드시 `'new'` 연산자를 붙여 실행합니다.


<br />

## `Argument & parameter`

- parameter : 함수를 정의하는 측면에서 인자는 parameter , 매개변수라고 칭한다.
- argument : 실제로 사용되는 측면에서의 인자는 argument , 인자 라고 칭한다.

[Parameter - MDN Web Docs Glossary: Definitions of Web-related terms | MDN](https://developer.mozilla.org/en-US/docs/Glossary/Parameter)

<br />

## `management complex parameter`

복잡한 인자를 관리하는 방법

- 무조건적으로 인자의 갯수를 줄이는 것 보단 맥락에 따라 인자를 설정하는것이 중요하다.
- 구조분해 할당을 사용하는 것이 좋다.
- 함수와 파라미터를 명시적으로 작성해야 한다.


<br />

## `Default Value`

- 들어오는 객체 인자가 없을 때 객체를 뱉는 방법

  ```jsx
  const addNum = (x = 0, y = 0) => {
    return x + y;
  };

  generatePoint(); // result : 0
  generatePoint(2, 5); // result : 7
  ```

  <br />

## `Rest parameter`

- rest parameter 란?
  - 나머지 매개변수를 뜻한다. ≠ 스프레드 연산자랑 다른 개념이니 혼동을 주의해야 한다.
  - 나머지 매개변수는 `생략 접두사(...)` 를 사용하여 특정 위치의 인수부터 마지막 인수까지를 한 번에 지정할 수 있습니다.
  - 나머지 매개변수는 항상 인자의 마지막 순서로 위치해야한다.
  - 나머지 매개변수는 배열로 판별된다.
    ```jsx
    const someFunc = (first, ...args) => {
      Array.isArray(args); // result true
    };
    ```

<br />

## `void & return`

- void 란?
  - return 이 불필요한 함수( void func )에 return 을 사용하는 것을 지양해야 한다.
  - 함수명으로 반환값을 유추할 수도 있으니 네이밍에 신경을 써야한다.

<br />

## `arrow function`

- 내부에서 arguments, call, apply, bind 함수 사용이 불가능하다.
- 화살표 함수는 자신을 둘러싸고 있는 상위 환경의 this 를 그대로 계승하는 `Lexical this`를 따른다.
- 생성자로 사용할 수 없다.
- 메소드를 화살표 함수로 작성한다면, this 는 상위 환경의 this 를 계승하므로 전역 객체를 가리키게 된다.
  하지만 본래 의도는 person 객체를 가리키는 것이었으므로 결과적으로 부자연스러운 동작이 된다.

* 메서드를 prototype 에 할당해도 동일한 문제가 발생한다.

  ```jsx
  // method를 arrow function 으로 할당 할 경우
  const person = {
    name: "Sangkun",
    sayHi: () => {
      console.log(`Hi , ${this.name}`);
    },
  };

  person.sayHi(); // result : Hi , undefined

  //------//

  // prototype 에 method를 arrow function으로 할당 할 경우
  const person = {
    name: "Sangkun",
  };
  Object.prototype.sayHi = () => console.log(`Hi ! ${this.name}`);
  person.sayHi(); // result : Hi ! undefined
  ```


<br />

## `Callback function`

- 콜백함수란?

  - JS의 비동기 처리를 하는 하나의 패턴이다.
  - 콜백함수는 함수의 실행권을 다른 함수에 위임한다고 말할수도 있음.
  - 콜백함수를 넘길 땐 함수를 실행시키지 않고 함수 그대로를 넘겨야한다.

    ```jsx
    Ex

    // bad
      function Func();
      showModal("Message" , Func()); // 실행시켜서 넘긴 경우

    // good
      function Func();
      showModal("Message" , Func); // 실행시키지 않고 함수 자체를 넘긴 경우
    ```


<br />

## `pure function`

- 순수함수란 ?

  - 동일한 인자가 전달되면 항상 동일한 결과를 반환하는 함수(코드 블록)이다. 즉 , input 이 동일하면 output 도 동일한 함수이다.
  - 순수함수는 side effect 를 일으키지 않는다.

- 순수 함수를 만들기 위해 지향해야 할 점
  - 함수의 실행 순서에 영향을 받지 않아야 한다.
  - 조합성(재사용성)이 높아야 한다.
    - 순수함수는 예측이 가능한 결과를 반환하기 때문에 다른 함수들과 조합해서 사용하기 용이해야한다.
  - 함수 외부의 어떤 데이터도 변경 시키지 않아야한다.


<br />

## `Closure`

클로져란?

왜 사용하는지

장단점이 무엇인지

메모리와 관련이 되었는지

memorization code 작성해보기


[Closure | PoiemaWeb](https://poiemaweb.com/js-closure)

