// pin.js — модуль, который отвечает за вывод пинов на карте;

(function() {

  // Создание D0M-элементов (пинов) на основе массива объектов adsAll;
  window.createPin = function(n) {
    var pinTemplate = document.querySelector('template').content.querySelector('.map__pin'); // Взял за основу разметку пина из template;
    var pinList = document.createDocumentFragment(); // Фрагмент для новыйх пинов;
    for (var i = 0; i < n; i++) { // Цикл для добавления Пинов в DocumentFragment;
      var pinElement = pinTemplate.cloneNode(true); // Клонирую элемент из разметки;

      // Меняею атрибуты через DOM API: cвойства style, src, alt;
      pinElement.style.left = (adsAll[i].location.x - PIN_WIDTH / 2) + 'px';
      pinElement.style.top = (adsAll[i].location.y - PIN_HEIGHT) + 'px';
      pinElement.querySelector('img').src = adsAll[i].author.avatar;
      pinElement.querySelector('img').alt = adsAll[i].offer.title;
      pinElement.id = i;
      pinList.appendChild(pinElement); // Добавляю склонированный элемент в DocumentFragment;

      // Отлавливаю событие клика на пине;
      pinElement.addEventListener('click', pinClickHandler);
      // Отлавливаю событие нажатия ENTER на пине;
      pinElement.addEventListener('keydown', function(evt) {
        if (evt === ENTER_KEYCODE) {
          pinClickHandler;
        }
      });

      // Отлавливаю нажатие на ESC;
      document.addEventListener('keydown', popupEscPressHandler);

      function pinClickHandler(evt) {
        var target = evt.currentTarget; // Передаем значение из evt в переменную target;
        var targetNumber = target.id; // Получаем значение из is-элемента (button) по которому произвели клик;
        removePopUp()
        popupElement(targetNumber);

        // Отливливаю клик на крестик на попапе 'popup__close';
        var popUpClose = document.querySelector('.popup__close');
        popUpClose.addEventListener('click', popUpCloseHandler); // Закрытие попапа по клику;
        popUpClose.addEventListener('keydown', function(evt) { // Закрытие попапа по нажатию на крестик с помощью ENTER;
          if (evt === ENTER_KEYCODE) {
            popUpCloseHandler;
          }
        });
      }
    }
    return document.querySelector(".map__pins").appendChild(pinList); // Вставил созданный DocumentFragment в блок для меток;
  }

})();