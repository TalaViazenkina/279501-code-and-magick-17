'use strict';

// модуль настройки персонажа
(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  // элемент, описывающий мантию
  var characterCoat = window.dialog.querySelector('.setup-player .wizard-coat');

  // поле ввода цвета мантии
  var characterCoatColorInput = window.dialog.querySelector('input[name=coat-color]');

  // элемент, описывающий глаза
  var characterEyes = window.dialog.querySelector('.setup-player .wizard-eyes');

  // поле ввода цвета глаз
  var characterEyesColorInput = window.dialog.querySelector('input[name=eyes-color]');

  // элемент, описывающий фаербол
  var characterFireball = window.dialog.querySelector('.setup-fireball');

  // поле ввода цвета фаербола
  var characterFireballColorInput = window.dialog.querySelector('input[name=fireball-color]');

  window.character = {
    coatColor: '', // выбранный цвет мантии
    eyesColor: '', // выбранный цвет глаз
    fireballColor: ''// выбранный цвет фаербол
  };

  // изменение цвета мантии по клику
  characterCoat.addEventListener('click', function () {
    window.character.coatColor = window.utils.getRandomItem(COAT_COLORS);
    characterCoatColorInput.value = window.character.coatColor;
    characterCoat.style.fill = window.character.coatColor;
  });

  // изменение цвета глаз по клику
  characterEyes.addEventListener('click', function () {
    window.character.eyesColor = window.utils.getRandomItem(EYES_COLORS);
    characterEyesColorInput.value = window.character.eyesColor;
    characterEyes.style.fill = window.character.eyesColor;
  });

  // изменение цвета фаербола по клику
  characterFireball.addEventListener('click', function () {
    window.character.fireballColor = window.utils.getRandomItem(FIREBALL_COLORS);
    characterFireballColorInput.value = window.character.fireballColor;
    characterFireball.style.backgroundColor = window.character.fireballColor;
  });


})();
