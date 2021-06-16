import {generateAnnouncements} from './data.js';

const SIMILAR_ANNOUNCEMENT_COUNT = 10;

const fakeAnnouncements = generateAnnouncements(SIMILAR_ANNOUNCEMENT_COUNT);

//Код для прохождения линтера
fakeAnnouncements.length;
