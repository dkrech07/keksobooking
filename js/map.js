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



var activeMap = document.querySelector('.map');
activeMap.classList.remove('map--faded');


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