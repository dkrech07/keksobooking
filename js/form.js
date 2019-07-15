// form.js — модуль, который работает с формой объявления;

(function() {

  // Отключение активности полей, до тех пор, пока неактивна квартира (select, fieldset);
  window.inputDisabled = function(selector) {
    var mapInputs = document.querySelectorAll(selector);
    for (var i = 0; i < mapInputs.length; i++) {
      mapInputs[i].disabled = true;
    }
    return mapInputs;
  }
  inputDisabled('fieldset');
  inputDisabled('select');

  // Включение активности полей, до тех пор, пока после того, как активирована карта;
  window.inputEnabled = function(selector) {
    var mapInputs = document.querySelectorAll(selector);
    for (var i = 0; i < mapInputs.length; i++) {
      mapInputs[i].disabled = false;
    }
    return mapInputs;
  }

})();