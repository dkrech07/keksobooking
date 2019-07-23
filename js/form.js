// form.js — модуль, который работает с формой объявления;

(function() {

  // Отключение активности полей форм, до тех пор, пока неактивна квартира (select, fieldset);
  function inputDisabled(selector) {
    var mapInputs = document.querySelectorAll(selector);
    for (var i = 0; i < mapInputs.length; i++) {
      mapInputs[i].disabled = true;
    }
    return mapInputs;
  }
  inputDisabled('fieldset');
  inputDisabled('select');


})();