const arr = [1, 2, 3];

console.log(arr.length); // result : 3

arr.length = 10;

console.log(arr.length); // result : 10
console.log(arr); // arr [1,2,3, , , , , , , ]

// ------------------- //

const arr2 = [1, 2, 3];
arr2[3] = 4;
console.log(arr2); // arr2 : [1,2,3,4]

arr2[9] = 10;
console.log(arr2); // arr2 : [1,2,3,4, , , , , ,10]
console.log(arr2.length); // result : 10
