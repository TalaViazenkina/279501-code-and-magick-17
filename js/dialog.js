'use strict';

// открытие/закрытие и перетаскивания окна настройки персонажа
(function () {

  // сохраним изначальные координаты открытого попапа (из CSS)
  var UsersDialogPositionInitial = {
    TOP: '80px',
    LEFT: '50%'
  };

  window.dialog = document.querySelector('.setup'); // окно настройки персонажа


  // кнопка открытия окна настройки персонажа
  var userDialogOpen = document.querySelector('.setup-open');

  // кнопка закрытия окна настройки персонажа
  var userDialogClose = window.dialog.querySelector('.setup-close');

  // форма настройки персонажа
  var form = window.dialog.querySelector('.setup-wizard-form');

  // поле ввода имени в окне настройки персонажа
  var characterName = window.dialog.querySelector('.setup-user-name');

  // блок с аватаркой, за которую будем осуществлять перестаскивание попапа
  var userDialogHandle = window.dialog.querySelector('.upload');

  /**
  * Обработчик событий клавиатуры - закрытие попапа по esc
  * @param {KeyboardsEvent} evt
  */
  var onPopupEscPress = function (evt) {
    if (characterName !== document.activeElement) {
      window.utils.isEscEvent(evt, closePopup);
    }
  };

  /**
  * Открывает попап
  */
  var openPopup = function () {
    window.dialog.classList.remove('hidden');

    // присваиваем изначальные координаты
    window.dialog.style.top = UsersDialogPositionInitial.TOP;
    window.dialog.style.left = UsersDialogPositionInitial.LEFT;

    document.addEventListener('keydown', onPopupEscPress);
  };

  /**
  * Закрывает попапа
  */
  var closePopup = function () {
    window.dialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // открытие окна настройки персонажа
  userDialogOpen.addEventListener('click', function () {
    openPopup();
  });

  // открытие окна настройки персонажа по enter
  userDialogOpen.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, openPopup);
  });

  // закрытие окна настройки персонажа
  userDialogClose.addEventListener('click', function () {
    closePopup();
  });

  // закрытие окна настройки персонажа по enter
  userDialogClose.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, closePopup);
  });

  // перетаскивание окна настройки персонажа
  userDialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var dragged = false; // флаг, который будет показывать было ли перемещение мыши

    // определяем координаты курсора в момент нажатия мышки
    var startCoord = {
      x: evt.clientX,
      y: evt.clientY
    };

    /**
    * обработчик передвижения мышки
    * @param {MouseEvent} moveEvt
    */
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true; // меняем флаг

      // определяем сдвиг курсора относительно предыдущего положения
      var shift = {
        x: moveEvt.clientX - startCoord.x,
        y: moveEvt.clientY - startCoord.y
      };

      // пересчитываем координаты попапа и задаем их в стили
      window.dialog.style.top = (window.dialog.offsetTop + shift.y) + 'px';
      window.dialog.style.left = (window.dialog.offsetLeft + shift.x) + 'px';

      // записываем в стартовые координаты текущие координаты курсора
      startCoord = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
    };

    /** обработчик отпускания кнопки мыши
    * @param {MouseEvent} upEvt
    */
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          userDialogHandle.removeEventListener('click', onClickPreventDefault);
        };

        userDialogHandle.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  var onSaveSuccess = function () {
    window.dialog.classList.add('hidden');
  };

  // отправка данных на сервер с помощью AJAX
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), onSaveSuccess, window.utils.onError);
  });

})();
