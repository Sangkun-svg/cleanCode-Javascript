# cleanCode-Javascript

## Udemy 의 클린코드 자바스크립트 강의를 토대로 공부하고 기록하고 공부하는 repo 입니다.

<br />
Lecture : https://www.udemy.com/course/clean-code-js/

<br />

[더 자세한 설명이 있는 Notion](https://root-dugout-9ef.notion.site/CleanCode-Javascript-7f2e1a0a443d4e719e05aeefb7ba244f)

# Section 1. About Variable

# 변수 다루기

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
  - 임의로 생성해보는 컨벤션

  ```jsx

  ```

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

## `min - max`

min 과 max 의 대한 경게가 애매할 수 있다

= 최솟값 , 최대값이 포함되는지에 대한 경계가 애매할 수 있음;

min과 max 를 다룰 때 이상,이하로 다루는지 초과,미만으로 다루는지 정해놔야 한다.

혹은 네이밍에 값의 포함여부를 표현할 수 있는 컨벤션을 만드는것도 좋다

- Ex.

  - 포함되는 경우: const MIN_IN_NUMBER
  - 포함되지 않는 경우: const MIN_NUMBER_LIMIT

## `begin - end`

이 강의가 전하고자 하는 내용을 이해하지 못했다.

조금 더 찾아보고 다시 공부하여 수정해놓을것이다.

## `first - last`

순차적으로 처리하는 함수가 있다고 할 때 min-max 가 명시적으로 유효형이 있다.

연속성(규칙성)이 없는 데이터를 처리하는 함수가 있다면 first-last 의 사용을 고려할 수 있다.

## `prefix - suffix`

함수 or 변수에 대한 네이밍 컨벤션에 대한 내용

예시

getter setter

react hooks

## `매개변수의 순서가 경계다`

호출하는 함수의 네이밍과 인자의 순서의 연관성을 고려하는 방법

- 매개변수가 2개가 넘지 않게 만든다

- 규칙적이지 않는 매개변수가 들어온다면 argument 객체 나 rest parameter를 고려한다.

- 이미만든 함수가 있다면 랩핑하는 함수를 만든다.

- 만약 파라미터가 많아진다면 객체로 넘긴다

클린코드에서의 매개변수 내용과 연관지어 기록하기

# Section 4. Forked Handling

## `값식문`

[값식문에 대해 잘 정리된 velog](https://velog.io/@leebonggu12/JS%EB%B6%84%EA%B8%B0%EB%8B%A4%EB%A3%A8%EA%B8%B0%EA%B0%92%EC%8B%9D%EB%AC%B8)

## `삼항연산자`

삼항연산자를 사용할 땐 일관성이 중요하다고 생각

삼항연산자는 3개의 피연산자를 필요로 한다

삼항연산자를 상ㅇ해서 값을 만들고 변수로 담아내거나 , 함수가 내뱉는 값이 바로 값을 내뱉는다면 사용함

https://velog.io/@jangws/7.-%EC%82%BC%ED%95%AD%EC%97%B0%EC%82%B0%EC%9E%90-%EB%8B%A4%EB%A3%A8%EA%B8%B0

## `Truthy & Falsy`

Truthy : https://developer.mozilla.org/ko/docs/Glossary/Truthy

Falsy : https://developer.mozilla.org/ko/docs/Glossary/Falsy

굉장히 유용함

## `단축평가 (short-circut evoluation)`

단축평가란?

OR operator 와 AND operator 의 단축평가

논리연산자만 잘 사용해도 코드가 줄어들고 , 가독성이 높아진다.

강의를 다시 보면서 코드 작성해보기
