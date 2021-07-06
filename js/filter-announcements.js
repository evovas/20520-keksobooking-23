import {createMarkerGroup} from './render-map.js';
import {getAnnouncementsData} from './fetch-api.js';

const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('get-error');
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

getAnnouncementsData(createMarkerGroup, showAlert);

//Здесь предполагается реализация фильтрации объявлений
