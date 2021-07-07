import {createMarkerGroup} from './render-map.js';
import {debounce} from './utils/debounce.js';

const ALERT_SHOW_TIME = 5000;
const RERENDER_DELAY = 500;
const FILTER_DEFAULT_VALUE = 'any';

const filter = document.querySelector('.map__filters');
const selectHouseType = filter.querySelector('select[name="housing-type"]');
const selectPrice = filter.querySelector('select[name="housing-price"]');
const selectRooms = filter.querySelector('select[name="housing-rooms"]');
const selectGuests = filter.querySelector('select[name="housing-guests"]');
const fieldsetFeatures = filter.querySelector('fieldset[id="housing-features"]');
const inputFeaturesCheckboxes = fieldsetFeatures.querySelectorAll('input');

const PriceRanges = {
  MAX_LOW_RANGE: 10000,
  MIN_HIGH_RANGE: 50000,
};


const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('get-error');
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const isSelectedHouseType = (announcement) => {
  if (selectHouseType.value !== FILTER_DEFAULT_VALUE) {
    return selectHouseType.value === announcement.offer.type;
  } else {
    return true;
  }
};

const isSelectedPriceRange = (announcement) => {
  const priceRange = selectPrice.value;
  const price = announcement.offer.price;
  if (priceRange === FILTER_DEFAULT_VALUE) {
    return true;
  } else if (priceRange === 'low' && price <= PriceRanges.MAX_LOW_RANGE) {
    return true;
  } else if (priceRange === 'middle' && price > PriceRanges.MAX_LOW_RANGE && price < PriceRanges.MIN_HIGH_RANGE) {
    return true;
  } else if (priceRange === 'high' && price >= PriceRanges.MIN_HIGH_RANGE) {
    return true;
  } else {
    return false;
  }
};

const isSelectedRooms = (announcement) => {
  if (selectRooms.value !== FILTER_DEFAULT_VALUE) {
    return parseInt(selectRooms.value, 10) === announcement.offer.rooms;
  } else {
    return true;
  }
};

const isSelectedGuests = (announcement) => {
  if (selectGuests.value !== FILTER_DEFAULT_VALUE) {
    return parseInt(selectGuests.value, 10) === announcement.offer.guests;
  } else {
    return true;
  }
};

const isSelectedFeatures = (announcement) => {
  const features = announcement.offer.features;
  const selectedFeatures = [];
  inputFeaturesCheckboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      selectedFeatures.push(checkbox.value);
    }
  });
  if (selectedFeatures.length === 0) {
    return true;
  } else if (!(features && features.length)) {
    return false;
  } else {
    return selectedFeatures.length === [...new Set([...features, ...selectedFeatures])].length;
  }
};

const filterAnnouncements = (announcement) => isSelectedHouseType(announcement) && isSelectedPriceRange(announcement) && isSelectedRooms(announcement) && isSelectedGuests(announcement) && isSelectedFeatures(announcement);

const setFilter = (cb) => {
  filter.addEventListener('change', () => {
    cb();
  });
};

const applyFilters = (announcements) => {
  createMarkerGroup(announcements);
  setFilter(debounce(() => createMarkerGroup(announcements), RERENDER_DELAY));
};

export {filterAnnouncements, applyFilters, showAlert};
