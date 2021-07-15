import {createMarkerGroup} from './render-map.js';
import {debounce} from './utils/debounce.js';

const MAX_COUNT_ANNOUNCEMENTS = 10;
const ALERT_SHOW_TIME = 5000;
const RERENDER_DELAY = 500;
const FILTER_DEFAULT_VALUE = 'any';

const filter = document.querySelector('.map__filters');
const selectHouseType = filter.querySelector('select[name="housing-type"]');
const selectPrice = filter.querySelector('select[name="housing-price"]');
const selectRooms = filter.querySelector('select[name="housing-rooms"]');
const selectGuests = filter.querySelector('select[name="housing-guests"]');
const checkboxWifi = filter.querySelector('input[id="filter-wifi"]');
const checkboxDishwasher = filter.querySelector('input[id="filter-dishwasher"]');
const checkboxParking = filter.querySelector('input[id="filter-parking"]');
const checkboxWasher = filter.querySelector('input[id="filter-washer"]');
const checkboxElevator = filter.querySelector('input[id="filter-elevator"]');
const checkboxConditioner = filter.querySelector('input[id="filter-conditioner"]');

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

const isSelectedHouseType = (announcement) => selectHouseType.value !== FILTER_DEFAULT_VALUE ? (selectHouseType.value === announcement.offer.type) : true;

const isSelectedPriceRange = (announcement) => {
  const priceRange = selectPrice.value;
  const price = announcement.offer.price;
  return priceRange !== FILTER_DEFAULT_VALUE ?
    (priceRange === 'low' && price <= PriceRanges.MAX_LOW_RANGE) ||
    (priceRange === 'middle' && price > PriceRanges.MAX_LOW_RANGE && price < PriceRanges.MIN_HIGH_RANGE) ||
    (priceRange === 'high' && price >= PriceRanges.MIN_HIGH_RANGE) : true;
};

const isSelectedRooms = (announcement) => selectRooms.value !== FILTER_DEFAULT_VALUE ? (parseInt(selectRooms.value, 10) === announcement.offer.rooms) : true;

const isSelectedGuests = (announcement) => selectGuests.value !== FILTER_DEFAULT_VALUE ? (parseInt(selectGuests.value, 10) === announcement.offer.guests) : true;

const isSelectedFeature = (announcement, checkbox) => {
  const hasFeatures = announcement.offer.features && announcement.offer.features.length;

  if (checkbox.checked) {
    return hasFeatures ? announcement.offer.features.includes(checkbox.value) : false;
  } else {
    return true;
  }
};

const filterAnnouncements = (announcements) => {
  const result =[];
  for (let ind = 0; ind < announcements.length; ind++) {
    if (result.length === MAX_COUNT_ANNOUNCEMENTS) {
      break;
    }
    if (isSelectedHouseType(announcements[ind])
      && isSelectedPriceRange(announcements[ind])
      && isSelectedRooms(announcements[ind])
      && isSelectedGuests(announcements[ind])
      && isSelectedFeature(announcements[ind], checkboxWifi)
      && isSelectedFeature(announcements[ind], checkboxDishwasher)
      && isSelectedFeature(announcements[ind], checkboxParking)
      && isSelectedFeature(announcements[ind], checkboxWasher)
      && isSelectedFeature(announcements[ind], checkboxElevator)
      && isSelectedFeature(announcements[ind], checkboxConditioner)) {
      result.push(announcements[ind]);
    }
  }
  return result;
};

const applyFilters = function (announcements) {
  createMarkerGroup(announcements);
  const onCreateMarkerGroupDebounced = debounce(() => createMarkerGroup(announcements), RERENDER_DELAY);
  filter.addEventListener('change', onCreateMarkerGroupDebounced);
  filter.addEventListener('reset', onCreateMarkerGroupDebounced);
};

const resetFilters = () => {
  filter.reset();
};

export {filterAnnouncements, applyFilters, showAlert, resetFilters};
