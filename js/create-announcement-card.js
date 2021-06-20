import {createElementWithClasses} from './util.js';

const TypesOfHouse = {
  'FLAT' : 'Квартира',
  'BUNGALOW' : 'Бунгало',
  'HOUSE' : 'Дом',
  'PALACE' : 'Дворец',
  'HOTEL' : 'Отель',
};

const createFeatures = (features) => {
  const featuresFragment = document.createDocumentFragment();
  features.forEach((feature) => featuresFragment.appendChild(createElementWithClasses('li', 'popup__feature', `popup__feature--${feature}`)));
  return featuresFragment;
};

const createPhotos = (template, photosSrc) => {
  const photosFragment = document.createDocumentFragment();
  photosSrc.forEach((photoSrc) => {
    const newPhoto = template.cloneNode(false);
    newPhoto.src = photoSrc;
    photosFragment.appendChild(newPhoto);
  });
  return photosFragment;
};

const createAnnouncementCard = ({author, offer}) => {
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const card = cardTemplate.cloneNode(true);

  const cardTitle = card.querySelector('.popup__title');
  if (offer.title === '') {
    cardTitle.remove();
  } else {
    cardTitle.textContent = offer.title;
  }

  const cardAddress = card.querySelector('.popup__text--address');
  if (offer.address === '') {
    cardAddress.remove();
  } else {
    cardAddress.textContent = offer.address;
  }

  const cardPrice = card.querySelector('.popup__text--price');
  if (offer.price === '') {
    cardPrice.remove();
  } else {
    cardPrice.textContent = `${offer.price} ₽/ночь`;
  }

  const cardType = card.querySelector('.popup__type');
  if (TypesOfHouse[offer.type.toUpperCase()].isUndefined) {
    cardType.remove();
  } else {
    cardType.textContent = TypesOfHouse[offer.type.toUpperCase()];
  }

  const cardCapacity = card.querySelector('.popup__text--capacity');
  if (offer.rooms.isUndefined || offer.guests.isUndefined) {
    cardCapacity.remove();
  } else {
    cardCapacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  }

  const cardTime = card.querySelector('.popup__text--time');
  if (offer.checkin.isUndefined || offer.checkout.isUndefined) {
    cardTime.remove();
  } else {
    cardTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  }

  const cardDescription = card.querySelector('.popup__description');
  if (offer.description === '') {
    cardDescription.remove();
  } else {
    cardDescription.textContent = offer.description;
  }

  const cardFeatures = card.querySelector('.popup__features');
  if (offer.features.length === 0) {
    cardFeatures.remove();
  } else {
    cardFeatures.innerHTML = '';
    cardFeatures.appendChild(createFeatures(offer.features));
  }

  const cardPhotos = card.querySelector('.popup__photos');
  if (offer.photos.length === 0) {
    cardPhotos.remove();
  } else {
    const photoTemplate = card.querySelector('.popup__photo').cloneNode(false);
    cardPhotos.innerHTML = '';
    cardPhotos.appendChild(createPhotos(photoTemplate, offer.photos));
  }

  const cardAvatar = card.querySelector('.popup__avatar');
  if (author.avatar === '') {
    cardAvatar.remove();
  } else {
    cardAvatar.src = author.avatar;
  }

  return card;
};

export {createAnnouncementCard};
