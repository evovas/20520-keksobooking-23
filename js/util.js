const successTemplate = document.querySelector('#success');
const errorTemplate = document.querySelector('#error');

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

const isEscEvent = (evt) => evt.key === 'Esc' || evt.key === 'Escape';

const onEscKeyDownMessage = (evt) => {
  if (isEscEvent(evt)) {
    const message = document.querySelector('.success') || document.querySelector('.error');
    message.remove();
    document.removeEventListener('keydown', onEscKeyDownMessage);
  }
};

const onClickMessage = () => {
  const message = document.querySelector('.success') || document.querySelector('.error');
  message.remove();
  document.removeEventListener('keydown', onEscKeyDownMessage);
};

const showMessage = (template, message) => {
  const messageParagraph = template.querySelector('p');
  messageParagraph.textContent = message;
  template.addEventListener('click', onClickMessage);
  document.addEventListener('keydown', onEscKeyDownMessage);
  document.body.appendChild(template);
};

const showSuccessMessage = (message) => {
  showMessage(successTemplate.content.querySelector('div').cloneNode(true), message);
};

const showErrorMessage = (message) => {
  showMessage(errorTemplate.content.querySelector('div').cloneNode(true), message);
};

export {getRandomInt,
  getRandomDecimalPlace,
  getRandomElement,
  getRandomElements,
  getIntWithLeadingZeros,
  createElementWithClasses,
  isEscEvent,
  showSuccessMessage,
  showErrorMessage};
