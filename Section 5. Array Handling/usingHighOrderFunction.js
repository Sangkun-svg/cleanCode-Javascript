/**
 *  배열 고차 함수

    1. 원화 표기
 */

const price = [2000, 1000, 3000, 5000, 4000];
let orderType;
const getWonPrice = (priceList) => {
  let temp = [];
  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i] > 1000) {
      temp.push(priceList[i] + "원");
    }
  }

  if (orderType === "ACENDING") {
    someAcendingSortFunc();
  }

  if (orderType === "DESCENDING") {
    someDesendingSortFunc();
  }

  return temp;
};

console.log(getWonPrice(price));

const suffixWon = (price) => price + "원";
const isOverOneThousand = (price) => Number(price) > 1000;
const ascendingList = (a, b) => a - b;

const getWonPrice2 = (priceList) => {
  return priceList
    .filter(isOverOneThousand) // 조건에 맞는 요소들을 골라서
    .sort(ascendingList) // 정렬을 하고
    .map(suffixWon); // 접미사를 붙여준다
};

console.log(getWonPrice2(price));
