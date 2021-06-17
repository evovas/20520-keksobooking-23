import {generateAnnouncements} from './data.js';

const TYPES_OF_HOUSE = {
  'flat' : 'Квартира',
  'bungalow' : 'Бунгало',
  'house' : 'Дом',
  'palace' : 'Дворец',
  'hotel' : 'Отель',
};
const FEATURES_OF_HOUSE = {
  'wifi' : '<li class="popup__feature popup__feature--wifi"></li>',
  'dishwasher' : '<li class="popup__feature popup__feature--dishwasher"></li>',
  'parking' : '<li class="popup__feature popup__feature--parking"></li>',
  'washer' : '<li class="popup__feature popup__feature--washer"></li>',
  'elevator' : '<li class="popup__feature popup__feature--elevator"></li>',
  'conditioner' : '<li class="popup__feature popup__feature--conditioner"></li>',
};

const SIMILAR_ANNOUNCEMENT_COUNT = 10;
const fakeAnnouncements = generateAnnouncements(SIMILAR_ANNOUNCEMENT_COUNT);

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const similarCards = document.createDocumentFragment();

fakeAnnouncements.forEach(({author, offer}) => {
  const card = cardTemplate.cloneNode(true);

  card.querySelector('.popup__title').textContent = offer.title;
  card.querySelector('.popup__text--address').textContent = offer.address;
  card.querySelector('.popup__text--price').innerHTML = `${offer.price} <span>₽/ночь</span>`;
  card.querySelector('.popup__type').textContent = TYPES_OF_HOUSE[offer.type];
  card.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const cardFeatures = card.querySelector('.popup__features');
  if (offer.features.length === 0) {
    cardFeatures.remove();
  } else {
    card.querySelectorAll('.popup__feature').forEach((feature) => feature.remove());
    offer.features.forEach((feature) => cardFeatures.insertAdjacentHTML('beforeend', FEATURES_OF_HOUSE[feature]));
  }

  card.querySelector('.popup__description').textContent = (offer.description !== '') ? offer.description : card.querySelector('.popup__description').remove();

  const cardPhotos = card.querySelector('.popup__photos');
  if (offer.photos.length === 0) {
    cardPhotos.remove();
  } else {
    const photoTemplate = card.querySelector('.popup__photo').cloneNode(false);
    card.querySelector('.popup__photo').remove();
    offer.photos.forEach((photo) => {
      const newPhoto = photoTemplate.cloneNode(false);
      newPhoto.src = photo;
      cardPhotos.appendChild(newPhoto);
    });
  }

  card.querySelector('.popup__avatar').src = author.avatar;

  similarCards.appendChild(card);
});

//Код для проверки работы
document.querySelector('#map__canvas').appendChild(similarCards.children[5]);


