import './notice-setup-form.js';
import './images-preview.js';
import {showSuccessMessage, showErrorMessage} from './util.js';
import {createMainMarker, resetMainMarker} from './render-map.js';
import {sendNoticeData} from './fetch-api.js';
import {resetFilters} from './filter-announcements.js';

const DEFAULT_COORDINATE_ROUNDING = 5;

const notice = document.querySelector('.notice');
const form = notice.querySelector('.ad-form');
const inputAddress = form.querySelector('input[name="address"]');
const buttonReset = form.querySelector('button[type="reset"]');

const mainMarker = createMainMarker();

const onMoveEndMainMarker = (evt) => {
  const coordinates = evt.target.getLatLng();
  inputAddress.value = `${parseFloat(coordinates.lat).toFixed(DEFAULT_COORDINATE_ROUNDING)}, ${parseFloat(coordinates.lng).toFixed(DEFAULT_COORDINATE_ROUNDING)}`;
};

const resetPage = () => {
  form.reset();
  resetMainMarker(mainMarker);
  resetFilters();
};

const onResetPage = () => {
  resetPage();
};

const onSubmitForm = (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  sendNoticeData(formData, showSuccessMessage, showErrorMessage);
};

form.addEventListener('submit', onSubmitForm);

mainMarker.on('moveend', onMoveEndMainMarker);
buttonReset.addEventListener('click', onResetPage);

//Здесь предполагается реализация пункта 6 ТЗ

export {resetPage, onSubmitForm};
