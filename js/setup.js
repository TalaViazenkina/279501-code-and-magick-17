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

// находим DOM-элемент, куда будем вставлять созданных волшебников
var setupWizardsList = userDialog.querySelector('.setup-similar-list');

// находим шаблон персонажа
var wizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// исходные данные для генерации персонажей
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var WIZARDS_NUMBER = 4; // количество волшебников, которые необходимо сгенерировать
var wizardsListRandom = []; // массив сгенерированных волшебников


// сделаем универсальную функцию для получения случайного элемента массива
var getRandomItem = function (arr) {
  return arr[Math.floor((Math.random() * arr.length))];
};

// перемешивание массива
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

// создадим сгенерированного волшебника
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

// создадим новый DOM-элемент с волшебником
var renderWizard = function (wizard) {
  var newWizard = wizardTemplate.cloneNode(true);// создадим DOM-элемент для сгенерированного волшебника на основе шаблона
  newWizard.querySelector('.setup-similar-label').textContent = wizard.name; // добавляем имя
  newWizard.querySelector('.wizard-coat').style.fill = wizard.coatColor; // добавляем цвет мантии
  newWizard.querySelector('.wizard-eyes').style.fill = wizard.eyesColor; // добавляем цвет глаз

  return newWizard;
};

// создадим требуемое количество волшебников и добавим их в разметку
var getSimilarWizardList = function () {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < wizardsListRandom.length; j++) {
    fragment.appendChild(renderWizard(wizardsListRandom[j]));
  }

  return setupWizardsList.appendChild(fragment); // добавляем группу сгенерированных волшебников в разметку, в блок "Похожие персонажи"
};

getSimilarWizardList();

userDialog.querySelector('.setup-similar').classList.remove('hidden'); // блок "Похожие персонажи" делаем видимым

// закрытие попапа по esc
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    userDialog.classList.add('hidden');
  }
};

// открытие и закрытие попапа
var openPopup = function () {
  userDialog.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);

  characterName.addEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupEscPress); // при фокусе в поле имени окно по esc закрываться не должно
  });

  characterName.addEventListener('blur', function () {
    document.addEventListener('keydown', onPopupEscPress); // возвращаем закрытие по esc после удаления фокуса с поля ввода
  });
};

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

// изменение цвета мантии по клилку
characterCoatColor.addEventListener('click', function () {
  characterCoatColor.style.fill = getRandomItem(COAT_COLORS);
  characterCoatColorInput.value = characterCoatColor.style.fill;
});
