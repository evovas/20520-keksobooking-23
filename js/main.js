const SIMILAR_ANNOUNCEMENT_COUNT = 10;
const MIN_PRICE = 10000;
const MAX_PRICE = 100000;
const MIN_COUNT_ROOM = 1;
const MAX_COUNT_ROOM = 10;
const MIN_COUNT_GUEST = 1;
const MAX_COUNT_GUEST = 10;
const MIN_LAT = 35.65;
const MAX_LAT = 35.7;
const MIN_LNG = 139.7;
const MAX_LNG = 139.8;
const LOCATION_ACCURACY = 5;


const TYPES_OF_HOUSE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const FEATURES_OF_HOUSE = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const CHECK_IN_OUT_TIMES = [
  '12:00',
  '13:00',
  '14:00',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const getRandomNumber = (min = 0, max = 0) => Math.random() * (max - min) + min;

const getRandomInt = (min = 0, max = 0) => Math.floor(getRandomNumber(min, max + 1));

const getRandomDecimalPlace = (min = 0, max = 0, decimalPlaceNumber = 0) => getRandomNumber(parseFloat(min), parseFloat(max)).toFixed(decimalPlaceNumber);

const getRandomElement = (array) => array[getRandomInt(0, array.length - 1)];

const getRandomElements = (array = [], count = 0) => {
  const randomElements = new Set();
  if (count && array.length !== 0) {
    for (let ind = 0; ind < count; ind++) {
      randomElements.add(getRandomElement(array));
    }
  }
  return Array.from(randomElements);
};

const getIntWithLeadingZeros = (number) => number < 10 ? `0${number}` : number;

const generateAnnouncements = (count) => {
  const announcements = [];
  for (let ind = 0; ind < count; ind++) {
    const location = {
      lat : getRandomDecimalPlace(MIN_LAT, MAX_LAT, LOCATION_ACCURACY),
      lng : getRandomDecimalPlace(MIN_LNG, MAX_LNG, LOCATION_ACCURACY),
    };
    announcements.push({
      author : {
        avatar : `img/avatars/user${  getIntWithLeadingZeros(ind + 1)  }.png`,
      },
      offer : {
        title : `Объявление об аренде №${ind + 1}`,
        address : `${location.lat}, ${location.lng}`,
        price : getRandomInt(MIN_PRICE, MAX_PRICE),
        type : getRandomElement(TYPES_OF_HOUSE),
        rooms : getRandomInt(MIN_COUNT_ROOM, MAX_COUNT_ROOM),
        guests : getRandomInt(MIN_COUNT_GUEST, MAX_COUNT_GUEST),
        checkin : getRandomElement(CHECK_IN_OUT_TIMES),
        checkout : getRandomElement(CHECK_IN_OUT_TIMES),
        features : getRandomElements(FEATURES_OF_HOUSE, getRandomInt(0, FEATURES_OF_HOUSE.length)),
        description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        photos : getRandomElements(PHOTOS, getRandomInt(0, PHOTOS.length)),
      },
      location,
    });
  }
  return announcements;
};

const fakeAnnouncements = generateAnnouncements(SIMILAR_ANNOUNCEMENT_COUNT);

//Код для прохождения линтера
fakeAnnouncements.length;
