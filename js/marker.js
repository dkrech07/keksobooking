// marker.js — модуль, который отвечает за перемещение маркера — метки на карте;

(function() {

  var MAP_BUTTON_WIDTH = 100;
  var MAP_BUTTON_HEIGHT = 100;

  // Активация карты;
  var mapButton = document.querySelector('.map__pin--main');
  var mapWrapper = document.querySelector('.map__pins');
  var pinsAdd = false;

  // ЭКСПОРТИРУЕМЫЕ ЗНАЧЕНИЯ;
  window.marker = {
    mapActive: document.querySelector('.map')
  }

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

  // Передаю стартовые координаты маркера в поле формы;
  inputAddress.value = 'По оси X: ' + mapButtonPosition().x + ', по оси Y: ' + mapButtonPosition().y;


})();