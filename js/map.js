// СПИСОК КОНСТАНТ
var ADS_NUBMER = 8; // Количество объектов-объявлений в сформированном массиве;
var MIN_X = 10;
var MAX_X = 1000;
var MIN_Y = 130;
var MAX_Y = 630;
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
var featureUnique = []; // Генерирую массив случайных особенностей;
var adsArray = []; // Массив объявлений. В него будут записаны сгенерированные объекты;
var similarAds = {}; // Обявление. Оъект в который будут записаны данные после выполнения цикла for;
var adsAll = createAd(ADS_NUBMER); // Созданный в функции массив объявлений с объектами;
// var mapPins = createPin(ADS_NUBMER); // Пины, выведенные на карту;

// Генерация случайного числа с округлением, полученное значение всегда меньше n;
function getRandom(n) {
  n = Math.floor(n * Math.random());
  return n;
}

// Генерация случайного числа между двумя значениями;
function getRandomDouble(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Генерация случайного списка удобств;
function getFeatureList(arr) {
  // Получаю массив случайных удобств;
  for (var i = 0; i < getRandom(FEATURES_LIST.length) + 1; i++) { // Цикл для записи случайных элементов в массив;
    featureUnique[i] = FEATURES_LIST[getRandom(FEATURES_LIST.length)]; // Записываю значение в массив: "wifi", "dishwasher", "parking"...
  }

  // Оставляю уникальные элементы массива удобств: "wifi", "dishwasher", "parking"...;
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

// Перетасовка элементов массива PHOTOS_RANDOM;
function shuffleArray(array) { // Алгоритм Фишера-Йейтса работает, выбирая один случайный элемент для каждого исходного элемента массива, а затем исключая его из следующего розыгрыша;
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// Генерация массива предложений;
function createAd(n) {
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
        description: '',
        features: getFeatureList(featureUnique), //Получаю из массива случайных особенностей массив с перемешанными случайным образом особенностями и случайной длины;
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

// Активация карты;
var mapActive = document.querySelector('.map');
var mapButton = document.querySelector('.map__pin--main');

function mapButtonClickHandler() {
  mapActive.classList.remove('map--faded'); // удалил класс, блокирующий карту;
  createPin(ADS_NUBMER);
  inputEnabled();
  // getPinElementsList();

  var pinElementClick0 = document.querySelector('.pin__0');
  var pinElementClick1 = document.querySelector('.pin__1');
  var pinElementClick2 = document.querySelector('.pin__2');
  var pinElementClick3 = document.querySelector('.pin__3');
  var pinElementClick4 = document.querySelector('.pin__4');
  var pinElementClick5 = document.querySelector('.pin__5');
  var pinElementClick6 = document.querySelector('.pin__6');
  var pinElementClick7 = document.querySelector('.pin__7');
  pinElementClick0.addEventListener('click', pinClickHandler0);
  pinElementClick1.addEventListener('click', pinClickHandler1);
  pinElementClick2.addEventListener('click', pinClickHandler2);
  pinElementClick3.addEventListener('click', pinClickHandler3);
  pinElementClick4.addEventListener('click', pinClickHandler4);
  pinElementClick5.addEventListener('click', pinClickHandler5);
  pinElementClick6.addEventListener('click', pinClickHandler6);
  pinElementClick7.addEventListener('click', pinClickHandler7);

  // Отрисовка карточки при клике на пин;
  function pinClickHandler0() {
    popupElement(0); // Вывел каточку поп-ап для первого (нулевого в массиве) объекта;
  }

  function pinClickHandler1() {
    popupElement(1); // Вывел каточку поп-ап для первого (нулевого в массиве) объекта;
  }

  function pinClickHandler2() {
    popupElement(2); // Вывел каточку поп-ап для первого (нулевого в массиве) объекта;
  }

  function pinClickHandler3() {
    popupElement(3); // Вывел каточку поп-ап для первого (нулевого в массиве) объекта;
  }

  function pinClickHandler4() {
    popupElement(4); // Вывел каточку поп-ап для первого (нулевого в массиве) объекта;
  }

  function pinClickHandler5() {
    popupElement(5); // Вывел каточку поп-ап для первого (нулевого в массиве) объекта;
  }

  function pinClickHandler6() {
    popupElement(6); // Вывел каточку поп-ап для первого (нулевого в массиве) объекта;
  }

  function pinClickHandler7() {
    popupElement(7); // Вывел каточку поп-ап для первого (нулевого в массиве) объекта;
  }
}
mapButton.addEventListener('mouseup', mapButtonClickHandler)

// // Нахожу созадные пины по классам pin-1, pin-2, pin-3 и т.д.;
// function getPinElementsList() {
//   var pinElementsList = document.querySelectorAll('.pin')
//   for (var i = 0; i < ADS_NUBMER; i++) {
//     pinElementsList[i].addEventListener('click', function() {
//       console.log('OK');
//     });
//   }
// }



// Определение координат кнопки-метки на карте;
function mapButtonPosition() {
  return {
    x: mapButton.offsetLeft,
    y: mapButton.offsetTop
  }
}

// Передача значения в поле формы Адрес;
var inputAddress = document.querySelector('#address');
inputAddress.value = 'По оси X: ' + mapButtonPosition().x + ', по оси Y: ' + mapButtonPosition().y;
console.log(mapButtonPosition());

// Отключение активности полей, до тех пор, пока неактивна квартира;
function inputDisabled() {
  var mapInputs = document.querySelectorAll('fieldset');
  for (var i = 0; i < mapInputs.length; i++) {
    mapInputs[i].disabled = true;
  }
  return mapInputs;
}
inputDisabled();

// Включение активности полей, до тех пор, пока после того, как активирована карта;

function inputEnabled() {
  var mapInputs = document.querySelectorAll('fieldset');
  for (var i = 0; i < mapInputs.length; i++) {
    mapInputs[i].disabled = false;
  }
  return mapInputs;
}

// Создание D0M-элементов на основе массива объектов adsAll;
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
    pinElement.classList.add('pin', 'pin__' + i); // Добавляю элементу класс, соответствующий его номеру;
    pinList.appendChild(pinElement); // Добавляю склонированный элемент в DocumentFragment;
  }
  return document.querySelector(".map__pins").appendChild(pinList); // Вставил созданный DocumentFragment в блок для меток;
}

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
function popupElement(i) { // В зависимости от i от 0 до 7, получаем соответствующий объект из созданного выше массива удобств;
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