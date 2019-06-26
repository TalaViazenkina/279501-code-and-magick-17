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

  window.utils = {
    /**
    * генерирует случайный элемент массива
    * @param {array} arr
    * @return {(number|string|boolean|Array|Object)}
    */
    getRandomItem: function (arr) {
      return arr[Math.floor((Math.random() * arr.length))];
    },

    /**
    * перемешивает массив
    * @param {array} arr
    * @return {array}
    */
    getMixedArray: function (arr) {
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
    },

    /**
    * проверяет, был ли нажат esc
    * @param {event} evt
    * @param {function} action
    */
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },

    /**
    * проверяет, был ли нажат enter
    * @param {event} evt
    * @param {function} action
    */
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },

    /**
    * добавляет в разметку сообщение об ошибке
    * @param {string} errorMessage
    */
    onError: function (errorMessage) {
      // создадим div с сообщением об ошибке
      var node = document.createElement('div');

      // опишем его стили
      node.style.cssText = 'position: absolute; top: 50%; left: 50%; z-index: 100; padding: 50px; font-weight: bold; text-align: center; color: #ff0000; background-color: #ffffff; border: 5px solid #ff0000; transform: translate(-50%, -50%)';

      node.textContent = errorMessage;

      // вставим в разметку
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };
})();
