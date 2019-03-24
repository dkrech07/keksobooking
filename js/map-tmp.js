/*
// Генерация объектов для массива
var avatars = [];

function avatarGeneration(x) {
  for (i = 1; i <= x; i++) {
    avatars[i - 1] = '../img/avatars/user0' + i + '.png';
  };
  return avatars;
}
avatarGeneration(8);
console.log(avatarGeneration(8));



// Массив заголовков предложения
var titleOffer = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];


// Массив из 8 сгенерированных js объектов
var similarAds = [{
  author: {
    avatar: avatarGeneration(8)[1]
  },
  offer: {
    title: titleOffer[i],
  }
}];
*/
/*
    address: (location.x, location.y),
    price: randomPrice,
    type: typeOfHousing,
    rooms: numberOfRooms,
    guests: guestsRandom,
    checkin: checkInTime,
    checkout: checkOutTime,
    features: featuresRandom,
    description: '',
    photos: photosRandom
  },
  location: {
    x: mapX,
    y: mapY
  }
}];
*/

var similarAds = {
  author: {
    avatar: "../img/avatar/user01.png"
  },
  offer: {
    title: "Большая уютная квартира",
    address: "600, 350",
    price: 300000,
    type: "bungalo",
    rooms: 5,
    guests: 15,
    checkin: "13:00",
    checkout: "14:00",
    features: ["wifi", "parking", "washer"],
    description: "",
    photos: ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"]
  },
  location: {
    x: 250,
    y: 500
  }
};

var similarAdsArr = [similarAds];

// Делаем карту активной
var activeMap = document.querySelector('.map');
activeMap.classList.remove('map--faded');

// Получаем метку из template .map__pin
var mapPinElement = document.querySelector('template').content.querySelector('.map__pin');
var mapPin = mapPinElement.cloneNode(true);
mapPin.setAttribute("style", "left: 100px; top: 200px;", "src", "../img/avatars/user01.png", "alt", "заголовок объявления");

var mapPins = document.querySelector(".mapPins");
mapPins = document.createDocumentFragment();
mapPins.appendChild(mapPin);

var template = document.querySelector('template').content.querySelector('.map__card');
var element = template.cloneNode(true);
activeMap.appendChild(element);