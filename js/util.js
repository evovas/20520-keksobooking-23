const getRandomNumber = (min = 0, max = 0) => Math.random() * (max - min) + min;

const getRandomInt = (min = 0, max = 0) => Math.floor(getRandomNumber(min, max + 1));

const getRandomDecimalPlace = (min = 0, max = 0, decimalPlaceNumber = 0) => getRandomNumber(parseFloat(min), parseFloat(max)).toFixed(decimalPlaceNumber);

const getRandomElement = (array) => array[getRandomInt(0, array.length - 1)];

const getRandomElements = (array = [], count = 0) => {
  const randomElements = new Set();
  if (count && array.length !== 0) {
    for (let ind = 0; ind < count; ind++) {
      randomElements.add(getRandomElement(array));
    }
  }
  return Array.from(randomElements);
};

const getIntWithLeadingZeros = (number) => number < 10 ? `0${number}` : number;

const createElementWithClasses = (tag, ...classNames) => {
  const element = document.createElement(tag);
  classNames.forEach((className) => element.classList.add(className));
  return element;
};

export {getRandomInt, getRandomDecimalPlace, getRandomElement, getRandomElements, getIntWithLeadingZeros, createElementWithClasses};
