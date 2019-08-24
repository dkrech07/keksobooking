(function() {



  window.backend = {
    load: function(onLoad, onError) {

      var URL = 'https://js.dump.academy/keksobooking/data';

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function() {

        // // Вывожу данные полученные с сервера в консоль:
        // console.log(xhr.readyState);
        // console.log(xhr.status);
        // console.log(xhr.response);

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

  // // onLoad — функция обратного вызова, которая срабатывает при успешном
  // // выполнении запроса. При вызове функции onLoad в её единственный
  // // параметр передаётся набор полученных данных

  // тестовый код, нужно будет удалить
  // window.backend.load(function(data) {
  //   console.log(data);
  //
  // }, function() {});

})();