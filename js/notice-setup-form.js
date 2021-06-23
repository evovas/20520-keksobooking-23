const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;

const notice = document.querySelector('.notice');
const form = notice.querySelector('.ad-form');
const inputTitle = form.querySelector('input[name="title"]');
const inputPrice = form.querySelector('input[name="price"]');
const inputRooms = form.querySelector('select[name="rooms"]');
const inputCapacity = form.querySelector('select[name="capacity"]');

const capacityTemplate = inputCapacity.cloneNode(true);
const capacityDocumentFragment = document.createDocumentFragment();
capacityTemplate.querySelectorAll('option').forEach((option) => capacityDocumentFragment.appendChild(option));

inputTitle.addEventListener('input', () => {
  const valueLength = inputTitle.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    inputTitle.setCustomValidity(`До мин. длины не хватает ${MIN_TITLE_LENGTH - valueLength} символов`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    inputTitle.setCustomValidity(`Длинна заголовка превышена на ${valueLength - MAX_TITLE_LENGTH} символов`);
  } else {
    inputTitle.setCustomValidity('');
  }

  inputTitle.reportValidity();
});

inputPrice.addEventListener('input', () => {
  const value = inputPrice.value;

  if (value > MAX_PRICE_VALUE) {
    inputPrice.setCustomValidity(`Максимальная цена за ночь ${MAX_PRICE_VALUE}`);
  } else {
    inputPrice.setCustomValidity('');
  }

  inputPrice.reportValidity();
});

const checkCapacity = () => {
  const capacityWorkFragment = capacityDocumentFragment.cloneNode(true);
  const capacityOptions = capacityWorkFragment.querySelectorAll('option');
  const previousCapacityValue = inputCapacity.value;

  if (parseInt(inputRooms.value, 10) !== 100) {
    capacityOptions.forEach((option) => {
      if (parseInt(option.value, 10) > inputRooms.value || parseInt(option.value, 10) === 0) {
        option.remove();
      }
    });
  } else {
    capacityOptions.forEach((option) => {
      if (parseInt(option.value, 10) !== 0) {
        option.remove();
      }
    });
  }

  inputCapacity.innerHTML = '';
  inputCapacity.appendChild(capacityWorkFragment.cloneNode(true));

  const newCapacityValue = inputCapacity.value;

  if (newCapacityValue !== previousCapacityValue) {
    inputCapacity.setCustomValidity('Внимание, значение изменилось, выберите новое значение');
    inputCapacity.reportValidity();
  }
};

checkCapacity();

inputRooms.addEventListener('input', checkCapacity);
inputCapacity.addEventListener('click', () => inputCapacity.setCustomValidity(''));
