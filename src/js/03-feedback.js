import throttle from 'lodash.throttle';

const USER_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));
window.addEventListener('load', updateOutputOnload);

function onFormInput(e) {
  e.preventDefault();
  const message = refs.form.elements.message.value;
  const email = refs.form.elements.email.value;
  localStorage.setItem(USER_KEY, JSON.stringify({ message, email }));
}

function updateOutputOnload(e) {
  e.preventDefault();
  const OutputText = JSON.parse(localStorage.getItem(USER_KEY)) || {
    email: '',
    message: '',
  };
  const { email, message } = OutputText;
  refs.form.elements.email.value = email;
  refs.form.elements.message.value = message;
}
function onFormSubmit(e) {
  e.preventDefault();
  const {
    elements: { email, message },
  } = e.currentTarget;

  console.log({ email: email.value, message: message.value });

  localStorage.removeItem(USER_KEY);
}
