// marker.js — модуль, который отвечает за перемещение маркера — метки на карте;

(function() {

  var MAP_BUTTON_WIDTH = 100;
  var MAP_BUTTON_HEIGHT = 100;

  // Активация карты;
  var mapActive = document.querySelector('.map');
  var mapButton = document.querySelector('.map__pin--main');
  var mapWrapper = document.querySelector('.map__pins');
  var pinsAdd = false;

  // Задаю ограничения для перемещения маркера
  var moveLimits = {
    top: 150,
    bottom: 650,
    left: 25,
    right: 1175
  }

  var {
    bottom,
    left
  } = mapWrapper.getBoundingClientRect()

  // Переворачиваю координаты (делаю отсчет с левого нижнего угла);
  function reverseCoords(x, y) {
    return {
      x: x - left,
      y: bottom - y
    }
  }

  // Передача значения в поле формы Адрес;
  var inputAddress = document.querySelector('#address');

  // Определение координат большой кнопки-метки на карте;
  function mapButtonPosition() {
    return {
      x: mapButton.offsetLeft + MAP_BUTTON_WIDTH / 2,
      y: mapButton.offsetTop + MAP_BUTTON_WIDTH / 2
    }
  }

  inputAddress.value = 'По оси X: ' + mapButtonPosition().x + ', по оси Y: ' + mapButtonPosition().y;

  // Перемещение маркера по карте;
  mapButton.addEventListener('mousedown', function(evt) {

    // Проверяю, что карта еще не активна;
    if (pinsAdd === false) {
      mapActive.classList.remove('map--faded'); // удалил класс, блокирующий карту;
      createPin(window.data.adsNumber);
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

})();