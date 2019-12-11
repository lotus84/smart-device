'use strict';
var buttonCall = document.querySelector('.btn--call');
var popupForm = document.querySelector('.modal-form');
var popupClose = popupForm.querySelector('.modal-form__btn-close');
var form = popupForm.querySelector('form');
var nameInput = popupForm.querySelector('[name=name]');
var phoneInput = popupForm.querySelector('[name=phone]');
var messageInput = popupForm.querySelector('[name=question]');
var overlay = document.querySelector('.overlay');

var openPopup = function () {
  popupForm.classList.add('modal--show');
  overlay.classList.add('overlay--show');
  nameInput.focus();
  var scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
  var body = document.body;
  body.style.position = 'fixed';
  body.style.top = `-${scrollY}`;
};

var closePopup = function () {
  var body = document.body;
  var scrollY = body.style.top;
  body.style.position = '';
  body.style.top = '';
  window.scrollTo(0, parseInt(scrollY || '0') * -1);
  popupForm.classList.remove('modal--show');
  overlay.classList.remove('overlay--show');
};

if (buttonCall && overlay) {
  buttonCall.addEventListener('click', function (evt) {
    evt.preventDefault();
    openPopup();
  });
}

if (popupClose) {
  popupClose.addEventListener('click', function () {
    closePopup();
  });
}

if (overlay) {
  overlay.addEventListener('click', function () {
    closePopup();
  });
}

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popupForm.classList.contains('modal--show')) {
      closePopup();
    }
  }
});

window.addEventListener('scroll', function () {
  document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
});

form.addEventListener('submit', function () {
  localStorage.setItem('userName', nameInput.value);
  localStorage.setItem('userMessage', messageInput.value);
  localStorage.setItem('userPhone', phoneInput.value);
});

// Аккордеон в футере на мобильной версии

var accordionToggles = Array.from(document.querySelectorAll('.footer__toggle'));
var accordionContentPanels = Array.from(document.querySelectorAll('.footer__list'));

var addClass = function (el, className) {
  el.classList.add(className);
};

var removeClass = function (el, className) {
  el.classList.remove(className);
};

var toggleAccordion = function (e) {
  accordionContentPanels.forEach(function(content) {
    if (content.previousElementSibling === e.target) {
      removeClass(content.previousElementSibling, 'footer__toggle--inactive');
      addClass(content.previousElementSibling, 'footer__toggle--active');
      removeClass(content, 'footer__list--hidden');

    } else {
      removeClass(content.previousElementSibling, 'footer__toggle--active');
      addClass(content.previousElementSibling, 'footer__toggle--inactive');
      addClass(content, 'footer__list--hidden');
    }
  });
};

accordionToggles.forEach(function(it) {
  it.addEventListener('click', toggleAccordion);
});

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


// Маска для поля ввода номера телефона

var telInputs = Array.from(document.querySelectorAll('input[type=tel]'));
var maskOptions = {
  mask: '+{7}(000)000-00-00'
};

for (var k = 0; k < telInputs.length; k++) {
  var mask = new IMask(telInputs[k], maskOptions);
}
