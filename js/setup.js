'use strict';

// находим окно настройки персонажа
var userDialog = document.querySelector('.setup');
// убираем с окна настройки класс hidden
userDialog.classList.remove('hidden');

// исходные данные для генерации персонажей
var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

var wizardsNumber = 4; // количество волшебников, которые необходимо сгенерировать
var wizardsListRandom = []; // массив сгенерированных волшебников

// сделаем универсальную функцию для получения случайного элемента массива
var getRandomItem = function (arr) {
  return arr[Math.floor((Math.random() * arr.length))];
};


// создадим сгенерированного волшебника и добавим его в массив
for (var i = 0; i < wizardsNumber; i++) {
  var wizardRandom = {};
  // генерируем имя волшебника
  wizardRandom.name = getRandomItem(names) + ' ' + getRandomItem(surnames);
  console.log(wizardRandom.name);

  wizardsListRandom.push(wizardRandom); // добавляем сгенерированного волшебника в массив
}

