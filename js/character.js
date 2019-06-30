'use strict';

// модуль настройки персонажа
(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  // элемент, описывающий цвет мантии
  var characterCoatColor = window.dialog.querySelector('.setup-player .wizard-coat');

  // поле ввода цвета мантии
  var characterCoatColorInput = window.dialog.querySelector('input[name=coat-color]');

  // элемент, описывающий цвет глаз
  var characterEyesColor = window.dialog.querySelector('.setup-player .wizard-eyes');

  // поле ввода цвета глаз
  var characterEyesColorInput = window.dialog.querySelector('input[name=eyes-color]');

  // элемент, описывающий цвет фаербола
  var characterFireballColor = window.dialog.querySelector('.setup-fireball');

  // поле ввода цвета фаербола
  var characterFireballColorInput = window.dialog.querySelector('input[name=fireball-color]');


  // изменение цвета мантии по клику
  characterCoatColor.addEventListener('click', function () {
    characterCoatColorInput.value = window.utils.getRandomItem(COAT_COLORS);
    characterCoatColor.style.fill = characterCoatColorInput.value;
  });

  // изменение цвета глаз по клику
  characterEyesColor.addEventListener('click', function () {
    characterEyesColorInput.value = window.utils.getRandomItem(EYES_COLORS);
    characterEyesColor.style.fill = characterEyesColorInput.value;
  });

  // изменение цвета фаербола по клику
  characterFireballColor.addEventListener('click', function () {
    characterFireballColorInput.value = window.utils.getRandomItem(FIREBALL_COLORS);
    characterFireballColor.style.backgroundColor = characterFireballColorInput.value;
  });
})();
