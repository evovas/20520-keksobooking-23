const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;
const NOT_FOR_GUESTS_ROOMS = 100;
const NOT_FOR_GUESTS_CAPACITY = 0;

const MinPricesForTypes = {
  BUNGALOW : 0,
  FLAT : 1000,
  HOTEL : 3000,
  HOUSE : 5000,
  PALACE : 10000,
};

const form = document.querySelector('.notice .ad-form');
const inputTitle = form.querySelector('input[name="title"]');
const inputPrice = form.querySelector('input[name="price"]');
const inputRooms = form.querySelector('select[name="rooms"]');
const inputCapacity = form.querySelector('select[name="capacity"]');
const inputType = form.querySelector('select[name="type"]');
const inputTimeIn = form.querySelector('select[name="timein"]');
const inputTimeOut = form.querySelector('select[name="timeout"]');

const addInvalidClass = (element) => {
  element.classList.add('ad-form__field--invalid');
};

const removeInvalidClass = (element) => {
  element.classList.remove('ad-form__field--invalid');
};

const onInputTitle = (evt) => {
  const valueLength = evt.currentTarget.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    inputTitle.setCustomValidity(`До мин. длины не хватает ${MIN_TITLE_LENGTH - valueLength} символов`);
    addInvalidClass(inputTitle);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    inputTitle.setCustomValidity(`Длинна заголовка превышена на ${valueLength - MAX_TITLE_LENGTH} символов`);
    addInvalidClass(inputTitle);
  } else {
    inputTitle.setCustomValidity('');
    removeInvalidClass(inputTitle);
  }

  inputTitle.reportValidity();
};

const onInputPrice = (evt) => {
  const minPrice = MinPricesForTypes[inputType.value.toUpperCase()];
  const value = evt.currentTarget.value;

  if (value < 0) {
    inputPrice.setCustomValidity('Значение цены не может быть отрицательным');
    addInvalidClass(inputPrice);
  } else if (value < minPrice) {
    inputPrice.setCustomValidity(`Минимальная цена для выбранного типа жилья ${minPrice}`);
    addInvalidClass(inputPrice);
  } else if (value > MAX_PRICE_VALUE) {
    inputPrice.setCustomValidity(`Максимальная цена за ночь ${MAX_PRICE_VALUE}`);
    addInvalidClass(inputPrice);
  } else {
    inputPrice.setCustomValidity('');
    removeInvalidClass(inputPrice);
  }

  inputPrice.reportValidity();
};

const onInputType = (evt) => {
  const minPrice = MinPricesForTypes[evt.currentTarget.value.toUpperCase()];
  inputPrice.placeholder = minPrice;
  inputPrice.min = minPrice;

  if (inputPrice.value < minPrice) {
    inputPrice.setCustomValidity(`Минимальная цена для выбранного типа жилья ${minPrice}`);
    addInvalidClass(inputPrice);
  } else {
    inputPrice.setCustomValidity('');
    removeInvalidClass(inputPrice);
  }

  inputPrice.reportValidity();
};

const onCheckCapacity = (evt) => {
  evt.preventDefault();
  const roomsValue = parseInt(inputRooms.value, 10);
  const capacityValue = parseInt(inputCapacity.value, 10);

  inputCapacity.setCustomValidity('');
  inputRooms.setCustomValidity('');
  removeInvalidClass(inputCapacity);
  removeInvalidClass(inputRooms);

  if (capacityValue > roomsValue) {
    inputCapacity.setCustomValidity('Количество гостей не может превышать количество комнат');
    addInvalidClass(inputCapacity);
  } else if (roomsValue === NOT_FOR_GUESTS_ROOMS && capacityValue !== NOT_FOR_GUESTS_CAPACITY) {
    inputCapacity.setCustomValidity('При выборе 100 комнат, значение Количество мест может быть только "не для гостей"');
    addInvalidClass(inputCapacity);
  } else if (roomsValue !== NOT_FOR_GUESTS_ROOMS && capacityValue === NOT_FOR_GUESTS_CAPACITY) {
    inputRooms.setCustomValidity('При выборе значения "не для гостей", Количество комнат может только 100');
    addInvalidClass(inputRooms);
  }

  inputRooms.reportValidity();
  inputCapacity.reportValidity();
};

const onCheckTime = (evt) => {
  if (evt.type === 'submit') {
    if (inputTimeIn.value !== inputTimeOut.value) {
      inputTimeOut.setCustomValidity('Время заезда и выезда не должно отличаться');
      addInvalidClass(inputTimeOut);
    }
  } else {
    const newTime = evt.currentTarget.value;
    inputTimeIn.value = newTime;
    inputTimeOut.value = newTime;
    inputTimeOut.setCustomValidity('');
    removeInvalidClass(inputTimeOut);
  }
  inputTimeOut.reportValidity();
};

const isValid = () => inputRooms.reportValidity()
  && inputCapacity.reportValidity()
  && inputTimeOut.reportValidity();

inputTitle.addEventListener('input', onInputTitle);
inputPrice.addEventListener('input', onInputPrice);
inputType.addEventListener('input', onInputType);
inputRooms.addEventListener('input', onCheckCapacity);
inputCapacity.addEventListener('input', onCheckCapacity);
inputTimeIn.addEventListener('input', onCheckTime);
inputTimeOut.addEventListener('input', onCheckTime);
form.addEventListener('submit', onCheckCapacity);
form.addEventListener('submit', onCheckTime);

export {isValid};
