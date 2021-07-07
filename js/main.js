import './render-map.js';
import './initialize-page-state.js';
import './create-new-announcement.js';
import './filter-announcements.js';
import {getAnnouncementsData} from './fetch-api.js';
import {applyFilters, showAlert} from './filter-announcements.js';

getAnnouncementsData(applyFilters, showAlert);
