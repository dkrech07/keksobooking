// СПИСОК КОНСТАНТ
var ADS_NUBMER = 8; // Количество объектов-объявлений в сформированном массиве;
var MIN_X = 10;
var MAX_X = 1000;
var MIN_Y = 10;
var MAX_Y = 600;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var ROOMS_NUMBER = 5;
var GUESTS_NUMBER = 10;
var PIN_WIDTH = 40;
var PIN_HEIGHT = 62;

// СПИСОК МАССИВОВ И ОБЪЕКТОВ
var DESCRIPTION_APARTAMENT = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый гостевой домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
var TYPE_HOUSING = ["palace", "flat", "house", "bungalo"];
var CHECK_IN = ["12:00", "13:00", "14:00"];
var CHECK_OUT = ["12:00", "13:00", "14:00"];
var FEATURES_LIST = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var PHOTOS_RANDOM = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
var TYPE_HOUSING_RU = {
  palace: "Дворец",
  flat: "Квартира",
  house: "Дом",
  bungalo: "Бунгало"
};

// СПИСОК ПЕРЕМЕННЫХ
var featureList = []; // Генерирую массив случайных особенностей;
var adsArray = []; // Массив объявлений. В него будут записаны сгенерированные объекты;
var similarAds = {}; // Обявление. Оъект в который будут записаны данные после выполнения цикла for;

// СПИСОК ФУНКЦИЙ
function getRandom(n) { // Генерация случайного числа с округлением, полученное значение всегда меньше n;
  n = Math.floor(n * Math.random());
  return n;
}

function getRandomDouble(min, max) { // Генерация случайного числа между двумя значениями;
  return Math.floor(Math.random() * (max - min) + min);
}

for (var i = 0; i < getRandom(FEATURES_LIST.length) + 1; i++) { // Цикл для записи случайных элементов в массив;
  featureList[i] = (FEATURES_LIST[getRandom(FEATURES_LIST.length)]); // Получаю массив случайных удобств: "wifi", "dishwasher", "parking"...;
}

function featureListUnique(arr) { // Оставить уникальные элементы массива удобств: "wifi", "dishwasher", "parking"...;
  var result = [];
  nextInput:
    for (var i = 0; i < arr.length; i++) {
      var str = arr[i]; // для каждого элемента
      for (var j = 0; j < result.length; j++) { // ищем, был ли он уже?
        if (result[j] == str) continue nextInput; // если да, то следующий
      }
      result.push(str);
    }
  return result;
}

