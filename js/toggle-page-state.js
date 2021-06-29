const noticeForm = document.querySelector('.ad-form');
const noticeFormFieldsets = noticeForm.querySelectorAll('fieldset');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFormSelects = mapFiltersForm.querySelectorAll('select');

const enableInactivePageState = () => {
  noticeForm.classList.add('ad-form--disabled');
  noticeFormFieldsets.forEach((fieldset) => fieldset.disabled = true);

  mapFiltersForm.classList.add('map__filters--disabled');
  mapFiltersFormSelects.forEach((select) => select.disabled = true);
  mapFiltersForm.querySelector('fieldset').disabled = true;
};

const enableActivePageState = () => {
  noticeForm.classList.remove('ad-form--disabled');
  noticeFormFieldsets.forEach((fieldset) => fieldset.disabled = false);

  mapFiltersForm.classList.remove('map__filters--disabled');
  mapFiltersFormSelects.forEach((select) => select.disabled = false);
  mapFiltersForm.querySelector('fieldset').disabled = false;
};

enableInactivePageState();

export {enableInactivePageState, enableActivePageState};
