const getRandomNumber = (min = 0, max = 0) => Math.random() * (max - min) + min;

const getRandomIntInclusive = (min = 0, max = 0) => Math.floor(getRandomNumber(min, max + 1));

const getRandomDecimalPlace = (min = 0, max = 0, decimalPlaceNumber = 0) => Number(getRandomNumber(min, max).toFixed(decimalPlaceNumber));

getRandomIntInclusive(1, 3);
getRandomDecimalPlace(1.1, 1.2, 1);
