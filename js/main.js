const SIMILAR_ANNOUNCEMENT_COUNT = 10;
const MINIMUM_GENERATE_PRICE = 10000;
const MAXIMUM_GENERATE_PRICE = 100000;
const MINIMUM_GENERATE_ROOMS = 1;
const MAXIMUM_GENERATE_ROOMS = 10;
const MINIMUM_GENERATE_GUEST = 1;
const MAXIMUM_GENERATE_GUEST = 10;

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

const CHECK_IN_OUT_TIME = [
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

const getRandomDecimalPlace = (min = 0, max = 0, decimalPlaceNumber = 1) => Number(getRandomNumber(min, max).toFixed(decimalPlaceNumber));

const getRandomElement = function (array) {
  return array[getRandomInt(0, array.length - 1)];
};

const getRandomElements = function (array = [], count = 0) {
  const randomElements = new Set();
  if (count || array.length === 0) {
    for (let ind = 0; ind < count; ind++) {
      randomElements.add(getRandomElement(array));
    }
  }
  return Array.from(randomElements);
};


const generateAnnouncement = function (index) {
  const lat = getRandomDecimalPlace(35.65, 35.7, 5);
  const lng = getRandomDecimalPlace(139.7, 139.8, 5);
  return  {
    author : {
      avatar : `img/avatars/user${  (index < 9 ? `0${  index + 1}` : index + 1)  }.png`,
    },
    offer : {
      title : `Объявление об аренде №${index + 1}`,
      address : `${lat}, ${lng}`,
      price : getRandomInt(MINIMUM_GENERATE_PRICE, MAXIMUM_GENERATE_PRICE),
      type : getRandomElement(TYPES_OF_HOUSE),
      rooms : getRandomInt(MINIMUM_GENERATE_ROOMS, MAXIMUM_GENERATE_ROOMS),
      guests : getRandomInt(MINIMUM_GENERATE_GUEST, MAXIMUM_GENERATE_GUEST),
      checkin : getRandomElement(CHECK_IN_OUT_TIME),
      checkout : getRandomElement(CHECK_IN_OUT_TIME),
      features : getRandomElements(FEATURES_OF_HOUSE, getRandomInt(0, FEATURES_OF_HOUSE.length)),
      description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      photos : getRandomElements(PHOTOS, getRandomInt(0, PHOTOS.length)),
    },
    location : {
      lat : lat,
      lng : lng,
    },
  };
};

const announcements = [];
for (let ind = 0; ind < SIMILAR_ANNOUNCEMENT_COUNT; ind++) {
  announcements.push(generateAnnouncement(ind));
}

//Код для прохождения проверки линтером
announcements.slice();
