// var :  재할당과 재선언(중복선언)을 할 수 있다.
console.log(nameVar); // if you want why this console.log() is working then recommanded learn about Hoisting

var nameVar = "name";
var nameVar = "name2";
var nameVar = "name3";

console.log(nameVar);

// let : 재선언 불가능 , 재할당 가능
let name = "name";
// let name = "rename"
// -> ERR : Cannot redeclare block-scope variable [same variable name = "name"]
// -> 블록 스코프 안에서 같은 이름을 재선언 할 수 없다는 에러가 나온다.
console.log(name);
name = "name2";
console.log(name);
name = "name3";
console.log(name);

// const : 재선언 & 재할당 불가능 오로지 선언과 동시에 초기화 와 할당이 이루어져야함
const nameConst = "name";
// nameConst = "renamed"; ERR : 상수 변수엔 할당 할 수 없다는 에러가 나온다.
