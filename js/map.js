getRandom // СПИСОК КОНСТАНТ
var ADS_NUBMER = 8; // Количество объявлений в сформированном массиве;
var LOCATION_X = 600;
var LOCATION_Y = 1000;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var ROOMS_NUMBER = 5;
var GUESTS_NUMBER = 10;

// СПИСОК ПЕРЕМЕННЫХ

// СПИСОК МАССИВОВ И ОБЪЕКТОВ
var DESCRIPTION_APARTAMENT = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый гостевой домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
var TYPE_HOUSING = ["palace", "flat", "house", "bungalo"];
var CHECK_IN = ["12:00", "13:00", "14:00"];
var CHECK_OUT = ["12:00", "13:00", "14:00"];
var FEATURES_LIST = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];

var randomPhotos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

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

function createAd(n) { // Функция генерации предложения;
  for (var i = 0; i < n; i++) { //Цикл пробегает по объекту от i до i < ADS_NUBMER, 8 = 0,1,2,3,4,5,6,7;
    similarAds = {
      author: {
        avatar: "../img/avatar/user0" + i + ".png"
      },
      offer: {
        title: DESCRIPTION_APARTAMENT[i],
        address: getRandom(LOCATION_X) + ", " + getRandom(LOCATION_Y),
        price: getRandomDouble(MIN_PRICE, MAX_PRICE), // Получил случайную минимальную и максимальную цену;
        type: TYPE_HOUSING[getRandom(TYPE_HOUSING.length)], // Получил случайный тип жилья, основываясь на длине массива со списоком типов жилья;
        rooms: getRandom(ROOMS_NUMBER) + 1, // Количество комнат: Получив значение 5, getRandom выдаст число от 0 до 4. Чтобы получить число от 1 до 5, прибавляю 1;
        guests: getRandom(GUESTS_NUMBER) + 1, // Количество гостей;
        checkin: CHECK_IN[getRandom(CHECK_IN.length)], // Случайное время заезда, формируется из массива CHECK_IN;
        checkout: CHECK_OUT[getRandom(CHECK_OUT.length)], // Случайное время выезда, формируется из массива CHECK_OUT;
        features: FEATURES_LIST[FEATURES_LIST.length]
      }
    };
    adsArray[i] = similarAds; // Кладу созданный объект в массив;
  }
  return adsArray; // Возвращаю заполненный после выполнения цикла массиив;
}

var adsAll = createAd(ADS_NUBMER); // Созданный в функции массив объявлений с объектами;

console.log("Список преимуществ: " + FEATURES_LIST[getRandom(FEATURES_LIST.length)]);
console.log(getRandom(LOCATION_X));
console.log(getRandom(LOCATION_Y));
console.log(adsArray);
console.log(adsArray[1]);
console.log('Мин и Макс цена: ' + getRandomDouble(MIN_PRICE, MAX_PRICE));
console.log(getRandom(GUESTS_NUMBER) + 1);
console.log('Время заезда: ' + CHECK_IN[getRandom(CHECK_IN.length)]);
console.log('Время выезда: ' + CHECK_OUT[getRandom(CHECK_OUT.length)]);
// console.log('Средняя цена: ' + randomPrice);