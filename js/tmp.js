// Активация карты;
var mapActive = document.querySelector('.map');
var mapButton = document.querySelector('.map__pin--main');
var pinsAdd = false;

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

    mapButton.style.top = (mapButton.offsetTop - shift.y) + 'px';
    mapButton.style.left = (mapButton.offsetLeft - shift.x) + 'px';
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