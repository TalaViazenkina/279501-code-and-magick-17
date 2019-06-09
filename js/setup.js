'use strict';

// находим окно настройки персонажа
var userDialog = document.querySelector('.setup');
// убираем с окна настройки класс hidden
userDialog.classList.remove('hidden');

// находим DOM-элемент, куда будем вставлять созданных волшебников
var setupWizardsList = userDialog.querySelector('.setup-similar-list');

// находим шаблон персонажа
var wizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');


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

// создадим массив сгенерированных волшебников
for (var i = 0; i < wizardsNumber; i++) {
  var wizardRandom = {}; // сгенерированный волшебник

  // генерируем имя волшебника cо случайным порядком имени и фамилии
  wizardRandom.name = Math.round(Math.random()) ? (getRandomItem(names) + ' ' + getRandomItem(surnames)) : (getRandomItem(surnames) + ' ' + getRandomItem(names));

  // генерируем цвет мантии
  wizardRandom.coatColor = getRandomItem(coatColors);

  // генерируем цвет глаз
  wizardRandom.eyesColor = getRandomItem(eyesColors);

  wizardsListRandom.push(wizardRandom); // добавляем сгенерированного волшебника в массив
}

// создадим новый DOM-элемент с волшебником
var renderWizard = function (wizard) {
  var newWizard = wizardTemplate.cloneNode(true);// создадим DOM-элемент для сгенерированного волшебника на основе шаблона
  newWizard.querySelector('.setup-similar-label').textContent = wizard.name; // добавляем имя
  newWizard.querySelector('.wizard-coat').style.fill = wizard.coatColor; // добавляем цвет мантии
  newWizard.querySelector('.wizard-eyes').style.fill = wizard.eyesColor; // добавляем цвет глаз

  return newWizard;
};

// в цикле создадим несколько волшебников и добавим в DocumentFragment
var fragment = document.createDocumentFragment();
for (var j = 0; j < wizardsListRandom.length; j++) {
  fragment.appendChild(renderWizard(wizardsListRandom[j]));
}

setupWizardsList.appendChild(fragment); // добавляем группу сгенерированных волшебников в разметку, в блок "Похожие персонажи"

userDialog.querySelector('.setup-similar').classList.remove('hidden'); // блок "Похожие персонажи" делаем видимым
