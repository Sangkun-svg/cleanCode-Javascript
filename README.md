# cleanCode-Javascript

## Udemy 의 클린코드 자바스크립트 강의를 토대로 공부하고 기록하는 레파지토리입니다.

lecture : https://www.udemy.com/course/clean-code-js/

### 변수 다르기

#### var를 지양하자

Tips. 1. let , const 는 es5 부터 생김

    [summery]
    var 는  function scope 를 가진다
    let & const 는 block scrope 을 가지고 , TDZ(temporal Dead Zone) 이라는 속성을 가진다 -> 안전한 코드를 작성할 수 있음

    var 는 재할당 , 재선언이 가능하다.
    let 은 재할당이 가능하지만 , 재선언은 불가능하다.
    const 는 재할당 , 재선언이 불가능하다. 오직 선언과 동시에 초기화 & 할당이 이루어져야한다.
          객체나 배열 값 조작은 가능. 하지만 JS 에선 이를 지양하고 있다.

    scope
    var 가 가지는 [function scope] 란?
    let & const 가 가지는 [block scope] 란?
    더 나아가기
    scope chain :

### 전역 공간에 관하여

(var 를 이용한) 전역공간 사용을 지양해야 하는 이유
전역공간 -> window || global
window : in browser
global || window : in nodejs

ex ] var 로 setTimeout 이라는 변수를 선언 시 built in 메서드인 setTimeout() 을 사용할 수 없게 된다.
아마 overwrite(덮어쓰기)가 진행되어서 그런듯

     어떻게 전역공간 사용을 최소화할 수 있는가?
     IIFE
     Module
     Closure
     let & const

     요약
     : 전역공간을 더럽히지 말자 = 사용을 지양하자
        이유는 ?
            ->전역객체를 이용해 어디서나 접근이 가능해지기 때문이다.
        어떻게 해야 하나?
            -> 전역변수를 만들지 않는다
            -> 지역변수 사용을 지향한다
            -> window.global 을 조작하지 않는다
            -> let & const 사용을 지향한다.
            -> IIFE, Module , Closure

### 임시변수 제거하기

임시변수란 ?
-> 어느 특정 공간에 Scope 안에서 전역변수 처럼 사용되는 변수
Ex. 임시 객체도 함수 스코프가 커지면 전역변수와 다름없다.

    1. 함수를 작게 쪼갠다. -> DIY 법칙을 준수한다.
    2. return 을 바로 사용
    3. 고차함수를 사용한다 Ex. map , filter , reduce 등..
    4. 선언형 코드로 바꿔보는 연습 추천

### 호이스팅(Hoisting) 주의하기

호이스팅이란 ?
런타임 시 선언과 할당을 분리하여 선언을 최상단으로 끌어 올리는것. -> 코드를 작성할 때 예측하지 못한 결과가 나올 수 있음.  
var 로 선언한 변수가 초기화되지 않은 상태로 스코프 최 상단에 끌어올려지는 것.
함수도 Hoisting 이 된다.

호이스팅을 탈피 하는법

- 변수 선언 , 초기화 , 할당을 동시에 하면 분리가 된다.
- var 를 사용하지 않는다 = let 과 const 를 사용한다.
- 함수 표현식을 사용한다.

함수 표현식 [추천]
함수 선언문
