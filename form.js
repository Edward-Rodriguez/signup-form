const nameRegex = /^[a-zA-Z]{1,256}$/;

const regexPatterns = {
  firstname: nameRegex,
  lastname: nameRegex,
  password: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
  email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
  phonenumber: /\d{3}[\)]\d{4}[\-]\d{4}/,
};

const errorMessages = {
  firstname: 'Please ',
};

const inputs = document.querySelectorAll('input');

inputs.forEach((input) => {
  input.addEventListener('keyup', (ev) => {
    console.log(ev);
    validateInput(ev.target, regexPatterns[ev.target.name]);
    console.log(input.name);
  });
});

function validateInput(field, regex) {
  if (!regex.test(field.value) && field.value !== '') {
    field.className = 'error';
  } else {
    field.classList.remove('error');
  }
}
