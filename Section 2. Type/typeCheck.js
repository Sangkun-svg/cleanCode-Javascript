// TODO: generate custom type check function
// reference StackOverFlow

const stringVal = "It is String";
const numberVal = 100;

const isString = (stringValue) => {
  //  stringValue instanceof String ➜ result : false
  //  prototype chain 을 확인하고 undefined 를 찾는다.
  if (typeof stringValue === "string") {
    return console.log("is String !");
  } else {
    return console.log("is not String !");
  }
};

const isNumber = (numberValue) => {
  if (typeof numberValue === "number" && !Number.isNaN(numberValue)) {
    return console.log("is Number !");
  } else {
    return console.log("is not Number !");
  }
};

isString(stringVal);
isString(Number(stringVal));

isNumber(numberVal);
isNumber(String(numberVal));

/* expect result  
  is String !
  is not String !
  is Number !
  is not Number !
*/
