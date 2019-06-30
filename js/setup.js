'use strict';

// модуль настройки похожих персонажей
(function () {
  var WIZARDS_NUMBER = 4; // количество волшебников, которые необходимо сгенерировать

  // находим DOM-элемент, куда будем вставлять созданных волшебников
  var setupWizardsList = window.dialog.querySelector('.setup-similar-list');

  // находим шаблон персонажа
  var wizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  /**
  * используя шаблон создает  новый DOM-элемент для сгенерированного волшебника
  * @param {Object} wizard JS-объект на основе которого происходит наполнение шаблона
  * @return {Element}
  */
  var renderWizard = function (wizard) {
    var newWizard = wizardTemplate.cloneNode(true);// создадим DOM-элемент для сгенерированного волшебника на основе шаблона
    newWizard.querySelector('.setup-similar-label').textContent = wizard.name; // добавляем имя
    newWizard.querySelector('.wizard-coat').style.fill = wizard.colorCoat; // добавляем цвет мантии
    newWizard.querySelector('.wizard-eyes').style.fill = wizard.colorEyes; // добавляем цвет глаз

    return newWizard;
  };

  /**
  * добавляет в разметку необходимое количество DOM-элементов
  * @param {number} quantity
  * @param {array} arr
  */
  var getSimilarWizardList = function (quantity, arr) {
    var mixedArray = window.utils.getMixedArray(arr.slice());
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < quantity; i++) {
      fragment.appendChild(renderWizard(mixedArray[i]));
    }

    setupWizardsList.appendChild(fragment); // добавляем группу сгенерированных волшебников в разметку, в блок "Похожие персонажи"

    // блок "Похожие персонажи" делаем видимым
    window.dialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  var onLoadSuccess = function (response) {
    getSimilarWizardList(WIZARDS_NUMBER, response);
  };

  // Отрисовка волшебников после загрузки данных с сервера
  window.backend.load(onLoadSuccess, window.utils.onError);

})();
