// getPinElementsList();

var pinElementClick0 = document.querySelector('.pin__0');
var pinElementClick1 = document.querySelector('.pin__1');
var pinElementClick2 = document.querySelector('.pin__2');
var pinElementClick3 = document.querySelector('.pin__3');
var pinElementClick4 = document.querySelector('.pin__4');
var pinElementClick5 = document.querySelector('.pin__5');
var pinElementClick6 = document.querySelector('.pin__6');
var pinElementClick7 = document.querySelector('.pin__7');

pinElementClick0.addEventListener('click', pinClickHandler0);
pinElementClick1.addEventListener('click', pinClickHandler1);
pinElementClick2.addEventListener('click', pinClickHandler2);
pinElementClick3.addEventListener('click', pinClickHandler3);
pinElementClick4.addEventListener('click', pinClickHandler4);
pinElementClick5.addEventListener('click', pinClickHandler5);
pinElementClick6.addEventListener('click', pinClickHandler6);
pinElementClick7.addEventListener('click', pinClickHandler7);

// Отрисовка карточки при клике на пин;
function pinClickHandler0() {
  popupElement(0); // Вывел каточку поп-ап для первого (нулевого в массиве) объекта;
}

function pinClickHandler1() {
  popupElement(1); // Вывел каточку поп-ап для первого (нулевого в массиве) объекта;
}

function pinClickHandler2() {
  popupElement(2); // Вывел каточку поп-ап для первого (нулевого в массиве) объекта;
}

function pinClickHandler3() {
  popupElement(3); // Вывел каточку поп-ап для первого (нулевого в массиве) объекта;
}

function pinClickHandler4() {
  popupElement(4); // Вывел каточку поп-ап для первого (нулевого в массиве) объекта;
}

function pinClickHandler5() {
  popupElement(5); // Вывел каточку поп-ап для первого (нулевого в массиве) объекта;
}

function pinClickHandler6() {
  popupElement(6); // Вывел каточку поп-ап для первого (нулевого в массиве) объекта;
}

function pinClickHandler7() {
  popupElement(7); // Вывел каточку поп-ап для первого (нулевого в массиве) объекта;
}