import './notice-setup-form.js';
import {isEscEvent} from './util.js';
import {createMainMarker, resetMainMarker} from './render-map.js';
import {sendData} from './fetch-api.js';

const DEFAULT_COORDINATE_ROUNDING = 5;

const notice = document.querySelector('.notice');
const form = notice.querySelector('.ad-form');
const inputAddress = form.querySelector('input[name="address"]');
const buttonReset = form.querySelector('button[type="reset"]');
const successTemplate = document.querySelector('#success');
const errorTemplate = document.querySelector('#error');

const mainMarker = createMainMarker();

const onMoveEndMainMarker = (evt) => {
  const coordinates = evt.target.getLatLng();
  inputAddress.value = `${parseFloat(coordinates.lat).toFixed(DEFAULT_COORDINATE_ROUNDING)}, ${parseFloat(coordinates.lng).toFixed(DEFAULT_COORDINATE_ROUNDING)}`;
};

const showMessage = (template) => {
  const currentMessage = template.content.querySelector('div').cloneNode(true);

  const onEscKeydownMessage = (evt) => {
    if (isEscEvent(evt)) {
      currentMessage.remove();
    }
  };

  document.addEventListener('keydown', onEscKeydownMessage, {once: true});
  currentMessage.addEventListener('click', () => {
    currentMessage.remove();
    document.removeEventListener('keydown', onEscKeydownMessage);
  });

  document.body.appendChild(currentMessage);
};

const openSuccessMessage = () => {
  showMessage(successTemplate);
  form.reset();
  resetMainMarker(mainMarker);
};

const openErrorMessage = () => {
  showMessage(errorTemplate);
};

const onResetForm = () => {
  resetMainMarker(mainMarker);
};

const onSubmitForm = (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  sendData(formData, openSuccessMessage, openErrorMessage);
};

form.addEventListener('submit', onSubmitForm);

mainMarker.on('moveend', onMoveEndMainMarker);
buttonReset.addEventListener('click', onResetForm);

//Здесь предполагается реализация пункта 6 ТЗ
