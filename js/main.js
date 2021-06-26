import {enableActivePageState, enableInactivePageState} from './toggle-page-state.js';
import {announcementsData} from './data.js';
import {createAnnouncementCard} from './create-announcement-card.js';

//Проверка работы
enableInactivePageState();
enableActivePageState();
document.querySelector('#map-canvas').appendChild(createAnnouncementCard(announcementsData[7]));
