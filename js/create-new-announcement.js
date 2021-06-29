import './notice-setup-form.js';
import {createMainMarker, resetMainMarker} from './render-map.js';

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

const onResetForm = () => {
  resetMainMarker(mainMarker);
};

mainMarker.on('moveend', onMoveEndMainMarker);
buttonReset.addEventListener('click', onResetForm);

//Здесь предполагается реализация пункта 6 ТЗ
