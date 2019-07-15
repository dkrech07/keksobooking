// data.js — модуль, который создаёт данные;

(function() {

  // СПИСОК КОНСТАНТ
  window.ADS_NUBMER = 8; // Количество объектов-объявлений в сформированном массиве;
  window.MIN_X = 80;
  window.MAX_X = 1000;
  window.MIN_Y = 200;
  window.MAX_Y = 630;
  window.MIN_PRICE = 1000;
  window.MAX_PRICE = 1000000;
  window.ROOMS_NUMBER = 5;
  window.GUESTS_NUMBER = 10;
  window.MARKER_WIDTH = 62;
  window.MARKER_HEIGHT = 82;
  window.PIN_WIDTH = 40;
  window.PIN_HEIGHT = 62;
  window.MAP_BUTTON_WIDTH = 100;
  window.MAP_BUTTON_HEIGHT = 100;

  // СПИСОК КЛАВИШ
  window.ESC_KEYCODE = 27;
  window.ENTER_KEYCODE = 13;

  // СПИСОК МАССИВОВ И ОБЪЕКТОВ
  window.DESCRIPTION_APARTAMENT = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый гостевой домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
  window.TYPE_HOUSING = ["palace", "flat", "house", "bungalo"];
  window.CHECK_IN = ["12:00", "13:00", "14:00"];
  window.CHECK_OUT = ["12:00", "13:00", "14:00"];
  window.FEATURES_LIST = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
  window.PHOTOS_RANDOM = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
  window.TYPE_HOUSING_RU = {
    palace: "Дворец",
    flat: "Квартира",
    house: "Дом",
    bungalo: "Бунгало"
  };

})();