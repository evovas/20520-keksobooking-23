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

const getRandomElements = function (array = [], count = 0) {
  const randomElements = new Set();
  if (count && array.length !== 0) {
    for (let ind = 0; ind < count; ind++) {
      randomElements.add(getRandomElement(array));
    }
  }
  return Array.from(randomElements);
};

const getIntWithLeadingZeros = (number) => number < 10 ? `0${number}` : number;

const generateAnnouncements = function (count, minLat, maxLat, minLng, maxLng, locationAccuracy, minPrice, maxPrice, houseTypes, minRoom, maxRoom, minGuest, maxGuest, checkInOutTimes, houseFeatures, photos) {
  const announcements = [];
  for (let ind = 0; ind < count; ind++) {
    const location = {
      lat : getRandomDecimalPlace(minLat, maxLat, locationAccuracy),
      lng : getRandomDecimalPlace(minLng, maxLng, locationAccuracy),
    };
    announcements.push({
      author : {
        avatar : `img/avatars/user${  getIntWithLeadingZeros(ind + 1)  }.png`,
      },
      offer : {
        title : `Объявление об аренде №${ind + 1}`,
        address : `${location.lat}, ${location.lng}`,
        price : getRandomInt(minPrice, maxPrice),
        type : getRandomElement(houseTypes),
        rooms : getRandomInt(minRoom, maxRoom),
        guests : getRandomInt(minGuest, maxGuest),
        checkin : getRandomElement(checkInOutTimes),
        checkout : getRandomElement(checkInOutTimes),
        features : getRandomElements(houseFeatures, getRandomInt(0, houseFeatures.length)),
        description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        photos : getRandomElements(photos, getRandomInt(0, photos.length)),
      },
      location,
    });
  }
  return announcements;
};

const fakeAnnouncements = generateAnnouncements(SIMILAR_ANNOUNCEMENT_COUNT, MIN_LAT, MAX_LAT, MIN_LNG, MAX_LNG, LOCATION_ACCURACY, MIN_PRICE, MAX_PRICE, TYPES_OF_HOUSE, MIN_COUNT_ROOM, MAX_COUNT_ROOM, MIN_COUNT_GUEST, MAX_COUNT_GUEST, CHECK_IN_OUT_TIMES, FEATURES_OF_HOUSE, PHOTOS);

//Код для прохождения линтера
fakeAnnouncements.length;
