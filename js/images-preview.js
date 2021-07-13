const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const form = document.querySelector('.notice .ad-form');
const avatarPreview = form.querySelector('.ad-form-header__preview');
const inputAvatar = form.querySelector('input[id="avatar"]');
const photoPreview = form.querySelector('.ad-form__photo');
const inputPhoto = form.querySelector('input[id="images"]');

const createImagePreview = (file, alt) => {
  const result = document.createElement('img');
  const fileName = file.name.toLowerCase();

  const isAcceptable = FILE_TYPES.some((extension) => fileName.endsWith(extension));

  if(isAcceptable) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      result.src = reader.result;
      result.alt = alt;
    });

    reader.readAsDataURL(file);
  }

  return result;
};

const onChangeAvatar = () => {
  const file = inputAvatar.files[0];
  const avatar = createImagePreview(file, 'Предпросмотр выбранной аватарки');
  avatar.classList.add('ad-form-header__preview', 'ad-form-header__preview--replaced');
  avatarPreview.replaceWith(avatar);
};

const onChangePhotos = () => {
  const files = inputPhoto.files;
  const photos = document.createDocumentFragment();
  for (const file of files) {
    const photo = createImagePreview(file,'Превью фото объявления');
    photo.classList.add('ad-form__photo');
    photos.append(photo);
  }
  photoPreview.replaceWith(photos);
};

inputAvatar.addEventListener('change', onChangeAvatar);
inputPhoto.addEventListener('change', onChangePhotos);
