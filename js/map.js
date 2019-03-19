// Генерация объектов для массива


var avatars = [];

function avatarGeneration(x) {
  for (i = 1; i <= x; i++) {
    avatars[i - 1] = 'user0' + i + '.png';
  };
  return avatars;
}
avatarGeneration(8);


// Массив заголовков предложения
var titleOffer = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];


// Массив из 8 сгенерированных js объектов
var i = 2;
var similarAds = [{
  "author": {
    "avatar": 'img/avatars/' + avatars[i]
  },
  "offer": {
    "title": "titleOffer[i]"
  }
}];

console.log(similarAds[0].avatar);
console.log(avatars[i]);

var activeMap = document.querySelector('.map');
activeMap.classList.remove('map--faded');