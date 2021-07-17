import './notice-setup-form.js';
import './images-preview.js';
import {showSuccessMessage, showErrorMessage} from './util.js';
import {createMainMarker, resetMainMarker} from './render-map.js';
import {sendNoticeData} from './fetch-api.js';
import {resetFilters} from './filter-announcements.js';
import {resetImages} from './images-preview.js';
import {isValid} from './notice-setup-form.js';

const DEFAULT_COORDINATE_ROUNDING = 5;

const form = document.querySelector('.notice .ad-form');
const inputAddress = form.querySelector('input[name="address"]');
const inputPrice = form.querySelector('input[name="price"]');
const inputPriceDefaultValue = inputPrice.placeholder;
const buttonReset = form.querySelector('button[type="reset"]');

const mainMarker = createMainMarker();

const onMoveEndMainMarker = (evt) => {
  const coordinates = evt.target.getLatLng();
  inputAddress.value = `${parseFloat(coordinates.lat).toFixed(DEFAULT_COORDINATE_ROUNDING)}, ${parseFloat(coordinates.lng).toFixed(DEFAULT_COORDINATE_ROUNDING)}`;
};

const resetPage = () => {
  form.reset();
  inputPrice.placeholder = inputPriceDefaultValue;
  inputPrice.min = inputPriceDefaultValue;
  resetMainMarker(mainMarker);
  resetFilters();
  resetImages();
};

const onResetPage = () => {
  resetPage();
};

const onSubmitForm = (evt) => {
  evt.preventDefault();

  if(isValid()) {
    const formData = new FormData(evt.target);
    sendNoticeData(formData, showSuccessMessage, showErrorMessage);
  }
};

form.addEventListener('submit', onSubmitForm);

mainMarker.on('move', onMoveEndMainMarker);
buttonReset.addEventListener('click', onResetPage);

export {resetPage, onSubmitForm};
