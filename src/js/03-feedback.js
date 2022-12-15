import throttle from 'lodash.throttle';

const USER_KEY = 'feedback-form-state';
const formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
};

populateMessageOutput();

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
  const formData = getSaveInputs(USER_KEY);
  if (!formData) {
    return;
  }

  for (const key in formData) {
    refs.form.elements[key].value = formData[key];
  }
}
