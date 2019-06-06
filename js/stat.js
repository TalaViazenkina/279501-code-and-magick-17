'use strict';

var CLOUD_WIDTH = 420; // ширина всплывающего окна
var CLOUD_HEIGHT = 270; // высота всплывающего окна
var CLOUD_X = 100; // координата Х всплывающего окна
var CLOUD_Y = 10; // координата Y всплывающего окна
var CLOUD_FONT = 16; // размер шрифта
var cloudLineHeight = CLOUD_FONT * 1.2; // интерлиньяж
var GAP = 50; // отступы между столбцами
var statX = CLOUD_X + GAP * 1.1; // координата Х блока со статистикой
var statY = CLOUD_Y + GAP * 1.5; // координата Y блока со статистикой
var STAT_BAR_WIDTH = 40; // ширина столбца гистограммы
var STAT_BAR_MAX_HEIGHT = 150; // максимальная высота столбца гистограммы
var statBarShift = STAT_BAR_WIDTH + GAP; // сдвиг столбца гистограммы по оси Х относительно предыдущего

// функция отрисовки облака
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x + 10, y);
  ctx.lineTo(x + CLOUD_WIDTH - 10, y);
  ctx.lineTo(x + CLOUD_WIDTH - 10, y + 10);
  ctx.lineTo(x + CLOUD_WIDTH, y + 10);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT - 10);
  ctx.lineTo(x + CLOUD_WIDTH - 10, y + CLOUD_HEIGHT - 10);
  ctx.lineTo(x + CLOUD_WIDTH - 10, y + CLOUD_HEIGHT);
  ctx.lineTo(x + 10, y + CLOUD_HEIGHT);
  ctx.lineTo(x + 10, y + CLOUD_HEIGHT - 10);
  ctx.lineTo(x, y + CLOUD_HEIGHT - 10);
  ctx.lineTo(x, y + 10);
  ctx.lineTo(x + 10, y + 10);
  ctx.closePath();
  ctx.fill();
};

// функция поиска максимального числа в массиве
var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (!arr[i]) { // проверка на то, что элемент массива не является пустым
      i++;
    } else if (maxElement < arr[i]) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, 'rgba(0, 0, 0, 0.7');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  // поздравительная надпись на облаке
  ctx.fillStyle = '#000000';
  ctx.font = CLOUD_FONT + 'px PT Mono';
  ctx.textAlign = 'center';
  ctx.fillText('Ура вы победили!', CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + GAP / 2);
  ctx.fillText('Список результатов:', CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + GAP / 2 + cloudLineHeight);

  // гистограмма
  var maxTimes = getMaxElement(times); // определяем максимальное время - оно будет соответствовать столбцу с максимальной высотой
  for (var i = 0; i < names.length; i++) {
    // столбец диаграммы
    // задаем цвет столбцу гистограммы
    ctx.fillStyle = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + Math.random() * 100 + '%, 50%)';

    // определяем пропорциональную высоту столбца
    var statBarHeight = times[i] * STAT_BAR_MAX_HEIGHT / maxTimes;
    // определяем смещение столбцов по вертикали
    var statBarShiftY = STAT_BAR_MAX_HEIGHT - statBarHeight;
    ctx.fillRect(statX + statBarShift * i, statY + cloudLineHeight / 2 + statBarShiftY, STAT_BAR_WIDTH, statBarHeight);

    ctx.fillStyle = '#000000'; // переопределяем цвет на дефолтный

    // временной показатель
    ctx.fillText(Math.round(times[i]), statX + statBarShift * i + STAT_BAR_WIDTH / 2, statY + statBarShiftY, statBarShift - 5);
    // имя игрока
    ctx.fillText(names[i], statX + statBarShift * i + STAT_BAR_WIDTH / 2, statY + STAT_BAR_MAX_HEIGHT + cloudLineHeight * 1.5, statBarShift - 5);
  }
};
