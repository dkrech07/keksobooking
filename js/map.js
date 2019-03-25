var x = 8;
var i = 3;
var randomPhotos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
descriptionApartament = ["Маленькая уютная квартира"];

var similarAds = {
  author: {
    avatar: "../img/avatar/user" + x + ".png"
  },
  offer: {
    title: randomTitle[x], // количество элементов в массиве совпадает с количеством фотографий 01-08
    address: location.x,
    location.y,
    price: randomPrice,
    type: randomType,
    rooms: randomRooms,
    guests: randomGuests,
    checkin: randomCheckin,
    checkout: randomCheckout,
    features: randomFeatures,
    description: "",
    photos: randomPhotos[i];
  },
  location: {
    x: mapX,
    y: mapY
  }
};