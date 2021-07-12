const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const form = document.querySelector('.notice .ad-form');
const avatarPreview = form.querySelector('.ad-form-header__preview');
const inputAvatar = form.querySelector('input[id="avatar"]');
const photoPreview = form.querySelector('.ad-form__photo');
const inputPhoto = form.querySelector('input[id="images"]');

const createImagePreview = (file) => {
  const result = document.createElement('div');
  const fileName = file.name.toLowerCase();

  const isAcceptable = FILE_TYPES.some((extension) => fileName.endsWith(extension));

  if(isAcceptable) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      result.style.backgroundImage = `url("${reader.result}")`;
    });

    reader.readAsDataURL(file);
  }

  return result;
};

const onChangeAvatar = () => {
  const file = inputAvatar.files[0];
  const avatar = createImagePreview(file);
  avatar.classList.add('ad-form-header__preview');
  avatarPreview.replaceWith(avatar);
};

const onChangePhotos = () => {
  const files = inputPhoto.files;
  const photos = document.createDocumentFragment();
  for (const file of files) {
    const photo = createImagePreview(file);
    photo.classList.add('ad-form__photo');
    photos.append(photo);
  }
  photoPreview.replaceWith(photos);
};

inputAvatar.addEventListener('change', onChangeAvatar);
inputPhoto.addEventListener('change', onChangePhotos);
