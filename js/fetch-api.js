import {enableInactiveFilterState, enableActiveFilterState} from './toggle-page-state.js';
import {resetForm} from './create-new-announcement.js';

const Url = {
  SERVER: 'https://23.javascript.pages.academy/keksobooking',
  DATA: 'https://23.javascript.pages.academy/keksobooking/data',
};

const getAnnouncementsData = (onSuccess, onFail) => {
  fetch(Url.DATA)
    .then((response) => {
      if (response.ok){
        return response;
      } else {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
    })
    .then((response) => response.json())
    .then((announcements) => {
      enableActiveFilterState();
      onSuccess(announcements);
    })
    .catch((err) => {
      enableInactiveFilterState();
      onFail(`При загрузке данных возникла ошибка. ${err.message}`);
    });
};

const sendNoticeData = (data, onSuccess, onFail) => {
  fetch(Url.SERVER, {
    method: 'POST',
    body: data,
  })
    .then((response) => {
      if (response.ok){
        return response;
      } else {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
    })
    .then(resetForm)
    .then(() => onSuccess('Ваше объявление успешно размещено!'))
    .catch((err) => onFail(`Ошибка размещения объявления.
    ${err.message}`));
};

export {getAnnouncementsData, sendNoticeData};
