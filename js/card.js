// card.js — модуль, который отвечает за создание карточки объявлений;

(function() {

  // Наполняю карточку объявлениями;
  window.popupElement = function(i) { // В зависимости от i от 0 до 7, получаем соответствующий объект из созданного выше массива удобств;
    var cardTemplate = document.querySelector("template").content.querySelector('.map__card'); // Отловил карточку (поп-ап) объявлениея;
    var popupCard = cardTemplate.cloneNode(true); // Склонировал карточку объявления;
    //Заменяю содержимое карточки данными из массива объектов;
    popupCard.querySelector('.popup__title').textContent = adsAll[i].offer.title; // Заголовок объявления;
    popupCard.querySelector('.popup__text--address').textContent = adsAll[i].offer.address; // Адрес;
    popupCard.querySelector('.popup__text--price').textContent = adsAll[i].offer.price + ' ₽/ночь'; // Цена;
    popupCard.querySelector('.popup__type').textContent = TYPE_HOUSING_RU[adsAll[i].offer.type]; // Тип жилья: нахожу тип жилья из массива TYPE_HOUSING и подставляю его в качестве ключа в объект TYPE_HOUSING_RU;
    popupCard.querySelector('.popup__text--capacity').textContent = adsAll[i].offer.rooms + ' комнаты для ' + adsAll[i].offer.guests + ' гостей.';
    popupCard.querySelector('.popup__text--time').textContent = 'Заезд после: ' + adsAll[i].offer.checkin + ', Выезд до: ' + adsAll[i].offer.checkout;
    removeChild(popupCard.querySelector('.popup__features')); // Удаляю дефолтный список удобств из шаблона;
    popupCard.querySelector('.popup__features').appendChild(featureCreateAll(adsAll[i].offer.features)); // Добавляю список удобств на карточку;
    popupCard.querySelector('.popup__description').textContent = adsAll[i].offer.description;
    removeChild(popupCard.querySelector('.popup__pictures')); // Удаляю дефолтный список элементов под фотографии из шаблона;
    popupCard.querySelector('.popup__pictures').appendChild(photoCreateAll(adsAll[i].offer.photos)); // Вывожу в карточку фотографии;
    popupCard.querySelector('.popup__avatar').src = adsAll[i].author.avatar;
    var newCard = mapActive.appendChild(popupCard); // Добавил карточку на карту;
    return newCard;
  }

  // Проверяем открытий попап на наличие; Удаляем предыдущий попап, при открытии нового;
  window.removePopUp = function() {
    var mapElements = document.querySelector('.map');
    var popUp = document.querySelector('.map__card');
    if (popUp) {
      mapElements.removeChild(popUp);
    }
  }

  // Закрываю попап при нажатии на ESC;
  window.popupEscPressHandler = function(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      removePopUp();
    }
  };

  // Закрываю попап при нажатии на крестик 'popup__close';
  window.popUpCloseHandler = function(evt) {
    removePopUp();
  }

})();