function shuffleArray(array) { // Алгоритм Фишера-Йейтса работает, выбирая один случайный элемент для каждого исходного элемента массива, а затем исключая его из следующего розыгрыша;
  for (var i = array.length - 1; i > 0; i--) { // Использую его для перетасовки элементов массива PHOTOS_RANDOM;
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function createAd(n) { // Функция генерации предложения;
  for (var i = 0; i < n; i++) { //Цикл пробегает по объекту от i до i < ADS_NUBMER, 8 = 0,1,2,3,4,5,6,7;

    var locationX = getRandomDouble(MIN_X, MAX_X); // На основе максимальной и минимальной координаты, герерирую случайную координату X;
    var locationY = getRandomDouble(MIN_Y, MAX_Y); // На основе максимальной и минимальной координаты, герерирую случайную координату Y;

    similarAds = {
      author: {
        avatar: "img/avatars/user0" + (i + 1) + ".png"
      },
      offer: {
        title: DESCRIPTION_APARTAMENT[i],
        address: locationX + ", " + locationY,
        price: getRandomDouble(MIN_PRICE, MAX_PRICE), // Получил случайную минимальную и максимальную цену;
        type: TYPE_HOUSING[getRandom(TYPE_HOUSING.length)], // Получил случайный тип жилья, основываясь на длине массива со списоком типов жилья;
        rooms: getRandom(ROOMS_NUMBER) + 1, // Количество комнат: Получив значение 5, getRandom выдаст число от 0 до 4. Чтобы получить число от 1 до 5, прибавляю 1;
        guests: getRandom(GUESTS_NUMBER) + 1, // Количество гостей;
        checkin: CHECK_IN[getRandom(CHECK_IN.length)], // Случайное время заезда, формируется из массива CHECK_IN;
        checkout: CHECK_OUT[getRandom(CHECK_OUT.length)], // Случайное время выезда, формируется из массива CHECK_OUT;
        features: featureListUnique(featureList), //Получаю из массива случайных особенностей массив с перемешанными случайным образом особенностями и случайной длины;
        photos: shuffleArray(PHOTOS_RANDOM) //С помощью алгоритма Фишера-Йейтса получаю массив с перетасованными элементами;
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
    adsArray[i] = similarAds; // Кладу созданный объект в массив;
  }
  return adsArray; // Возвращаю заполненный после выполнения цикла массиив;
}

var adsAll = createAd(ADS_NUBMER); // Созданный в функции массив объявлений с объектами;

// Активация карты;
var mapActive = document.querySelector('.map');
mapActive.classList.remove('map--faded');

// Создание D0M-элементов на основе массива объектов adsAll;
var pinTemplate = document.querySelector('template').content.querySelector('.map__pin'); // Взял за основу разметку пина из template;
var pinList = document.createDocumentFragment(); // Фрагмент для новыйх пинов;

for (var i = 0; i < ADS_NUBMER; i++) { // Цикл для добавления Пинов в DocumentFragment;

  var pinElement = pinTemplate.cloneNode(true); // Клонирую элемент из разметки;

  // Меняею атрибуты через DOM API: cвойства style, src, alt;
  pinElement.style.left = (adsAll[i].location.x - PIN_WIDTH / 2) + 'px';
  pinElement.style.top = (adsAll[i].location.y - PIN_HEIGHT) + 'px';
  pinElement.querySelector('img').src = adsAll[i].author.avatar;
  pinElement.querySelector('img').alt = adsAll[i].offer.title;

  // Еще могу поменять атрибуты через setAttribute; - но не использую этот способ)))
  // pinElement.setAttribute('style', 'left: ' + adsAll[i].location.x + 'px; ' + 'top: ' + adsAll[i].location.y + 'px');
  // pinElement.querySelector('img').setAttribute('src', adsAll[i].author.avatar);
  // pinElement.querySelector('img').setAttribute('alt', adsAll[i].offer.title);

  pinList.appendChild(pinElement); // Добавляю склонированный элемент в DocumentFragment;
}

var mapPins = document.querySelector(".map__pins").appendChild(pinList); // Вставил созданный DocumentFragment в блок для меток;

// Создение DOM-элементов для списка удобств;

function featureCreate() {
  var featureTemplate = document.querySelector('template').content.querySelector('.popup__features'); // Отловил блок с удобствами;
  var featureElement = featureTemplate.cloneNode(true); // Склонировал шаблон блока с удобствами (без внетренного наполнения)
  var featureFragment = document.createDocumentFragment(); // Создал фразмент для записи новых преимуществ <li></li> и добавления из в список преимуществ <ul></ul>;
  var featureNew = document.createElement("li"); // Создал элемент li для записи во фрагмент
  featureNew.classList.add('feature', 'feature--wifi'); // Добавил класс;
  featureFragment.appendChild(featureNew); // Добавляю созданное преимущество в DocumentFragment;
  return featureFragment;
}

console.log(featureCreate());

// Наполняю карточку объявлениями;
function popupElement(i) {
  var cardTemplate = document.querySelector("template").content.querySelector('.map__card'); // Отловил карточку (поп-ап) объявлениея;
  var popupCard = cardTemplate.cloneNode(true); // Склонировал карточку объявления;

  //Заменяю содержимое карточки данными из массива объектов;
  popupCard.querySelector('.popup__title').textContent = adsAll[i].offer.title; // Заголовок объявления;
  popupCard.querySelector('.popup__text--address').textContent = adsAll[i].offer.address; // Адрес;
  popupCard.querySelector('.popup__text--price').textContent = adsAll[i].offer.price + ' ₽/ночь'; // Цена;
  popupCard.querySelector('.popup__type').textContent = TYPE_HOUSING_RU[adsAll[i].offer.type]; // Тип жилья: нахожу тип жилья из массива TYPE_HOUSING и подставляю его в качестве ключа в объект TYPE_HOUSING_RU;
  popupCard.querySelector('.popup__text--capacity').textContent = adsAll[i].offer.rooms + ' комнаты для ' + adsAll[i].offer.guests + ' гостей.';
  popupCard.querySelector('.popup__text--time').textContent = 'Заезд после: ' + adsAll[i].offer.checkin + ', Выезд до: ' + adsAll[i].offer.checkout;

  popupCard.querySelector('.popup__features').appendChild(featureCreate());
  var newCard = mapActive.appendChild(popupCard); // Добавил карточу на карту;
  return newCard;
}

popupElement(0); // Вывел каточку поп-ап для первого (нулевого в массиве) объекта;