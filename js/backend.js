'use strict';
(function () {
  var URL_LOAD = 'https://js.dump.academy/code-and-magick/data';
  var URL_SAVE = 'https://js.dump.academy/code-and-magick';
  var TIMEOUT = 10000; // 10s
  window.backend = {
    submitCounter: 0, // счетчик отправок формы во время уже инициированного запроса на сервер
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
      });

      xhr.timeout = TIMEOUT;

      xhr.open('GET', URL_LOAD);
      xhr.send();
    },

    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
        window.backend.submitCounter = 0; // сбрасываем счетчик
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
        window.backend.submitCounter = 0; // сбрасываем счетчик
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
        window.backend.submitCounter = 0; // сбрасываем счетчик
      });

      xhr.timeout = TIMEOUT;

      xhr.open('POST', URL_SAVE);
      xhr.send(data);
    }
  };
})();
