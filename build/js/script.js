'use strict';
var buttonCall = document.querySelector('.btn--call');
var popupForm = document.querySelector('.modal-form');
var popupClose = popupForm.querySelector('.modal-form__btn-close');
var form = popupForm.querySelector('form');
var nameInput = popupForm.querySelector('[name=name]');
var phoneInput = popupForm.querySelector('[name=phone]');
var messageInput = popupForm.querySelector('[name=question]');
var overlay = document.querySelector('.overlay');
var toggles = document.querySelectorAll('.footer__toggle');

if (buttonCall && overlay) {
  buttonCall.addEventListener('click', function (evt) {
    evt.preventDefault();
    popupForm.classList.add('modal--show');
    overlay.classList.add('overlay--show');
    nameInput.focus();
  });
}

if (popupClose) {
  popupClose.addEventListener('click', function () {
    popupForm.classList.remove('modal--show');
    overlay.classList.remove('overlay--show');
  });
}

if (overlay) {
  overlay.addEventListener('click', function () {
    popupForm.classList.remove('modal--show');
    overlay.classList.remove('overlay--show');
  });
}

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popupForm.classList.contains('modal--show')) {
      popupForm.classList.remove('modal--show');
      overlay.classList.remove('overlay--show');
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

// Плавный скролл страницы до якорной ссылки

var anchorLinks = document.querySelectorAll('a[href^="#"]');
var smoothScroll = function (evt) {
  evt.preventDefault();
  var targetId = evt.currentTarget.getAttribute('href');
  var targetPosition = document.querySelector(targetId).offsetTop;
  var startPosition = window.pageYOffset;
  var distance = targetPosition - startPosition;
  var duration = 2000;
  var start = null;
  var step = function (timestamp) {
    if (!start) {
      start = timestamp;
    }
    var progress = timestamp - start;
    window.scrollTo(0, easeInOutQuad(progress, startPosition, distance, duration));
    if (progress < duration) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
};
var easeInOutQuad = function (t, b, c, d) {
  t /= d / 2;
  if (t < 1) {
    return c / 2 * t * t + b;
  }
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};

for (var j = 0; j < anchorLinks.length; j++) {
  anchorLinks[j].addEventListener('click', function (evt) {
    smoothScroll(evt);
  });
}
