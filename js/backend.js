(function() {
  window.backend = {
    load: function(onLoad, onError) {

      var URL = 'https://js.dump.academy/kekstagram/data';

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function() {
        console.log(xhr.readyState);
        console.log(xhr.status + xhr.statusText); // вывожу код ответа сервера в консоль;
        console.log(xhr.response);
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function() {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function() {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000; // 10s

      xhr.open('GET', URL);
      xhr.send();
    },

    save: function() {

    }
  };

  // тестовый код, нужно будет удалить
  function pokachat() {

  };

  function test() {

  };
  window.backend.load(function(item) {

  });

})();