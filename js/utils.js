// data.js — модуль, который создаёт данные;
// Функции и используемые в них переменные/константы;

(function() {

  // СПИСОК КОНСТАНТ
  window.ADS_NUBMER = 8; // Количество объектов-объявлений в сформированном массиве;
  var MIN_X = 80;
  var MAX_X = 1000;
  var MIN_Y = 200;
  var MAX_Y = 630;
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var ROOMS_NUMBER = 5;
  var GUESTS_NUMBER = 10;

  // СПИСОК МАССИВОВ И ОБЪЕКТОВ
  var DESCRIPTION_APARTAMENT = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый гостевой домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
  var TYPE_HOUSING = ["palace", "flat", "house", "bungalo"];
  var CHECK_IN = ["12:00", "13:00", "14:00"];
  var CHECK_OUT = ["12:00", "13:00", "14:00"];
  var FEATURES_LIST = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
  var PHOTOS_RANDOM = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

  // СПИСОК ПЕРЕМЕННЫХ
  var featureUnique = []; // Генерирую массив случайных особенностей;
  var adsArray = []; // Массив объявлений. В него будут записаны сгенерированные объекты;
  var similarAds = {}; // Обявление. Оъект в который будут записаны данные после выполнения цикла for;

  // ЭКСПОРТИРУЕМОЕ ЗНАЧЕНИЕ;
  window.adsAll = createAd(window.ADS_NUBMER); // Созданный в функции массив объявлений с объектами;

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

})();