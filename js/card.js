// card.js — модуль, который отвечает за создание карточки объявлений;

(function() {

  // СПИСОК КОНСТАНТ
  var TYPE_HOUSING_RU = {
    palace: "Дворец",
    flat: "Квартира",
    house: "Дом",
    bungalo: "Бунгало"
  };

  // Создение DOM-элементов для списка удобств;
  function featureCreateAll(featureCard) { // На вход нужно получить массив со списком удобств;
    var featureFragment = document.createDocumentFragment(); // Создаем фрагмент для вывода в карточку всех удобств;
    for (var i = 0; i < featureCard.length; i++) { // Создаем цикл для создания и добавления в DocumentFragment дом-элементов с нужными классами;
      var featureAdd = document.createElement('li'); // Создаем контейнер <li></li>;
      featureAdd.classList.add('feature'); // Созданному контейнеру li, задаю класс .feature;
      featureAdd.classList.add('feature--' + featureCard[i]); // Создаю класс feature__ + название элемента массива удобств;
      featureFragment.appendChild(featureAdd);
    }
    return featureFragment; // Возвращаем полученный DocumentFragment с созданными dom-элементами;
  }

  // Удаление всех дочерних элементов, описание на MDN: Node.removeChild "Удаление всех дочерних элементов";
  function removeChild(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  //Создание DOM-элементов для списка фотографий: одна фотография;
  function photoCreateAll(photoArr) { // На вход получаем массив со ссылками на фотографии;
    var photoTemplate = document.querySelector('template').content.querySelector('.popup__pictures'); // Получаем шаблон списка фотографий;
    var photoFragment = document.createDocumentFragment(); // Создаем DocumentFragment для вставки фотографий в список;
    for (var i = 0; i < photoArr.length; i++) { // Цикл для добавления в DocumentFragment дом-элементов <img></img> с заданными из массива src;
      var photoNew = photoTemplate.cloneNode(true); // Разметка для фотографий скопирована из шаблона;
      var photoElement = photoNew.querySelector('li'); // Найден элемент li;
      photoElement.querySelector('img').style.width = 50 + 'px'; // Задаем картике ширину 50 px;
      photoElement.querySelector('img').style.height = 50 + 'px'; // Задаем картинке высоту 50px;
      photoElement.querySelector('img').src = photoArr[i]; // Задаем картинке src соответствующий элементу в массиве со ссылками на фотографии;
      photoFragment.appendChild(photoElement); // Записываем полученный элемент li с img в DocumentFragment;
    }
    return photoFragment;
  }

  // Наполняю карточку объявлениями;
  window.popupElement = function(i) { // В зависимости от i от 0 до 7, получаем соответствующий объект из созданного выше массива удобств;
    var cardTemplate = document.querySelector("template").content.querySelector('.map__card'); // Отловил карточку (поп-ап) объявлениея;
    var popupCard = cardTemplate.cloneNode(true); // Склонировал карточку объявления;
    //Заменяю содержимое карточки данными из массива объектов;
    popupCard.querySelector('.popup__title').textContent = window.utils.adsAll[i].offer.title; // Заголовок объявления;
    popupCard.querySelector('.popup__text--address').textContent = window.utils.adsAll[i].offer.address; // Адрес;
    popupCard.querySelector('.popup__text--price').textContent = window.utils.adsAll[i].offer.price + ' ₽/ночь'; // Цена;
    popupCard.querySelector('.popup__type').textContent = TYPE_HOUSING_RU[window.utils.adsAll[i].offer.type]; // Тип жилья: нахожу тип жилья из массива TYPE_HOUSING и подставляю его в качестве ключа в объект TYPE_HOUSING_RU;
    popupCard.querySelector('.popup__text--capacity').textContent = window.utils.adsAll[i].offer.rooms + ' комнаты для ' + window.utils.adsAll[i].offer.guests + ' гостей.';
    popupCard.querySelector('.popup__text--time').textContent = 'Заезд после: ' + window.utils.adsAll[i].offer.checkin + ', Выезд до: ' + window.utils.adsAll[i].offer.checkout;
    removeChild(popupCard.querySelector('.popup__features')); // Удаляю дефолтный список удобств из шаблона;
    popupCard.querySelector('.popup__features').appendChild(featureCreateAll(window.utils.adsAll[i].offer.features)); // Добавляю список удобств на карточку;
    popupCard.querySelector('.popup__description').textContent = window.utils.adsAll[i].offer.description;
    removeChild(popupCard.querySelector('.popup__pictures')); // Удаляю дефолтный список элементов под фотографии из шаблона;
    popupCard.querySelector('.popup__pictures').appendChild(photoCreateAll(window.utils.adsAll[i].offer.photos)); // Вывожу в карточку фотографии;
    popupCard.querySelector('.popup__avatar').src = window.utils.adsAll[i].author.avatar;
    var newCard = window.marker.mapActive.appendChild(popupCard); // Добавил карточку на карту;
    return newCard;
  }

})();