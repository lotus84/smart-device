'use strict';
var buttonCall = document.querySelector('.btn--call');
var popupForm = document.querySelector('.modal-form');
var popupClose = popupForm.querySelector('.modal-form__btn-close');
var form = popupForm.querySelector('form');
var nameInput = popupForm.querySelector('[name=name]');
var phoneInput = popupForm.querySelector('[name=phone]');
var messageInput = popupForm.querySelector('[name=question]');
var overlay = document.querySelector('.modal__overlay');
var toggles = document.querySelectorAll('.footer__toggle');

if (buttonCall && overlay) {
  buttonCall.addEventListener('click', function (evt) {
    evt.preventDefault();
    popupForm.classList.add('modal--show');
    overlay.classList.add('modal__overlay--show');
    nameInput.focus();
  });
}

if (popupClose) {
  popupClose.addEventListener('click', function () {
    popupForm.classList.remove('modal--show');
    overlay.classList.remove('modal__overlay--show');
  });
}

if (overlay) {
  overlay.addEventListener('click', function () {
    popupForm.classList.remove('modal--show');
    overlay.classList.remove('modal__overlay--show');
  });
}

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popupForm.classList.contains('modal--show')) {
      popupForm.classList.remove('modal--show');
      overlay.classList.remove('modal__overlay--show');
    }
  }
});

form.addEventListener('submit', function () {
  localStorage.setItem('userName', nameInput.value);
  localStorage.setItem('userMessage', messageInput.value);
  localStorage.setItem('userPhone', phoneInput.value);
});

if (toggles) {
  for (var i = 0; i < toggles.length; i++) {
    toggles[i].addEventListener('click', function () {
      this.classList.toggle('.footer__toggle--active');
      var panel = this.nextElementSibling;
      if (panel.style.display === 'block') {
        panel.style.display = 'none';
      } else {
        panel.style.display = 'block';
      }
    });
  }
}
