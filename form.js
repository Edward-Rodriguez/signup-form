const nameRegex = /^[a-zA-Z]{1,256}$/;
const passwordRegex =
  /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

const regexPatterns = {
  firstname: nameRegex,
  lastname: nameRegex,
  password: passwordRegex,
  passwordConfirm: passwordRegex,
  email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
  phonenumber: /\d{3}[\)]\d{4}[\-]\d{4}/,
};

const errorMessages = {
  firstname: { missing: 'First ' },
};

const inputs = document.querySelectorAll('input');

// inputs.forEach((input) => {
//   input.addEventListener('click', (ev) => {
//     validateInput(ev.target, regexPatterns[ev.target.name]);
//     console.log(input.name);
//   });
// });

// function validateInput(field, regex) {
//   if (!regex.test(field.value) && field.value !== '') {
//     field.className = 'error';
//   } else {
//     field.classList.remove('error');
//   }
// }

const submitButton = document.querySelector("button[type='submit']");
submitButton.addEventListener('click', (ev) => onSubmit(ev));

function isValidInput(field, regex) {
  if (!regex.test(field.value) && field.value !== '') return false;
  return true;
}

// function validateInputs() {
//   inputs.forEach((field) => {
//     const regex = regexPatterns[field.name];
//     if (!regex.test(field.value) && field.value !== '') {
//       field.className = 'error';
//     } else {
//       field.classList.remove('error');
//     }
//   });
// }

/**
 * function onSubmit
 * Create a list of the input elements
 * iterate through each element
 * call 'validateInput(element, regexPattern)' function
 * if invalid call function 'showError(element)'
 */
function onSubmit(ev) {
  ev.preventDefault();
  inputs.forEach((field) => {
    if (!isValidInput(field, regexPatterns[field.name])) {
      showError(field);
    } else {
      field.classList.remove('error');
    }
  });
}

function showError(field) {
  if (field.name === 'phonenumber' && field.value !== '') return;
  field.className = 'error';
}
