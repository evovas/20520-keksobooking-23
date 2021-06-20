import {announcementsData} from './data.js';
import {createAnnouncementCard} from './create-announcement-card.js';

//Проверка работы
document.querySelector('#map-canvas').appendChild(createAnnouncementCard(announcementsData[7]));
