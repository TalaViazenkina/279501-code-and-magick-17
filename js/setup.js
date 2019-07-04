'use strict';

// модуль настройки похожих персонажей
(function () {
  var WIZARDS_NUMBER = 4; // количество волшебников, которые необходимо сгенерировать

  var coatColor;
  var eyesColor;

  var wizardsData = [];

  var isSimilar; // флаг, который показывает, были ли отрисованы волшебники

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
    newWizard.classList.add('similar-wizard');
    return newWizard;
  };

  /**
  * добавляет в разметку необходимое количество DOM-элементов
  * @param {number} quantity
  * @param {array} arr
  */
  var getSimilarWizardList = function (quantity, arr) {
    // удаляем из разметки предыдущих отрисованных волшебников
    if (isSimilar) {
      Array.from(setupWizardsList.querySelectorAll('.similar-wizard'))
      .forEach(function (it) {
        setupWizardsList.removeChild(it);
      });
    }

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < quantity; i++) {
      fragment.appendChild(renderWizard(arr[i]));
    }

    setupWizardsList.appendChild(fragment); // добавляем группу сгенерированных волшебников в разметку, в блок "Похожие персонажи"

    // меняем флаг
    isSimilar = true;

    // блок "Похожие персонажи" делаем видимым
    window.dialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  /**
  * выcчитывает ранг волшебника
  * @param {Object} wizard
  * @return {number}
  */
  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (first, second) {
    if (first > second) {
      return 1;
    } else if (first < second) {
      return -1;
    }
    return 0;
  };

  /**
  * отрисовывает похожих волшебников на основе отсортированных данных
  */
  var updateWizards = function () {
    getSimilarWizardList(WIZARDS_NUMBER, wizardsData.sort(function (first, second) {
      var rankDiff = getRank(second) - getRank(first);
      if (rankDiff === 0) {
        rankDiff = namesComparator(first.name, second.name);
      }
      return rankDiff;
    }));
  };

  var onLoadSuccess = function (response) {
    wizardsData = response;
    updateWizards();
  };

  // Отрисовка волшебников после загрузки данных с сервера
  window.backend.load(onLoadSuccess, window.utils.onError);

  // Отрисовка похожих волшебников после выбора цвета мантии персонажа
  window.character.onCoatChange = window.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

  // Отрисовка похожих волшебников после выбора цвета глаз персонажа
  window.character.onEyesChange = window.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

})();
