// data.js — модуль, который создаёт данные;
// Функции и используемые в них переменные/константы;

(function() {

  // Получение данных с сервера;
  var successHandler = function(data) {
    window.adsAll = data;
    console.log(window.adsAll);

  };

  var errorHandler = function(errorMessage) {

  };

  window.backend.load(successHandler, errorHandler);

  // Отправка данных на сервер;

  var form = document.querySelector('.notice__form');
  form.addEventListener('submit', function(evt) {
    window.backend.save(new FormData(form),
      function(response) {
        console.log('OK');
        mapActive.classList.add('map--faded');
      });
    evt.preventDefault();
  });

})();