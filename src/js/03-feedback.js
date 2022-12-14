import throttle from 'lodash.throttle';

const USER_KEY = 'feedback-form-state';
const formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);

refs.form.addEventListener('input', throttle(onFormInput, 500));

populateMessageOutput();

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(USER_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(USER_KEY);
}

function populateMessageOutput() {
  const savedMessage = JSON.parse(localStorage.getItem(USER_KEY));

  if (savedMessage) {
    refs.input.value = savedMessage.email;
    refs.textarea.value = savedMessage.message;
  }
}
