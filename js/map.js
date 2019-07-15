(function() {
  // СПИСОК ПЕРЕМЕННЫХ
  var featureUnique = []; // Генерирую массив случайных особенностей;
  var adsArray = []; // Массив объявлений. В него будут записаны сгенерированные объекты;
  var similarAds = {}; // Обявление. Оъект в который будут записаны данные после выполнения цикла for;
  var adsAll = createAd(ADS_NUBMER); // Созданный в функции массив объявлений с объектами;


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

  // Создение DOM-элементов для списка удобств;
  function featureCreateAll(featureCard) { // На вход нужно получить массив со списком удобств;
    var featureFragment = document.createDocumentFragment(); // Создаем фрагмент для вывода в карточку всех удобств;
    for (var i = 0; i < featureCard.length; i++) { // Создаем цикл для создания и добавления в DocumentFragment дом-элементов с нужными классами;
      var featureAdd = document.createElement('li'); // Создаем контейнер <li></li>;
      featureAdd.classList.add('feature'); // Созданному контейнеру li, задаю класс .feature;
      featureAdd.classList.add('feature--' + featureCard[i]); // Создаю класс feature__ + название элемента массива удобств;
      featureFragment.appendChild(featureAdd);
    }
    return featureFragment; // Возвращаем полученный DocumentFragment с созданными dom-элементами;
  }

  // Удаление всех дочерних элементов, описание на MDN: Node.removeChild "Удаление всех дочерних элементов";
  function removeChild(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  //Создание DOM-элементов для списка фотографий: одна фотография;
  function photoCreateAll(photoArr) { // На вход получаем массив со ссылками на фотографии;
    var photoTemplate = document.querySelector('template').content.querySelector('.popup__pictures'); // Получаем шаблон списка фотографий;
    var photoFragment = document.createDocumentFragment(); // Создаем DocumentFragment для вставки фотографий в список;
    for (var i = 0; i < photoArr.length; i++) { // Цикл для добавления в DocumentFragment дом-элементов <img></img> с заданными из массива src;
      var photoNew = photoTemplate.cloneNode(true); // Разметка для фотографий скопирована из шаблона;
      var photoElement = photoNew.querySelector('li'); // Найден элемент li;
      photoElement.querySelector('img').style.width = 50 + 'px'; // Задаем картике ширину 50 px;
      photoElement.querySelector('img').style.height = 50 + 'px'; // Задаем картинке высоту 50px;
      photoElement.querySelector('img').src = photoArr[i]; // Задаем картинке src соответствующий элементу в массиве со ссылками на фотографии;
      photoFragment.appendChild(photoElement); // Записываем полученный элемент li с img в DocumentFragment;
    }
    return photoFragment;
  }
})()