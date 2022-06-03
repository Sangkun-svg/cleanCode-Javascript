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
            ```jsx
            const func = (arg1 , arg2 ,arg3) => {
            	coonsole.log(arguments[0]);
            	coonsole.log(arguments[1]);
            	coonsole.log(arguments[2]);
            }
            func(1,2,3)
            // result : 1,2,3
            ```
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

## `else / else if 피하기`

else if 문을 사용하는 경우는 조건에 대해서 명확함이 없는 상황일 경우가 큼

else if 를 최대한 지향하고 swich 문으로 변환하는걸 추천

아니먄 if 블록으로 쪼개서 else if 를 사용하지 않는방법도 있음

else 문을 한번만 사용할 경우는 사실 else에 필요도가 optional 한 경우이기 때문에 생략하여 가독성을 높이는걸 추천

하나의 함수가 2가지의 기능을 할 때 else 문을 사용하면 원하지 않는 결과가 도출될 수 있다.

## `Early Return 과 부정 조건문 지양(beware of condition statement of negate )`

early return 을 사용하여 의존성을 끊을 수 있다.

부정조건문을 지양하는 이유

- 생각을 여러번 해야할 수 있다.

부정조건은 언제 사용하나?

- early return 을 사용할 때
- 보안 혹은 검사하는 로직일 때

## `Default Case( Edge Case ) 고려하기`

[엣지케이스에 관하여...](https://bakyeono.net/post/2015-05-02-edge-case-corner-case.html)

## `명시적인 연산자 사용 지향하기`

예측 가능하고 디버깅 하기 쉬운 코드를 짜기 위해 노력하자

분기처리를 작성할 때도 도움이 많이 된다.

연산자의 우선순위를 잘 판단하기 위해 () 로 표기해주면 가독성을 높일 수 있다.

전위 연산자와 후위 연산자도 지양하는것이 좋음

## `Nullish coalescing operator( null 병합 연산자 )`

정의 : null 과 undefined 만 필터링한다.
단점 : falsy 와 nullish 중 어떠한것을 사용하용해야할 지 고민하지 않고 nullish operator 만 사용할 수도 있음.

[MDN Nullish coalescing operator](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)
[Mordern Javascript Nullish coalescing operator](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)

주의점

## `드모르간의 법칙`

수학적인 표현식

```
not (A or B)=(not A) and (not B)
not (A and B)=(not A) or (not B)
```

JS에서의 표현식

```
!(A || B) = !A && !B
!(A and B) = !A || !B
```
