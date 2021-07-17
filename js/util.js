const successTemplate = document.querySelector('#success');
const errorTemplate = document.querySelector('#error');

const createElementWithClasses = (tag, ...classNames) => {
  const element = document.createElement(tag);
  classNames.forEach((className) => element.classList.add(className));
  return element;
};

const isEscEvent = (evt) => evt.key === 'Esc' || evt.key === 'Escape';

const onEscKeyDownMessage = (evt) => {
  if (isEscEvent(evt)) {
    const message = document.querySelector('.success') || document.querySelector('.error');
    message.remove();
    document.removeEventListener('keydown', onEscKeyDownMessage);
  }
};

const onClickMessage = () => {
  const message = document.querySelector('.success') || document.querySelector('.error');
  message.remove();
  document.removeEventListener('keydown', onEscKeyDownMessage);
};

const showMessage = (template, message) => {
  const messageParagraph = template.querySelector('p');
  messageParagraph.textContent = message;
  template.addEventListener('click', onClickMessage);
  document.addEventListener('keydown', onEscKeyDownMessage);
  document.body.appendChild(template);
};

const showSuccessMessage = (message) => {
  showMessage(successTemplate.content.querySelector('div').cloneNode(true), message);
};

const showErrorMessage = (message) => {
  showMessage(errorTemplate.content.querySelector('div').cloneNode(true), message);
};

export {createElementWithClasses, isEscEvent, showSuccessMessage, showErrorMessage};
