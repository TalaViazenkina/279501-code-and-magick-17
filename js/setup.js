'use strict';

// модуль настройки похожих персонажей
(function () {
  // исходные данные для генерации персонажей
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARDS_NUMBER = 4; // количество волшебников, которые необходимо сгенерировать

  // находим DOM-элемент, куда будем вставлять созданных волшебников
  var setupWizardsList = window.dialog.querySelector('.setup-similar-list');

  // находим шаблон персонажа
  var wizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');


  var wizardsListRandom = []; // массив сгенерированных волшебников

  /**
  * создадает сгенерированного волшебника
  * @param {string} name
  * @param {string} surname
  * @return {object}
  */
  var getWizardRandom = function (name, surname) {
    return {
      // генерируем имя волшебника cо случайным порядком имени и фамилии
      name: Math.round(Math.random()) ? (name + ' ' + surname) : (surname + ' ' + name),

      // генерируем цвет мантии
      coatColor: window.util.getRandomItem(window.parameter.COAT_COLORS),

      // генерируем цвет глаз
      eyesColor: window.util.getRandomItem(window.parameter.EYES_COLORS)
    };
  };

  // создадим массив сгенерированных волшебников
  var mixedNames = window.util.getMixedArray(NAMES.slice()); // получаем массив перемешенных имен
  var mixedSurnames = window.util.getMixedArray(SURNAMES.slice()); // получаем массив перемешенных фамилий
  for (var i = 0; i < WIZARDS_NUMBER; i++) {
    wizardsListRandom.push(getWizardRandom(mixedNames[i], mixedSurnames[i]));
  }

  /**
  * используя шаблон создает  новый DOM-элемент для сгенерированного волшебника
  * @param {Object} wizard JS-объект на основе которого происходит наполнение шаблона
  * @return {Element}
  */
  var renderWizard = function (wizard) {
    var newWizard = wizardTemplate.cloneNode(true);// создадим DOM-элемент для сгенерированного волшебника на основе шаблона
    newWizard.querySelector('.setup-similar-label').textContent = wizard.name; // добавляем имя
    newWizard.querySelector('.wizard-coat').style.fill = wizard.coatColor; // добавляем цвет мантии
    newWizard.querySelector('.wizard-eyes').style.fill = wizard.eyesColor; // добавляем цвет глаз

    return newWizard;
  };

  /**
  * добавляет в разметку необходимое количество DOM-элементов
  * @return {Element}
  */
  var getSimilarWizardList = function () {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < wizardsListRandom.length; j++) {
      fragment.appendChild(renderWizard(wizardsListRandom[j]));
    }

    return setupWizardsList.appendChild(fragment); // добавляем группу сгенерированных волшебников в разметку, в блок "Похожие персонажи"
  };

  getSimilarWizardList();

  // блок "Похожие персонажи" делаем видимым
  window.dialog.querySelector('.setup-similar').classList.remove('hidden');

})();
