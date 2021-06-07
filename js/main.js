const getRandomNumber = (min = 0, max = 0) => Math.random() * (max - min) + min;

const getRandomIntInclusive = (min = 0, max = 0) => Math.floor(getRandomNumber(min, max + 1));

const getRandomDecimalPlace = (min = 0, max = 0, decimalPlaceNumber = 1) => Number(getRandomNumber(min, max).toFixed(decimalPlaceNumber));

const getIntWithLeadingZeros = (number, minCountSymbol) => (String(number).length < minCountSymbol) ? '0'.repeat(minCountSymbol - String(number).length) + number : String(number);

function getRandomElements (array, count) {
  const fullArray = array.slice();
  const currentArray = [];
  for (let ind = 0; ind < count; ind++) {
    currentArray.push(fullArray.splice(getRandomIntInclusive(0, fullArray.length - 1), 1));
  }
  return currentArray;
}

function getRandomElement (array) {
  return array[getRandomIntInclusive(0, array.length - 1)];
}

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

const SIMILAR_ANNOUNCEMENT_COUNT = 10;

function generateAnnouncement (index) {
  const announcement = {
    author : {
      avatar : `img/avatars/user${  getIntWithLeadingZeros(index + 1, 2)  }.png`,
    },
    offer : {
      title : `Объявление об аренде №${  index + 1}`,
      address : '',
      price : getRandomIntInclusive(10000, 100000),
      type : getRandomElement(TYPES_OF_HOUSE),
      rooms : getRandomIntInclusive(1, 10),
      guests : getRandomIntInclusive(1, 10),
      checkin : getRandomElement(CHECK_IN_OUT_TIME),
      checkout : getRandomElement(CHECK_IN_OUT_TIME),
      features : getRandomElements(FEATURES_OF_HOUSE, getRandomIntInclusive(0, FEATURES_OF_HOUSE.length)),
      description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      photos : getRandomElements(PHOTOS, getRandomIntInclusive(0, PHOTOS.length)),
    },
    location : {
      lat : getRandomDecimalPlace(35.65, 35.7, 5),
      lng : getRandomDecimalPlace(139.7, 139.8, 5),
    },
  };
  announcement.offer.address = `${announcement.location.lat  }, ${  announcement.location.lng}`;
  return announcement;
}

const announcements = new Array(SIMILAR_ANNOUNCEMENT_COUNT).fill('').map((item, index) => generateAnnouncement(index));

//Код для прохождения проверки линтером
announcements.slice();
