let allFieldsAreValid = true;

const nameRegex = /^[a-zA-Z]{1,256}$/;
const regexPatterns = {
  firstname: nameRegex,
  lastname: nameRegex,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
  phonenumber: /\d{3}[\-]\d{3}[\-]\d{4}/,
};

const nameErrorMessaage = 'Use at least 3 alphabetic characters only';
const errorMessages = {
  firstname: nameErrorMessaage,
  lastname: nameErrorMessaage,
  password: `Use at least 8 characters 
             Use upper and lower case characters
             Use 1 or more numbers`,
  passwordConfirm: '*Passwords do not match',
  email: 'Enter in the format: name@example.com',
  phonenumber: 'Enter in format: 123-456-7890 (without dashes)',
  required: '*Field Required',
};

const inputsArray = Array.from(document.querySelectorAll('input'));
const phoneNumber = inputsArray.find((input) => input.name === 'phonenumber');
const passwordField = inputsArray.find((input) => input.name === 'password');
const passwordConfirmField = inputsArray.find(
  (input) => input.name === 'passwordConfirm'
);
const submitButton = document.querySelector("button[type='submit']");

submitButton.addEventListener('click', (ev) => onSubmit(ev));
phoneNumber.addEventListener('keyup', (ev) => updateDisplayPhoneNumber(ev));
passwordConfirmField.addEventListener('keyup', (ev) =>
  handlePasswordConfirmation(ev)
);
passwordField.addEventListener('keyup', (ev) => {
  if (passwordConfirmField.value !== '') handlePasswordConfirmation(ev);
});

function onSubmit(ev) {
  //reset
  allFieldsAreValid = true;
  resetSuccessMessage();
  ev.preventDefault();

  inputsArray
    .filter((input) => input.name !== 'passwordConfirm')
    .forEach((field) => {
      if (!isValidInput(field, regexPatterns[field.name])) {
        showError(field);
      } else {
        field.classList.remove('error');
        updateDisplayErrorMessage(field, 'hidden');
      }
    });
  if (allFieldsAreValid && hasMatchingPasswords()) showSuccessMessage();
}

function isValidInput(field, regex) {
  if (!regex.test(field.value)) return false;
  return true;
}

function showError(field) {
  // skip optional phone number field if empty
  if (field.name === 'phonenumber' && field.value === '') return;
  allFieldsAreValid = false;
  field.className = 'error';
  updateDisplayErrorMessage(field, 'visible');
}

function updateDisplayErrorMessage(field, visibility) {
  const parentElement = field.parentElement;
  const errorMessage = parentElement.querySelector('.error-message');
  errorMessage.style.visibility = visibility;
  if (field.value === '') {
    errorMessage.textContent = errorMessages.required;
  } else {
    errorMessage.textContent = errorMessages[field.name];
  }
}

// to automatically add dashes as the user inputs phone number
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
  if (ev.target.value !== '' && !hasMatchingPasswords()) {
    errorMessages.passwordConfirm = '*Passwords do not match';
    updateDisplayErrorMessage(passwordConfirmField, 'visible');
  } else {
    errorMessages.passwordConfirm = '';
    updateDisplayErrorMessage(passwordConfirmField, 'hidden');
  }
}

function hasMatchingPasswords() {
  return passwordConfirmField.value === passwordField.value ? true : false;
}

function showSuccessMessage() {
  const successMessage = document.querySelector('#success');
  successMessage.textContent = 'Account created succesfully!';
  successMessage.style.visibility = 'visible';
}

function resetSuccessMessage() {
  const successMessage = document.querySelector('#success');
  successMessage.style.visibility = 'hidden';
}
