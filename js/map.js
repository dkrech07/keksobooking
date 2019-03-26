var adsNumber = 8; // Количество объявлений
var locationX = 600;
var locationY = 1000;
var minPrice = 1000;
var maxPrice = 1000000;

randomNumber(locationX); // Получил случайную координату X;
randomNumber(locationY); // Получил случайную координату Y;
getRandomFloat(minPrice, maxPrice); // Получил случайную минимальную и максимальную цену

var descriptionApartament = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый гостевой домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
var randomPhotos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

var adsArray = []; // Массив объявлений. В него будут записаны сгенерированные объекты.
var similarAds = {}; // Обявление. Оъект в который будут записаны данные после выполнения цикла for;

function randomNumber(n) { // Генерация случайного числа с округлением, не больше n;
  n = Math.floor(n * Math.random());
  return n;
}

function getRandomFloat(min, max) { // Генерация случайного числа между двумя значениями;
  return Math.floor(Math.random() * (max - min) + min);
}

function createAd(n) { // Функция генерации предложения
  for (var i = 0; i < n; i++) { //Цикл пробегает по объекту от i до i < adsNumber, 8 = 0,1,2,3,4,5,6,7;
    similarAds = {
      author: {
        avatar: "../img/avatar/user0" + i + ".png"
      },
      offer: {
        title: descriptionApartament[i],
        address: locationX + ", " + locationY,
        price:
      }
    };
    adsArray[i] = similarAds; // Кладу созданный объект в массив;
  }
  return adsArray; // Возвращаю заполненный после выполнения цикла массиив;
}

var adsAll = createAd(adsNumber); // Созданный в функции массив объявлений с объектами;

console.log(randomNumber(locationX));
console.log(randomNumber(locationY));
console.log(adsArray);
console.log(adsArray[1]);
console.log(getRandomFloat(minPrice, maxPrice));