const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;
const NOT_FOR_GUESTS_ROOMS = 100;
const NOT_FOR_GUESTS_CAPACITY = 0;

const notice = document.querySelector('.notice');
const form = notice.querySelector('.ad-form');
const inputTitle = form.querySelector('input[name="title"]');
const inputPrice = form.querySelector('input[name="price"]');
const inputRooms = form.querySelector('select[name="rooms"]');
const inputCapacity = form.querySelector('select[name="capacity"]');

const onInputTitle = (evt) => {
  const valueLength = evt.currentTarget.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    inputTitle.setCustomValidity(`До мин. длины не хватает ${MIN_TITLE_LENGTH - valueLength} символов`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    inputTitle.setCustomValidity(`Длинна заголовка превышена на ${valueLength - MAX_TITLE_LENGTH} символов`);
  } else {
    inputTitle.setCustomValidity('');
  }

  inputTitle.reportValidity();
};

const onInputPrice = (evt) => {
  const value = evt.currentTarget.value;

  if (value > MAX_PRICE_VALUE) {
    inputPrice.setCustomValidity(`Максимальная цена за ночь ${MAX_PRICE_VALUE}`);
  } else {
    inputPrice.setCustomValidity('');
  }

  inputPrice.reportValidity();
};

const onCheckCapacity = () => {
  const roomsValue = parseInt(inputRooms.value, 10);
  const capacityValue = parseInt(inputCapacity.value, 10);

  if (capacityValue > roomsValue) {
    inputCapacity.setCustomValidity('Количество гостей не может превышать количество комнат');
  } else if (roomsValue === NOT_FOR_GUESTS_ROOMS && capacityValue !== NOT_FOR_GUESTS_CAPACITY) {
    inputCapacity.setCustomValidity('При выборе 100 комнат, значение Количество мест может быть только "не для гостей"');
  } else if (roomsValue !== NOT_FOR_GUESTS_ROOMS && capacityValue === NOT_FOR_GUESTS_CAPACITY) {
    inputRooms.setCustomValidity('При выборе значения "не для гостей", Количество комнат может только 100');
  } else {
    inputCapacity.setCustomValidity('');
    inputRooms.setCustomValidity('');
  }

  inputRooms.reportValidity();
  inputCapacity.reportValidity();
};

inputTitle.addEventListener('input', onInputTitle);
inputPrice.addEventListener('input', onInputPrice);
inputRooms.addEventListener('input', onCheckCapacity);
inputCapacity.addEventListener('input', onCheckCapacity);
