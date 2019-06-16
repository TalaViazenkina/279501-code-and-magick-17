'use strict';

// находим окно настройки персонажа
var userDialog = document.querySelector('.setup');

// кнопка открытия окна настройки персонажа
var userDialogOpen = document.querySelector('.setup-open');

// кнопка закрытия окна настройки персонажа
var userDialogClose = userDialog.querySelector('.setup-close');

// поле ввода имени в окне настройки персонажа
var characterName = userDialog.querySelector('.setup-user-name');

// элемент, описывающий цвет мантии
var characterCoatColor = userDialog.querySelector('.setup-player .wizard-coat');

// поле ввода цвета мантии
var characterCoatColorInput = userDialog.querySelector('input[name=coat-color]');

// элемент, описывающий цвет глаз
var characterEyesColor = userDialog.querySelector('.setup-player .wizard-eyes');

// поле ввода цвета глаз
var characterEyesColorInput = userDialog.querySelector('input[name=eyes-color]');

// элемент, описывающий цвет фаербола
var characterFireballColor = userDialog.querySelector('.setup-fireball');

// поле ввода цвета фаербола
var characterFireballColorInput = userDialog.querySelector('input[name=fireball-color]');

// находим DOM-элемент, куда будем вставлять созданных волшебников
var setupWizardsList = userDialog.querySelector('.setup-similar-list');

// находим шаблон персонажа
var wizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');


/**
   * @const
   * @type {number}
   */
var ESC_KEYCODE = 27;

/**
   * @const
   * @type {number}
   */
var ENTER_KEYCODE = 13;

// исходные данные для генерации персонажей
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var WIZARDS_NUMBER = 4; // количество волшебников, которые необходимо сгенерировать
var wizardsListRandom = []; // массив сгенерированных волшебников


/**
* генерируем случайный элемент массива
* @param {array} arr
* @return {(number|string|boolean|Array|Object)}
*/
var getRandomItem = function (arr) {
  return arr[Math.floor((Math.random() * arr.length))];
};

/**
* перемешиваем массив
* @param {array} arr
* @return {array}
*/
var getMixedArray = function (arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    // получаем индекс случайного элемента в массиве с длинной (i + 1),
    // на первой итерации длина массива равна длине исходного,
    // с каждой последующей - на единицу меньше
    var randomIndex = Math.floor(Math.random() * (i + 1));

    // меняем элементы местами
    var temp = arr[i];
    arr[i] = arr[randomIndex]; // случайно выбранный элемент перенесен в конец массива
    arr[randomIndex] = temp; // на место случайно выбранного элемента записан элемент с индексом i
  }

  return arr;
};

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
    coatColor: getRandomItem(COAT_COLORS),

    // генерируем цвет глаз
    eyesColor: getRandomItem(EYES_COLORS)
  };
};

// создадим массив сгенерированных волшебников
getMixedArray(NAMES); // перемешиваем имена
getMixedArray(SURNAMES); // перемешиваем фамилии
for (var i = 0; i < WIZARDS_NUMBER; i++) {
  wizardsListRandom.push(getWizardRandom(NAMES[i], SURNAMES[i]));
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

userDialog.querySelector('.setup-similar').classList.remove('hidden'); // блок "Похожие персонажи" делаем видимым

/**
 * Обработчик событий клавиатуры - закрытие попапа по esc
 * @param {KeyboardsEvent} evt
 */
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && characterName !== document.activeElement) {
    userDialog.classList.add('hidden');
  }
};


/**
* Открывает попап
*/
var openPopup = function () {
  userDialog.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
};

/**
* Закрывает попапа
*/
var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

// открытие окна настройки персонажа
userDialogOpen.addEventListener('click', function () {
  openPopup();
});

// открытие окна настройки персонажа по enter
userDialogOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

// закрытие окна настройки персонажа
userDialogClose.addEventListener('click', function () {
  closePopup();
});

// закрытие окна настройки персонажа по enter
userDialogClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// изменение цвета мантии по клику
characterCoatColor.addEventListener('click', function () {
  characterCoatColorInput.value = getRandomItem(COAT_COLORS);
  characterCoatColor.style.fill = characterCoatColorInput.value;
});

// изменение цвета глаз по клику
characterEyesColor.addEventListener('click', function () {
  characterEyesColorInput.value = getRandomItem(EYES_COLORS);
  characterEyesColor.style.fill = characterEyesColorInput.value;
});

// изменение цвета фаербола по клику
characterFireballColor.addEventListener('click', function () {
  characterFireballColorInput.value = getRandomItem(FIREBALL_COLORS);
  characterFireballColor.style.backgroundColor = characterFireballColorInput.value;
});
