'use strict';
var buttonCall = document.querySelector('.btn--call');
var popupForm = document.querySelector('.modal-form');
var popupClose = popupForm.querySelector('.modal-form__btn-close');
var form = popupForm.querySelector('form');
var nameInput = popupForm.querySelector('[name=name]');
var phoneInput = popupForm.querySelector('[name=phone]');
var messageInput = popupForm.querySelector('[name=question]');
var overlay = document.querySelector('.modal__overlay');

if (buttonCall && overlay) {
  buttonCall.addEventListener('click', function(evt) {
    evt.preventDefault();
    popupForm.classList.add('modal--show');
    overlay.classList.add('modal__overlay--show')
    nameInput.focus();
  })
}

if (popupClose) {
  popupClose.addEventListener('click', function() {
    popupForm.classList.remove('modal--show');
    overlay.classList.remove('modal__overlay--show');
  })
}

if (overlay) {
  overlay.addEventListener('click', function() {
    popupForm.classList.remove('modal--show');
    overlay.classList.remove('modal__overlay--show');
  })
}

window.addEventListener('keydown', function(evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popupForm.classList.contains('modal--show')) {
      popupForm.classList.remove('modal--show');
      overlay.classList.remove('modal__overlay--show');
    }
  }
})

form.addEventListener("submit", function () {
    localStorage.setItem("userName", nameInput.value);
    localStorage.setItem("userPhone", phoneInput.value);
    localStorage.setItem("userMessage", messageInput.value);
  })
