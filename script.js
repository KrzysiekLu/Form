const form = document.querySelector(".form");
const confirmCloseBtn = document.querySelector(".confirm-container__btn-close");
const confirmContainer = document.querySelector(".confirm-container");
const overlay = document.querySelector(".contact__overlay");
const submitBtn = document.querySelector(".form__submit");

//inputs
const inputs = document.querySelectorAll(".form__input");

const inputName = document.querySelector(".form__name");
const inputPhone = document.querySelector(".form__phone");
const inputEmail = document.querySelector(".form__email");
const inputMessage = document.querySelector(".form__message");

let formErrors = [];

// vailidation functions

// validate name
const checkName = () => {
  const name = [...inputName.value];
  return name.length > 0
    ? true
    : (formErrors.push("Name field is empty"),
      inputName.classList.add("input-error"));
};

// validate phone
const phoneInput = window.intlTelInput(inputPhone, {
  utilsScript: "./node_modules/intl-tel-input/build/js/utils.js",
  initialCountry: "PL",
});

function checkPhone(e) {
  const phoneNumber = phoneInput.getNumber();
  if (phoneInput.isValidNumber(e)) {
    return true;
  } else {
    return false;
  }
}

// validate Email
const checkEmail = (mail) => {
  const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (inputEmail.value.match(mailFormat)) {
    return true;
  }
  return false;
};

// check phone and email
const checkContact = () => {
  // return checkEmail() || checkPhone()
  //   ? true
  //   : (false,
  //     formErrors.push("Please leave any contact to you "),
  //     inputPhone.classList.add("input-error-2"),
  //     inputEmail.classList.add("input-error-2"));

  if ((checkEmail(), checkPhone())) {
    return true;
  } else {
    formErrors.push("Please leave any contact to you "),
      inputPhone.classList.add("input-error-2"),
      inputEmail.classList.add("input-error-2");
    return false;
  }
};

//check message
const checkMessage = () => {
  const text = [...inputMessage.value];

  return text.length > 1
    ? true
    : (formErrors.push("Message field is empty "),
      inputMessage.classList.add("input-error"));
};

// reset warnings
const resetWarnings = () => {
  formErrors = [];
  inputs.forEach((input) => {
    input.classList.remove("input-error");
    input.classList.remove("input-error-2");
  });
};

// showing and hiding confirmation message
const showHideConfirmMessage = () => {
  confirmContainer.classList.toggle("confirm-active");
  overlay.classList.toggle("overlay-active");
};

//validate all contitions
const validate = () => {
  if ((checkName(), checkContact())) {
    return checkMessage() ? true : false;
  } else {
    checkMessage();
    return false;
  }
};

// listener for close button in confirm message
confirmCloseBtn.addEventListener("click", () => showHideConfirmMessage());

//listener for submit button
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  resetWarnings();
  if (validate()) {
    showHideConfirmMessage();
  }

  console.log(formErrors);

  //   showHideConfirmMessage();
});
