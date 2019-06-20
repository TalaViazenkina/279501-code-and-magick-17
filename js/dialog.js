'use strict';

(function () {
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

  // сохраним изначальные координаты открытого попапа (из CSS)
  var usersDialogPositionInitial = {
    TOP: '80px',
    LEFT: '50%'
  };


  // находим окно настройки персонажа
  var userDialog = document.querySelector('.setup');

  // кнопка открытия окна настройки персонажа
  var userDialogOpen = document.querySelector('.setup-open');

  // кнопка закрытия окна настройки персонажа
  var userDialogClose = userDialog.querySelector('.setup-close');

  // поле ввода имени в окне настройки персонажа
  var characterName = userDialog.querySelector('.setup-user-name');

  // блок с аватаркой, за которую будем осуществлять перестаскивание попапа
  var userDialogHandle = userDialog.querySelector('.upload');

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

  // перетаскивание окна настройки персонажа
  userDialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    // определяем координаты курсора в момент нажатия мышки
    var startCoord = {
      x: evt.clientX,
      y: evt.clientY
    };

    /**
    * обработчик передвижения мышки
    * @param {MouseEvent} evtMove
    */
    var onMouseMove = function (evtMove) {
      // определяем сдвиг курсора относительно предыдущего положения
      var shift = {
        x: evtMove.clientX - startCoord.x,
        y: evtMove.clientY - startCoord.y
      };

      // пересчитываем координаты попапа и задаем их в стили
      userDialog.style.top = (userDialog.offsetTop + shift.y) + 'px';
      userDialog.style.left = (userDialog.offsetLeft + shift.x) + 'px';

      // записываем в стартовые координаты текущие координаты курсора
      startCoord = {
        x: evtMove.clientX,
        y: evtMove.clientY
      };
    };

    /** обработчик отпускания кнопки мыши
    * @param {MouseEvent} evtUp
    */
    var onMouseUp = function () {
      userDialogHandle.removeEventListener('mousemove', onMouseMove);
      userDialogHandle.removeEventListener('mouseup', onMouseUp);
    };

    userDialogHandle.addEventListener('mousemove', onMouseMove);
    userDialogHandle.addEventListener('mouseup', onMouseUp);

  });

})();
