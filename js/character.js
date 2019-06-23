'use strict';

// модуль настройки персонажа
(function () {
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
    characterCoatColorInput.value = window.util.getRandomItem(window.parameter.COAT_COLORS);
    characterCoatColor.style.fill = characterCoatColorInput.value;
  });

  // изменение цвета глаз по клику
  characterEyesColor.addEventListener('click', function () {
    characterEyesColorInput.value = window.util.getRandomItem(window.parameter.EYES_COLORS);
    characterEyesColor.style.fill = characterEyesColorInput.value;
  });

  // изменение цвета фаербола по клику
  characterFireballColor.addEventListener('click', function () {
    characterFireballColorInput.value = window.util.getRandomItem(window.parameter.FIREBALL_COLORS);
    characterFireballColor.style.backgroundColor = characterFireballColorInput.value;
  });
})();
