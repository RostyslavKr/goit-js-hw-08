import throttle from 'lodash.throttle';

const USER_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
};

populateMessageOutput();
const formData = {
  email: '',
  message: '',
};
refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  console.log((formData[e.target.name] = e.target.value));
  localStorage.setItem(USER_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(USER_KEY);
}

function getSaveInputs(key) {
  return JSON.parse(localStorage.getItem(key));
}

function populateMessageOutput() {
  if (savedMessage) {
    refs.message.value = JSON.parse(savedMessage);
    formData.message = refs.message.value;
  }

  if (savedEmail) {
    refs.email.value = JSON.parse(savedEmail);
    formData.email = refs.email.value;
  }
}
