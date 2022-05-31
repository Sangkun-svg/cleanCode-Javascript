const MIN_NUMBER = 1;
const MAX_NUMBER = 45;
const { floor, random } = Math;

const generateRandomNumber = (min, max) => {
  const result = floor(random() * (max - min + 1)) + min;
  console.log(result);
  return result;
};

generateRandomNumber(MIN_NUMBER, MAX_NUMBER);
