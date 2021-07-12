import {createElementWithClasses} from './util.js';

const TypesOfHouse = {
  FLAT : 'Квартира',
  BUNGALOW : 'Бунгало',
  HOUSE : 'Дом',
  PALACE : 'Дворец',
  HOTEL : 'Отель',
};

const createFeatures = (features) => {
  const featuresFragment = document.createDocumentFragment();
  features.forEach((feature) => featuresFragment.append(createElementWithClasses('li', 'popup__feature', `popup__feature--${feature}`)));
  return featuresFragment;
};

const createPhotos = (template, photosSrc, offerTitle) => {
  const photosFragment = document.createDocumentFragment();
  photosSrc.forEach((photoSrc) => {
    const newPhoto = template.cloneNode(false);
    newPhoto.src = photoSrc;
    newPhoto.alt = `${newPhoto.alt} к объявлению ${offerTitle}`;
    photosFragment.append(newPhoto);
  });
  return photosFragment;
};

const createAnnouncementCard = ({author, offer}) => {
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const card = cardTemplate.cloneNode(true);

  const cardTitle = card.querySelector('.popup__title');
  if (offer.title) {
    cardTitle.textContent = offer.title;
  } else {
    cardTitle.remove();
  }

  const cardAddress = card.querySelector('.popup__text--address');
  if (offer.address) {
    cardAddress.textContent = offer.address;
  } else {
    cardAddress.remove();
  }

  const cardPrice = card.querySelector('.popup__text--price');
  if (offer.price) {
    cardPrice.textContent = `${offer.price} \u20bd/ночь`;
  } else {
    cardPrice.textContent = 'Бесплатно';
  }

  const cardType = card.querySelector('.popup__type');
  if (TypesOfHouse[offer.type.toUpperCase()]) {
    cardType.textContent = TypesOfHouse[offer.type.toUpperCase()];
  } else {
    cardType.remove();
  }

  const cardCapacity = card.querySelector('.popup__text--capacity');
  if (offer.rooms && offer.guests) {
    cardCapacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  } else if (!offer.rooms && offer.guests) {
    cardCapacity.textContent = `Объявление для ${offer.guests} гостей`;
  } else if (offer.rooms && !offer.guests) {
    cardCapacity.textContent = `${offer.rooms} комнаты`;
  } else {
    cardCapacity.remove();
  }

  const cardTime = card.querySelector('.popup__text--time');
  if (offer.checkin && offer.checkout) {
    cardTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else if (!offer.checkin && offer.checkout) {
    cardTime.textContent = `Выезд до ${offer.checkout}`;
  } else if (offer.checkin && !offer.checkout) {
    cardTime.textContent = `Заезд после ${offer.checkin}`;
  } else {
    cardTime.remove();
  }

  const cardDescription = card.querySelector('.popup__description');
  if (offer.description) {
    cardDescription.textContent = offer.description;
  } else {
    cardDescription.remove();
  }

  const cardFeatures = card.querySelector('.popup__features');
  if (offer.features && offer.features.length) {
    cardFeatures.innerHTML = '';
    cardFeatures.append(createFeatures(offer.features));
  } else {
    cardFeatures.remove();
  }

  const cardPhotos = card.querySelector('.popup__photos');
  if (offer.photos && offer.photos.length) {
    const photoTemplate = card.querySelector('.popup__photo').cloneNode(false);
    cardPhotos.innerHTML = '';
    cardPhotos.append(createPhotos(photoTemplate, offer.photos, offer.title));
  } else {
    cardPhotos.remove();
  }

  const cardAvatar = card.querySelector('.popup__avatar');
  if (author.avatar) {
    cardAvatar.src = author.avatar;
  } else {
    cardAvatar.remove();
  }

  return card;
};

export {createAnnouncementCard};
