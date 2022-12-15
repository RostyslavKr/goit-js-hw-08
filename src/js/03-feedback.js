import throttle from 'lodash.throttle';

const USER_KEY = 'feedback-form-state';
const formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  message: document.querySelector('.feedback-form textarea'),
};

populateMessageOutput();

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.email.addEventListener('input', throttle(onEmailInput, 500));
refs.message.addEventListener('input', throttle(onMessageInput, 500));

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  console.log((formData[e.target.name] = e.target.value));
  localStorage.setItem(USER_KEY, JSON.stringify(formData));
}

function onEmailInput(evt) {
  const email = JSON.stringify(formData[evt.target.name]);

  localStorage.setItem(USER_KEY, email);
}

function onMessageInput(evt) {
  const message = JSON.stringify(formData[evt.target.name]);

  localStorage.setItem(USER_KEY, message);
}

function onFormSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(USER_KEY);
}

// function getSaveInputs(key) {
//   return JSON.parse(localStorage.getItem(key));
// }

function populateMessageOutput() {
  const savedMessage = localStorage.getItem(USER_KEY);
  const savedEmail = localStorage.getItem('Email');

  if (savedMessage) {
    refs.message.value = JSON.parse(savedMessage);
    formData.message = refs.message.value;
  }

  if (savedEmail) {
    refs.email.value = JSON.parse(savedEmail);
    formData.email = refs.email.value;
  }
}
