const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const form = document.querySelector('.notice .ad-form');
const avatarPreviewDefault = form.querySelector('.ad-form-header__preview img');
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
  avatar.classList.add('ad-form-header__preview-image');
  avatarPreviewDefault.replaceWith(avatar);
};

const onChangePhotos = () => {
  const file = inputPhoto.files[0];
  const photo = createImagePreview(file,'Превью фото объявления');
  photo.classList.add('ad-form__photo-image');
  photoPreview.append(photo);
};

const resetImages = () => {
  const avatar = form.querySelector('.ad-form-header__preview-image');
  const photo = form.querySelector('.ad-form__photo-image');

  if (avatar) {
    avatar.replaceWith(avatarPreviewDefault);
  }

  if (photo) {
    photo.remove();
  }
};

inputAvatar.addEventListener('change', onChangeAvatar);
inputPhoto.addEventListener('change', onChangePhotos);

export {resetImages};
