const nameRegex = /^[a-zA-Z]{1,256}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const regexPatterns = {
  firstname: nameRegex,
  lastname: nameRegex,
  password: passwordRegex,
  passwordConfirm: passwordRegex,
  email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
  phonenumber: /\d{3}[\-]\d{3}[\-]\d{4}/,
};

const errorMessages = {
  firstname: 'Use at least 3 alphabetic characters only',
  lastname: 'Use at least 3 alphabetic characters only',
  password: `Use at least 8 characters 
             Use upper and lower case characters
             Use 1 or more numbers`,
  passwordConfirm: '*Passwords do not match',
  email: 'Enter in the format: name@example.com',
  phonenumber: 'Enter in format: 123-456-7890 (without dashes)',
  required: '*Field Required',
};

const inputs = document.querySelectorAll('input');
const submitButton = document.querySelector("button[type='submit']");
const phoneNumber = document.querySelector("input[name='phonenumber']");
const passwordConfirm = document.querySelector("input[name='passwordConfirm']");

submitButton.addEventListener('click', (ev) => onSubmit(ev));
phoneNumber.addEventListener('keyup', (ev) => updateDisplayPhoneNumber(ev));
passwordConfirm.addEventListener('keyup', (ev) =>
  handlePasswordConfirmation(ev)
);

function onSubmit(ev) {
  ev.preventDefault();
  inputs.forEach((field) => {
    if (!isValidInput(field, regexPatterns[field.name])) {
      showError(field);
    } else {
      field.classList.remove('error');
      updateErrorMessage(field, 'hidden');
    }
  });
}

function isValidInput(field, regex) {
  if (!regex.test(field.value)) return false;
  return true;
}

function showError(field) {
  // skip optional phone number field if empty
  if (field.name === 'phonenumber' && field.value === '') return;
  field.className = 'error';
  updateErrorMessage(field, 'visible');
}

function updateErrorMessage(field, visibility) {
  const parentElement = field.parentElement;
  const errorMessage = parentElement.querySelector('.error-message');
  errorMessage.style.visibility = visibility;
  if (field.value === '') {
    errorMessage.textContent = errorMessages.required;
  } else {
    errorMessage.textContent = errorMessages[field.name];
  }
}

// to automatically add dashes as the user inputs number
function updateDisplayPhoneNumber(ev) {
  input = ev.target.value;
  let updatedValue = '';
  switch (input.length) {
    case 3:
    case 7:
      updatedValue = input + '-';
      break;
    default:
      updatedValue += input;
  }
  ev.target.value = updatedValue;
}

function handlePasswordConfirmation(ev) {
  const passwordField = document.querySelector('input[name=password]');
  if (ev.target.value !== '' && ev.target.value !== passwordField.value) {
    updateErrorMessage(ev.target, 'visible');
  } else {
    updateErrorMessage(ev.target, 'hidden');
  }
}
