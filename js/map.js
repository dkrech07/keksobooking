var MARKER_WIDTH = 62;
var MARKER_HEIGHT = 82;
var PIN_WIDTH = 40;
var PIN_HEIGHT = 62;


// СПИСОК КЛАВИШ

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var isFocus = false;









// Перемещение маркера по карте;

mapButton.addEventListener('mousedown', function(evt) {

  // Проверяю, что карта еще не активна;
  if (pinsAdd === false) {
    mapActive.classList.remove('map--faded'); // удалил класс, блокирующий карту;
    createPin(ADS_NUBMER);
    inputEnabled('fieldset');
    inputEnabled('select');
    pinsAdd = true;
  }

  // При клике по маркеру, определяю стартовые координаты;
  // И объявляю переменную dragged;
  var startCoodrs = {
    x: evt.clientX,
    y: evt.clientY
  };

  // Переворачиваю координаты;
  reverseCoords(evt.clientX, evt.clientY);

  var dragged = false;

  // Перемещаю мышкой маркер по экрану;
  var onMouseMove = function(moveEvt) {
    moveEvt.preventDefault();
    dragged = true;

    var shift = {
      x: startCoodrs.x - moveEvt.clientX,
      y: startCoodrs.y - moveEvt.clientY
    };

    startCoodrs = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var mapButtonCoords = {
      y: mapButton.offsetTop - shift.y,
      x: mapButton.offsetLeft - shift.x
    }

    if (mapButtonCoords.x < moveLimits.left) {
      mapButtonCoords.x = moveLimits.left;
    } else if (mapButtonCoords.x > moveLimits.right) {
      mapButtonCoords.x = moveLimits.right;
    } else if (mapButtonCoords.y > moveLimits.bottom) {
      mapButtonCoords.y = moveLimits.bottom;
    } else if (mapButtonCoords.y < moveLimits.top) {
      mapButtonCoords.y = moveLimits.top;
    }

    mapButton.style.top = mapButtonCoords.y + 'px';
    mapButton.style.left = mapButtonCoords.x + 'px';

    var pos = reverseCoords(startCoodrs.x, startCoodrs.y);

    inputAddress.value = ('По оси X: ' + pos.x) + (', по оси Y: ' + pos.y);
  };

  // Обрабатываю событие отпускания кнопки мыши;

  var onMouseUp = function(upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      var onClickPreventDefault = function(evt) {
        evt.preventDefault();
        mapButton.removeEventListener('click', onClickPreventDefault)
      };
      mapButton.addEventListener('click', onClickPreventDefault);
    }
  };

  // Отлавливаю на документе события перемещения мыши и отпускания кнопки мыши;
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

});



// Включение активности полей, до тех пор, пока после того, как активирована карта;
function inputEnabled(selector) {
  var mapInputs = document.querySelectorAll(selector);
  for (var i = 0; i < mapInputs.length; i++) {
    mapInputs[i].disabled = false;
  }
  return mapInputs;
}

// Создание D0M-элементов (пинов) на основе массива объектов adsAll;
function createPin(n) {
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

// Проверяем открытий попап на наличие; Удаляем предыдущий попап, при открытии нового;
function removePopUp() {
  var mapElements = document.querySelector('.map');
  var popUp = document.querySelector('.map__card');
  if (popUp) {
    mapElements.removeChild(popUp);
  }
}

// Закрываю попап при нажатии на ESC;
function popupEscPressHandler(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    removePopUp();
  }
};

// Закрываю попап при нажатии на крестик 'popup__close';
function popUpCloseHandler(evt) {
  removePopUp();
}